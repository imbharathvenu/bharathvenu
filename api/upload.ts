import crypto from 'node:crypto';
import { cors, isAuthed, readRaw, putFile } from './_lib.js';

export const config = { api: { bodyParser: false } };

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg',
};

export default async function handler(req: any, res: any) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const ext = EXT[String(req.headers['content-type'] || '').split(';')[0]];
    const buf = await readRaw(req);
    if (!ext || !buf.length) return res.status(400).json({ error: 'Unsupported image' });
    if (buf.length > 4 * 1024 * 1024) return res.status(413).json({ error: 'Max 4 MB' });
    const name = `${Date.now()}-${crypto.randomBytes(3).toString('hex')}.${ext}`;
    await putFile(`public/uploads/${name}`, buf.toString('base64'), 'Admin: upload image');
    res.status(200).json({ url: `/uploads/${name}` });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
