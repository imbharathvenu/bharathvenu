import { setContent, defaultContent, normalizeContent } from './portfolioData';

const BASE: string = (import.meta as any).env?.BASE_URL || '/';
const CACHE_KEY = 'bv_content_cache_v1';
const CHANNEL = 'bv-content';
const PREVIEW = typeof location !== 'undefined' && new URLSearchParams(location.search).has('preview');
const ON_PAGES = typeof location !== 'undefined' && location.hostname.endsWith('github.io');

/** owner/repo for GitHub Pages: VITE_GITHUB_REPO, or guessed from https://<owner>.github.io/<repo>/ */
const pagesRepo = (): string => {
  const env = (import.meta as any).env?.VITE_GITHUB_REPO as string | undefined;
  if (env) return env;
  const owner = location.hostname.split('.')[0];
  const repo = location.pathname.split('/')[1];
  return owner && repo ? `${owner}/${repo}` : '';
};

const sources = (): string[] => {
  const out: string[] = [];
  if (ON_PAGES) {
    const repo = pagesRepo();
    const branch = ((import.meta as any).env?.VITE_GITHUB_BRANCH as string) || 'main';
    if (repo) out.push(`https://raw.githubusercontent.com/${repo}/${branch}/public/content.json`);
  } else {
    out.push('/api/content'); // Vercel function / local server (404 when not configured -> falls through)
  }
  out.push(BASE + 'content.json'); // the file shipped with the build
  return out;
};

const readCache = (): any => { try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch { return null; } };
const writeCache = (c: any) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch { /* quota / private mode */ } };

/** Latest published content, or null if no source answered. Never throws. */
export async function fetchLiveContent(): Promise<any | null> {
  for (const url of sources()) {
    try {
      const sep = url.includes('?') ? '&' : '?';
      const r = await fetch(url + sep + 't=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) continue;
      const j = await r.json();
      if (j && typeof j === 'object' && j.PERSONAL_INFO) return j;
    } catch { /* try next source */ }
  }
  return null;
}

let lastApplied = '';
const apply = (raw: any, cache = true) => {
  const n = normalizeContent(raw);
  const s = JSON.stringify(n);
  if (s === lastApplied) return false;
  lastApplied = s;
  setContent(n);
  if (cache) writeCache(n);
  return true;
};

async function refresh() {
  if (PREVIEW) return;
  const live = await fetchLiveContent();
  if (live) apply(live);
}

/** Shows something immediately (cache, else the bundled content) and fetches fresh content in the background. */
export async function bootContent(): Promise<void> {
  const cached = PREVIEW ? null : readCache();
  apply(cached && cached.PERSONAL_INFO ? cached : defaultContent(), false);
  if (!PREVIEW) void refresh();
}

/** Keeps an open page current: other tabs, the admin preview iframe, tab focus and a slow poll. */
export function startLiveSync() {
  if (PREVIEW) {
    addEventListener('message', (e: MessageEvent) => {
      if (e.origin !== location.origin) return;
      if (e.data?.type === 'bv-draft' && e.data.content) apply(e.data.content, false);
    });
    parent?.postMessage({ type: 'bv-preview-ready' }, location.origin);
    return;
  }
  try { new BroadcastChannel(CHANNEL).onmessage = () => void refresh(); } catch { /* unsupported */ }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') void refresh(); });
  setInterval(() => { if (document.visibilityState === 'visible') void refresh(); }, 60000);
}

/** Tells other open tabs of this site that content was just saved. */
export function pingSiteTabs() {
  try { const c = new BroadcastChannel(CHANNEL); c.postMessage('changed'); c.close(); } catch { /* unsupported */ }
}
