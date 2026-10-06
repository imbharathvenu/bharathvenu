import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';
import { PERSONAL_INFO, SECTIONS, SITE, THEME } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const links = SECTIONS.filter((s) => s.visible && s.nav.trim());
  return (
    <footer className="bg-[var(--c-footer)] text-[var(--c-white)] border-t border-[var(--c-border)]/40 py-12 relative">
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--c-border)]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-[var(--c-white)] font-heading">{PERSONAL_INFO.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent)]" />
            </div>
            <p className="text-xs text-[var(--c-light)] mt-1">{String(PERSONAL_INFO.title).replace(/\s*\|\s*/g, ' · ')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--c-muted)]">
            {links.map((l) => (
              <a key={l.id} href={'#' + l.id} className="hover:text-[var(--c-white)] transition-colors">{l.nav}</a>
            ))}
            {THEME.showResumeButton && (
              <button onClick={onOpenResume} className="text-[var(--c-accent)] hover:text-[var(--c-white)] transition-colors cursor-pointer">{SITE.footer.cvLabel}</button>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[var(--c-light)]/70">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[var(--c-accent)]" />
            <span>{SITE.footer.base}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. {SITE.footer.rights}</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1.5 text-[var(--c-white)] hover:text-[var(--c-accent)] transition-colors cursor-pointer">
              <span>{SITE.footer.topLabel}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
