import React from 'react';
import { IMAGES } from '../data/portfolioData';
import { Anchor, Truck, Plane } from 'lucide-react';

export const LogisticsStrip: React.FC = () => {
  const panels = [
    {
      id: 'sea',
      mode: 'SEA',
      label: 'SEA LOGISTICS',
      sub: 'Bulk Container & Inbound Port Transshipment',
      image: IMAGES.sea,
      icon: Anchor,
      accent: '01',
    },
    {
      id: 'land',
      mode: 'LAND',
      label: 'WAREHOUSE & DISTRIBUTION',
      sub: 'High-Bay Staging, Fleet Cross-Docking & Regional Routing',
      image: IMAGES.land,
      icon: Truck,
      accent: '02',
    },
    {
      id: 'air',
      mode: 'AIR',
      label: 'AIR & TERMINAL OPERATIONS',
      sub: 'Express Freight, Pallet Handover & Tarmac Turnaround',
      image: IMAGES.air,
      icon: Plane,
      accent: '03',
    },
  ];

  return (
    <section className="relative bg-[#081F26] border-y border-[#236477]/40 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Label Header */}
        <div className="flex items-center justify-between py-3 border-b border-[#236477]/30 mb-4 text-xs font-mono tracking-widest text-[#7DAFB9]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E8892B]" />
            MULTIMODAL SUPPLY CHAIN STORY
          </span>
          <span className="hidden sm:inline">END-TO-END FREIGHT & WAREHOUSE CONTROL</span>
        </div>

        {/* 3 Vertical Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {panels.map((panel) => {
            const IconComponent = panel.icon;
            return (
              <div
                key={panel.id}
                className="group relative h-[380px] sm:h-[450px] lg:h-[500px] overflow-hidden bg-[#063F4B] border border-[#236477]/50"
              >
                {/* Background Image with Slow Zoom on Hover */}
                <img
                  src={panel.image}
                  alt={panel.label}
                  className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Teal / Navy Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081F26] via-[#063F4B]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge: Mode Indicator */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-[#081F26]/90 border border-[#236477] text-[11px] font-mono tracking-widest text-[#F4F2EB] uppercase">
                    <IconComponent className="w-3.5 h-3.5 text-[#E8892B]" />
                    <span>{panel.mode}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7DAFB9]/80">
                    {panel.accent}
                  </span>
                </div>

                {/* Bottom Content: Minimal Editorial Typography */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-6 h-[2px] bg-[#E8892B] mb-2 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-1">
                    {panel.label}
                  </h3>
                  <p className="text-xs text-[#ADB8BD] font-normal leading-relaxed line-clamp-2">
                    {panel.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
