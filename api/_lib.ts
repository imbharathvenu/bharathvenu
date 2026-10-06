import crypto from 'node:crypto';

const secret = () => process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
const hmac = (exp: string) => crypto.createHmac('sha256', secret()).update(exp).digest('hex');
const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest();

export const passwordOk = (pw: string) => {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  return crypto.timingSafeEqual(sha256(pw), sha256(real));
};

export const signToken = () => {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  return exp + '.' + hmac(exp);
};

export const isAuthed = (req: any): boolean => {
  const t = String(req.headers.authorization || '').replace('Bearer ', '');
  const [exp, sig] = t.split('.');
  if (!exp || !sig || !secret() || Number(exp) < Date.now()) return false;
  const good = hmac(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
};

export const readJson = (req: any): any => {
  const b = req.body;
  if (typeof b === 'string') { try { return JSON.parse(b); } catch { return null; } }
  return b ?? null;
};

export const readRaw = (req: any): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

// ---- GitHub Contents API helpers (token stays on the server) ----
const repo = () => process.env.GITHUB_REPO || '';
const branch = () => process.env.GITHUB_BRANCH || 'main';
const gh = (path: string, init: any = {}) =>
  fetch(`https://api.github.com/repos/${repo()}/contents/${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-admin',
      ...(init.headers || {}),
    },
  });

export const configured = () => !!(process.env.GITHUB_TOKEN && repo() && process.env.ADMIN_PASSWORD);

export async function getFile(path: string): Promise<{ sha: string; text: string } | null> {
  const r = await gh(`${path}?ref=${branch()}`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('GitHub read failed: ' + r.status);
  const j: any = await r.json();
  return { sha: j.sha, text: Buffer.from(j.content, 'base64').toString('utf8') };
}

export async function putFile(path: string, base64: string, message: string) {
  const existing = await getFile(path);
  const r = await gh(path, {
    method: 'PUT',
    body: JSON.stringify({ message, content: base64, branch: branch(), ...(existing ? { sha: existing.sha } : {}) }),
  });
  if (!r.ok) throw new Error('GitHub write failed: ' + r.status + ' ' + (await r.text()));
}

export async function deleteFile(path: string, message: string) {
  const existing = await getFile(path);
  if (!existing) return;
  const r = await gh(path, { method: 'DELETE', body: JSON.stringify({ message, sha: existing.sha, branch: branch() }) });
  if (!r.ok) throw new Error('GitHub delete failed: ' + r.status);
}

export const CONTENT_PATH = 'public/content.json';

// Allow the GitHub Pages admin to call these functions (auth is a Bearer token header, no cookies).
export const cors = (req: any, res: any): boolean => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  return false;
};
