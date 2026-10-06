import { relPath } from '../data/portfolioData';

export const TOKEN = 'bv_admin_token';
export const API_KEY = 'bv_api_url';
export const BASE: string = (import.meta as any).env?.BASE_URL ?? '/';

// On GitHub Pages the admin talks to the Vercel functions (same admin password).
export const STATIC = location.hostname.endsWith('github.io') || new URLSearchParams(location.search).has('static');
const GUESS = 'https://' + (location.pathname.split('/')[1] || '').replace(/^admin$/, '') + '.vercel.app';
export const apiBase = () => (STATIC ? localStorage.getItem(API_KEY) || GUESS : '');
export const setApiBase = (u: string) => {
  let v = u.trim().replace(/\/+$/, '').replace(/\/admin$/, '');
  if (v && !/^https?:\/\//.test(v)) v = 'https://' + v;
  localStorage.setItem(API_KEY, v);
};
export const hasToken = () => !!localStorage.getItem(TOKEN);
export const clearAuth = () => localStorage.removeItem(TOKEN);

export class ApiError extends Error { constructor(public status: number, msg: string, public body?: any) { super(msg); } }

export async function call<T = any>(path: string, init: RequestInit & { json?: any } = {}): Promise<T> {
  const headers: Record<string, string> = { ...(init.headers as any), Authorization: 'Bearer ' + (localStorage.getItem(TOKEN) || '') };
  let body = init.body;
  if (init.json !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(init.json); }
  let r: Response;
  try { r = await fetch(apiBase() + path, { ...init, headers, body }); }
  catch { throw new ApiError(0, 'Could not reach the server'); }
  let data: any = null;
  try { data = await r.json(); } catch { /* empty */ }
  if (r.status === 401) { clearAuth(); throw new ApiError(401, 'Session expired — sign in again'); }
  if (!r.ok) throw new ApiError(r.status, data?.error || 'Request failed (' + r.status + ')', data);
  return data as T;
}

/** Shrink big photos before upload (hosting limits bodies to ~4 MB and big images slow the site). */
export async function compressImage(file: File, maxSide = 1920): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob: Blob | null = await new Promise((res) => c.toBlob(res, 'image/webp', 0.86));
    return blob && blob.size < file.size ? blob : file;
  } catch { return file; }
}

/** Uploads an image and returns the relative path to store (e.g. "uploads/123-abc.webp"). */
export async function uploadImage(file: File): Promise<string> {
  const blob = await compressImage(file);
  const j = await call<{ url: string }>('/api/upload', { method: 'POST', headers: { 'Content-Type': blob.type || file.type }, body: blob });
  return relPath(j.url);
}

export const download = (name: string, text: string) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};
