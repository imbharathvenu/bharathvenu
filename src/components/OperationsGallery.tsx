import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/portfolioData';
import { GalleryItem } from '../types';
import { Eye, X, ZoomIn, ArrowUpRight } from 'lucide-react';

export const OperationsGallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'WAREHOUSE', 'CARGO', 'DISTRIBUTION', 'INVENTORY', 'DISPATCH', 'TERMINAL'];

  const filteredItems = filter === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section className="py-24 bg-[#081F26] text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#236477]/40 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-3">
              <span className="font-bold text-[#E8892B]">08</span>
              <span>/</span>
              <span>OPERATIONAL MOODBOARD & GALLERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
              VISUAL LOGISTICS ESSENCE
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0 p-1 bg-[#063F4B]/60 border border-[#236477]/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#E8892B] text-[#081F26]'
                    : 'text-[#ADB8BD] hover:text-white hover:bg-[#102932]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial / Pinterest-style Grid with Varied Aspect Ratios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`group relative overflow-hidden bg-[#063F4B] border border-[#236477]/70 cursor-pointer ${item.span} min-h-[260px] md:min-h-[320px]`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay & Reveal */}
              <div className="absolute inset-0 bg-[#081F26]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                {/* Top Category Label */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[#E8892B] text-[#081F26] text-[10px] font-mono font-bold tracking-widest uppercase">
                    {item.category}
                  </span>
                  <div className="p-2 bg-white/10 text-white hover:bg-white/20">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Caption */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white font-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#ADB8BD] font-normal line-clamp-2">
                    {item.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#7DAFB9]">
                    <span>INSPECT ASSET</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Quiet Default Bottom Label */}
              <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#081F26]/90 border border-white/10 text-[10px] font-mono tracking-widest text-[#7DAFB9] group-hover:opacity-0 transition-opacity">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081F26]/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#102932] border border-[#236477] max-w-4xl w-full p-4 sm:p-6 relative shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#081F26]/80 text-[#ADB8BD] hover:text-white border border-[#236477] cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video max-h-[60vh] overflow-hidden bg-[#063F4B] mb-4">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-[10px] font-mono text-[#E8892B] uppercase tracking-widest block mb-1">
                  CATEGORY // {activeItem.category}
                </span>
                <h3 className="text-xl font-bold uppercase text-white font-heading">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#ADB8BD] mt-1">
                  {activeItem.caption}
                </p>
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#063F4B] text-white border border-[#236477] hover:border-[#E8892B] self-start sm:self-center cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
