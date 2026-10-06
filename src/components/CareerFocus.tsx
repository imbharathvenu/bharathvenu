import React from 'react';
import { CAREER_TARGETS, SITE } from '../data/portfolioData';
import { Lines } from './ui';
import { ArrowRight, Compass } from 'lucide-react';

export const CareerFocus: React.FC = () => (
  <section id="career" className="py-[var(--sec-py)] bg-[var(--c-bg)] border-y border-[var(--c-border)]/40 text-[var(--c-white)] relative">
    <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--c-light)] mb-4">
            <Compass className="w-4 h-4 text-[var(--c-accent)]" />
            <span>{SITE.career.kicker}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--c-white)] leading-[0.95] font-heading">
            <Lines text={SITE.career.title} colors={['', 'text-[var(--c-light)]', 'text-[var(--c-accent)]']} />
          </h2>
          <p className="text-sm text-[var(--c-muted)] mt-6 max-w-sm">{SITE.career.desc}</p>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col space-y-3">
            {CAREER_TARGETS.map((target, idx) => (
              <div key={target + idx} className="group p-4 sm:p-5 bg-[var(--c-primary)]/40 border border-[var(--c-border)]/60 hover:border-[var(--c-accent)] hover:bg-[var(--c-primary)] transition-all flex items-center justify-between cursor-default">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[var(--c-light)]">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[var(--c-white)] font-heading group-hover:text-[var(--c-accent)] transition-colors">{target}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--c-light)] group-hover:text-[var(--c-accent)] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
