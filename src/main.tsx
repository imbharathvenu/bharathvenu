import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { applyContent } from './data/portfolioData';
import './index.css';

const BASE: string = import.meta.env.BASE_URL || '/';

async function boot() {
  const root = createRoot(document.getElementById('root')!);
  const p = (location.pathname.startsWith(BASE) ? location.pathname.slice(BASE.length) : location.pathname.replace(/^\//, '')).replace(/\/$/, '');
  if (p === 'admin' || p.startsWith('admin/')) {
    const { default: Admin } = await import('./admin/Admin');
    return root.render(<Admin />);
  }
  // 1) server API (Vercel / Node host)  2) static content.json committed by the admin (GitHub Pages)
  const sources = [
    ...(location.hostname.endsWith('github.io') ? [] : ['/api/content']),
    BASE + 'content.json?t=' + Date.now(),
  ];
  for (const u of sources) {
    try { const r = await fetch(u); if (r.ok) { applyContent(await r.json()); break; } } catch { /* try next / bundled defaults */ }
  }
  root.render(<App />);
}
boot();
