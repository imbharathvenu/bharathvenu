import { isAuthed, readJson, getFile, putFile, CONTENT_PATH, configured } from './_lib';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      // Public: the site reads its content from here. 404 => site uses bundled defaults.
      if (!configured()) return res.status(404).json({});
      const f = await getFile(CONTENT_PATH);
      if (!f) return res.status(404).json({});
      res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=60');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(f.text);
    }
    if (req.method === 'PUT') {
      if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });
      const body = readJson(req);
      if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Bad body' });
      const b64 = Buffer.from(JSON.stringify(body, null, 2), 'utf8').toString('base64');
      await putFile(CONTENT_PATH, b64, 'Admin: update content');
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
