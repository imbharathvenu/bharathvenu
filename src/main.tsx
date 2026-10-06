import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { applyContent } from './data/portfolioData';
import './index.css';

async function boot() {
  const root = createRoot(document.getElementById('root')!);
  if (location.pathname.startsWith('/admin')) {
    const { default: Admin } = await import('./admin/Admin');
    return root.render(<Admin />);
  }
  try { const r = await fetch('/api/content'); if (r.ok) applyContent(await r.json()); } catch { /* fall back to bundled defaults */ }
  root.render(<App />);
}
boot();
