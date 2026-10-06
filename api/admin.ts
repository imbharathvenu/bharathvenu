import { cors, isAuthed, getFile, deleteFile, CONTENT_PATH, configured, repoName, branchName, repoStatus, commitsFor, fileAt, listDir, rawBytes } from './_lib.js';

const MIME: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' };

// One endpoint for all admin/GitHub management actions: /api/admin?action=…
export default async function handler(req: any, res: any) {
  if (cors(req, res)) return;
  const action = String(req.query?.action || '');
  try {
    // public, restricted to image folders: lets a just-uploaded image show before the host finishes redeploying
    if (action === 'raw') {
      const path = String(req.query?.path || '');
      if (!/^public\/(uploads|images)\/[\w.\-]+$/.test(path)) return res.status(400).json({ error: 'Bad path' });
      const buf = await rawBytes(path);
      if (!buf) return res.status(404).end();
      res.setHeader('Content-Type', MIME[path.split('.').pop()!.toLowerCase()] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.status(200).send(buf);
    }
    if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

    if (action === 'status') {
      const env = { ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD, GITHUB_TOKEN: !!process.env.GITHUB_TOKEN, GITHUB_REPO: !!process.env.GITHUB_REPO, GITHUB_BRANCH: !!process.env.GITHUB_BRANCH };
      if (!configured()) return res.json({ mode: 'github', configured: false, env });
      const [st, f, h] = await Promise.all([repoStatus(), getFile(CONTENT_PATH).catch(() => null), commitsFor(CONTENT_PATH, 1).catch(() => [])]);
      return res.json({ mode: 'github', configured: true, env, repo: repoName(), branch: branchName(), ...st, contentSha: f?.sha || null, contentExists: !!f, lastCommit: h[0] || null });
    }
    if (!configured()) return res.status(500).json({ error: 'Server not configured (set GITHUB_TOKEN, GITHUB_REPO, ADMIN_PASSWORD)' });

    if (action === 'load') { // always fresh, never cached — the editor must start from the real latest file
      const f = await getFile(CONTENT_PATH);
      res.setHeader('Cache-Control', 'no-store');
      return res.json({ content: f ? JSON.parse(f.text) : null, sha: f?.sha || null });
    }
    if (action === 'history') return res.json({ commits: await commitsFor(CONTENT_PATH, 30) });
    if (action === 'version') {
      const t = await fileAt(CONTENT_PATH, String(req.query?.ref || ''));
      return t ? res.json({ content: JSON.parse(t) }) : res.status(404).json({ error: 'Version not found' });
    }
    if (action === 'uploads') return res.json({ files: await listDir('public/uploads') });
    if (action === 'deleteUpload' && req.method === 'POST') {
      const name = String(req.query?.name || '');
      if (!/^[\w.\-]+$/.test(name)) return res.status(400).json({ error: 'Bad name' });
      await deleteFile('public/uploads/' + name, 'Admin: delete image');
      return res.json({ ok: true });
    }
    res.status(400).json({ error: 'Unknown action' });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
