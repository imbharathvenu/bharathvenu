import { useEffect, useState } from 'react';
import { asset, GALLERY_SIZES } from '../data/portfolioData';
import { ICON_NAMES } from '../components/ui';
import { call, uploadImage } from './api';

type J = any;
export const inp = 'w-full bg-[#081F26] border border-[#236477]/60 text-[#F4F2EB] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#E8892B]';
export const btn = 'px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase border border-[#236477] rounded-sm hover:border-[#E8892B] hover:text-[#E8892B] transition-colors disabled:opacity-40 cursor-pointer';
export const primaryBtn = 'px-5 py-2 text-xs font-bold tracking-widest uppercase bg-[#E8892B] text-[#081F26] rounded-sm disabled:opacity-30 cursor-pointer hover:bg-white transition-colors';

const HIDDEN = new Set(['id', 'step', 'numbered']);
const LONG = ['summary', 'description', 'desc', 'sop', 'caption', 'shortDesc', 'tagline', 'highlight', 'body', 'text', 'intro', 'title', 'successText', 'messagePlaceholder'];
const HINTS: Record<string, string> = {
  title: 'Press Enter to split a heading across lines — each line gets the next accent colour.',
  formEndpoint: 'Optional. Paste a Formspree (or similar) URL so the contact form sends silently. Empty = opens the visitor\'s email app.',
  icon: 'Pick an icon', span: 'Tile size in the gallery grid',
  isCurrent: 'Shows the "current posting" badge', isSafetyCritical: 'Shows the safety-critical badge',
  highlight: 'Show in accent colour', featured: 'Show as a dark highlighted tile',
};
const SELECTS: Record<string, string[]> = { icon: ICON_NAMES, category_leadership: ['Athletics', 'Martial Arts', 'Cadet Corps'] };

export const humanize = (k: string) => k.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^./, (c) => c.toUpperCase());
const summaryOf = (it: J): string => (it && typeof it === 'object' ? it.title || it.company || it.name || it.degree || it.category || it.label || it.mode || it.value || '' : String(it));
const uid = () => 'item-' + Math.random().toString(36).slice(2, 8);

export const blank = (v: J, key = ''): J =>
  Array.isArray(v) ? (v.length ? [blank(v[0])] : []) :
  v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'id' ? uid() : blank(x, k)])) :
  typeof v === 'number' ? 0 : typeof v === 'boolean' ? false : '';
const fresh = (v: J): J => JSON.parse(JSON.stringify(v), (k, x) => (k === 'id' ? uid() : x));

export function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [lib, setLib] = useState<null | { name: string }[]>(null);
  const [err, setErr] = useState('');
  const BUILT_IN = ['hero_warehouse_ops_1791224619571.jpg', 'sea_cargo_vessel_1791224631554.jpg', 'land_freight_terminal_1791224641369.jpg', 'air_cargo_freighter_1791224651845.jpg', 'ops_forklift_racks_1791224664597.jpg', 'safety_industrial_depot_1791224676939.jpg'];
  const openLib = async () => {
    setErr('');
    try { setLib((await call<any>('/api/admin?action=uploads')).files); } catch (e: any) { setLib([]); setErr(e.message); }
  };
  return (
    <div className="flex gap-3 items-start">
      {value && <img src={asset(value)} alt="" className="w-28 h-20 object-cover border border-[#236477]/60 rounded-sm bg-[#102932]" />}
      <div className="flex-1 space-y-2 min-w-0">
        <input className={inp} value={value} onChange={(e) => onChange(e.target.value)} placeholder="images/… or uploads/… or https://…" />
        <div className="flex flex-wrap gap-2">
          <label className={btn + ' inline-block'}>
            {busy ? 'Uploading…' : 'Upload'}
            <input type="file" accept="image/*" hidden onChange={async (e) => {
              const f = e.target.files?.[0]; e.target.value = ''; if (!f) return;
              setBusy(true); setErr('');
              try { onChange(await uploadImage(f)); } catch (x: any) { setErr(x.message); }
              setBusy(false);
            }} />
          </label>
          <button className={btn} onClick={openLib}>Choose from library</button>
          {value && <button className={btn} onClick={() => onChange('')}>Clear</button>}
        </div>
        {err && <div className="text-xs text-red-400">{err}</div>}
        {lib && (
          <div className="border border-[#236477]/60 bg-[#0c262e] p-3 rounded-sm">
            <div className="flex justify-between text-[10px] tracking-widest text-[#7DAFB9] mb-2"><span>IMAGE LIBRARY</span><button onClick={() => setLib(null)}>CLOSE ✕</button></div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-56 overflow-auto">
              {[...BUILT_IN.map((n) => 'images/' + n), ...lib.map((f) => 'uploads/' + f.name)].map((p) => (
                <button key={p} onClick={() => { onChange(p); setLib(null); }} className="aspect-video bg-[#102932] border border-[#236477]/50 hover:border-[#E8892B] overflow-hidden">
                  <img src={asset(p)} alt="" className="w-full h-full object-cover" loading="lazy" onError={(e) => ((e.target as HTMLImageElement).src = `/api/admin?action=raw&path=${encodeURIComponent('public/' + p)}`)} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button type="button" onClick={() => onChange(!on)} className="flex items-center gap-3 text-sm cursor-pointer" role="switch" aria-checked={on}>
      <span className={'w-10 h-5 rounded-full relative transition-colors ' + (on ? 'bg-[#E8892B]' : 'bg-[#236477]/60')}>
        <span className={'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ' + (on ? 'left-5' : 'left-0.5')} />
      </span>
      {label && <span>{label}</span>}
    </button>
  );
}

/** Generic editor: renders any value (text, number, switch, image, list of cards, nested group) with friendly labels. */
export function Field({ name, v, set, path, only }: { name: string; v: J; set: (x: J) => void; path: string; only?: string[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  if (Array.isArray(v)) {
    const prim = v.length === 0 || typeof v[0] !== 'object';
    const move = (i: number, d: number) => { const a = [...v]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; set(a); };
    return (
      <div className="space-y-3">
        {v.map((it, i) => {
          const isOpen = open[i] ?? false;
          return (
            <div key={i} className={prim ? 'flex gap-2' : 'border border-[#236477]/50 bg-[#102932]/60 rounded-sm'}>
              {prim ? (
                <div className="flex-1"><Field name={name} v={it} path={path} set={(x) => set(v.map((o, j) => (j === i ? x : o)))} /></div>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 cursor-pointer select-none" onClick={() => setOpen({ ...open, [i]: !isOpen })}>
                    <span className="text-[#E8892B] text-xs w-4">{isOpen ? '▾' : '▸'}</span>
                    <span className="text-[10px] tracking-widest text-[#7DAFB9]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-sm truncate">{summaryOf(it) || <i className="text-[#ADB8BD]">Untitled</i>}</span>
                    <span className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <button className={btn} title="Move up" onClick={() => move(i, -1)}>↑</button>
                      <button className={btn} title="Move down" onClick={() => move(i, 1)}>↓</button>
                      <button className={btn} title="Duplicate" onClick={() => { const a = [...v]; a.splice(i + 1, 0, fresh(it)); set(a); setOpen({ ...open, [i + 1]: true }); }}>⧉</button>
                      <button className={btn + ' hover:!border-red-400 hover:!text-red-400'} title="Remove" onClick={() => confirm('Remove this item?') && set(v.filter((_, j) => j !== i))}>✕</button>
                    </span>
                  </div>
                  {isOpen && <div className="px-4 pb-4 pt-1 border-t border-[#236477]/30"><Field name={name} v={it} path={path} set={(x) => set(v.map((o, j) => (j === i ? x : o)))} /></div>}
                </>
              )}
              {prim && (
                <div className="flex gap-1">
                  <button className={btn} onClick={() => move(i, -1)}>↑</button><button className={btn} onClick={() => move(i, 1)}>↓</button>
                  <button className={btn + ' hover:!border-red-400 hover:!text-red-400'} onClick={() => set(v.filter((_, j) => j !== i))}>✕</button>
                </div>
              )}
            </div>
          );
        })}
        <button className={btn} onClick={() => { set([...v, prim ? '' : blank(v[0])]); if (!prim) setOpen({ ...open, [v.length]: true }); }}>+ Add {prim ? 'line' : 'item'}</button>
      </div>
    );
  }
  if (v && typeof v === 'object') {
    const entries = Object.entries(v).filter(([k]) => !HIDDEN.has(k) && (!only || only.includes(k)));
    return (
      <div className="space-y-4">
        {entries.map(([k, x]) => {
          const complex = x && typeof x === 'object';
          return (
            <div key={k}>
              <div className="text-[10px] tracking-widest uppercase text-[#7DAFB9] mb-1">{humanize(k)}</div>
              {HINTS[k] && !(k === 'title' && !path.startsWith('SITE')) && !complex && typeof x !== 'boolean' && <div className="text-[11px] text-[#ADB8BD]/80 mb-1">{HINTS[k]}</div>}
              <div className={complex && !Array.isArray(x) ? 'pl-3 border-l border-[#236477]/40' : ''}>
                <Field name={k} v={x} path={path + '.' + k} set={(n) => set({ ...v, [k]: n })} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (typeof v === 'boolean') return <Toggle on={v} onChange={set} label={HINTS[name] || 'Enabled'} />;
  if (name === 'image' || path.startsWith('IMAGES.')) return <ImagePicker value={v} onChange={set} />;
  if (typeof v === 'number') return <input type="number" className={inp} value={v} onChange={(e) => set(Number(e.target.value))} />;
  if (name === 'icon') return <select className={inp} value={v} onChange={(e) => set(e.target.value)}>{ICON_NAMES.map((n) => <option key={n}>{n}</option>)}</select>;
  if (name === 'span') {
    const cur = Object.entries(GALLERY_SIZES).find(([, c]) => c === v)?.[0] ?? 'custom';
    return (
      <select className={inp} value={cur} onChange={(e) => e.target.value !== 'custom' && set(GALLERY_SIZES[e.target.value])}>
        {Object.keys(GALLERY_SIZES).map((n) => <option key={n}>{n}</option>)}{cur === 'custom' && <option value="custom">Custom ({v})</option>}
      </select>
    );
  }
  if (name === 'category' && path.startsWith('LEADERSHIP'))
    return <select className={inp} value={v} onChange={(e) => set(e.target.value)}>{SELECTS.category_leadership.map((n) => <option key={n}>{n}</option>)}</select>;
  const text = String(v ?? '');
  return (LONG.includes(name) && !(name === 'title' && !path.startsWith('SITE'))) || text.length > 80 || text.includes('\n')
    ? <textarea className={inp + ' min-h-20'} rows={Math.min(8, Math.max(2, text.split('\n').length + (text.length > 160 ? 1 : 0)))} value={text} onChange={(e) => set(e.target.value)} />
    : <input className={inp} value={text} onChange={(e) => set(e.target.value)} />;
}

export function useDebounced<T>(v: T, ms: number): T {
  const [d, setD] = useState(v);
  useEffect(() => { const t = setTimeout(() => setD(v), ms); return () => clearTimeout(t); }, [v, ms]);
  return d;
}
