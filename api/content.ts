import { cors, isAuthed, readJson, getFile, putFile, CONTENT_PATH, configured } from './_lib.js';

export default async function handler(req: any, res: any) {
  if (cors(req, res)) return;
  try {
    if (req.method === 'GET') {
      // Public: the site reads its content from here. 404 => site falls back to the content.json shipped with the build.
      if (!configured()) return res.status(404).json({});
      const f = await getFile(CONTENT_PATH);
      if (!f) return res.status(404).json({});
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5, stale-while-revalidate=20');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(f.text);
    }
    if (req.method === 'PUT') {
      if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });
      const body = readJson(req);
      if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Bad body' });
      // new format { content, baseSha, message }; old format = the content object itself
      const wrapped = body.content && typeof body.content === 'object' && !('PERSONAL_INFO' in body);
      const content = wrapped ? body.content : body;
      if (!content.PERSONAL_INFO) return res.status(400).json({ error: 'Content looks incomplete (PERSONAL_INFO missing)' });
      if (wrapped && body.baseSha) {
        const cur = await getFile(CONTENT_PATH);
        if (cur && cur.sha !== body.baseSha) return res.status(409).json({ error: 'conflict', sha: cur.sha });
      }
      const b64 = Buffer.from(JSON.stringify(content, null, 2), 'utf8').toString('base64');
      const sha = await putFile(CONTENT_PATH, b64, String(body.message || 'Admin: update content').slice(0, 120));
      return res.status(200).json({ ok: true, sha });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
