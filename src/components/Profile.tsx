import React from 'react';
import { PERSONAL_INFO, PROFILE_TAGS, SITE } from '../data/portfolioData';
import { sectionNumber, iconFor } from './ui';

export const Profile: React.FC = () => {
  const p = SITE.profile;
  return (
    <section id="profile" className="py-[var(--sec-py)] bg-[var(--c-paper)] text-[var(--c-ink)] relative">
      <div className="max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-12 text-xs font-mono uppercase tracking-[0.25em] text-[var(--c-primary)]">
          <span className="num font-bold text-[var(--c-accent)]">{sectionNumber('profile')}</span>
          <span className="num">/</span>
          <span>{p.kicker}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--c-ink-strong)] leading-[0.95] font-heading">
              {String(p.title).split('\n').map((line, i, a) => (
                <React.Fragment key={i}>
                  <span className={i === 1 ? 'text-[var(--c-primary)]' : i === 2 ? 'text-[var(--c-accent)]' : ''}>{line}</span>
                  {i < a.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            {p.stats.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[var(--c-ink)]/15">
                <div className="grid grid-cols-2 gap-6">
                  {p.stats.map((st, i) => (
                    <div key={i}>
                      <span className={`block text-3xl font-black font-heading ${i % 2 ? 'text-[var(--c-accent)]' : 'text-[var(--c-primary)]'}`}>{st.value}</span>
                      <span className="text-xs uppercase tracking-wider text-[var(--c-primary)]/70 font-medium">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div className="max-w-none">
              <p className="text-xl sm:text-2xl font-light text-[var(--c-ink-strong)] leading-relaxed mb-6">{PERSONAL_INFO.summary}</p>
              {p.body && <p className="text-base text-[var(--c-ink)]/80 leading-relaxed font-normal">{p.body}</p>}
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--c-ink)]/15">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--c-primary)]/70 mb-4 font-semibold">{p.tagsLabel}</div>
              <div className="flex flex-wrap gap-2.5">
                {PROFILE_TAGS.map((tag, i) => (
                  <span key={tag + i} className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-[var(--c-primary)] bg-[var(--c-primary)]/10 border border-[var(--c-primary)]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent)] mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {p.pillars.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {p.pillars.map((pl, i) => {
                  const Icon = iconFor(pl.icon);
                  return (
                    <div key={i} className="p-4 bg-[var(--c-card)]/70 border border-[var(--c-ink)]/10">
                      <Icon className={`w-5 h-5 mb-2 ${i === 0 ? 'text-[var(--c-accent)]' : 'text-[var(--c-primary)]'}`} />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--c-ink-strong)]">{pl.title}</h4>
                      <p className="text-[11px] text-[var(--c-ink)]/70 mt-1">{pl.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
