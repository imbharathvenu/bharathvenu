import React, { useState } from 'react';
import { SmartImg, SectionHead } from './ui';
import { CAPABILITIES_BOARD, SITE } from '../data/portfolioData';
import { CapabilityArea } from '../types';
import { ArrowUpRight, X, CheckSquare, Layers } from 'lucide-react';

export const CapabilitiesBoard: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<CapabilityArea | null>(null);

  return (
    <section id="operations" className="py-[var(--sec-py)] bg-[var(--c-primary)] text-[var(--c-white)] relative overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 warehouse-grid-subtle opacity-40 pointer-events-none" />

      <div className="relative max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <SectionHead id="operations" tone="dark" size="md" kicker={SITE.operations.kicker} title={SITE.operations.title} desc={SITE.operations.desc} />

        {/* Modular Rectangular Portfolio Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CAPABILITIES_BOARD.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedCapability(item)}
              className="group relative bg-[var(--c-bg)] border border-[var(--c-border)]/70 hover:border-[var(--c-accent)] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-lg"
            >
              {/* Image Header with Aspect Ratio & Editorial Treatment */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--c-surface)]">
                <SmartImg
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-108 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-primary)]/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Panel Index Indicator */}
                <div className="absolute top-3 left-3 text-[11px] font-mono text-[var(--c-light)] px-2 py-0.5 bg-[var(--c-bg)]/90 border border-[var(--c-border)]/60">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {item.metrics && (
                  <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-[var(--c-accent)] px-2 py-0.5 bg-[var(--c-bg)]/90 border border-[var(--c-accent)]/40">
                    {item.metrics}
                  </div>
                )}
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-[var(--c-white)] font-heading group-hover:text-[var(--c-accent)] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--c-light)] group-hover:text-[var(--c-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-[var(--c-muted)] mt-2.5 leading-relaxed font-normal">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--c-border)]/40 flex items-center justify-between text-[11px] text-[var(--c-light)] font-mono">
                  <span>{SITE.operations.expandLabel}</span>
                  <span className="text-[var(--c-accent)] font-bold">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal for Capability Deep Dive */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--c-bg)]/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[var(--c-surface)] border border-[var(--c-border)] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-5 right-5 text-[var(--c-muted)] hover:text-[var(--c-white)] p-1"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--c-accent)] mb-2">
              <Layers className="w-4 h-4" />
              <span>{SITE.operations.modalKicker}</span>
            </div>

            <h3 className="text-2xl font-black uppercase text-[var(--c-white)] font-heading mb-3">
              {selectedCapability.title}
            </h3>

            <p className="text-sm text-[var(--c-muted)] mb-6">
              {selectedCapability.shortDesc}
            </p>

            <div className="space-y-3 mb-6 bg-[var(--c-bg)] p-5 border border-[var(--c-border)]/60">
              <div className="text-xs font-mono uppercase text-[var(--c-light)] font-semibold tracking-wider mb-2">
                {SITE.operations.checklistLabel}
              </div>
              {selectedCapability.detailedScope.map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--c-text)]">
                  <CheckSquare className="w-4 h-4 text-[var(--c-accent)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--c-border)]">
              {selectedCapability.metrics && (
                <div className="text-xs font-mono text-[var(--c-light)]">
                  {SITE.operations.benchmarkLabel} <span className="text-[var(--c-white)] font-bold">{selectedCapability.metrics}</span>
                </div>
              )}
              <button
                onClick={() => setSelectedCapability(null)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[var(--c-accent)] text-[var(--c-ink-strong)] hover:bg-[var(--c-white)] transition-colors cursor-pointer"
              >
                {SITE.operations.closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
