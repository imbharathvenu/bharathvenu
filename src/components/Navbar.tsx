import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react';
import { PERSONAL_INFO, SECTIONS, SITE, THEME } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // links follow the Sections settings (order, visibility, label) from the admin
  const navLinks = SECTIONS.filter((s) => s.visible && s.nav.trim()).map((s) => ({ label: s.nav, href: '#' + s.id, id: s.id }));
  const ids = navLinks.map((l) => l.id).join(',');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      let current = '';
      for (const id of ids.split(',').filter(Boolean)) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) { current = id; break; }
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids]);

  const pad = Math.max(8, Number(THEME.navPadding) || 18);
  const solid = isScrolled || mobileMenuOpen;

  return (
    <header
      style={{ paddingTop: solid ? pad * 0.75 : pad, paddingBottom: solid ? pad * 0.75 : pad }}
      className={`${THEME.navSticky ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? `bg-[var(--c-bg)]/95 ${THEME.navBlur ? 'backdrop-blur-md' : ''} border-b border-[var(--c-border)]/40 shadow-lg`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#top" className="text-lg md:text-xl font-extrabold tracking-wider text-[var(--c-white)] font-heading hover:text-[var(--c-light)] transition-colors flex items-center gap-2">
          <span>{PERSONAL_INFO.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent)]"></span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a key={link.id} href={link.href} className={`text-xs uppercase font-medium tracking-widest transition-colors py-1 relative ${isActive ? 'text-[var(--c-accent)]' : 'text-[var(--c-muted)] hover:text-[var(--c-white)]'}`}>
                {link.label}
                {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--c-accent)]" />}
              </a>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          {THEME.showResumeButton && (
            <button onClick={onOpenResume} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--c-white)] bg-[var(--c-primary)] hover:bg-[var(--c-secondary)] border border-[var(--c-border)] transition-all hover:border-[var(--c-light)] whitespace-nowrap cursor-pointer">
              <FileDown className="w-3.5 h-3.5 text-[var(--c-accent)]" />
              <span>{SITE.nav.resumeLabel}</span>
            </button>
          )}
          <a href="#contact" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--c-ink-strong)] bg-[var(--c-paper)] hover:bg-[var(--c-accent)] hover:text-[var(--c-white)] transition-all whitespace-nowrap cursor-pointer">
            <span>{SITE.nav.connectLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {THEME.showResumeButton && (
            <button onClick={onOpenResume} className="p-2 text-[var(--c-white)] bg-[var(--c-primary)] border border-[var(--c-border)] text-xs" aria-label="View Resume">
              <FileDown className="w-4 h-4 text-[var(--c-accent)]" />
            </button>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[var(--c-white)] hover:text-[var(--c-light)] focus:outline-none" aria-label="Toggle navigation menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--c-bg)] border-b border-[var(--c-border)] px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-[var(--c-light)] uppercase">{SITE.nav.mobileIndexLabel}</span>
            {navLinks.map((link) => (
              <a key={link.id} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-[var(--c-text)] hover:text-[var(--c-accent)] py-1 border-b border-[var(--c-surface)] flex items-center justify-between">
                <span>{link.label}</span>
                <span className="text-xs text-[var(--c-light)]">→</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              {THEME.showResumeButton && (
                <button onClick={() => { setMobileMenuOpen(false); onOpenResume(); }} className="w-full py-2.5 text-center text-xs uppercase font-semibold text-[var(--c-white)] bg-[var(--c-primary)] border border-[var(--c-border)]">
                  {SITE.nav.mobileResumeLabel}
                </button>
              )}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-xs uppercase font-semibold text-[var(--c-ink-strong)] bg-[var(--c-paper)]">
                {SITE.nav.mobileConnectLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
