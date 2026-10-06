import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { bootContent, startLiveSync } from './data/runtime';
import './index.css';

const BASE: string = import.meta.env.BASE_URL || '/';

async function boot() {
  const root = createRoot(document.getElementById('root')!);
  const p = (location.pathname.startsWith(BASE) ? location.pathname.slice(BASE.length) : location.pathname.replace(/^\//, '')).replace(/\/$/, '');
  if (p === 'admin' || p.startsWith('admin/')) {
    const { default: Admin } = await import('./admin/Admin');
    return root.render(<Admin />);
  }
  await bootContent();   // instant from cache, or bundled defaults; fresh data is swapped in live
  root.render(<App />);
  startLiveSync();       // keeps the page up to date without a reload
}
boot();
