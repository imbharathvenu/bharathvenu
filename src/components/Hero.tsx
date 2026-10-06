import React from 'react';
import { ArrowDown, FileText, Compass, ShieldCheck, Box } from 'lucide-react';
import { PERSONAL_INFO, IMAGES, SITE, THEME } from '../data/portfolioData';
import { SmartImg } from './ui';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  // The name & title come straight from Personal info, so editing them in the admin changes the hero, navbar, footer and CV.
  const [first, ...rest] = String(PERSONAL_INFO.name || '').trim().split(/\s+/);
  const [role, ...sub] = String(PERSONAL_INFO.title || '').split('|');
  const showImage = THEME.heroImage !== 'hidden' && !!IMAGES.hero;
  const imageLeft = THEME.heroImage === 'left';

  return (
    <section id="top" className="relative min-h-[95vh] pt-28 pb-16 flex items-center bg-[var(--c-bg)] overflow-hidden">
      <div className="absolute inset-0 warehouse-grid opacity-60 pointer-events-none" />

      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--c-border)]/40 to-transparent pointer-events-none">
        <div className="w-16 h-[2px] bg-[var(--c-accent)] animate-cargo-node opacity-80" />
      </div>
      <div className="absolute bottom-12 left-0 right-0 h-[1px] bg-[var(--c-border)]/20 pointer-events-none" />

      {PERSONAL_INFO.hubCoordinates && (
        <div className="absolute top-24 right-12 hidden lg:flex items-center gap-3 text-[11px] font-mono text-[var(--c-light)]/80 uppercase tracking-widest border border-[var(--c-border)]/50 px-3 py-1 bg-[var(--c-primary)]/40">
          <Compass className="w-3.5 h-3.5 text-[var(--c-accent)]" />
          <span>{SITE.hero.hubLabel} · {PERSONAL_INFO.hubCoordinates}</span>
        </div>
      )}

      <div className="relative max-w-[var(--content-w)] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className={`${showImage ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col justify-center z-10 ${imageLeft ? 'lg:order-2' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-[2px] bg-[var(--c-accent)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--c-light)] font-semibold">{SITE.hero.kicker}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-[var(--c-white)] tracking-tight leading-[0.92] mb-6 font-heading break-words">
              {first}
              {rest.length > 0 && (<><br /><span className="text-[var(--c-text)] drop-shadow-sm">{rest.join(' ')}</span></>)}
            </h1>

            <div className="border-l-2 border-[var(--c-accent)] pl-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--c-white)] tracking-tight font-heading">{role.trim()}</h2>
              {sub.length > 0 && <p className="text-sm sm:text-base text-[var(--c-light)] font-medium tracking-wide">{sub.join('|').trim()}</p>}
            </div>

            <p className="text-base sm:text-lg text-[var(--c-muted)] max-w-xl leading-relaxed mb-8 font-normal">{PERSONAL_INFO.tagline}</p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#experience" className="group flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--c-ink-strong)] bg-[var(--c-paper)] hover:bg-[var(--c-accent)] hover:text-[var(--c-white)] transition-all cursor-pointer shadow-md">
                <span>{SITE.hero.primaryButton}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              {THEME.showResumeButton && (
                <button onClick={onOpenResume} className="group flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--c-white)] bg-[var(--c-primary)] hover:bg-[var(--c-secondary)] border border-[var(--c-border)] hover:border-[var(--c-light)] transition-all cursor-pointer">
                  <FileText className="w-4 h-4 text-[var(--c-accent)]" />
                  <span>{SITE.hero.resumeButton}</span>
                </button>
              )}
            </div>

            {SITE.hero.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--c-border)]/40 max-w-lg">
                {SITE.hero.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-xs uppercase tracking-wider text-[var(--c-light)]">{m.label}</div>
                    <div className={`text-lg font-bold font-mono mt-0.5 ${m.highlight ? 'text-[var(--c-accent)]' : 'text-[var(--c-white)]'}`}>{m.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showImage && (
            <div className={`lg:col-span-5 relative ${imageLeft ? 'lg:order-1' : ''}`}>
              <div className="relative border border-[var(--c-border)]/60 bg-[var(--c-primary)]/30 p-2 shadow-2xl">
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[var(--c-accent)]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[var(--c-accent)]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[var(--c-accent)]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[var(--c-accent)]" />

                <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] bg-[var(--c-primary)]">
                  <SmartImg
                    src={IMAGES.hero}
                    alt={SITE.hero.imageAlt}
                    className="w-full h-full object-cover filter contrast-110 brightness-95 transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-primary)]/30 to-transparent mix-blend-multiply opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--c-primary)]/50 via-transparent to-[var(--c-surface)]/40" />

                  <div className="absolute bottom-4 left-4 right-4 bg-[var(--c-bg)]/90 backdrop-blur-sm border border-[var(--c-border)]/70 p-4">
                    <div className="flex items-center justify-between text-[10px] tracking-widest text-[var(--c-light)] font-mono uppercase mb-1">
                      <span>{SITE.hero.cardSector}</span>
                      <span className="text-[var(--c-accent)]">{SITE.hero.cardStatus}</span>
                    </div>
                    <div className="text-sm font-bold text-[var(--c-white)] uppercase font-heading">{SITE.hero.cardTitle}</div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-[var(--c-muted)]">
                      <span className="flex items-center gap-1"><Box className="w-3 h-3 text-[var(--c-accent)]" /> {SITE.hero.cardTagOne}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[var(--c-light)]" /> {SITE.hero.cardTagTwo}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[var(--c-border)]/30 -z-10 hidden sm:block pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
