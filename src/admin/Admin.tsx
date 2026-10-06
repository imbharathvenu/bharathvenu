import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultContent, normalizeContent } from '../data/portfolioData';
import { fetchLiveContent, pingSiteTabs } from '../data/runtime';
import { THEME_GROUPS } from '../data/theme';
import { ApiError, BASE, STATIC, apiBase, call, clearAuth, hasToken, setApiBase, TOKEN } from './api';
import { Field, btn, inp, primaryBtn, useDebounced } from './fields';
import { SectionsEditor, ThemeEditor } from './ThemeEditor';
import { StoragePanel } from './StoragePanel';

type J = any;
type Block = { title: string; path: string; only?: string[]; note?: string };
type Page = { id: string; label: string; icon: string; group: string; blocks?: Block[] };

const PAGES: Page[] = [
  { id: 'hero', label: 'Hero & name', icon: '🏠', group: 'Content', blocks: [
    { title: 'Name, job title & tagline', path: 'PERSONAL_INFO', only: ['name', 'title', 'tagline', 'hubCoordinates'], note: 'The name and title appear in the navbar, hero, footer and CV. Use "|" in the title to split it into two lines.' },
    { title: 'Hero text & buttons', path: 'SITE.hero' }, { title: 'Hero image', path: 'IMAGES', only: ['hero'] } ] },
  { id: 'contact', label: 'Contact details', icon: '📞', group: 'Content', blocks: [
    { title: 'Phone, email, links', path: 'PERSONAL_INFO', only: ['phone', 'email', 'linkedin', 'linkedinDisplay', 'location'] }, { title: 'Contact section text', path: 'SITE.contact' } ] },
  { id: 'profile', label: 'Profile', icon: '👤', group: 'Content', blocks: [
    { title: 'Summary', path: 'PERSONAL_INFO', only: ['summary'] }, { title: 'Profile section', path: 'SITE.profile' }, { title: 'Domain tags', path: 'PROFILE_TAGS' } ] },
  { id: 'strip', label: 'Sea · Land · Air', icon: '🚢', group: 'Content', blocks: [{ title: 'Strip panels', path: 'SITE.strip' }] },
  { id: 'operations', label: 'Areas of expertise', icon: '📦', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.operations' }, { title: 'Expertise cards', path: 'CAPABILITIES_BOARD' }] },
  { id: 'experience', label: 'Experience', icon: '💼', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.experience' }, { title: 'Jobs', path: 'EXPERIENCES' }] },
  { id: 'flow', label: 'Operational flow', icon: '🔄', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.flow' }, { title: 'Steps (numbered automatically)', path: 'FLOW_STEPS' }] },
  { id: 'banner', label: 'Manifesto banner', icon: '🖼️', group: 'Content', blocks: [{ title: 'Banner', path: 'SITE.banner' }] },
  { id: 'skills', label: 'Skills', icon: '🛠️', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.skills' }, { title: 'Capability tiles', path: 'SKILL_GRID' }, { title: 'Skill lists', path: 'SKILL_CATEGORIES' }] },
  { id: 'education', label: 'Education', icon: '🎓', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.education' }, { title: 'Qualifications', path: 'EDUCATION' }] },
  { id: 'leadership', label: 'Leadership & languages', icon: '🥋', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.leadership' }, { title: 'Leadership cards', path: 'LEADERSHIP' }, { title: 'Languages', path: 'LANGUAGES' }] },
  { id: 'career', label: 'Career focus', icon: '🎯', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.career' }, { title: 'Target roles (also the contact-form role list)', path: 'CAREER_TARGETS' }] },
  { id: 'gallery', label: 'Gallery', icon: '📷', group: 'Content', blocks: [{ title: 'Section text', path: 'SITE.gallery' }, { title: 'Photos', path: 'GALLERY_ITEMS' }] },
  { id: 'footer', label: 'Menu, footer & CV', icon: '🧾', group: 'Content', blocks: [{ title: 'Menu labels', path: 'SITE.nav' }, { title: 'Footer', path: 'SITE.footer' }, { title: 'CV (print view)', path: 'SITE.resume' }] },
  { id: 'sections', label: 'Sections & order', icon: '🧩', group: 'Design' },
  ...THEME_GROUPS.map((g) => ({ id: 'theme-' + g.id, label: g.label, icon: ({ colors: '🎨', fonts: '🔤', layout: '📐', effects: '✨' } as any)[g.id], group: 'Design' })),
  { id: 'storage', label: 'GitHub & backups', icon: '☁️', group: 'Storage' },
];

const getPath = (o: J, p: string) => p.split('.').reduce((a, k) => a?.[k], o);
const setPath = (o: J, p: string, v: J): J => { const [h, ...t] = p.split('.'); return { ...o, [h]: t.length ? setPath(o[h] ?? {}, t.join('.'), v) : v }; };
const same = (a: J, b: J) => JSON.stringify(a) === JSON.stringify(b);
const DRAFT = 'bv_admin_draft';

export default function Admin() {
  const [authed, setAuthed] = useState(hasToken());
  const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [site, setSite] = useState(apiBase()); const [askSite, setAskSite] = useState(false);
  const [data, setData] = useState<J>(null);
  const [saved, setSaved] = useState<J>(null);           // last content known to be in storage
  const [sha, setSha] = useState<string | null>(null);
  const [page, setPage] = useState('hero');
  const [msg, setMsg] = useState<{ t: string; kind: 'ok' | 'err' | 'info' } | null>(null);
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [live, setLive] = useState<'' | 'waiting' | 'live' | 'slow'>('');
  const [preview, setPreview] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'phone'>('desktop');
  const [draftOffer, setDraftOffer] = useState<J>(null);
  const past = useRef<J[]>([]); const lastPush = useRef(0);
  const frame = useRef<HTMLIFrameElement>(null);
  const dirty = !!data && !!saved && !same(data, saved);

  const flash = (t: string, kind: 'ok' | 'err' | 'info' = 'ok', ms = 4500) => { setMsg({ t, kind }); if (ms) setTimeout(() => setMsg((m) => (m?.t === t ? null : m)), ms); };
  const fail = (e: any) => { if (e instanceof ApiError && e.status === 401) { setAuthed(false); } flash(e.message || String(e), 'err', 8000); };

  // ---- load: always the real latest from storage, never a cached copy ----
  const load = useCallback(async () => {
    let content: J = null, s: string | null = null;
    try { const j = await call<any>('/api/admin?action=load'); content = j.content; s = j.sha; }
    catch (e: any) { if (e.status === 401) { setAuthed(false); return; } /* not configured yet: fall through */ }
    if (!content) content = (await fetchLiveContent()) || defaultContent();
    const n = normalizeContent(content);
    setData(n); setSaved(n); setSha(s); past.current = [];
    try { const d = JSON.parse(localStorage.getItem(DRAFT) || 'null'); if (d && !same(normalizeContent(d.data), n)) setDraftOffer(d); } catch { /* ignore */ }
  }, []);
  useEffect(() => { if (authed) load(); }, [authed, load]);

  // ---- editing (with undo + draft autosave) ----
  const update = useCallback((next: J, coalesce = true) => {
    setData((cur: J) => {
      const now = Date.now();
      if (!coalesce || now - lastPush.current > 800) { past.current.push(cur); if (past.current.length > 40) past.current.shift(); }
      lastPush.current = now;
      return next(cur);
    });
  }, []);
  const undo = () => { const p = past.current.pop(); if (p) setData(p); };
  const edit = (path: string, v: J) => update((cur: J) => {
    let n = setPath(cur, path, v);
    if (path === 'FLOW_STEPS') n = { ...n, FLOW_STEPS: v.map((s: J, i: number) => ({ ...s, step: i + 1 })) };
    return n;
  });
  const debouncedData = useDebounced(data, 600);
  useEffect(() => {
    if (!debouncedData || !saved) return;
    try { dirty ? localStorage.setItem(DRAFT, JSON.stringify({ data: debouncedData, at: Date.now() })) : localStorage.removeItem(DRAFT); } catch { /* quota */ }
  }, [debouncedData, dirty, saved]);
  useEffect(() => { const h = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); }; addEventListener('beforeunload', h); return () => removeEventListener('beforeunload', h); }, [dirty]);

  // ---- live preview (instant, no save needed) ----
  const send = useCallback(() => { if (data) frame.current?.contentWindow?.postMessage({ type: 'bv-draft', content: data }, location.origin); }, [data]);
  useEffect(() => { if (preview) send(); }, [preview, send]);
  useEffect(() => { const h = (e: MessageEvent) => { if (e.data?.type === 'bv-preview-ready') send(); }; addEventListener('message', h); return () => removeEventListener('message', h); }, [send]);

  // ---- save ----
  const watchLive = async (content: J) => {
    setLive('waiting');
    const want = JSON.stringify(normalizeContent(content));
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 4000));
      const got = await fetchLiveContent().catch(() => null);
      if (got && JSON.stringify(normalizeContent(got)) === want) { setLive('live'); return; }
    }
    setLive('slow');
  };
  const save = async (force = false) => {
    if (!data || saving) return;
    setSaving(true); setConflict(false);
    try {
      const r = await call<any>('/api/content', { method: 'PUT', json: { content: data, baseSha: force ? undefined : sha || undefined, message: 'Admin: update content' } });
      setSaved(data); setSha(r.sha || null); localStorage.removeItem(DRAFT); pingSiteTabs();
      flash('Saved ✓'); watchLive(data);
    } catch (e: any) {
      if (e.status === 409) setConflict(true); else fail(e);
    }
    setSaving(false);
  };
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (dirty) save(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !(e.target as HTMLElement)?.matches?.('input,textarea')) { e.preventDefault(); undo(); }
    };
    addEventListener('keydown', h); return () => removeEventListener('keydown', h);
  });

  const login = async () => {
    if (STATIC && site.trim()) setApiBase(site);
    let r: Response;
    try { r = await fetch(apiBase() + '/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) }); }
    catch { setAskSite(true); return setErr('Could not reach your server — check the address below'); }
    if (r.status === 404 || r.status === 405) { setAskSite(true); return setErr('Could not find the admin server — enter its address below'); }
    if (r.status === 500) return setErr('Server is not configured yet (ADMIN_PASSWORD / GITHUB_TOKEN / GITHUB_REPO)');
    if (!r.ok) return setErr('Incorrect password');
    localStorage.setItem(TOKEN, (await r.json()).token); setErr(''); setAuthed(true);
  };

  const cur = PAGES.find((p) => p.id === page)!;
  const groups = useMemo(() => ['Content', 'Design', 'Storage'].map((g) => ({ g, items: PAGES.filter((p) => p.group === g) })), []);

  if (!authed)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#081F26] p-6 text-[#F4F2EB]">
        <div className="w-full max-w-sm border border-[#236477]/60 bg-[#102932] p-8 space-y-4 rounded-sm">
          <div className="text-[10px] tracking-[0.3em] text-[#E8892B]">PORTFOLIO / ADMIN</div>
          <h1 className="font-heading text-2xl font-bold">Sign in</h1>
          {STATIC && askSite && <input className={inp} placeholder="Server address (e.g. bharathvenu.vercel.app)" value={site} onChange={(e) => setSite(e.target.value)} />}
          <input type="password" className={inp} placeholder="Admin password" value={pw} autoFocus onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} />
          {err && <div className="text-red-400 text-sm">{err}</div>}
          <button className={primaryBtn + ' w-full !py-3'} onClick={login}>Enter</button>
        </div>
      </div>
    );
  if (!data) return <div className="min-h-screen bg-[#081F26] p-10 text-[#7DAFB9]">Loading latest content…</div>;

  const width = { desktop: '100%', tablet: '768px', phone: '390px' }[device];
  const isTheme = page.startsWith('theme-');

  return (
    <div className="min-h-screen bg-[#081F26] text-[#F4F2EB] md:flex" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <aside className="md:w-60 md:min-h-screen shrink-0 border-b md:border-b-0 md:border-r border-[#236477]/40 bg-[#102932] p-3 md:sticky md:top-0 md:h-screen overflow-auto">
        <div className="text-[10px] tracking-[0.3em] text-[#E8892B] mb-3 px-2">PORTFOLIO / ADMIN</div>
        {groups.map(({ g, items }) => (
          <div key={g} className="mb-3">
            <div className="text-[10px] tracking-widest text-[#7DAFB9]/70 px-2 mb-1 hidden md:block">{g.toUpperCase()}</div>
            <nav className="flex md:block gap-1 overflow-x-auto">
              {items.map((p) => (
                <button key={p.id} onClick={() => setPage(p.id)} className={'block whitespace-nowrap text-left w-full px-3 py-1.5 text-sm rounded-sm border-l-2 cursor-pointer ' + (page === p.id ? 'border-[#E8892B] bg-[#063F4B] text-white' : 'border-transparent text-[#ADB8BD] hover:text-white')}>
                  <span className="mr-2">{p.icon}</span>{p.label}
                </button>
              ))}
            </nav>
          </div>
        ))}
        <div className="hidden md:block mt-4 space-y-2">
          <a href={BASE} target="_blank" rel="noreferrer" className={btn + ' block text-center'}>View site ↗</a>
          <button className={btn + ' w-full'} onClick={() => { if (!dirty || confirm('You have unsaved changes. Log out anyway?')) { clearAuth(); setAuthed(false); } }}>Log out</button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3 bg-[#081F26]/95 backdrop-blur border-b border-[#236477]/40">
          <h2 className="font-heading font-bold text-lg">{cur.icon} {cur.label}</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={'text-xs ' + (msg?.kind === 'err' ? 'text-red-300' : 'text-[#7DAFB9]')}>
              {msg?.t || (saving ? 'Saving…' : dirty ? '● Unsaved changes' : live === 'waiting' ? 'Saved — waiting to go live…' : live === 'live' ? '✓ Live on your site' : live === 'slow' ? 'Saved — site still rebuilding, check again shortly' : '✓ Up to date')}
            </span>
            <button className={btn} onClick={undo} disabled={!past.current.length} title="Ctrl+Z">Undo</button>
            {dirty && <button className={btn} onClick={() => confirm('Discard all unsaved changes?') && setData(saved)}>Discard</button>}
            <button className={btn + (preview ? ' !border-[#E8892B] !text-[#E8892B]' : '')} onClick={() => setPreview(!preview)}>Live preview</button>
            <button onClick={() => save()} disabled={!dirty || saving} className={primaryBtn} title="Ctrl+S">{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>

        {draftOffer && (
          <div className="mx-4 md:mx-6 mt-4 p-3 border border-amber-400/50 bg-amber-400/10 text-sm flex flex-wrap items-center gap-3 rounded-sm">
            <span className="flex-1">Unsaved edits from {new Date(draftOffer.at).toLocaleString()} were found in this browser.</span>
            <button className={btn} onClick={() => { setData(normalizeContent(draftOffer.data)); setDraftOffer(null); }}>Restore</button>
            <button className={btn} onClick={() => { localStorage.removeItem(DRAFT); setDraftOffer(null); }}>Discard</button>
          </div>
        )}
        {conflict && (
          <div className="mx-4 md:mx-6 mt-4 p-3 border border-red-400/50 bg-red-400/10 text-sm flex flex-wrap items-center gap-3 rounded-sm">
            <span className="flex-1">The saved content changed since you opened the editor (another tab, device or a direct GitHub edit).</span>
            <button className={btn} onClick={() => save(true)}>Overwrite with mine</button>
            <button className={btn} onClick={() => { if (confirm('Reload the latest and lose your unsaved edits?')) { localStorage.removeItem(DRAFT); setConflict(false); load(); } }}>Reload latest</button>
          </div>
        )}

        <div className={'flex-1 min-h-0 ' + (preview ? 'xl:grid xl:grid-cols-2' : '')}>
          <div className="p-4 md:p-6 max-w-3xl w-full space-y-8">
            {cur.blocks?.map((b) => (
              <section key={b.title}>
                <h3 className="font-heading font-bold mb-1">{b.title}</h3>
                {b.note && <p className="text-xs text-[#ADB8BD] mb-3">{b.note}</p>}
                <Field key={page + b.path} name={b.path.split('.').pop()!} v={getPath(data, b.path)} path={b.path} only={b.only} set={(x) => edit(b.path, x)} />
              </section>
            ))}
            {page === 'sections' && <SectionsEditor sections={data.SECTIONS} setSections={(s) => edit('SECTIONS', s)} />}
            {isTheme && <ThemeEditor group={page.slice(6)} theme={data.THEME} setTheme={(t) => edit('THEME', t)} />}
            {page === 'storage' && <StoragePanel data={data} sha={sha} onLoadDraft={(c, note) => { update(() => c, false); setPage('hero'); flash(note, 'info', 9000); }} />}
          </div>

          {preview && (
            <div className="hidden xl:flex flex-col border-l border-[#236477]/40 bg-[#0c262e] sticky top-[57px] h-[calc(100vh-57px)]">
              <div className="flex items-center gap-2 p-2 border-b border-[#236477]/30 text-xs">
                <span className="text-[#7DAFB9] flex-1">LIVE PREVIEW — shows unsaved edits</span>
                {(['desktop', 'tablet', 'phone'] as const).map((d) => <button key={d} className={btn + (device === d ? ' !border-[#E8892B] !text-[#E8892B]' : '')} onClick={() => setDevice(d)}>{d}</button>)}
              </div>
              <div className="flex-1 overflow-auto flex justify-center p-2">
                <iframe ref={frame} title="preview" src={BASE + '?preview=1'} onLoad={send} style={{ width, maxWidth: '100%' }} className="h-full bg-white border border-[#236477]/40 rounded-sm transition-all" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
