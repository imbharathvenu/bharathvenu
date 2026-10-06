import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { CheckCircle2, TrendingUp, AlertTriangle, Building2, MapPin, Calendar } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#F4F2EB] text-[#102932] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#102932]/15 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#063F4B] mb-3">
              <span className="font-bold text-[#E8892B]">03</span>
              <span>/</span>
              <span>CAREER CHRONOLOGY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#081F26] font-heading">
              EXPERIENCE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#102932]/70 max-w-md mt-4 md:mt-0 font-normal">
            Track record of hands-on warehouse supervision, rapid operational promotion, and managing high-stakes, safety-critical hazardous cargo storage facilities.
          </p>
        </div>

        {/* 3 Large Experience Blocks */}
        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => {
            const isLulu = exp.id === 'lulu';
            const isPrabhath = exp.id === 'prabhath';
            const isBharatGas = exp.id === 'bharat-gas';

            return (
              <div
                key={exp.id}
                className={`border ${
                  isBharatGas
                    ? 'border-[#E8892B]/80 bg-[#FFF9F3] shadow-md'
                    : 'border-[#102932]/20 bg-white shadow-sm'
                } p-6 sm:p-8 lg:p-10 transition-all hover:shadow-xl relative overflow-hidden`}
              >
                {/* Top Corner Badge for Safety Critical or Active */}
                {isBharatGas && (
                  <div className="absolute top-0 right-0 bg-[#E8892B] text-white px-4 py-1.5 text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>SAFETY-CRITICAL OPERATIONS</span>
                  </div>
                )}

                {isLulu && (
                  <div className="absolute top-0 right-0 bg-[#063F4B] text-white px-4 py-1.5 text-xs font-bold font-mono tracking-widest uppercase">
                    CURRENT POSTING
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Organization, Role, and Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      {/* Timeline & Location */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#063F4B]/80 mb-3 uppercase">
                        <span className="flex items-center gap-1 font-bold text-[#E8892B]">
                          <Calendar className="w-3.5 h-3.5" /> {exp.period}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {exp.location}
                        </span>
                      </div>

                      {/* Company Name */}
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#081F26] font-heading tracking-tight mb-2">
                        {exp.company}
                      </h3>

                      {/* Role */}
                      <div className="text-lg font-bold text-[#063F4B] font-heading mb-4">
                        {exp.role}
                      </div>

                      {/* Progression Visual Indicator for Prabhath */}
                      {isPrabhath && exp.progression && (
                        <div className="mb-6 p-3 bg-[#063F4B]/5 border-l-4 border-[#063F4B] flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-[#063F4B] shrink-0" />
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[#063F4B]/70 uppercase block">
                              CAREER PROGRESSION PATH
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#081F26]">
                              {exp.progression}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Responsibilities List */}
                      <div className="mt-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#102932]/70 font-semibold mb-3">
                          CORE SUPERVISORY RESPONSIBILITIES:
                        </h4>
                        <ul className="space-y-2.5">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#102932]/90 leading-relaxed">
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isBharatGas ? 'text-[#E8892B]' : 'text-[#063F4B]'
                                }`}
                              />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Operational Tags */}
                    <div className="mt-8 pt-6 border-t border-[#102932]/10 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 ${
                            isBharatGas
                              ? 'bg-[#E8892B]/15 text-[#E8892B] border border-[#E8892B]/30'
                              : 'bg-[#063F4B]/10 text-[#063F4B] border border-[#063F4B]/20'
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
                      <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden border border-[#102932]/20 bg-[#063F4B]">
                        <img
                          src={exp.image}
                          alt={`${exp.company} warehouse facility operations`}
                          className="w-full h-full object-cover filter contrast-105 brightness-95 transform hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081F26] via-transparent to-transparent opacity-60" />

                        {/* Image Footnote */}
                        <div className="absolute bottom-3 left-3 right-3 p-2 bg-[#081F26]/90 border border-white/10 text-[10px] font-mono text-[#F4F2EB] uppercase tracking-wider flex items-center justify-between">
                          <span>FACILITY DOCK // {exp.location.toUpperCase()}</span>
                          <span className="text-[#E8892B]">VERIFIED</span>
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
