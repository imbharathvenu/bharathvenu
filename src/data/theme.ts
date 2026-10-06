export type Theme = {
  preset: string;
  // colours
  bg: string; primary: string; secondary: string; surface: string; border: string; light: string; accent: string;
  paper: string; text: string; white: string; muted: string; ink: string; inkStrong: string; card: string; footer: string;
  // fonts
  headingFont: string; bodyFont: string; monoFont: string; headingWeight: string; headingTracking: string; headingCase: string;
  // layout
  contentWidth: number; sectionPadding: number; radius: number; navPadding: number; navSticky: boolean; navBlur: boolean;
  heroImage: string; showResumeButton: boolean; showContactForm: boolean; backToTop: boolean; scrollProgress: boolean;
  scrollbarWidth: number; roundScrollbar: boolean;
  // effects
  animSpeed: number; gridStrength: number; reveal: boolean; motion: boolean; grid: boolean; imageZoom: boolean; sectionNumbers: boolean;
  imageEffects: boolean; imgContrast: number; imgBright: number; imgSat: number; imgGray: number; bannerOverlay: number;
};

export type FieldDef = {
  key: keyof Theme; label: string; type: 'color' | 'font' | 'range' | 'select' | 'toggle';
  min?: number; max?: number; step?: number; unit?: string; options?: string[]; hint?: string; mono?: boolean;
};

export const SYSTEM_MONO = 'System monospace';

export const DEFAULT_THEME: Theme = {
  preset: 'teal-industrial',
  bg: '#081F26', primary: '#063F4B', secondary: '#0B5260', surface: '#102932', border: '#236477', light: '#7DAFB9', accent: '#E8892B',
  paper: '#F4F2EB', text: '#F4F2EB', white: '#FFFFFF', muted: '#ADB8BD', ink: '#102932', inkStrong: '#081F26', card: '#FFFFFF', footer: '#041217',
  headingFont: 'Sora', bodyFont: 'Inter', monoFont: SYSTEM_MONO, headingWeight: 'Default', headingTracking: 'Default', headingCase: 'Default',
  contentWidth: 1280, sectionPadding: 6, radius: 0, navPadding: 18, navSticky: true, navBlur: true,
  heroImage: 'right', showResumeButton: true, showContactForm: true, backToTop: true, scrollProgress: true,
  scrollbarWidth: 7, roundScrollbar: false,
  animSpeed: 6, gridStrength: 5, reveal: true, motion: true, grid: true, imageZoom: true, sectionNumbers: true,
  imageEffects: false, imgContrast: 105, imgBright: 92, imgSat: 100, imgGray: 0, bannerOverlay: 0.8,
};

export const THEME_GROUPS: { id: string; label: string; blurb: string; fields: FieldDef[] }[] = [
  {
    id: 'colors', label: 'Colours', blurb: 'Pick a ready-made palette or fine-tune every colour. Changes show instantly in Live preview.',
    fields: [
      { key: 'bg', label: 'Page background', type: 'color' },
      { key: 'primary', label: 'Primary', type: 'color' },
      { key: 'secondary', label: 'Secondary', type: 'color' },
      { key: 'surface', label: 'Surface', type: 'color' },
      { key: 'border', label: 'Borders', type: 'color' },
      { key: 'light', label: 'Light accent', type: 'color' },
      { key: 'accent', label: 'Accent', type: 'color' },
      { key: 'paper', label: 'Paper (light sections)', type: 'color' },
      { key: 'text', label: 'Text on dark', type: 'color' },
      { key: 'white', label: 'Headings on dark', type: 'color' },
      { key: 'muted', label: 'Muted text', type: 'color' },
      { key: 'ink', label: 'Text on light', type: 'color' },
      { key: 'inkStrong', label: 'Headings on light', type: 'color' },
      { key: 'card', label: 'Cards', type: 'color' },
      { key: 'footer', label: 'Footer background', type: 'color' },
    ],
  },
  {
    id: 'fonts', label: 'Fonts', blurb: 'Choose Google fonts for headings, body text and the small technical labels.',
    fields: [
      { key: 'headingFont', label: 'Heading font', type: 'font' },
      { key: 'bodyFont', label: 'Body font', type: 'font' },
      { key: 'monoFont', label: 'Label font (monospace)', type: 'font', mono: true },
      { key: 'headingWeight', label: 'Heading weight', type: 'select', options: ['Default', '500', '600', '700', '800', '900'] },
      { key: 'headingTracking', label: 'Heading letter spacing', type: 'select', options: ['Default', '-0.04em', '-0.02em', '0em', '0.02em', '0.05em'] },
      { key: 'headingCase', label: 'Heading capitals', type: 'select', options: ['Default', 'uppercase', 'none', 'capitalize'] },
    ],
  },
  {
    id: 'layout', label: 'Layout', blurb: 'Page width, spacing, corners, navigation and which blocks are shown.',
    fields: [
      { key: 'contentWidth', label: 'Content width', type: 'range', min: 960, max: 1600, step: 20, unit: 'px' },
      { key: 'sectionPadding', label: 'Section spacing', type: 'range', min: 3, max: 10, step: 0.5, unit: 'rem' },
      { key: 'radius', label: 'Corner roundness', type: 'range', min: 0, max: 24, step: 1, unit: 'px' },
      { key: 'navPadding', label: 'Navbar height', type: 'range', min: 8, max: 32, step: 1, unit: 'px' },
      { key: 'navSticky', label: 'Sticky navbar', type: 'toggle' },
      { key: 'navBlur', label: 'Navbar blur', type: 'toggle' },
      { key: 'heroImage', label: 'Hero image', type: 'select', options: ['right', 'left', 'hidden'] },
      { key: 'showResumeButton', label: 'Resume / CV buttons', type: 'toggle' },
      { key: 'showContactForm', label: 'Contact form', type: 'toggle' },
      { key: 'backToTop', label: 'Back-to-top button', type: 'toggle' },
      { key: 'scrollProgress', label: 'Scroll progress bar', type: 'toggle' },
      { key: 'scrollbarWidth', label: 'Scrollbar width', type: 'range', min: 4, max: 16, step: 1, unit: 'px' },
      { key: 'roundScrollbar', label: 'Round scrollbar', type: 'toggle' },
    ],
  },
  {
    id: 'effects', label: 'Effects', blurb: 'Animations, background grid, image treatment.',
    fields: [
      { key: 'reveal', label: 'Fade sections in on scroll', type: 'toggle' },
      { key: 'motion', label: 'Animations & transitions', type: 'toggle' },
      { key: 'animSpeed', label: 'Cargo animation duration', type: 'range', min: 2, max: 20, step: 1, unit: 's' },
      { key: 'grid', label: 'Background grid', type: 'toggle' },
      { key: 'gridStrength', label: 'Grid strength', type: 'range', min: 0, max: 20, step: 1, unit: '%' },
      { key: 'imageZoom', label: 'Image hover zoom', type: 'toggle' },
      { key: 'sectionNumbers', label: 'Section numbers (01, 02…)', type: 'toggle' },
      { key: 'imageEffects', label: 'Custom image filters', type: 'toggle', hint: 'Turn on to use the four sliders below.' },
      { key: 'imgContrast', label: 'Image contrast', type: 'range', min: 60, max: 150, step: 1, unit: '%' },
      { key: 'imgBright', label: 'Image brightness', type: 'range', min: 50, max: 150, step: 1, unit: '%' },
      { key: 'imgSat', label: 'Image saturation', type: 'range', min: 0, max: 200, step: 1, unit: '%' },
      { key: 'imgGray', label: 'Image greyscale', type: 'range', min: 0, max: 100, step: 1, unit: '%' },
      { key: 'bannerOverlay', label: 'Banner tint strength', type: 'range', min: 0, max: 1, step: 0.05 },
    ],
  },
];

export const PRESETS: { id: string; name: string; values: Partial<Theme> }[] = [
  { id: 'teal-industrial', name: 'Teal Industrial', values: {
    bg: '#081F26', primary: '#063F4B', secondary: '#0B5260', surface: '#102932', border: '#236477', light: '#7DAFB9', accent: '#E8892B',
    paper: '#F4F2EB', text: '#F4F2EB', white: '#FFFFFF', muted: '#ADB8BD', ink: '#102932', inkStrong: '#081F26', card: '#FFFFFF', footer: '#041217' } },
  { id: 'midnight-navy', name: 'Midnight Navy', values: {
    bg: '#0A1224', primary: '#12234A', secondary: '#1B3366', surface: '#111C36', border: '#2E4577', light: '#8FA8DA', accent: '#F2B134',
    paper: '#F3F4F8', text: '#F3F4F8', white: '#FFFFFF', muted: '#AEB6C9', ink: '#111C36', inkStrong: '#0A1224', card: '#FFFFFF', footer: '#060B17' } },
  { id: 'forest-green', name: 'Forest Green', values: {
    bg: '#0B1F16', primary: '#12402B', secondary: '#1A5C3E', surface: '#12291D', border: '#2F6B4A', light: '#8CC4A3', accent: '#E3A72F',
    paper: '#F2F4EE', text: '#F2F4EE', white: '#FFFFFF', muted: '#AEBBB2', ink: '#12291D', inkStrong: '#0B1F16', card: '#FFFFFF', footer: '#06120C' } },
  { id: 'graphite-red', name: 'Graphite & Red', values: {
    bg: '#16181B', primary: '#24282D', secondary: '#31373E', surface: '#1E2125', border: '#4A525B', light: '#A9B2BC', accent: '#E5483B',
    paper: '#F3F3F2', text: '#F3F3F2', white: '#FFFFFF', muted: '#B3B8BE', ink: '#1E2125', inkStrong: '#16181B', card: '#FFFFFF', footer: '#0C0D0F' } },
  { id: 'burgundy-night', name: 'Burgundy Night', values: {
    bg: '#1E0E16', primary: '#401A2B', secondary: '#58263C', surface: '#2A1420', border: '#7A3B55', light: '#D3A3B7', accent: '#E8A33D',
    paper: '#F6F1EE', text: '#F6F1EE', white: '#FFFFFF', muted: '#C3AEB7', ink: '#2A1420', inkStrong: '#1E0E16', card: '#FFFFFF', footer: '#12070D' } },
  { id: 'violet-tech', name: 'Violet Tech', values: {
    bg: '#120D26', primary: '#25185A', secondary: '#33217F', surface: '#1B1340', border: '#4F3DA6', light: '#B3A6F0', accent: '#35D0BA',
    paper: '#F3F2FA', text: '#F3F2FA', white: '#FFFFFF', muted: '#B9B4D6', ink: '#1B1340', inkStrong: '#120D26', card: '#FFFFFF', footer: '#0A0717' } },
];

type FontDef = { name: string; kind: 'sans' | 'serif' | 'display' | 'mono'; wght?: string };
export const FONTS: FontDef[] = [
  { name: 'Inter', kind: 'sans', wght: '300..800' },
  { name: 'Manrope', kind: 'sans', wght: '300..800' },
  { name: 'Sora', kind: 'sans', wght: '300..800' },
  { name: 'Poppins', kind: 'sans', wght: '300;400;500;600;700;800' },
  { name: 'Montserrat', kind: 'sans', wght: '300..900' },
  { name: 'Roboto', kind: 'sans', wght: '300;400;500;700;900' },
  { name: 'Open Sans', kind: 'sans', wght: '300..800' },
  { name: 'Lato', kind: 'sans', wght: '300;400;700;900' },
  { name: 'DM Sans', kind: 'sans', wght: '300..900' },
  { name: 'Space Grotesk', kind: 'sans', wght: '300..700' },
  { name: 'Outfit', kind: 'sans', wght: '300..900' },
  { name: 'Barlow', kind: 'sans', wght: '300;400;500;600;700;800' },
  { name: 'Archivo', kind: 'sans', wght: '300..900' },
  { name: 'IBM Plex Sans', kind: 'sans', wght: '300;400;500;600;700' },
  { name: 'Playfair Display', kind: 'serif', wght: '400..900' },
  { name: 'Merriweather', kind: 'serif', wght: '300;400;700;900' },
  { name: 'Lora', kind: 'serif', wght: '400..700' },
  { name: 'Oswald', kind: 'display', wght: '300..700' },
  { name: 'Bebas Neue', kind: 'display' },
  { name: 'JetBrains Mono', kind: 'mono', wght: '300..700' },
  { name: 'IBM Plex Mono', kind: 'mono', wght: '300;400;500;600;700' },
  { name: 'Space Mono', kind: 'mono', wght: '400;700' },
  { name: 'Fira Code', kind: 'mono', wght: '300..700' },
  { name: 'Roboto Mono', kind: 'mono', wght: '300..700' },
];

const PRELOADED = new Set(['Inter', 'Manrope', 'Sora']); // already linked in index.html
const COLOR_VARS: Partial<Record<keyof Theme, string>> = {
  bg: '--c-bg', primary: '--c-primary', secondary: '--c-secondary', surface: '--c-surface', border: '--c-border', light: '--c-light',
  accent: '--c-accent', paper: '--c-paper', text: '--c-text', white: '--c-white', muted: '--c-muted', ink: '--c-ink',
  inkStrong: '--c-ink-strong', card: '--c-card', footer: '--c-footer',
};

const SYS_MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
const stack = (name: string, fallback: string) => {
  if (!name || name === SYSTEM_MONO) return fallback;
  return `'${name.replace(/['"\\;{}<>]/g, '')}', ${fallback}`;
};
const kindOf = (name: string) => FONTS.find((f) => f.name === name)?.kind;

function loadFont(name: string) {
  if (!name || name === SYSTEM_MONO || PRELOADED.has(name) || !/^[A-Za-z0-9 ]{2,40}$/.test(name)) return;
  const id = 'bv-font-' + name.toLowerCase().replace(/\s+/g, '-');
  if (document.getElementById(id)) return;
  const f = FONTS.find((x) => x.name === name);
  const fam = encodeURIComponent(name).replace(/%20/g, '+') + (f?.wght ? ':wght@' + f.wght : '');
  const link = document.createElement('link');
  link.id = id; link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`; // one <link> per font: a bad name only affects itself
  document.head.appendChild(link);
}

/** Coerces whatever was saved into a complete, correctly-typed Theme (unknown / wrong-typed values fall back to defaults). */
export function normalizeTheme(raw: any): Theme {
  const out: any = { ...DEFAULT_THEME };
  if (raw && typeof raw === 'object') {
    for (const k of Object.keys(DEFAULT_THEME) as (keyof Theme)[]) {
      const d: any = DEFAULT_THEME[k]; const v = raw[k];
      if (v === undefined || v === null) continue;
      if (typeof d === 'number') { const n = Number(v); if (Number.isFinite(n)) out[k] = n; }
      else if (typeof d === 'boolean') out[k] = typeof v === 'boolean' ? v : v === 'true';
      else if (typeof d === 'string') {
        const s = String(v);
        if (COLOR_VARS[k]) { if (/^#[0-9a-f]{3,8}$/i.test(s)) out[k] = s; } else out[k] = s;
      }
    }
  }
  return out as Theme;
}

/** Pushes a theme into the page: CSS variables on <html>, switches as data-attributes, and Google font links. */
export function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return;
  const r = document.documentElement; const s = r.style;
  for (const [k, v] of Object.entries(COLOR_VARS)) s.setProperty(v!, String(t[k as keyof Theme]));

  const hk = kindOf(t.headingFont); const bk = kindOf(t.bodyFont);
  const sansFb = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const serifFb = "Georgia, 'Times New Roman', serif";
  s.setProperty('--font-heading', stack(t.headingFont, sansFb).replace(/^('Sora'),/, "$1, 'Manrope',") + (hk === 'serif' ? ', ' + serifFb : ''));
  s.setProperty('--font-sans', stack(t.bodyFont, sansFb) + (bk === 'serif' ? ', ' + serifFb : ''));
  s.setProperty('--font-mono', stack(t.monoFont, SYS_MONO_STACK));
  [t.headingFont, t.bodyFont, t.monoFont].forEach(loadFont);

  s.setProperty('--content-w', t.contentWidth + 'px');
  s.setProperty('--sec-py', t.sectionPadding + 'rem');
  s.setProperty('--radius', t.radius + 'px');
  s.setProperty('--anim-speed', t.animSpeed + 's');
  s.setProperty('--grid-a', String(t.gridStrength));
  s.setProperty('--img-contrast', t.imgContrast + '%');
  s.setProperty('--img-bright', t.imgBright + '%');
  s.setProperty('--img-sat', t.imgSat + '%');
  s.setProperty('--img-gray', t.imgGray + '%');
  s.setProperty('--sb-w', t.scrollbarWidth + 'px');
  s.setProperty('--banner-overlay', String(t.bannerOverlay));

  const flag = (name: string, on: boolean) => (on ? r.setAttribute(name, '') : r.removeAttribute(name));
  flag('data-no-reveal', !t.reveal);
  flag('data-no-motion', !t.motion);
  flag('data-no-grid', !t.grid);
  flag('data-no-zoom', !t.imageZoom);
  flag('data-no-numbers', !t.sectionNumbers);
  flag('data-imgfx', t.imageEffects);
  flag('data-round-sb', t.roundScrollbar);
  const custom = (attr: string, cssVar: string, v: string) => {
    if (v && v !== 'Default') { s.setProperty(cssVar, v); r.setAttribute(attr, ''); } else { s.removeProperty(cssVar); r.removeAttribute(attr); }
  };
  custom('data-hw', '--h-weight', t.headingWeight);
  custom('data-ht', '--h-track', t.headingTracking);
  custom('data-hc', '--h-case', t.headingCase);
}
