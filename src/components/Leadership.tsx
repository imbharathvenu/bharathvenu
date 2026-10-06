import React from 'react';
import { SectionHead } from './ui';
import { LEADERSHIP, LANGUAGES, SITE } from '../data/portfolioData';
import { Shield, Target, Flame, Globe2, Award } from 'lucide-react';

export const Leadership: React.FC = () => {
  const icons = [Flame, Target, Shield];

  return (
    <section id="leadership" className="py-[var(--sec-py)] bg-[var(--c-primary)] text-[var(--c-white)] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 warehouse-grid-subtle opacity-30 pointer-events-none" />

      <div className="relative max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <SectionHead id="leadership" tone="dark" size="md" kicker={SITE.leadership.kicker} title={SITE.leadership.title} desc={SITE.leadership.desc} />

        {/* 3 Editorial Leadership Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {LEADERSHIP.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                className="group relative bg-[var(--c-bg)] border border-[var(--c-border)]/70 hover:border-[var(--c-accent)] p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Decorative Background Geometric Lines */}
                <div className="absolute -top-12 -right-12 w-32 h-32 border border-[var(--c-border)]/20 rotate-45 pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--c-light)]">
                      {item.category}
                    </span>
                    <div className="p-2 bg-[var(--c-primary)] border border-[var(--c-border)] text-[var(--c-accent)]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Distinction */}
                  <h3 className="text-3xl font-black uppercase tracking-tight text-[var(--c-white)] font-heading mb-2">
                    {item.title}
                  </h3>

                  <div className="inline-block px-2.5 py-1 bg-[var(--c-primary)]/80 text-[var(--c-accent)] border border-[var(--c-accent)]/40 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    {item.award}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--c-muted)] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Keywords Chips */}
                <div className="pt-6 border-t border-[var(--c-border)]/50">
                  <div className="text-[10px] font-mono text-[var(--c-light)] uppercase tracking-wider mb-2">
                    {SITE.leadership.attributesLabel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs font-semibold px-2.5 py-1 bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-white)] uppercase tracking-wider"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 15. LANGUAGES (Minimal Horizontal Layout) */}
        <div className="border-t border-[var(--c-border)]/50 pt-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--c-light)] mb-6">
            <Globe2 className="w-4 h-4 text-[var(--c-accent)]" />
            <span>{SITE.leadership.languagesLabel}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="p-5 bg-[var(--c-bg)] border border-[var(--c-border)]/60 hover:border-[var(--c-light)] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base sm:text-lg font-black uppercase text-[var(--c-white)] font-heading">
                    {lang.name}
                  </span>
                  <span className="text-xs font-mono text-[var(--c-accent)] font-bold">
                    {lang.proficiency}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--c-muted)]">
                  {lang.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
