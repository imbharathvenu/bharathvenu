import React from 'react';
import { SectionHead } from './ui';
import { EDUCATION, SITE } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-[var(--sec-py)] bg-[var(--c-bg)] text-[var(--c-white)] relative">
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <SectionHead id="education" tone="dark" size="md" kicker={SITE.education.kicker} title={SITE.education.title} desc={SITE.education.desc} />

        {/* Structured Timeline Cards */}
        <div className="space-y-4 max-w-5xl">
          {EDUCATION.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 bg-[var(--c-primary)]/40 border border-[var(--c-border)]/60 hover:border-[var(--c-light)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--c-bg)] text-[var(--c-accent)] border border-[var(--c-border)]/60 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--c-light)] uppercase mb-1">
                    <span>{item.institution}</span>
                    {item.score && (
                      <span className="text-[var(--c-accent)] font-bold">· {SITE.education.scoreLabel} {item.score}</span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[var(--c-white)] font-heading">
                    {item.degree}
                  </h3>
                  {item.highlight && (
                    <p className="text-xs text-[var(--c-muted)] mt-1">
                      {item.highlight}
                    </p>
                  )}
                </div>
              </div>

              {/* Period Badge */}
              <div className="self-start md:self-center shrink-0">
                <span className="inline-block px-3 py-1 bg-[var(--c-surface)] border border-[var(--c-border)] text-xs font-mono font-bold text-[var(--c-white)] uppercase tracking-wider">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
