import React from 'react';
import { CAREER_TARGETS } from '../data/portfolioData';
import { ArrowRight, Compass } from 'lucide-react';

export const CareerFocus: React.FC = () => {
  return (
    <section className="py-20 bg-[#081F26] border-y border-[#236477]/40 text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Large Heading */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-4">
              <Compass className="w-4 h-4 text-[#E8892B]" />
              <span>TARGET MANDATE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[0.95] font-heading">
              READY FOR
              <br />
              <span className="text-[#7DAFB9]">THE NEXT</span>
              <br />
              <span className="text-[#E8892B]">OPERATION</span>
            </h2>

            <p className="text-sm text-[#ADB8BD] mt-6 max-w-sm">
              Available for immediate placement across domestic and international freight forwarders, airport cargo terminals, port distribution hubs, and high-bay fulfillment centers.
            </p>
          </div>

          {/* Right Column: Large Typographic Labels */}
          <div className="lg:col-span-7">
            <div className="flex flex-col space-y-3">
              {CAREER_TARGETS.map((target, idx) => (
                <div
                  key={target}
                  className="group p-4 sm:p-5 bg-[#063F4B]/40 border border-[#236477]/60 hover:border-[#E8892B] hover:bg-[#063F4B] transition-all flex items-center justify-between cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#7DAFB9]">
                      0{idx + 1}
                    </span>
                    <span className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white font-heading group-hover:text-[#E8892B] transition-colors">
                      {target}
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[#7DAFB9] group-hover:text-[#E8892B] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
