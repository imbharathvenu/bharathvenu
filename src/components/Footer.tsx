import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#041217] text-white border-t border-[#236477]/40 py-12 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#236477]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-white font-heading">
                BHARATH VENU
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8892B]" />
            </div>
            <p className="text-xs text-[#7DAFB9] mt-1">
              Warehouse Supervisor · Supply Chain & Logistics Operations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#ADB8BD]">
            <a href="#profile" className="hover:text-white transition-colors">PROFILE</a>
            <a href="#operations" className="hover:text-white transition-colors">OPERATIONS</a>
            <a href="#experience" className="hover:text-white transition-colors">EXPERIENCE</a>
            <a href="#flow" className="hover:text-white transition-colors">SOP FLOW</a>
            <a href="#skills" className="hover:text-white transition-colors">SKILLS</a>
            <a href="#education" className="hover:text-white transition-colors">EDUCATION</a>
            <button onClick={onOpenResume} className="text-[#E8892B] hover:text-white transition-colors cursor-pointer">
              CURRICULUM VITAE
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#7DAFB9]/70">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#E8892B]" />
            <span>OPERATIONAL BASE: TRIVANDRUM & KOLLAM, KERALA, INDIA</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} BHARATH VENU. ALL RIGHTS RESERVED.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-[#E8892B] transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
