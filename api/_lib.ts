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
  if (j.content && j.encoding === 'base64') return { sha: j.sha, text: Buffer.from(j.content, 'base64').toString('utf8') };
  const raw = await gh(`${path}?ref=${branch()}`, { headers: { Accept: 'application/vnd.github.raw+json' } });
  return { sha: j.sha, text: await raw.text() };
}

export async function putFile(path: string, base64: string, message: string): Promise<string> {
  for (let attempt = 0; ; attempt++) {
    const existing = await getFile(path);
    const r = await gh(path, {
      method: 'PUT',
      body: JSON.stringify({ message, content: base64, branch: branch(), ...(existing ? { sha: existing.sha } : {}) }),
    });
    if (r.ok) return ((await r.json()) as any).content?.sha || '';
    if (attempt < 1 && (r.status === 409 || r.status === 422)) continue; // sha raced with another commit: retry once
    throw new Error('GitHub write failed: ' + r.status + ' ' + (await r.text()));
  }
}

// ---- extras used by the admin "GitHub storage" panel ----
const ghRepo = (suffix: string, init: any = {}) =>
  fetch(`https://api.github.com/repos/${repo()}${suffix}`, {
    ...init,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'portfolio-admin', ...(init.headers || {}) },
  });
export const repoName = repo;
export const branchName = branch;
export async function repoStatus() {
  const r = await ghRepo('');
  const j: any = r.ok ? await r.json() : {};
  const rl: any = await fetch('https://api.github.com/rate_limit', { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'User-Agent': 'portfolio-admin' } }).then((x) => x.json()).catch(() => ({}));
  return { ok: r.ok, httpStatus: r.status, canWrite: !!j.permissions?.push, private: !!j.private, defaultBranch: j.default_branch, rateRemaining: rl?.resources?.core?.remaining, rateLimit: rl?.resources?.core?.limit };
}
export async function commitsFor(path: string, n = 25) {
  const r = await ghRepo(`/commits?path=${encodeURIComponent(path)}&sha=${branch()}&per_page=${n}`);
  if (!r.ok) throw new Error('GitHub history failed: ' + r.status);
  return ((await r.json()) as any[]).map((c) => ({ sha: c.sha, message: String(c.commit.message).split('\n')[0], date: c.commit.author?.date, author: c.commit.author?.name, url: c.html_url }));
}
export async function fileAt(path: string, ref: string): Promise<string | null> {
  const r = await gh(`${path}?ref=${encodeURIComponent(ref)}`, { headers: { Accept: 'application/vnd.github.raw+json' } });
  return r.ok ? await r.text() : null;
}
export async function listDir(dir: string) {
  const r = await gh(`${dir}?ref=${branch()}`);
  if (r.status === 404) return [];
  if (!r.ok) throw new Error('GitHub list failed: ' + r.status);
  return ((await r.json()) as any[]).filter((f) => f.type === 'file').map((f) => ({ name: f.name, size: f.size, sha: f.sha }));
}
export async function rawBytes(path: string): Promise<Buffer | null> {
  const r = await gh(`${path}?ref=${branch()}`, { headers: { Accept: 'application/vnd.github.raw+json' } });
  return r.ok ? Buffer.from(await r.arrayBuffer()) : null;
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  return false;
};
