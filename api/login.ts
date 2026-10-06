import { passwordOk, signToken, readJson, configured } from './_lib';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!configured()) return res.status(500).json({ error: 'Server not configured' });
  const body = readJson(req);
  if (!passwordOk(String(body?.password ?? ''))) return res.status(401).json({ error: 'Wrong password' });
  res.status(200).json({ token: signToken() });
}
