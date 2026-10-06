import { DEFAULT_THEME, FONTS, PRESETS, THEME_GROUPS, SYSTEM_MONO, type FieldDef, type Theme } from '../data/theme';
import { SECTION_META } from '../data/siteDefaults';
import { Toggle, btn, inp } from './fields';

type Props = { theme: Theme; setTheme: (t: Theme) => void };

function Control({ f, theme, setTheme }: { f: FieldDef } & Props) {
  const v: any = theme[f.key];
  const set = (x: any) => setTheme({ ...theme, [f.key]: x, preset: f.type === 'color' ? 'custom' : theme.preset });
  return (
    <div className="space-y-1">
      <div className="text-[10px] tracking-widest uppercase text-[#7DAFB9]">{f.label}</div>
      {f.type === 'color' && (
        <div className="flex gap-2 items-center">
          <input type="color" value={/^#[0-9a-f]{6}$/i.test(v) ? v : '#000000'} onChange={(e) => set(e.target.value.toUpperCase())} className="w-10 h-9 bg-transparent border border-[#236477]/60 cursor-pointer p-0.5" />
          <input className={inp + ' font-mono'} value={v} onChange={(e) => set(e.target.value)} maxLength={7} />
        </div>
      )}
      {f.type === 'font' && (
        <>
          <input className={inp} list={'fonts-' + (f.mono ? 'mono' : 'all')} value={v} onChange={(e) => set(e.target.value)} placeholder="Type or pick a Google font" style={{ fontFamily: `'${v}'` }} />
          <datalist id={'fonts-' + (f.mono ? 'mono' : 'all')}>
            {f.mono && <option value={SYSTEM_MONO} />}
            {FONTS.filter((x) => (f.mono ? x.kind === 'mono' : x.kind !== 'mono')).map((x) => <option key={x.name} value={x.name} />)}
          </datalist>
        </>
      )}
      {f.type === 'range' && (
        <div className="flex items-center gap-3">
          <input type="range" min={f.min} max={f.max} step={f.step} value={v} onChange={(e) => set(Number(e.target.value))} className="flex-1 accent-[#E8892B]" />
          <span className="text-xs font-mono w-16 text-right">{v}{f.unit}</span>
        </div>
      )}
      {f.type === 'select' && <select className={inp} value={v} onChange={(e) => set(e.target.value)}>{f.options!.map((o) => <option key={o}>{o}</option>)}</select>}
      {f.type === 'toggle' && <Toggle on={!!v} onChange={set} label={v ? 'On' : 'Off'} />}
      {f.hint && <div className="text-[11px] text-[#ADB8BD]/70">{f.hint}</div>}
    </div>
  );
}

export function ThemeEditor({ group, theme, setTheme }: Props & { group: string }) {
  const g = THEME_GROUPS.find((x) => x.id === group)!;
  return (
    <div className="space-y-6">
      <p className="text-sm text-[#ADB8BD]">{g.blurb}</p>
      {group === 'colors' && (
        <div>
          <div className="text-[10px] tracking-widest uppercase text-[#7DAFB9] mb-2">Presets</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESETS.map((p) => {
              const c: any = { ...DEFAULT_THEME, ...p.values };
              return (
                <button key={p.id} onClick={() => setTheme({ ...theme, ...p.values, preset: p.id })}
                  className={'text-left p-2 border rounded-sm cursor-pointer transition-colors ' + (theme.preset === p.id ? 'border-[#E8892B] bg-[#063F4B]' : 'border-[#236477]/50 hover:border-[#7DAFB9]')}>
                  <div className="flex h-6 mb-1.5 overflow-hidden rounded-sm">
                    {['bg', 'primary', 'border', 'accent', 'paper'].map((k) => <span key={k} className="flex-1" style={{ background: c[k] }} />)}
                  </div>
                  <div className="text-xs">{p.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        {g.fields.map((f) => <Control key={f.key} f={f} theme={theme} setTheme={setTheme} />)}
      </div>
      <button className={btn} onClick={() => confirm('Reset this group to the original look?') && setTheme({ ...theme, ...Object.fromEntries(g.fields.map((f) => [f.key, DEFAULT_THEME[f.key]])), preset: group === 'colors' ? 'teal-industrial' : theme.preset })}>Reset {g.label.toLowerCase()}</button>
    </div>
  );
}

type Sec = { id: string; visible: boolean; nav: string };
export function SectionsEditor({ sections, setSections }: { sections: Sec[]; setSections: (s: Sec[]) => void }) {
  const move = (i: number, d: number) => { const a = [...sections]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setSections(a); };
  const upd = (i: number, p: Partial<Sec>) => setSections(sections.map((s, j) => (j === i ? { ...s, ...p } : s)));
  return (
    <div className="space-y-3">
      <p className="text-sm text-[#ADB8BD]">Show, hide and reorder sections. Numbers (01, 02…) update automatically. Give a section a menu label to list it in the navbar and footer — leave it empty to keep it out of the menu.</p>
      {sections.map((s, i) => (
        <div key={s.id} className={'flex items-center gap-3 border rounded-sm p-3 ' + (s.visible ? 'border-[#236477]/50 bg-[#102932]/60' : 'border-[#236477]/20 opacity-60')}>
          <Toggle on={s.visible} onChange={(v) => upd(i, { visible: v })} />
          <div className="flex-1 min-w-0 text-sm">{SECTION_META[s.id]?.label || s.id}</div>
          <input className={inp + ' !w-36'} value={s.nav} placeholder="Menu label" onChange={(e) => upd(i, { nav: e.target.value.toUpperCase() })} />
          <button className={btn} onClick={() => move(i, -1)}>↑</button>
          <button className={btn} onClick={() => move(i, 1)}>↓</button>
        </div>
      ))}
    </div>
  );
}
