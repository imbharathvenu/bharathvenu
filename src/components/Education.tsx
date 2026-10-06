import React from 'react';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-[#081F26] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#236477]/40 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-3">
              <span className="font-bold text-[#E8892B]">06</span>
              <span>/</span>
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              EDUCATION & TRAINING
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#ADB8BD] max-w-md mt-4 md:mt-0 font-normal">
            Formal business administration and specialized logistics qualifications supporting operational leadership.
          </p>
        </div>

        {/* Structured Timeline Cards */}
        <div className="space-y-4 max-w-5xl">
          {EDUCATION.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 bg-[#063F4B]/40 border border-[#236477]/60 hover:border-[#7DAFB9] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#081F26] text-[#E8892B] border border-[#236477]/60 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#7DAFB9] uppercase mb-1">
                    <span>{item.institution}</span>
                    {item.score && (
                      <span className="text-[#E8892B] font-bold">· SCORE: {item.score}</span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white font-heading">
                    {item.degree}
                  </h3>
                  {item.highlight && (
                    <p className="text-xs text-[#ADB8BD] mt-1">
                      {item.highlight}
                    </p>
                  )}
                </div>
              </div>

              {/* Period Badge */}
              <div className="self-start md:self-center shrink-0">
                <span className="inline-block px-3 py-1 bg-[#102932] border border-[#236477] text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
