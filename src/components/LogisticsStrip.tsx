import React from 'react';
import { SITE } from '../data/portfolioData';
import { SmartImg, iconFor } from './ui';

export const LogisticsStrip: React.FC = () => {
  const panels = SITE.strip.panels;
  return (
    <section id="strip" className="relative bg-[var(--c-bg)] border-y border-[var(--c-border)]/40 py-2 sm:py-4">
      <div className="max-w-[var(--content-w)] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 border-b border-[var(--c-border)]/30 mb-4 text-xs font-mono tracking-widest text-[var(--c-light)]">
          <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[var(--c-accent)]" />{SITE.strip.label}</span>
          <span className="hidden sm:inline">{SITE.strip.sublabel}</span>
        </div>

        <div className={`grid grid-cols-1 gap-3 md:gap-4 ${panels.length === 2 ? 'md:grid-cols-2' : panels.length === 1 ? 'md:grid-cols-1' : panels.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {panels.map((panel, i) => {
            const IconComponent = iconFor(panel.icon);
            return (
              <div key={i} className="group relative h-[380px] sm:h-[450px] lg:h-[500px] overflow-hidden bg-[var(--c-primary)] border border-[var(--c-border)]/50">
                <SmartImg src={panel.image} alt={panel.label} className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-primary)]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-[var(--c-bg)]/90 border border-[var(--c-border)] text-[11px] font-mono tracking-widest text-[var(--c-text)] uppercase">
                    <IconComponent className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                    <span>{panel.mode}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--c-light)]/80">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-6 h-[2px] bg-[var(--c-accent)] mb-2 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--c-white)] uppercase tracking-tight font-heading leading-tight mb-1">{panel.label}</h3>
                  <p className="text-xs text-[var(--c-muted)] font-normal leading-relaxed line-clamp-2">{panel.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
