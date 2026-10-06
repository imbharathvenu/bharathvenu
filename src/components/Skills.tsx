import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Database, FileSpreadsheet, Box, ShieldCheck, Truck, Users, Cpu, ArrowUpRight } from 'lucide-react';

export const Skills: React.FC = () => {
  // Flat list of the exact specified capabilities with icons
  const coreCapabilities = [
    { name: 'SAP', type: 'System', icon: Database, featured: true },
    { name: 'Inventory Control', type: 'Process', icon: Box, featured: true },
    { name: 'Warehouse Operations', type: 'Supervisory', icon: ShieldCheck, featured: true },
    { name: 'Inbound Logistics', type: 'Execution', icon: Truck },
    { name: 'Outbound Logistics', type: 'Execution', icon: Truck },
    { name: 'Goods Receiving', type: 'Operations', icon: Box },
    { name: 'Dispatch', type: 'Operations', icon: Truck },
    { name: 'FIFO / FEFO', type: 'Discipline', icon: ShieldCheck, featured: true },
    { name: 'Stock Reconciliation', type: 'Auditing', icon: Database },
    { name: 'Vendor Coordination', type: 'Liaison', icon: Users },
    { name: 'Transport Coordination', type: 'Freight', icon: Truck },
    { name: 'MS Excel', type: 'Analysis', icon: FileSpreadsheet },
    { name: 'Critical Thinking', type: 'Leadership', icon: Cpu },
    { name: 'Multitasking', type: 'Leadership', icon: Users },
  ];

  return (
    <section id="skills" className="py-24 bg-[#F4F2EB] text-[#102932] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#102932]/15 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#063F4B] mb-3">
              <span className="font-bold text-[#E8892B]">05</span>
              <span>/</span>
              <span>TECHNICAL COMPETENCY MATRIX</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#081F26] font-heading">
              CORE CAPABILITIES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#102932]/70 max-w-md mt-4 md:mt-0 font-normal">
            No superficial progress bars. A rigorous editorial grid of demonstrated operational software, logistics methodologies, and supervision disciplines.
          </p>
        </div>

        {/* Primary Typographic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-16">
          {coreCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.name}
                className={`p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
                  cap.featured
                    ? 'bg-[#063F4B] text-white border-[#063F4B] shadow-md hover:bg-[#0B5260]'
                    : 'bg-white text-[#081F26] border-[#102932]/15 hover:border-[#063F4B] hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-2 ${
                      cap.featured
                        ? 'bg-[#081F26] text-[#E8892B]'
                        : 'bg-[#F4F2EB] text-[#063F4B]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      cap.featured ? 'text-[#7DAFB9]' : 'text-[#102932]/60'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
                      cap.featured ? 'text-[#E8892B]' : 'text-[#063F4B]'
                    }`}
                  >
                    {cap.type}
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight font-heading leading-tight">
                    {cap.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Systematic Categorized Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#102932]/15">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#063F4B] font-bold pb-2 border-b border-[#063F4B]/20">
                {cat.category}
              </h4>
              <ul className="space-y-2">
                {cat.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between text-xs py-1">
                    <span className="font-semibold text-[#081F26]">{s.name}</span>
                    <span className="text-[11px] font-mono text-[#063F4B]/70">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
