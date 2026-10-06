import React from 'react';
import { IMAGES } from '../data/portfolioData';

export const FeatureBanner: React.FC = () => {
  return (
    <section className="relative h-[65vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-[#063F4B]">
      {/* Cinematic Warehouse Background */}
      <img
        src={IMAGES.forklift}
        alt="Cinematic warehouse operations"
        className="absolute inset-0 w-full h-full object-cover filter contrast-115 brightness-75 scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Dark Teal Overlay */}
      <div className="absolute inset-0 bg-[#063F4B]/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081F26] via-[#063F4B]/50 to-[#081F26]/90" />

      {/* Minimalist Centered Editorial Overlay */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#081F26]/80 border border-[#236477] text-[10px] font-mono tracking-[0.3em] text-[#7DAFB9] uppercase mb-6">
          OPERATIONAL MANIFESTO
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight leading-[1.05] font-heading mb-6">
          CONTROL.
          <br />
          COORDINATION.
          <br />
          <span className="text-[#E8892B]">COMPLIANCE.</span>
        </h2>

        <div className="w-12 h-[2px] bg-[#E8892B] mx-auto mb-6" />

        <p className="text-base sm:text-xl text-[#F4F2EB] max-w-2xl mx-auto font-light leading-relaxed">
          Reliable warehouse operations depend on accurate inventory, disciplined processes and coordinated teams.
        </p>
      </div>

      {/* Subtle Bottom Coordinate Tag */}
      <div className="absolute bottom-4 left-6 right-6 hidden md:flex items-center justify-between text-[10px] font-mono text-[#7DAFB9]/60 uppercase tracking-widest pointer-events-none">
        <span>LOGISTICS BENCHMARK: ZERO DEFECT THROUGHPUT</span>
        <span>SUPERVISORY DISCIPLINE</span>
      </div>
    </section>
  );
};
