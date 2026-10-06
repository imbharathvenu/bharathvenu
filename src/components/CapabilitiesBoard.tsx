import React, { useState } from 'react';
import { CAPABILITIES_BOARD } from '../data/portfolioData';
import { CapabilityArea } from '../types';
import { ArrowUpRight, X, CheckSquare, Layers } from 'lucide-react';

export const CapabilitiesBoard: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<CapabilityArea | null>(null);

  return (
    <section id="operations" className="py-24 bg-[#063F4B] text-white relative overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 warehouse-grid-subtle opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#236477]/50 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-3">
              <span className="font-bold text-[#E8892B]">02</span>
              <span>/</span>
              <span>OPERATIONS PORTFOLIO BOARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              AREAS OF EXPERTISE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#ADB8BD] max-w-md mt-4 md:mt-0 font-normal">
            Modular operational board showcasing core competency disciplines across high-throughput warehouse logistics and supply chain execution.
          </p>
        </div>

        {/* Modular Rectangular Portfolio Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CAPABILITIES_BOARD.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedCapability(item)}
              className="group relative bg-[#081F26] border border-[#236477]/70 hover:border-[#E8892B] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-lg"
            >
              {/* Image Header with Aspect Ratio & Editorial Treatment */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#102932]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-108 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081F26] via-[#063F4B]/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Panel Index Indicator */}
                <div className="absolute top-3 left-3 text-[11px] font-mono text-[#7DAFB9] px-2 py-0.5 bg-[#081F26]/90 border border-[#236477]/60">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {item.metrics && (
                  <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-[#E8892B] px-2 py-0.5 bg-[#081F26]/90 border border-[#E8892B]/40">
                    {item.metrics}
                  </div>
                )}
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-white font-heading group-hover:text-[#E8892B] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#7DAFB9] group-hover:text-[#E8892B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-[#ADB8BD] mt-2.5 leading-relaxed font-normal">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#236477]/40 flex items-center justify-between text-[11px] text-[#7DAFB9] font-mono">
                  <span>EXPAND SOP SPEC</span>
                  <span className="text-[#E8892B] font-bold">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal for Capability Deep Dive */}
      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081F26]/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#102932] border border-[#236477] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedCapability(null)}
              className="absolute top-5 right-5 text-[#ADB8BD] hover:text-white p-1"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8892B] mb-2">
              <Layers className="w-4 h-4" />
              <span>OPERATIONAL PROTOCOL SPECIFICATION</span>
            </div>

            <h3 className="text-2xl font-black uppercase text-white font-heading mb-3">
              {selectedCapability.title}
            </h3>

            <p className="text-sm text-[#ADB8BD] mb-6">
              {selectedCapability.shortDesc}
            </p>

            <div className="space-y-3 mb-6 bg-[#081F26] p-5 border border-[#236477]/60">
              <div className="text-xs font-mono uppercase text-[#7DAFB9] font-semibold tracking-wider mb-2">
                SUPERVISORY EXECUTION CHECKLIST:
              </div>
              {selectedCapability.detailedScope.map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#F4F2EB]">
                  <CheckSquare className="w-4 h-4 text-[#E8892B] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#236477]">
              {selectedCapability.metrics && (
                <div className="text-xs font-mono text-[#7DAFB9]">
                  TARGET BENCHMARK: <span className="text-white font-bold">{selectedCapability.metrics}</span>
                </div>
              )}
              <button
                onClick={() => setSelectedCapability(null)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#E8892B] text-[#081F26] hover:bg-white transition-colors cursor-pointer"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
