import React from 'react';
import { LEADERSHIP, LANGUAGES } from '../data/portfolioData';
import { Shield, Target, Flame, Globe2, Award } from 'lucide-react';

export const Leadership: React.FC = () => {
  const icons = [Flame, Target, Shield];

  return (
    <section className="py-24 bg-[#063F4B] text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 warehouse-grid-subtle opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#236477]/50 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-3">
              <span className="font-bold text-[#E8892B]">07</span>
              <span>/</span>
              <span>TACTICAL DISCIPLINE & ATHLETICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              DISCIPLINE BEYOND THE WAREHOUSE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#ADB8BD] max-w-md mt-4 md:mt-0 font-normal">
            Physical endurance, martial arts precision, and military cadet command structuring the mental fortitude required for high-stress dock operations.
          </p>
        </div>

        {/* 3 Editorial Leadership Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {LEADERSHIP.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                className="group relative bg-[#081F26] border border-[#236477]/70 hover:border-[#E8892B] p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Decorative Background Geometric Lines */}
                <div className="absolute -top-12 -right-12 w-32 h-32 border border-[#236477]/20 rotate-45 pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#7DAFB9]">
                      {item.category}
                    </span>
                    <div className="p-2 bg-[#063F4B] border border-[#236477] text-[#E8892B]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Distinction */}
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white font-heading mb-2">
                    {item.title}
                  </h3>

                  <div className="inline-block px-2.5 py-1 bg-[#063F4B]/80 text-[#E8892B] border border-[#E8892B]/40 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    {item.award}
                  </div>

                  <p className="text-xs sm:text-sm text-[#ADB8BD] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Keywords Chips */}
                <div className="pt-6 border-t border-[#236477]/50">
                  <div className="text-[10px] font-mono text-[#7DAFB9] uppercase tracking-wider mb-2">
                    OPERATIONAL ATTRIBUTES:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs font-semibold px-2.5 py-1 bg-[#102932] border border-[#236477] text-white uppercase tracking-wider"
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
        <div className="border-t border-[#236477]/50 pt-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7DAFB9] mb-6">
            <Globe2 className="w-4 h-4 text-[#E8892B]" />
            <span>LINGUISTIC CAPABILITIES (MULTILINGUAL DOCK COMMUNICATION)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="p-5 bg-[#081F26] border border-[#236477]/60 hover:border-[#7DAFB9] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base sm:text-lg font-black uppercase text-white font-heading">
                    {lang.name}
                  </span>
                  <span className="text-xs font-mono text-[#E8892B] font-bold">
                    {lang.proficiency}
                  </span>
                </div>
                <p className="text-[11px] text-[#ADB8BD]">
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
