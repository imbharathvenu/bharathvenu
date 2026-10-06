import React from 'react';
import { IMAGES, SITE } from '../data/portfolioData';
import { SmartImg, Lines } from './ui';

export const FeatureBanner: React.FC = () => (
  <section id="banner" className="relative h-[65vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-[var(--c-primary)]">
    <SmartImg src={SITE.banner.image || IMAGES.forklift} alt={SITE.banner.kicker} className="absolute inset-0 w-full h-full object-cover filter contrast-115 brightness-75 scale-105" />

    <div className="absolute inset-0 bg-[var(--c-primary)] mix-blend-multiply" style={{ opacity: 'var(--banner-overlay, 0.8)' }} />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-primary)]/50 to-[var(--c-bg)]/90" />

    <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--c-bg)]/80 border border-[var(--c-border)] text-[10px] font-mono tracking-[0.3em] text-[var(--c-light)] uppercase mb-6">
        {SITE.banner.kicker}
      </div>
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[var(--c-white)] tracking-tight leading-[1.05] font-heading mb-6">
        <Lines text={SITE.banner.title} colors={['', '', 'text-[var(--c-accent)]']} />
      </h2>
      <div className="w-12 h-[2px] bg-[var(--c-accent)] mx-auto mb-6" />
      <p className="text-base sm:text-xl text-[var(--c-text)] max-w-2xl mx-auto font-light leading-relaxed">{SITE.banner.text}</p>
    </div>

    <div className="absolute bottom-4 left-6 right-6 hidden md:flex items-center justify-between text-[10px] font-mono text-[var(--c-light)]/60 uppercase tracking-widest pointer-events-none">
      <span>{SITE.banner.footLeft}</span>
      <span>{SITE.banner.footRight}</span>
    </div>
  </section>
);
