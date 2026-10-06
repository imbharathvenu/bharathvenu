import React from 'react';
import { PERSONAL_INFO, PROFILE_TAGS } from '../data/portfolioData';
import { CheckCircle2, ShieldCheck, Layers, Users } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <section id="profile" className="py-24 bg-[#F4F2EB] text-[#102932] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex items-center gap-3 mb-12 text-xs font-mono uppercase tracking-[0.25em] text-[#063F4B]">
          <span className="font-bold text-[#E8892B]">01</span>
          <span>/</span>
          <span>PROFILE & OPERATIONAL MANDATE</span>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Oversized Statement Heading */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#081F26] leading-[0.95] font-heading">
              OPERATIONS
              <br />
              <span className="text-[#063F4B]">BUILT ON</span>
              <br />
              <span className="text-[#E8892B]">CONTROL</span>
            </h2>

            <div className="mt-8 pt-8 border-t border-[#102932]/15">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-3xl font-black font-heading text-[#063F4B]">100%</span>
                  <span className="text-xs uppercase tracking-wider text-[#063F4B]/70 font-medium">Safety SOP Compliance</span>
                </div>
                <div>
                  <span className="block text-3xl font-black font-heading text-[#E8892B]">24/7</span>
                  <span className="text-xs uppercase tracking-wider text-[#063F4B]/70 font-medium">High-Velocity Throughput</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Summary & Structured Tags */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div className="prose prose-lg text-[#102932]/90 max-w-none">
              <p className="text-xl sm:text-2xl font-light text-[#081F26] leading-relaxed mb-6">
                {PERSONAL_INFO.summary}
              </p>
              <p className="text-base text-[#102932]/80 leading-relaxed font-normal">
                Bridging strategic inventory planning with hands-on floor execution. From high-bay central retail distribution hubs handling multi-thousand SKU turnover to hazardous LPG storage terminals governed by strict statutory safety regulations, the operational focus remains anchored on discipline, team accountability, and zero-defect dispatch.
              </p>
            </div>

            {/* Small Structured Tags (Clean unboxed editorial chips with dividers) */}
            <div className="mt-10 pt-8 border-t border-[#102932]/15">
              <div className="text-xs font-mono uppercase tracking-widest text-[#063F4B]/70 mb-4 font-semibold">
                CORE OPERATIONAL DOMAINS
              </div>
              <div className="flex flex-wrap gap-2.5">
                {PROFILE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#063F4B] bg-[#063F4B]/8 border border-[#063F4B]/20"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8892B] mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Execution Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-white/70 border border-[#102932]/10">
                <ShieldCheck className="w-5 h-5 text-[#E8892B] mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#081F26]">Safety First</h4>
                <p className="text-[11px] text-[#102932]/70 mt-1">Hazard control, PPE adherence, and zero-incident operations.</p>
              </div>

              <div className="p-4 bg-white/70 border border-[#102932]/10">
                <Layers className="w-5 h-5 text-[#063F4B] mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#081F26]">Strict FIFO / FEFO</h4>
                <p className="text-[11px] text-[#102932]/70 mt-1">Rotation discipline eliminating obsolescence & aging variances.</p>
              </div>

              <div className="p-4 bg-white/70 border border-[#102932]/10">
                <Users className="w-5 h-5 text-[#063F4B] mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#081F26]">Crew Leadership</h4>
                <p className="text-[11px] text-[#102932]/70 mt-1">Motivated floor crews aligned with daily throughput targets.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
