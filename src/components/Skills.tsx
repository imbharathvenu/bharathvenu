import React from 'react';
import { SectionHead, iconFor } from './ui';
import { SKILL_CATEGORIES, SKILL_GRID, SITE } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const coreCapabilities = SKILL_GRID.map((c) => ({ ...c, icon: iconFor(c.icon) }));

  return (
    <section id="skills" className="py-[var(--sec-py)] bg-[var(--c-paper)] text-[var(--c-ink)] relative">
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <SectionHead id="skills" tone="light" size="lg" kicker={SITE.skills.kicker} title={SITE.skills.title} desc={SITE.skills.desc} />

        {/* Primary Typographic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-16">
          {coreCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.name + idx}
                className={`p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
                  cap.featured
                    ? 'bg-[var(--c-primary)] text-[var(--c-white)] border-[var(--c-primary)] shadow-md hover:bg-[var(--c-secondary)]'
                    : 'bg-[var(--c-card)] text-[var(--c-ink-strong)] border-[var(--c-ink)]/15 hover:border-[var(--c-primary)] hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-2 ${
                      cap.featured
                        ? 'bg-[var(--c-bg)] text-[var(--c-accent)]'
                        : 'bg-[var(--c-paper)] text-[var(--c-primary)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      cap.featured ? 'text-[var(--c-light)]' : 'text-[var(--c-ink)]/60'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                      cap.featured ? 'text-[var(--c-accent)]' : 'text-[var(--c-primary)]'
                    }`}
                  >
                    {cap.type}
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight font-heading leading-tight">
                    {cap.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Systematic Categorized Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[var(--c-ink)]/15">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--c-primary)] font-bold pb-2 border-b border-[var(--c-primary)]/20">
                {cat.category}
              </h4>
              <ul className="space-y-2">
                {cat.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between text-xs py-1">
                    <span className="font-semibold text-[var(--c-ink-strong)]">{s.name}</span>
                    <span className="text-[11px] font-mono text-[var(--c-primary)]/70">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
