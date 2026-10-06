import React from 'react';
import { SmartImg, SectionHead } from './ui';
import { EXPERIENCES, SITE } from '../data/portfolioData';
import { CheckCircle2, TrendingUp, AlertTriangle, Building2, MapPin, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-[var(--sec-py)] bg-[var(--c-paper)] text-[var(--c-ink)] relative">
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <SectionHead id="experience" tone="light" size="lg" kicker={SITE.experience.kicker} title={SITE.experience.title} desc={SITE.experience.desc} />

        {/* 3 Large Experience Blocks */}
        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => {
            const isBharatGas = !!exp.isSafetyCritical;

            return (
              <div
                key={exp.id}
                className={`border ${
                  isBharatGas
                    ? 'border-[var(--c-accent)]/80 bg-[var(--c-paper)] shadow-md'
                    : 'border-[var(--c-ink)]/20 bg-[var(--c-card)] shadow-sm'
                } p-6 sm:p-8 lg:p-10 transition-all hover:shadow-xl relative overflow-hidden`}
              >
                {/* Top Corner Badge for Safety Critical or Active */}
                {isBharatGas && (
                  <div className="absolute top-0 right-0 bg-[var(--c-accent)] text-[var(--c-white)] px-4 py-1.5 text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{SITE.experience.safetyBadge}</span>
                  </div>
                )}

                {exp.isCurrent && (
                  <div className="absolute top-0 right-0 bg-[var(--c-primary)] text-[var(--c-white)] px-4 py-1.5 text-xs font-bold font-mono tracking-widest uppercase">
                    {SITE.experience.currentBadge}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Organization, Role, and Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      {/* Timeline & Location */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--c-primary)]/80 mb-3 uppercase">
                        <span className="flex items-center gap-1 font-bold text-[var(--c-accent)]">
                          <Calendar className="w-3.5 h-3.5" /> {exp.period}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {exp.location}
                        </span>
                      </div>

                      {/* Company Name */}
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-[var(--c-ink-strong)] font-heading tracking-tight mb-2">
                        {exp.company}
                      </h3>

                      {/* Role */}
                      <div className="text-lg font-bold text-[var(--c-primary)] font-heading mb-4">
                        {exp.role}
                      </div>

                      {/* Progression Visual Indicator for Prabhath */}
                      {exp.progression && (
                        <div className="mb-6 p-3 bg-[var(--c-primary)]/5 border-l-4 border-[var(--c-primary)] flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-[var(--c-primary)] shrink-0" />
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[var(--c-primary)]/70 uppercase block">
                              {SITE.experience.progressionLabel}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[var(--c-ink-strong)]">
                              {exp.progression}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Responsibilities List */}
                      <div className="mt-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--c-ink)]/70 font-semibold mb-3">
                          {SITE.experience.listLabel}
                        </h4>
                        <ul className="space-y-2.5">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--c-ink)]/90 leading-relaxed">
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isBharatGas ? 'text-[var(--c-accent)]' : 'text-[var(--c-primary)]'
                                }`}
                              />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Operational Tags */}
                    <div className="mt-8 pt-6 border-t border-[var(--c-ink)]/10 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 ${
                            isBharatGas
                              ? 'bg-[var(--c-accent)]/15 text-[var(--c-accent)] border border-[var(--c-accent)]/30'
                              : 'bg-[var(--c-primary)]/10 text-[var(--c-primary)] border border-[var(--c-primary)]/20'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Large Warehouse Image Beside Text */}
                  {exp.image && (
                    <div className="lg:col-span-5 h-full">
                      <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden border border-[var(--c-ink)]/20 bg-[var(--c-primary)]">
                        <SmartImg
                          src={exp.image}
                          alt={`${exp.company} operations`}
                          className="w-full h-full object-cover filter contrast-105 brightness-95 transform hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-transparent to-transparent opacity-60" />

                        {/* Image Footnote */}
                        <div className="absolute bottom-3 left-3 right-3 p-2 bg-[var(--c-bg)]/90 border border-white/10 text-[10px] font-mono text-[var(--c-text)] uppercase tracking-wider flex items-center justify-between">
                          <span>{SITE.experience.imageNote} // {exp.location.toUpperCase()}</span>
                          <span className="text-[var(--c-accent)]">{SITE.experience.imageBadge}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
