import React, { useEffect, useState, useSyncExternalStore } from 'react';
import {
  Anchor, Truck, Plane, Database, Box, ShieldCheck, Users, Cpu, FileSpreadsheet, Layers, Package, Clock, Target, Award,
  Globe2, Flame, Shield, Compass, ClipboardCheck, BarChart3, Wrench, HardHat, type LucideIcon,
} from 'lucide-react';
import { asset, SECTIONS, SECTION_META, subscribe, getVersion } from '../data/portfolioData';

export const ICONS: Record<string, LucideIcon> = {
  Anchor, Truck, Plane, Database, Box, ShieldCheck, Users, Cpu, FileSpreadsheet, Layers, Package, Clock, Target, Award,
  Globe2, Flame, Shield, Compass, ClipboardCheck, BarChart3, Wrench, HardHat,
};
export const ICON_NAMES = Object.keys(ICONS);
export const iconFor = (name?: string): LucideIcon => (name && ICONS[name]) || Box;

export const useContentVersion = () => useSyncExternalStore(subscribe, getVersion);

/** <img> that resolves stored paths on any host, lazy-loads, fades in, and falls back to the GitHub proxy for fresh uploads. */
export const SmartImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, className = '', onError, onLoad, ...rest }) => {
  const [url, setUrl] = useState(() => asset(src as string));
  const [ready, setReady] = useState(false);
  const [tried, setTried] = useState(false);
  useEffect(() => { setUrl(asset(src as string)); setReady(false); setTried(false); }, [src]);
  return (
    <img
      {...rest}
      src={url}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={`${className} transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      onLoad={(e) => { setReady(true); onLoad?.(e); }}
      onError={(e) => {
        const rel = String(src || '');
        // freshly uploaded image that the host has not deployed yet -> serve it straight from GitHub via the API
        if (!tried && /(^|\/)uploads\//.test(rel) && !location.hostname.endsWith('github.io')) {
          setTried(true); setUrl(`/api/admin?action=raw&path=${encodeURIComponent('public/' + rel.replace(/^.*?(uploads\/)/, '$1'))}`);
        } else setReady(true);
        onError?.(e);
      }}
    />
  );
};

/** Position of a section among the visible, numbered ones -> "01", "02"… (auto-updates when sections move or hide). */
export const sectionNumber = (id: string): string => {
  const list = SECTIONS.filter((s) => s.visible && SECTION_META[s.id]?.numbered);
  const i = list.findIndex((s) => s.id === id);
  return String(i < 0 ? 0 : i + 1).padStart(2, '0');
};

/** Multi-line heading: each line gets the next colour class. */
export const Lines: React.FC<{ text: string; colors?: string[] }> = ({ text, colors = [] }) => (
  <>
    {String(text ?? '').split('\n').map((line, i, a) => (
      <React.Fragment key={i}>
        {colors[i] ? <span className={colors[i]}>{line}</span> : line}
        {i < a.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);

type HeadProps = { id: string; tone: 'dark' | 'light'; kicker: string; title: string; desc?: string; size?: 'md' | 'lg'; accents?: string[]; border?: string };
/** Shared section header: kicker + auto number + title (+ description). */
export const SectionHead: React.FC<HeadProps> = ({ id, tone, kicker, title, desc, size = 'md', accents, border = 'mb-16' }) => {
  const light = tone === 'light';
  const sz = size === 'lg' ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl';
  const numbered = SECTION_META[id]?.numbered;
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between ${border} border-b pb-6 ${light ? 'border-[var(--c-ink)]/15' : 'border-[var(--c-border)]/40'}`}>
      <div>
        <div className={`flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] mb-3 ${light ? 'text-[var(--c-primary)]' : 'text-[var(--c-light)]'}`}>
          {numbered && <><span className="num font-bold text-[var(--c-accent)]">{sectionNumber(id)}</span><span className="num">/</span></>}
          <span>{kicker}</span>
        </div>
        <h2 className={`${sz} font-black uppercase tracking-tight font-heading ${light ? 'text-[var(--c-ink-strong)]' : 'text-[var(--c-white)]'}`}>
          <Lines text={title} colors={accents} />
        </h2>
      </div>
      {desc && <p className={`text-xs sm:text-sm max-w-md mt-4 md:mt-0 font-normal ${light ? 'text-[var(--c-ink)]/70' : 'text-[var(--c-muted)]'}`}>{desc}</p>}
    </div>
  );
};
