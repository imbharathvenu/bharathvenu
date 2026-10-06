import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Local / self-hosted server. Same API as the Vercel functions, but stores everything on disk:
//   data/content.json (live content), data/history/ (last 30 versions), uploads/ (images)
const PORT = Number(process.env.PORT || 3000);
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const root = process.cwd();
const dataFile = path.join(root, 'data/content.json');
const shipped = path.join(root, 'public/content.json');
const histDir = path.join(root, 'data/history');
const upDir = path.join(root, 'uploads');
fs.mkdirSync(histDir, { recursive: true });
fs.mkdirSync(upDir, { recursive: true });

const readText = () => (fs.existsSync(dataFile) ? fs.readFileSync(dataFile, 'utf8') : fs.existsSync(shipped) ? fs.readFileSync(shipped, 'utf8') : 'null');
const sha = (s: string | Buffer) => crypto.createHash('sha256').update(s).digest();
const short = (s: string) => crypto.createHash('sha1').update(s).digest('hex');
const sessions = new Set<string>();

const app = express();
const auth: express.RequestHandler = (req, res, next) =>
  sessions.has((req.headers.authorization || '').replace('Bearer ', '')) ? next() : void res.status(401).json({ error: 'Unauthorized' });

app.get('/api/content', (_q, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.type('json').send(readText());
});
app.post('/api/login', express.json(), (req, res) => {
  if (!crypto.timingSafeEqual(sha(String(req.body?.password ?? '')), sha(PASSWORD))) return void res.status(401).json({ error: 'Wrong password' });
  const t = crypto.randomBytes(24).toString('hex'); sessions.add(t); res.json({ token: t });
});
app.put('/api/content', auth, express.json({ limit: '5mb' }), (req, res) => {
  const b = req.body;
  if (!b || typeof b !== 'object') return void res.status(400).json({ error: 'Bad body' });
  const wrapped = b.content && typeof b.content === 'object' && !('PERSONAL_INFO' in b);
  const content = wrapped ? b.content : b;
  if (!content.PERSONAL_INFO) return void res.status(400).json({ error: 'Content looks incomplete (PERSONAL_INFO missing)' });
  const cur = readText();
  if (wrapped && b.baseSha && b.baseSha !== short(cur)) return void res.status(409).json({ error: 'conflict', sha: short(cur) });
  if (cur !== 'null') fs.writeFileSync(path.join(histDir, `${Date.now()}.json`), cur); // keep the previous version
  const files = fs.readdirSync(histDir).sort();
  for (const f of files.slice(0, Math.max(0, files.length - 30))) fs.rmSync(path.join(histDir, f));
  const text = JSON.stringify(content, null, 2);
  fs.writeFileSync(dataFile, text);
  res.json({ ok: true, sha: short(text) });
});

app.post('/api/content/reset', auth, (_q, res) => { fs.rmSync(dataFile, { force: true }); res.json({ ok: true }); });

app.post('/api/upload', auth, express.raw({ type: 'image/*', limit: '15mb' }), (req, res) => {
  const ext = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' } as Record<string, string>)[String(req.headers['content-type']).split(';')[0]];
  if (!ext || !Buffer.isBuffer(req.body)) return void res.status(400).json({ error: 'Unsupported image' });
  const name = `${Date.now()}-${crypto.randomBytes(3).toString('hex')}.${ext}`;
  fs.writeFileSync(path.join(upDir, name), req.body);
  res.json({ url: `uploads/${name}` });
});

// admin management actions (mirror of api/admin.ts)
app.get('/api/admin', (req, res, next) => {
  const action = String(req.query.action || '');
  if (action === 'raw') { const n = path.basename(String(req.query.path || '')); return void res.sendFile(path.join(upDir, n)); }
  next();
}, auth, (req, res) => {
  const action = String(req.query.action || '');
  const hist = () => fs.readdirSync(histDir).sort().reverse();
  if (action === 'status') return void res.json({
    mode: 'local', configured: true, ok: true, canWrite: true, repo: 'local files (data/content.json)', branch: '-',
    env: { ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD, GITHUB_TOKEN: false, GITHUB_REPO: false, GITHUB_BRANCH: false },
    contentSha: short(readText()), contentExists: fs.existsSync(dataFile),
    lastCommit: hist()[0] ? { message: 'Previous version saved', date: new Date(Number(hist()[0].replace('.json', ''))).toISOString() } : null,
  });
  if (action === 'load') { res.setHeader('Cache-Control', 'no-store'); const t = readText(); return void res.json({ content: JSON.parse(t), sha: short(t) }); }
  if (action === 'history') return void res.json({ commits: hist().map((f) => ({ sha: f, message: 'Saved version', date: new Date(Number(f.replace('.json', ''))).toISOString() })) });
  if (action === 'version') { const f = path.join(histDir, path.basename(String(req.query.ref))); return void (fs.existsSync(f) ? res.json({ content: JSON.parse(fs.readFileSync(f, 'utf8')) }) : res.status(404).json({ error: 'Not found' })); }
  if (action === 'uploads') return void res.json({ files: fs.readdirSync(upDir).map((name) => ({ name, size: fs.statSync(path.join(upDir, name)).size, sha: name })) });
  res.status(400).json({ error: 'Unknown action' });
});
app.post('/api/admin', auth, (req, res) => {
  if (req.query.action === 'deleteUpload') { fs.rmSync(path.join(upDir, path.basename(String(req.query.name))), { force: true }); return void res.json({ ok: true }); }
  res.status(400).json({ error: 'Unknown action' });
});
app.use('/uploads', express.static(upDir));

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(root, 'dist');
  app.use(express.static(dist));
  app.use('/uploads', express.static(upDir));
  app.get('*', (_q, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  const { createServer } = await import('vite');
  app.use((await createServer({ server: { middlewareMode: true }, appType: 'spa' })).middlewares);
}
app.listen(PORT, '0.0.0.0', () => console.log(`http://localhost:${PORT}  (admin: /admin)${process.env.ADMIN_PASSWORD ? '' : '  ⚠ using default password "admin123" — set ADMIN_PASSWORD'}`));
