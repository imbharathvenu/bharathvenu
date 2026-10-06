import { useEffect, useState } from 'react';
import * as D from '../data/portfolioData';

type J = any;
const T = 'bv_admin_token';
const defaults = (): J => JSON.parse(JSON.stringify(Object.fromEntries(D.CONTENT_KEYS.map((k) => [k, (D as any)[k]]))));
const hdr = (extra: Record<string, string> = {}) => ({ ...extra, Authorization: 'Bearer ' + (localStorage.getItem(T) || '') });

// ---- On GitHub Pages the admin talks to the Vercel functions (same admin password) ----
const STATIC = location.hostname.endsWith('github.io') || new URLSearchParams(location.search).has('static');
const BASE: string = (import.meta as any).env?.BASE_URL ?? '/';
const GA = 'bv_api_url';
const API = () => (STATIC ? localStorage.getItem(GA) || '' : '');
const clearAuth = () => localStorage.removeItem(T);

const LABELS: Record<string, string> = {
  PERSONAL_INFO: 'Personal & Contact', PROFILE_TAGS: 'Profile Tags', IMAGES: 'Core Images',
  CAPABILITIES_BOARD: 'Capabilities Board', EXPERIENCES: 'Experience', FLOW_STEPS: 'Operational Flow',
  SKILL_CATEGORIES: 'Skills', EDUCATION: 'Education', LEADERSHIP: 'Leadership',
  LANGUAGES: 'Languages', CAREER_TARGETS: 'Career Focus', GALLERY_ITEMS: 'Gallery',
};
const LONG = ['summary', 'description', 'desc', 'sop', 'caption', 'shortDesc', 'tagline', 'highlight', 'detailedScope'];

const blank = (v: J): J =>
  Array.isArray(v) ? (v.length ? [blank(v[0])] : []) :
  v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) :
  typeof v === 'number' ? 0 : typeof v === 'boolean' ? false : '';

const inp = 'w-full bg-[#081F26] border border-[#236477]/60 text-[#F4F2EB] px-3 py-2 text-sm focus:outline-none focus:border-[#E8892B]';
const btn = 'px-3 py-1.5 text-xs font-bold tracking-widest uppercase border border-[#236477] hover:border-[#E8892B] hover:text-[#E8892B] transition-colors';

function Upload({ onDone }: { onDone: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className={btn + ' cursor-pointer inline-block'}>
      {busy ? 'Uploading…' : 'Upload'}
      <input type="file" accept="image/*" hidden onChange={async (e) => {
        const f = e.target.files?.[0]; if (!f) return;
        setBusy(true);
        const r = await fetch(API() + '/api/upload', { method: 'POST', headers: hdr({ 'Content-Type': f.type }), body: f });
        setBusy(false);
        r.ok ? onDone(STATIC ? BASE + (await r.json()).url.replace(/^\//, '') : (await r.json()).url) : alert('Upload failed (max 4 MB, JPG/PNG/WEBP/GIF/SVG)');
      }} />
    </label>
  );
}

function Field({ name, v, set, path }: { name: string; v: J; set: (x: J) => void; path: string }) {
  if (Array.isArray(v)) {
    const prim = v.length === 0 || typeof v[0] !== 'object';
    const move = (i: number, d: number) => { const a = [...v]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; set(a); };
    return (
      <div className="space-y-3">
        {v.map((it, i) => (
          <div key={i} className={prim ? 'flex gap-2' : 'border border-[#236477]/50 p-4 bg-[#102932]/60'}>
            <div className={prim ? 'flex-1' : ''}>
              {!prim && <div className="flex items-center justify-between mb-3 text-[10px] tracking-widest text-[#7DAFB9]">
                <span>ITEM {String(i + 1).padStart(2, '0')}{it.title || it.company || it.name || it.degree ? ' — ' + (it.title || it.company || it.name || it.degree) : ''}</span>
              </div>}
              <Field name={name} v={it} path={path} set={(x) => set(v.map((o, j) => (j === i ? x : o)))} />
            </div>
            <div className={'flex gap-1 ' + (prim ? '' : 'mt-3')}>
              <button className={btn} onClick={() => move(i, -1)}>↑</button>
              <button className={btn} onClick={() => move(i, 1)}>↓</button>
              <button className={btn + ' hover:!border-red-400 hover:!text-red-400'} onClick={() => confirm('Remove this item?') && set(v.filter((_, j) => j !== i))}>✕</button>
            </div>
          </div>
        ))}
        <button className={btn} onClick={() => set([...v, prim ? '' : blank(v[0])])}>+ Add</button>
      </div>
    );
  }
  if (v && typeof v === 'object')
    return (
      <div className="space-y-4">
        {Object.entries(v).map(([k, x]) => (
          <div key={k}>
            <div className="text-[10px] tracking-widest uppercase text-[#7DAFB9] mb-1">{k}</div>
            <Field name={k} v={x} path={path + '.' + k} set={(n) => set({ ...v, [k]: n })} />
          </div>
        ))}
      </div>
    );
  const isImg = name === 'image' || path.startsWith('IMAGES.');
  if (typeof v === 'boolean')
    return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={v} onChange={(e) => set(e.target.checked)} /> Enabled</label>;
  if (isImg)
    return (
      <div className="flex gap-3 items-start">
        {v && <img src={v} alt="" className="w-28 h-20 object-cover border border-[#236477]/60" />}
        <div className="flex-1 space-y-2"><input className={inp} value={v} onChange={(e) => set(e.target.value)} placeholder="/images/… or /uploads/…" /><Upload onDone={set} /></div>
      </div>
    );
  if (typeof v === 'number') return <input type="number" className={inp} value={v} onChange={(e) => set(Number(e.target.value))} />;
  return LONG.includes(name) || String(v).length > 90
    ? <textarea className={inp + ' min-h-24'} value={v} onChange={(e) => set(e.target.value)} />
    : <input className={inp} value={v} onChange={(e) => set(e.target.value)} />;
}

export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem(T) && (!STATIC || !!API()));
  const [site, setSite] = useState(localStorage.getItem(GA) || '');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [data, setData] = useState<J>(null);
  const [tab, setTab] = useState('');
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!authed) return;
    const done = (d: J) => { setData(d); setTab(Object.keys(d)[0]); };
    fetch(API() + '/api/content').then((r) => (r.ok ? r.json() : defaults())).catch(() => defaults()).then(done);
  }, [authed]);
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => dirty && e.preventDefault();
    addEventListener('beforeunload', h); return () => removeEventListener('beforeunload', h);
  }, [dirty]);

  const login = async () => {
    if (STATIC) {
      let u = site.trim().replace(/\/+$/, '').replace(/\/admin$/, '');
      if (!u) return setErr('Enter your Vercel site address');
      if (!/^https?:\/\//.test(u)) u = 'https://' + u;
      localStorage.setItem(GA, u);
    }
    let r: Response;
    try { r = await fetch(API() + '/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) }); }
    catch { return setErr('Cannot reach the Vercel site — check the address'); }
    if (!r.ok) return setErr('Incorrect password');
    localStorage.setItem(T, (await r.json()).token); setAuthed(true);
  };
  const save = async () => {
    const r = await fetch(API() + '/api/content', { method: 'PUT', headers: hdr({ 'Content-Type': 'application/json' }), body: JSON.stringify(data) });
    if (r.status === 401) { clearAuth(); return setAuthed(false); }
    setDirty(false); setMsg(r.ok ? (STATIC ? 'Saved — site rebuilds, live in ~1–2 min' : 'Saved — live in ~30 seconds') : 'Save failed'); setTimeout(() => setMsg(''), 3000);
  };
  const reset = async () => {
    if (!confirm('Reset ALL content to the original defaults? This cannot be undone.')) return;
    const r = await fetch(API() + '/api/content/reset', { method: 'POST', headers: hdr() });
    if (r.ok) { setData(defaults()); setDirty(false); }
  };

  if (!authed)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081F26] p-6">
        <div className="w-full max-w-sm border border-[#236477]/60 bg-[#102932] p-8 space-y-4">
          <div className="text-[10px] tracking-[0.3em] text-[#E8892B]">BV / CONTENT ADMIN</div>
          <h1 className="font-heading text-2xl font-bold">Sign in</h1>
          {STATIC && <input className={inp} placeholder="Vercel site address (e.g. bharathvenu.vercel.app)" value={site} onChange={(e) => setSite(e.target.value)} />}
          <input type="password" className={inp} placeholder="Admin password" value={pw} autoFocus
            onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} />
          {err && <div className="text-red-400 text-sm">{err}</div>}
          <button className={btn + ' w-full !py-3'} onClick={login}>Enter</button>
        </div>
      </div>
    );
  if (!data) return <div className="p-10 text-[#7DAFB9]">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#081F26] md:flex">
      <aside className="md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-[#236477]/40 bg-[#102932] p-4 md:sticky md:top-0 md:h-screen overflow-auto">
        <div className="text-[10px] tracking-[0.3em] text-[#E8892B] mb-4">BV / CONTENT ADMIN</div>
        <nav className="flex md:block gap-1 overflow-x-auto">
          {Object.keys(data).map((k) => (
            <button key={k} onClick={() => setTab(k)}
              className={'block whitespace-nowrap text-left w-full px-3 py-2 text-sm border-l-2 ' + (tab === k ? 'border-[#E8892B] bg-[#063F4B] text-white' : 'border-transparent text-[#ADB8BD] hover:text-white')}>
              {LABELS[k] || k}
            </button>
          ))}
        </nav>
        <div className="hidden md:block mt-6 space-y-2">
          <a href="/" target="_blank" className={btn + ' block text-center'}>View site ↗</a>
          <button className={btn + ' w-full'} onClick={reset}>Reset defaults</button>
          <button className={btn + ' w-full'} onClick={() => { clearAuth(); setAuthed(false); }}>Log out</button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-3 bg-[#081F26]/95 backdrop-blur border-b border-[#236477]/40">
          <h2 className="font-heading font-bold text-lg">{LABELS[tab] || tab}</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#7DAFB9]">{msg || (dirty ? 'Unsaved changes' : '')}</span>
            <button onClick={save} disabled={!dirty} className="px-5 py-2 text-xs font-bold tracking-widest uppercase bg-[#E8892B] text-[#081F26] disabled:opacity-30">Save</button>
          </div>
        </div>
        <div className="p-6 max-w-4xl">
          <Field key={tab} name={tab} v={data[tab]} path={tab} set={(x) => { setData({ ...data, [tab]: x }); setDirty(true); }} />
        </div>
      </main>
    </div>
  );
}
