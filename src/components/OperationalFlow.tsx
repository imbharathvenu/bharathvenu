import React, { useState } from 'react';
import { SectionHead } from './ui';
import { FLOW_STEPS, SITE } from '../data/portfolioData';
import { FlowStep } from '../types';
import { ArrowRight, CheckCircle2, ChevronRight, CornerDownRight, Play } from 'lucide-react';

export const OperationalFlow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep: FlowStep = FLOW_STEPS[Math.min(activeStepIndex, FLOW_STEPS.length - 1)] ?? FLOW_STEPS[0];

  return (
    <section id="flow" className="py-[var(--sec-py)] bg-[var(--c-bg)] text-[var(--c-white)] relative overflow-hidden">
      {/* Background Subtle Industrial Grid */}
      <div className="absolute inset-0 warehouse-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <SectionHead id="flow" tone="dark" size="md" kicker={SITE.flow.kicker} title={SITE.flow.title} desc={SITE.flow.desc} accents={['', 'text-[var(--c-light)]']} />

        {/* Continuous Horizontal Pipeline Route with Animated Orange Traveling Node */}
        <div className="relative mb-12 py-6">
          {/* Horizontal Track Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--c-border)]/60 -translate-y-1/2 z-0">
            {/* Animated Orange Node Traveling across stages */}
            <div className="w-12 h-[3px] bg-[var(--c-accent)] animate-cargo-node shadow-[0_0_12px_var(--c-accent)]" />
          </div>

          {/* Steps Grid */}
          <div style={{ ["--steps" as any]: Math.max(1, FLOW_STEPS.length) }} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] gap-3 relative z-10">
            {FLOW_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`text-left p-3.5 sm:p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[var(--c-secondary)] border-[var(--c-accent)] shadow-lg translate-y-[-2px]'
                      : 'bg-[var(--c-primary)]/50 border-[var(--c-border)]/60 hover:border-[var(--c-light)] hover:bg-[var(--c-primary)]'
                  }`}
                >
                  {/* Step Sequence & Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[var(--c-light)]">
                      {String(step.step).padStart(2, '0')}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isSelected ? 'bg-[var(--c-accent)] shadow-[0_0_8px_var(--c-accent)]' : 'bg-[var(--c-border)]'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--c-white)] font-heading">
                      {step.name}
                    </h3>
                    <p className="text-[10px] text-[var(--c-muted)] mt-1 font-mono truncate">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Mobile Arrow */}
                  <div className="mt-3 lg:hidden flex justify-end">
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--c-light)]" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Inspector */}
        <div className="bg-[var(--c-surface)] border border-[var(--c-border)] p-6 sm:p-8 lg:p-10 relative shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--c-border)]/60 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-[var(--c-accent)] text-[var(--c-ink-strong)] text-xs font-black font-mono">
                STAGE {String(currentStep.step).padStart(2, '0')} OF {String(FLOW_STEPS.length).padStart(2, '0')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-[var(--c-white)] font-heading">
                {currentStep.name} <span className="text-[var(--c-light)] text-base font-normal font-sans">· {currentStep.subtitle}</span>
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--c-light)]">
              <span>{SITE.flow.hint}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Standard Operating Procedure */}
            <div className="lg:col-span-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--c-light)] mb-2 font-semibold flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                {SITE.flow.sopLabel}
              </div>
              <p className="text-sm sm:text-base text-[var(--c-text)] leading-relaxed mb-6 font-normal">
                {currentStep.sop}
              </p>

              <div className="p-4 bg-[var(--c-bg)] border border-[var(--c-border)]/60">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--c-muted)] mb-1">
                  {SITE.flow.actionLabel}
                </div>
                <div className="text-sm font-semibold text-[var(--c-white)]">
                  {currentStep.keyAction}
                </div>
              </div>
            </div>

            {/* Supervisor Checkpoint */}
            <div className="p-5 bg-[var(--c-primary)] border-l-4 border-[var(--c-accent)] flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--c-accent)] font-bold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {SITE.flow.signoffLabel}
                </div>
                <div className="text-sm text-[var(--c-white)] font-medium leading-relaxed">
                  {currentStep.supervisorCheckpoint}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--c-border)] flex items-center justify-between text-[11px] font-mono text-[var(--c-light)]">
                <span>{SITE.flow.protocolLabel}</span>
                <span className="text-[var(--c-white)]">{SITE.flow.protocolValue}</span>
              </div>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--c-border)]/50">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : FLOW_STEPS.length - 1))}
              className="text-xs font-mono uppercase tracking-wider text-[var(--c-light)] hover:text-[var(--c-white)] px-3 py-1.5 border border-[var(--c-border)] bg-[var(--c-bg)] cursor-pointer"
            >
              {SITE.flow.prevLabel}
            </button>
            <button
              onClick={() => setActiveStepIndex((prev) => (prev < FLOW_STEPS.length - 1 ? prev + 1 : 0))}
              className="text-xs font-mono uppercase tracking-wider text-[var(--c-ink-strong)] bg-[var(--c-accent)] hover:bg-[var(--c-white)] px-4 py-1.5 font-bold cursor-pointer transition-colors"
            >
              {SITE.flow.nextLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
