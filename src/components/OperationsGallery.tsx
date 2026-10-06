import React, { useState } from 'react';
import { GALLERY_ITEMS, SITE } from '../data/portfolioData';
import { GalleryItem } from '../types';
import { X, ZoomIn, ArrowUpRight } from 'lucide-react';
import { SmartImg, sectionNumber } from './ui';

export const OperationsGallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('');

  // filter tabs come from the categories actually used by the gallery items
  const ALL = SITE.gallery.allLabel || 'ALL';
  const categories = [ALL, ...Array.from(new Set(GALLERY_ITEMS.map((i) => i.category).filter(Boolean)))];
  const active = categories.includes(filter) ? filter : ALL;
  const filteredItems = active === ALL ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === active);

  return (
    <section id="gallery" className="py-[var(--sec-py)] bg-[var(--c-bg)] text-[var(--c-white)] relative">
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--c-border)]/40 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[var(--c-light)] mb-3">
              <span className="num font-bold text-[var(--c-accent)]">{sectionNumber('gallery')}</span>
              <span className="num">/</span>
              <span>{SITE.gallery.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--c-white)] font-heading">
              {SITE.gallery.title}
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0 p-1 bg-[var(--c-primary)]/60 border border-[var(--c-border)]/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  active === cat
                    ? 'bg-[var(--c-accent)] text-[var(--c-ink-strong)]'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-white)] hover:bg-[var(--c-surface)]'
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
              className={`group relative overflow-hidden bg-[var(--c-primary)] border border-[var(--c-border)]/70 cursor-pointer ${item.span} min-h-[260px] md:min-h-[320px]`}
            >
              {/* Image */}
              <SmartImg
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay & Reveal */}
              <div className="absolute inset-0 bg-[var(--c-bg)]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                {/* Top Category Label */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[var(--c-accent)] text-[var(--c-ink-strong)] text-[10px] font-mono font-bold tracking-widest uppercase">
                    {item.category}
                  </span>
                  <div className="p-2 bg-[var(--c-card)]/10 text-[var(--c-white)] hover:bg-[var(--c-white)]/20">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Caption */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[var(--c-white)] font-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--c-muted)] font-normal line-clamp-2">
                    {item.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[var(--c-light)]">
                    <span>{SITE.gallery.inspectLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Quiet Default Bottom Label */}
              <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[var(--c-bg)]/90 border border-white/10 text-[10px] font-mono tracking-widest text-[var(--c-light)] group-hover:opacity-0 transition-opacity">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--c-bg)]/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[var(--c-surface)] border border-[var(--c-border)] max-w-4xl w-full p-4 sm:p-6 relative shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[var(--c-bg)]/80 text-[var(--c-muted)] hover:text-[var(--c-white)] border border-[var(--c-border)] cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video max-h-[60vh] overflow-hidden bg-[var(--c-primary)] mb-4">
              <SmartImg
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-[10px] font-mono text-[var(--c-accent)] uppercase tracking-widest block mb-1">
                  {SITE.gallery.categoryLabel} {activeItem.category}
                </span>
                <h3 className="text-xl font-bold uppercase text-[var(--c-white)] font-heading">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--c-muted)] mt-1">
                  {activeItem.caption}
                </p>
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-[var(--c-primary)] text-[var(--c-white)] border border-[var(--c-border)] hover:border-[var(--c-accent)] self-start sm:self-center cursor-pointer"
              >
                {SITE.gallery.closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
