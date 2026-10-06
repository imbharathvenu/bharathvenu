import { cors, isAuthed, deleteFile, CONTENT_PATH } from '../_lib.js';

export default async function handler(req: any, res: any) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    await deleteFile(CONTENT_PATH, 'Admin: reset content to defaults');
    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
