import bundled from './defaultContent.json';
import { DEFAULT_SECTIONS, DEFAULT_SITE, DEFAULT_SKILL_GRID, SECTION_META } from './siteDefaults';
import { DEFAULT_THEME, applyTheme, normalizeTheme, type Theme } from './theme';
import type {
  CapabilityArea, EducationItem, ExperienceItem, FlowStep, GalleryItem, LanguageItem, LeadershipItem,
  PersonalInfo, SectionConfig, SiteContent, SkillCategory, SkillTile,
} from '../types';

export { SECTION_META };

export type Content = {
  PERSONAL_INFO: PersonalInfo;
  PROFILE_TAGS: string[];
  IMAGES: Record<string, string>;
  CAPABILITIES_BOARD: CapabilityArea[];
  EXPERIENCES: ExperienceItem[];
  FLOW_STEPS: FlowStep[];
  SKILL_GRID: SkillTile[];
  SKILL_CATEGORIES: SkillCategory[];
  EDUCATION: EducationItem[];
  LEADERSHIP: LeadershipItem[];
  LANGUAGES: LanguageItem[];
  CAREER_TARGETS: string[];
  GALLERY_ITEMS: GalleryItem[];
  SITE: SiteContent;
  SECTIONS: SectionConfig[];
  THEME: Theme;
};

/** Gallery tile sizes offered in the admin (name -> Tailwind grid classes). */
export const GALLERY_SIZES: Record<string, string> = {
  'Large (2×2)': 'col-span-1 md:col-span-2 row-span-2',
  'Wide (2×1)': 'col-span-1 md:col-span-2 row-span-1',
  'Tall (1×2)': 'col-span-1 row-span-1 md:row-span-2',
  'Small (1×1)': 'col-span-1 row-span-1',
};

// ---------- image paths ----------
const BASE: string = (import.meta as any).env?.BASE_URL || '/';

/** Turns a stored image path ("images/x.jpg", "uploads/x.webp", "/old-base/images/x.jpg", https://…) into a URL that works on any host. */
export const asset = (p?: string): string => {
  if (!p) return '';
  if (/^(https?:|data:|blob:)/i.test(p)) return p;
  const m = p.match(/(?:^|\/)((?:images|uploads)\/[^?#]+)/);
  return BASE + (m ? m[1] : p.replace(/^\/+/, ''));
};

/** Inverse of asset(): the short relative path to store in the content ("uploads/123.webp"). */
export const relPath = (url?: string): string => {
  if (!url) return '';
  if (/^(data:|blob:)/i.test(url)) return url;
  const m = String(url).match(/(?:^|\/)((?:images|uploads)\/[^?#]+)/);
  return m ? m[1] : url;
};

// ---------- normalising ----------
const isObj = (x: any) => !!x && typeof x === 'object' && !Array.isArray(x);

/** Fills every missing key from `def`; arrays and primitives from `raw` win when present. */
function merge<T>(def: T, raw: any): T {
  if (Array.isArray(def)) return (Array.isArray(raw) ? raw : def) as any;
  if (isObj(def)) {
    const src = isObj(raw) ? raw : {};
    const out: any = { ...src };
    for (const k of Object.keys(def as any)) out[k] = merge((def as any)[k], src[k]);
    return out;
  }
  return (raw === undefined || raw === null ? def : raw) as T;
}

const arr = <T,>(v: any, def: T[]): T[] => (Array.isArray(v) ? v : def);
const list = (v: any): any[] => (Array.isArray(v) ? v : []);
const objs = (v: any, def: any[]): any[] => arr<any>(v, def).filter((x) => x && typeof x === 'object');

export function normalizeContent(raw: any): Content {
  const r = isObj(raw) ? raw : {};
  const b: any = bundled;

  const SECTIONS: SectionConfig[] = list(r.SECTIONS)
    .filter((s) => s && typeof s.id === 'string')
    .map((s) => ({ id: s.id, visible: s.visible !== false, nav: typeof s.nav === 'string' ? s.nav : '' }));
  for (const d of DEFAULT_SECTIONS) if (!SECTIONS.some((s) => s.id === d.id)) SECTIONS.push({ ...d });

  return {
    PERSONAL_INFO: merge(b.PERSONAL_INFO as PersonalInfo, r.PERSONAL_INFO),
    PROFILE_TAGS: arr<string>(r.PROFILE_TAGS, b.PROFILE_TAGS).map(String),
    IMAGES: merge(b.IMAGES as Record<string, string>, r.IMAGES),
    CAPABILITIES_BOARD: objs(r.CAPABILITIES_BOARD, b.CAPABILITIES_BOARD).map((c) => ({ ...c, detailedScope: list(c.detailedScope) })),
    EXPERIENCES: objs(r.EXPERIENCES, b.EXPERIENCES).map((e) => ({ ...e, responsibilities: list(e.responsibilities), tags: list(e.tags) })),
    FLOW_STEPS: objs(r.FLOW_STEPS, b.FLOW_STEPS).map((s, i) => ({ ...s, step: i + 1 })),
    SKILL_GRID: objs(r.SKILL_GRID, DEFAULT_SKILL_GRID) as SkillTile[],
    SKILL_CATEGORIES: objs(r.SKILL_CATEGORIES, b.SKILL_CATEGORIES).map((c) => ({ ...c, skills: list(c.skills) })),
    EDUCATION: objs(r.EDUCATION, b.EDUCATION) as EducationItem[],
    LEADERSHIP: objs(r.LEADERSHIP, b.LEADERSHIP).map((l) => ({ ...l, keywords: list(l.keywords) })),
    LANGUAGES: objs(r.LANGUAGES, b.LANGUAGES) as LanguageItem[],
    CAREER_TARGETS: arr<string>(r.CAREER_TARGETS, b.CAREER_TARGETS).map(String),
    GALLERY_ITEMS: objs(r.GALLERY_ITEMS, b.GALLERY_ITEMS) as GalleryItem[],
    SITE: merge(DEFAULT_SITE, r.SITE),
    SECTIONS,
    THEME: normalizeTheme(r.THEME),
  };
}

/** The content bundled into the build (used until/unless fresher content is fetched). */
export const defaultContent = (): Content => normalizeContent(bundled);

// ---------- live content (module-level bindings, updated by setContent) ----------
const init = defaultContent();
export let PERSONAL_INFO = init.PERSONAL_INFO;
export let PROFILE_TAGS = init.PROFILE_TAGS;
export let IMAGES = init.IMAGES;
export let CAPABILITIES_BOARD = init.CAPABILITIES_BOARD;
export let EXPERIENCES = init.EXPERIENCES;
export let FLOW_STEPS = init.FLOW_STEPS;
export let SKILL_GRID = init.SKILL_GRID;
export let SKILL_CATEGORIES = init.SKILL_CATEGORIES;
export let EDUCATION = init.EDUCATION;
export let LEADERSHIP = init.LEADERSHIP;
export let LANGUAGES = init.LANGUAGES;
export let CAREER_TARGETS = init.CAREER_TARGETS;
export let GALLERY_ITEMS = init.GALLERY_ITEMS;
export let SITE = init.SITE;
export let SECTIONS = init.SECTIONS;
export let THEME = init.THEME;
export { DEFAULT_THEME };

let version = 0;
const listeners = new Set<() => void>();
export const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const getVersion = () => version;

/** Replaces the live content, re-applies the theme and notifies React (useContentVersion). */
export function setContent(raw: any) {
  const c = normalizeContent(raw);
  PERSONAL_INFO = c.PERSONAL_INFO; PROFILE_TAGS = c.PROFILE_TAGS; IMAGES = c.IMAGES; CAPABILITIES_BOARD = c.CAPABILITIES_BOARD;
  EXPERIENCES = c.EXPERIENCES; FLOW_STEPS = c.FLOW_STEPS; SKILL_GRID = c.SKILL_GRID; SKILL_CATEGORIES = c.SKILL_CATEGORIES;
  EDUCATION = c.EDUCATION; LEADERSHIP = c.LEADERSHIP; LANGUAGES = c.LANGUAGES; CAREER_TARGETS = c.CAREER_TARGETS;
  GALLERY_ITEMS = c.GALLERY_ITEMS; SITE = c.SITE; SECTIONS = c.SECTIONS; THEME = c.THEME;
  applyTheme(THEME);
  version++;
  listeners.forEach((f) => f());
}
