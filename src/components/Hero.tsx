import React from 'react';
import { ArrowDown, FileText, Compass, ShieldCheck, Box } from 'lucide-react';
import { PERSONAL_INFO, IMAGES } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="relative min-h-[95vh] pt-28 pb-16 flex items-center bg-[#081F26] overflow-hidden">
      {/* Background Industrial Grid & Subtle Cargo Movement Lines */}
      <div className="absolute inset-0 warehouse-grid opacity-60 pointer-events-none" />
      
      {/* Subtle Horizontal Logistics Route Line */}
      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#236477]/40 to-transparent pointer-events-none">
        <div className="w-16 h-[2px] bg-[#E8892B] animate-cargo-node opacity-80" />
      </div>

      <div className="absolute bottom-12 left-0 right-0 h-[1px] bg-[#236477]/20 pointer-events-none" />

      {/* Coordinate & Operational Markers */}
      <div className="absolute top-24 right-12 hidden lg:flex items-center gap-3 text-[11px] font-mono text-[#7DAFB9]/80 uppercase tracking-widest border border-[#236477]/50 px-3 py-1 bg-[#063F4B]/40">
        <Compass className="w-3.5 h-3.5 text-[#E8892B]" />
        <span>OPS HUB // TRV · {PERSONAL_INFO.hubCoordinates}</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetrical Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Small Technical Kicker */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-[2px] bg-[#E8892B]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7DAFB9] font-semibold">
                LOGISTICS / WAREHOUSE / OPERATIONS
              </span>
            </div>

            {/* Oversized Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[0.92] mb-6 font-heading">
              BHARATH
              <br />
              <span className="text-[#F4F2EB] drop-shadow-sm">VENU</span>
            </h1>

            {/* Role & Title */}
            <div className="border-l-2 border-[#E8892B] pl-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
                Warehouse Supervisor
              </h2>
              <p className="text-sm sm:text-base text-[#7DAFB9] font-medium tracking-wide">
                Logistics & Supply Chain Operations
              </p>
            </div>

            {/* Professional One-Line Positioning */}
            <p className="text-base sm:text-lg text-[#ADB8BD] max-w-xl leading-relaxed mb-8 font-normal">
              {PERSONAL_INFO.tagline}
            </p>

            {/* Editorial CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#experience"
                className="group flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#081F26] bg-[#F4F2EB] hover:bg-[#E8892B] hover:text-white transition-all cursor-pointer shadow-md"
              >
                <span>View Experience</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="group flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#063F4B] hover:bg-[#0B5260] border border-[#236477] hover:border-[#7DAFB9] transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#E8892B]" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#236477]/40 max-w-lg">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#7DAFB9]">SUPERVISION</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">LULU & BHARAT GAS</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#7DAFB9]">SAFETY PROTOCOL</div>
                <div className="text-lg font-bold text-[#E8892B] font-mono mt-0.5">100% SOP</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#7DAFB9]">DISCIPLINE</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">BOXING · NCC</div>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Warehouse Image Panel */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#236477]/60 bg-[#063F4B]/30 p-2 shadow-2xl">
              {/* Corner Coordinate Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#E8892B]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#E8892B]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#E8892B]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#E8892B]" />

              {/* Main Image Container with Teal Overlay & High Contrast */}
              <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] bg-[#063F4B]">
                <img
                  src={IMAGES.hero}
                  alt="Industrial distribution warehouse aisles and pallet storage racks"
                  className="w-full h-full object-cover filter contrast-110 brightness-95 transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Industrial Dark Teal Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081F26] via-[#063F4B]/30 to-transparent mix-blend-multiply opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#063F4B]/50 via-transparent to-[#102932]/40" />

                {/* Overlaid Editorial Metadata Box */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#081F26]/90 backdrop-blur-sm border border-[#236477]/70 p-4">
                  <div className="flex items-center justify-between text-[10px] tracking-widest text-[#7DAFB9] font-mono uppercase mb-1">
                    <span>SECTOR 04 // STORAGE & DOCKS</span>
                    <span className="text-[#E8892B]">ACTIVE</span>
                  </div>
                  <div className="text-sm font-bold text-white uppercase font-heading">
                    HIGH-BAY PALLET AUTOMATION & DISPATCH
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#ADB8BD]">
                    <span className="flex items-center gap-1">
                      <Box className="w-3 h-3 text-[#E8892B]" /> FIFO / FEFO Flow
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#7DAFB9]" /> Zero Variance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle background industrial accent block */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#236477]/30 -z-10 hidden sm:block pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
