import { useEffect, useRef, useState } from 'react';
import { call, download, STATIC, apiBase, setApiBase } from './api';
import { btn } from './fields';
import { defaultContent, normalizeContent } from '../data/portfolioData';

type Props = { data: any; onLoadDraft: (c: any, note: string) => void; sha: string | null };
const Row = ({ ok, label, value }: { ok?: boolean | null; label: string; value?: string }) => (
  <div className="flex items-center gap-3 py-2 border-b border-[#236477]/20 text-sm">
    <span className={'w-2.5 h-2.5 rounded-full ' + (ok === true ? 'bg-emerald-400' : ok === false ? 'bg-red-400' : 'bg-[#236477]')} />
    <span className="flex-1">{label}</span><span className="font-mono text-xs text-[#ADB8BD] truncate max-w-[55%]">{value}</span>
  </div>
);
const fmt = (b: number) => (b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB');

export function StoragePanel({ data, onLoadDraft, sha }: Props) {
  const [st, setSt] = useState<any>(null);
  const [hist, setHist] = useState<any[] | null>(null);
  const [files, setFiles] = useState<any[] | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [api, setApi] = useState(apiBase());
  const imp = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    setBusy(true); setErr('');
    try { setSt(await call('/api/admin?action=status')); } catch (e: any) { setErr(e.message); setSt(null); }
    setBusy(false);
  };
  useEffect(() => { refresh(); }, []);

  const loadHist = async () => { try { setHist((await call<any>('/api/admin?action=history')).commits); } catch (e: any) { setErr(e.message); } };
  const loadFiles = async () => { try { setFiles((await call<any>('/api/admin?action=uploads')).files); } catch (e: any) { setErr(e.message); } };
  const restore = async (c: any) => {
    try { const j = await call<any>('/api/admin?action=version&ref=' + encodeURIComponent(c.sha)); onLoadDraft(normalizeContent(j.content), 'Loaded the version from ' + new Date(c.date).toLocaleString() + ' — press Save to make it live.'); }
    catch (e: any) { setErr(e.message); }
  };
  const delFile = async (n: string) => {
    if (!confirm(`Delete ${n} from storage? Pages still using it will show a broken image.`)) return;
    try { await call('/api/admin?action=deleteUpload&name=' + encodeURIComponent(n), { method: 'POST' }); loadFiles(); } catch (e: any) { setErr(e.message); }
  };

  const github = st?.mode === 'github';
  return (
    <div className="space-y-8">
      {err && <div className="text-sm text-red-300 border border-red-400/40 bg-red-400/10 p-3 rounded-sm">{err}</div>}

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold">Connection</h3>
          <button className={btn} onClick={refresh} disabled={busy}>{busy ? 'Checking…' : 'Test connection'}</button>
        </div>
        {STATIC && (
          <div className="flex gap-2 mb-3"><input className="flex-1 bg-[#081F26] border border-[#236477]/60 px-3 py-2 text-sm rounded-sm" value={api} onChange={(e) => setApi(e.target.value)} placeholder="Your Vercel address, e.g. https://bharathvenu.vercel.app" />
            <button className={btn} onClick={() => { setApiBase(api); refresh(); }}>Save address</button></div>
        )}
        {st && (
          <div>
            <Row ok={st.mode === 'local' ? true : st.configured} label="Storage" value={st.mode === 'local' ? 'Local files on this server' : 'GitHub repository'} />
            {github && <>
              <Row ok={st.env?.ADMIN_PASSWORD} label="ADMIN_PASSWORD" value={st.env?.ADMIN_PASSWORD ? 'set' : 'missing'} />
              <Row ok={st.env?.GITHUB_TOKEN} label="GITHUB_TOKEN" value={st.env?.GITHUB_TOKEN ? 'set' : 'missing'} />
              <Row ok={st.env?.GITHUB_REPO} label="GITHUB_REPO" value={st.repo || 'missing'} />
              <Row ok={st.env?.GITHUB_BRANCH ? true : null} label="GITHUB_BRANCH" value={st.branch || 'main (default)'} />
              {st.configured && <>
                <Row ok={st.ok} label="Repository reachable" value={st.ok ? (st.private ? 'private' : 'public') : 'HTTP ' + st.httpStatus} />
                <Row ok={st.canWrite} label="Token can write (Contents: Read and write)" value={st.canWrite ? 'yes' : 'NO — fix token permissions'} />
                <Row ok={st.rateRemaining > 100} label="GitHub API allowance" value={st.rateRemaining != null ? `${st.rateRemaining} / ${st.rateLimit} left this hour` : '—'} />
              </>}
            </>}
            <Row ok={st.contentExists} label="public/content.json" value={st.contentExists ? 'found · ' + String(st.contentSha).slice(0, 7) : 'not saved yet (site uses built-in defaults)'} />
            {st.lastCommit && <Row label="Last save" value={`${st.lastCommit.message}${st.lastCommit.date ? ' · ' + new Date(st.lastCommit.date).toLocaleString() : ''}`} />}
            {sha && st.contentSha && sha !== st.contentSha && <div className="mt-2 text-sm text-amber-300">Newer content exists in storage than what this editor loaded — reload before saving.</div>}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-heading font-bold mb-2">Version history</h3>
        <p className="text-xs text-[#ADB8BD] mb-3">Every save is a GitHub commit, so nothing is ever lost. Load an older version into the editor, check it, then Save to bring it back.</p>
        {!hist ? <button className={btn} onClick={loadHist}>Show history</button> : (
          <div className="max-h-72 overflow-auto border border-[#236477]/40 rounded-sm">
            {hist.length === 0 && <div className="p-3 text-sm text-[#ADB8BD]">No versions yet.</div>}
            {hist.map((c) => (
              <div key={c.sha} className="flex items-center gap-3 px-3 py-2 border-b border-[#236477]/20 text-sm">
                <div className="flex-1 min-w-0"><div className="truncate">{c.message}</div><div className="text-[11px] text-[#ADB8BD]">{new Date(c.date).toLocaleString()} {c.author ? '· ' + c.author : ''}</div></div>
                {c.url && <a className="text-xs text-[#7DAFB9] hover:text-white" href={c.url} target="_blank" rel="noreferrer">GitHub ↗</a>}
                <button className={btn} onClick={() => restore(c)}>Load</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-heading font-bold mb-2">Backup & restore</h3>
        <div className="flex flex-wrap gap-2">
          <button className={btn} onClick={() => download(`portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2))}>Download backup (.json)</button>
          <button className={btn} onClick={() => imp.current?.click()}>Import backup</button>
          <button className={btn} onClick={() => confirm('Load the original built-in content into the editor? (Not saved until you press Save.)') && onLoadDraft(defaultContent(), 'Original defaults loaded — press Save to apply them.')}>Load original defaults</button>
          <input ref={imp} type="file" accept="application/json" hidden onChange={async (e) => {
            const f = e.target.files?.[0]; e.target.value = ''; if (!f) return;
            try { const j = JSON.parse(await f.text()); if (!j.PERSONAL_INFO) throw new Error('Not a portfolio backup'); onLoadDraft(normalizeContent(j), 'Backup loaded — press Save to make it live.'); } catch (x: any) { setErr('Import failed: ' + x.message); }
          }} />
        </div>
      </section>

      <section>
        <h3 className="font-heading font-bold mb-2">Uploaded images</h3>
        {!files ? <button className={btn} onClick={loadFiles}>Show uploaded images</button> : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {files.length === 0 && <div className="text-sm text-[#ADB8BD] col-span-full">No uploads yet. Upload images from any image field.</div>}
            {files.map((f) => (
              <div key={f.name} className="border border-[#236477]/40 rounded-sm overflow-hidden bg-[#102932]">
                <img src={`${apiBase()}/api/admin?action=raw&path=${encodeURIComponent('public/uploads/' + f.name)}`} alt="" className="w-full aspect-video object-cover" loading="lazy" />
                <div className="p-2 text-[11px] flex items-center justify-between gap-2"><span className="truncate">{fmt(f.size)}</span>
                  <button className="text-red-300 hover:text-red-200" onClick={() => delFile(f.name)}>Delete</button></div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
