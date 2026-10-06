import React, { useState } from 'react';
import { FLOW_STEPS } from '../data/portfolioData';
import { FlowStep } from '../types';
import { ArrowRight, CheckCircle2, ChevronRight, CornerDownRight, Play } from 'lucide-react';

export const OperationalFlow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep: FlowStep = FLOW_STEPS[activeStepIndex];

  return (
    <section id="flow" className="py-24 bg-[#081F26] text-white relative overflow-hidden">
      {/* Background Subtle Industrial Grid */}
      <div className="absolute inset-0 warehouse-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#236477]/40 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-3">
              <span className="font-bold text-[#E8892B]">04</span>
              <span>/</span>
              <span>STANDARD OPERATING PROCEDURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              FROM RECEIVING
              <br />
              <span className="text-[#7DAFB9]">TO DISPATCH</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#ADB8BD] max-w-md mt-4 md:mt-0 font-normal">
            Continuous logistics pipeline maintaining end-to-end cargo integrity, FIFO accuracy, and zero-defect handover.
          </p>
        </div>

        {/* Continuous Horizontal Pipeline Route with Animated Orange Traveling Node */}
        <div className="relative mb-12 py-6">
          {/* Horizontal Track Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-[#236477]/60 -translate-y-1/2 z-0">
            {/* Animated Orange Node Traveling across stages */}
            <div className="w-12 h-[3px] bg-[#E8892B] animate-cargo-node shadow-[0_0_12px_#E8892B]" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
            {FLOW_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`text-left p-3.5 sm:p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0B5260] border-[#E8892B] shadow-lg translate-y-[-2px]'
                      : 'bg-[#063F4B]/50 border-[#236477]/60 hover:border-[#7DAFB9] hover:bg-[#063F4B]'
                  }`}
                >
                  {/* Step Sequence & Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#7DAFB9]">
                      0{step.step}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isSelected ? 'bg-[#E8892B] shadow-[0_0_8px_#E8892B]' : 'bg-[#236477]'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-heading">
                      {step.name}
                    </h3>
                    <p className="text-[10px] text-[#ADB8BD] mt-1 font-mono truncate">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Mobile Arrow */}
                  <div className="mt-3 lg:hidden flex justify-end">
                    <ChevronRight className="w-3.5 h-3.5 text-[#7DAFB9]" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Inspector */}
        <div className="bg-[#102932] border border-[#236477] p-6 sm:p-8 lg:p-10 relative shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#236477]/60 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-[#E8892B] text-[#081F26] text-xs font-black font-mono">
                STAGE 0{currentStep.step} OF 07
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-heading">
                {currentStep.name} <span className="text-[#7DAFB9] text-base font-normal font-sans">· {currentStep.subtitle}</span>
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#7DAFB9]">
              <span>CLICK TO NAVIGATE ROUTE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Standard Operating Procedure */}
            <div className="lg:col-span-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#7DAFB9] mb-2 font-semibold flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-[#E8892B]" />
                STANDARD OPERATING PROCEDURE (SOP)
              </div>
              <p className="text-sm sm:text-base text-[#F4F2EB] leading-relaxed mb-6 font-normal">
                {currentStep.sop}
              </p>

              <div className="p-4 bg-[#081F26] border border-[#236477]/60">
                <div className="text-xs font-mono uppercase tracking-wider text-[#ADB8BD] mb-1">
                  FLOOR EXECUTION ACTION
                </div>
                <div className="text-sm font-semibold text-white">
                  {currentStep.keyAction}
                </div>
              </div>
            </div>

            {/* Supervisor Checkpoint */}
            <div className="p-5 bg-[#063F4B] border-l-4 border-[#E8892B] flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#E8892B] font-bold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  SUPERVISOR SIGN-OFF
                </div>
                <div className="text-sm text-white font-medium leading-relaxed">
                  {currentStep.supervisorCheckpoint}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#236477] flex items-center justify-between text-[11px] font-mono text-[#7DAFB9]">
                <span>MANDATORY PROTOCOL</span>
                <span className="text-white">ENFORCED</span>
              </div>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#236477]/50">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : FLOW_STEPS.length - 1))}
              className="text-xs font-mono uppercase tracking-wider text-[#7DAFB9] hover:text-white px-3 py-1.5 border border-[#236477] bg-[#081F26] cursor-pointer"
            >
              ← Previous Stage
            </button>
            <button
              onClick={() => setActiveStepIndex((prev) => (prev < FLOW_STEPS.length - 1 ? prev + 1 : 0))}
              className="text-xs font-mono uppercase tracking-wider text-[#081F26] bg-[#E8892B] hover:bg-white px-4 py-1.5 font-bold cursor-pointer transition-colors"
            >
              Next Stage →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
