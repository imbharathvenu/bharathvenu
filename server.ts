import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as D from './src/data/portfolioData';

const PORT = Number(process.env.PORT || 3000);
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const root = process.cwd();
const dataFile = path.join(root, 'data/content.json');
const upDir = path.join(root, 'uploads');
fs.mkdirSync(path.dirname(dataFile), { recursive: true });
fs.mkdirSync(upDir, { recursive: true });

const defaults = () => Object.fromEntries(D.CONTENT_KEYS.map((k) => [k, (D as any)[k]]));
const load = () => (fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : defaults());
const sha = (s: string) => crypto.createHash('sha256').update(s).digest();
const sessions = new Set<string>();

const app = express();
const auth: express.RequestHandler = (req, res, next) =>
  sessions.has((req.headers.authorization || '').replace('Bearer ', '')) ? next() : void res.status(401).json({ error: 'Unauthorized' });

app.get('/api/content', (_q, res) => res.json(load()));
app.post('/api/login', express.json(), (req, res) => {
  if (!crypto.timingSafeEqual(sha(String(req.body?.password ?? '')), sha(PASSWORD))) return void res.status(401).json({ error: 'Wrong password' });
  const t = crypto.randomBytes(24).toString('hex'); sessions.add(t); res.json({ token: t });
});
app.put('/api/content', auth, express.json({ limit: '5mb' }), (req, res) => {
  if (!req.body || typeof req.body !== 'object') return void res.status(400).json({ error: 'Bad body' });
  fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2)); res.json({ ok: true });
});
app.post('/api/content/reset', auth, (_q, res) => { fs.rmSync(dataFile, { force: true }); res.json(load()); });
app.post('/api/upload', auth, express.raw({ type: 'image/*', limit: '15mb' }), (req, res) => {
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' }[String(req.headers['content-type']).split(';')[0]];
  if (!ext || !Buffer.isBuffer(req.body)) return void res.status(400).json({ error: 'Unsupported image' });
  const name = `${Date.now()}-${crypto.randomBytes(3).toString('hex')}.${ext}`;
  fs.writeFileSync(path.join(upDir, name), req.body); res.json({ url: `/uploads/${name}` });
});
app.use('/uploads', express.static(upDir));

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(root, 'dist');
  app.use(express.static(dist));
  app.get('*', (_q, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  const { createServer } = await import('vite');
  app.use((await createServer({ server: { middlewareMode: true }, appType: 'spa' })).middlewares);
}
app.listen(PORT, '0.0.0.0', () => console.log(`http://localhost:${PORT}  (admin: /admin)${process.env.ADMIN_PASSWORD ? '' : '  ⚠ using default password "admin123" — set ADMIN_PASSWORD'}`));
