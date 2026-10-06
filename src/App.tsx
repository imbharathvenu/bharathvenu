import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogisticsStrip } from './components/LogisticsStrip';
import { Profile } from './components/Profile';
import { CapabilitiesBoard } from './components/CapabilitiesBoard';
import { Experience } from './components/Experience';
import { OperationalFlow } from './components/OperationalFlow';
import { FeatureBanner } from './components/FeatureBanner';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Leadership } from './components/Leadership';
import { CareerFocus } from './components/CareerFocus';
import { OperationsGallery } from './components/OperationsGallery';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { SECTIONS, THEME } from './data/portfolioData';
import { useContentVersion } from './components/ui';

// one entry per section id; order and visibility come from the admin (Sections)
const REGISTRY: Record<string, (p: { onOpenResume: () => void }) => React.ReactNode> = {
  strip: () => <LogisticsStrip />,
  profile: () => <Profile />,
  operations: () => <CapabilitiesBoard />,
  experience: () => <Experience />,
  flow: () => <OperationalFlow />,
  banner: () => <FeatureBanner />,
  skills: () => <Skills />,
  education: () => <Education />,
  leadership: () => <Leadership />,
  career: () => <CareerFocus />,
  gallery: () => <OperationsGallery />,
  contact: (p) => <Contact onOpenResume={p.onOpenResume} />,
};

/** Thin progress bar + back-to-top button. */
function ScrollUI() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setPct(max > 0 ? Math.min(100, (scrollY / max) * 100) : 0);
    };
    h();
    addEventListener('scroll', h, { passive: true });
    addEventListener('resize', h);
    return () => { removeEventListener('scroll', h); removeEventListener('resize', h); };
  }, []);
  return (
    <>
      {THEME.scrollProgress && <div aria-hidden className="fixed top-0 left-0 h-[3px] z-[60] bg-[var(--c-accent)] pointer-events-none" style={{ width: pct + '%', transition: 'width 80ms linear' }} />}
      {THEME.backToTop && (
        <button
          aria-label="Back to top"
          onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
          className={`no-print fixed bottom-6 right-6 z-40 p-3 bg-[var(--c-accent)] text-[var(--c-ink-strong)] shadow-xl transition-all duration-300 cursor-pointer ${pct > 12 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}

export default function App() {
  const version = useContentVersion(); // re-render whenever content or theme changes (live, no reload)
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const open = () => setIsResumeOpen(true);

  // fade sections in as they scroll into view (disabled by the Effects settings / reduced-motion)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('main > .reveal:not(.in)'));
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    els.forEach((e) => io.observe(e));
    const fallback = setTimeout(() => els.forEach((e) => e.classList.add('in')), 3500);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [version]);

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] selection:bg-[var(--c-accent)] selection:text-[var(--c-white)]">
      <Navbar onOpenResume={open} />
      <ScrollUI />

      <main>
        <Hero onOpenResume={open} />
        {SECTIONS.filter((s) => s.visible && REGISTRY[s.id]).map((s) => (
          <div key={s.id} className="reveal">{REGISTRY[s.id]({ onOpenResume: open })}</div>
        ))}
      </main>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <Footer onOpenResume={open} />
    </div>
  );
}
