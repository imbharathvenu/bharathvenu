import React, { useState } from 'react';
import { PERSONAL_INFO, CAREER_TARGETS, SITE, THEME } from '../data/portfolioData';
import { Lines, sectionNumber } from './ui';
import { Phone, Mail, Linkedin, MapPin, Send, Check, Copy, FileText, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  onOpenResume: () => void;
}

const card = 'p-4 bg-[var(--c-primary)]/50 border border-[var(--c-border)]/70 flex items-center justify-between';
const iconBox = 'p-2.5 bg-[var(--c-bg)] text-[var(--c-accent)] border border-[var(--c-border)]/60';
const lab = 'text-[10px] font-mono uppercase tracking-widest text-[var(--c-light)] block';
const field = 'w-full px-4 py-2.5 bg-[var(--c-bg)] border border-[var(--c-border)] text-sm text-[var(--c-white)] placeholder-[var(--c-muted)]/40 focus:outline-none focus:border-[var(--c-accent)]';
const flab = 'block text-[11px] font-mono uppercase tracking-wider text-[var(--c-light)] mb-1.5';

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const c = SITE.contact;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', roleInterest: '', message: '' });
  const roles = CAREER_TARGETS;
  const role = formData.roleInterest || roles[0] || '';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // With a form endpoint (e.g. Formspree) the message is posted there; otherwise it opens the visitor's mail app, pre-filled.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, roleInterest: role };
    if (c.formEndpoint) {
      setState('sending');
      try {
        const r = await fetch(c.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        setState(r.ok ? 'done' : 'error');
      } catch { setState('error'); }
      return;
    }
    const body = `Name: ${payload.name}\nOrganization: ${payload.organization}\nEmail: ${payload.email}\nRole of interest: ${payload.roleInterest}\n\n${payload.message}`;
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(body)}`;
    setState('done');
  };

  return (
    <section id="contact" className="py-[var(--sec-py)] bg-[var(--c-bg)] text-[var(--c-white)] relative overflow-hidden">
      <div className="absolute inset-0 warehouse-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-[var(--content-w)] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[var(--c-light)] mb-12">
          <span className="num font-bold text-[var(--c-accent)]">{sectionNumber('contact')}</span>
          <span className="num">/</span>
          <span>{c.kicker}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className={THEME.showContactForm ? 'lg:col-span-6' : 'lg:col-span-12 max-w-3xl'}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--c-white)] font-heading leading-[0.95] mb-6">
              <Lines text={c.title} colors={['', 'text-[var(--c-accent)]']} />
            </h2>
            <p className="text-base sm:text-lg text-[var(--c-muted)] font-normal leading-relaxed mb-10 max-w-lg">{c.intro}</p>

            <div className="space-y-4 mb-10">
              {PERSONAL_INFO.phone && (
                <div className={card + ' hover:border-[var(--c-accent)] transition-colors'}>
                  <div className="flex items-center gap-3">
                    <div className={iconBox}><Phone className="w-4 h-4" /></div>
                    <div>
                      <span className={lab}>{c.phoneLabel}</span>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-base font-bold text-[var(--c-white)] hover:text-[var(--c-accent)] font-mono transition-colors">{PERSONAL_INFO.phone}</a>
                    </div>
                  </div>
                  <button onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')} className="p-2 text-[var(--c-light)] hover:text-[var(--c-white)]" title="Copy">
                    {copiedKey === 'phone' ? <Check className="w-4 h-4 text-[var(--c-accent)]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {PERSONAL_INFO.email && (
                <div className={card + ' hover:border-[var(--c-accent)] transition-colors'}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={iconBox}><Mail className="w-4 h-4" /></div>
                    <div className="min-w-0">
                      <span className={lab}>{c.emailLabel}</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm sm:text-base font-bold text-[var(--c-white)] hover:text-[var(--c-accent)] font-mono transition-colors break-all">{PERSONAL_INFO.email}</a>
                    </div>
                  </div>
                  <button onClick={() => handleCopy(PERSONAL_INFO.email, 'email')} className="p-2 text-[var(--c-light)] hover:text-[var(--c-white)]" title="Copy">
                    {copiedKey === 'email' ? <Check className="w-4 h-4 text-[var(--c-accent)]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {PERSONAL_INFO.linkedin && (
                <div className={card + ' hover:border-[var(--c-accent)] transition-colors'}>
                  <div className="flex items-center gap-3">
                    <div className={iconBox}><Linkedin className="w-4 h-4" /></div>
                    <div>
                      <span className={lab}>{c.linkedinLabel}</span>
                      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-[var(--c-white)] hover:text-[var(--c-accent)] transition-colors flex items-center gap-1.5">
                        <span>{PERSONAL_INFO.linkedinDisplay || PERSONAL_INFO.linkedin}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {PERSONAL_INFO.location && (
                <div className={card}>
                  <div className="flex items-center gap-3">
                    <div className={iconBox}><MapPin className="w-4 h-4" /></div>
                    <div>
                      <span className={lab}>{c.locationLabel}</span>
                      <span className="text-sm font-bold text-[var(--c-white)]">{PERSONAL_INFO.location}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--c-light)]">{c.locationBadge}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(c.mailSubject)}`} className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--c-ink-strong)] bg-[var(--c-accent)] hover:bg-[var(--c-white)] transition-colors cursor-pointer">
                {c.primaryButton}
              </a>
              {THEME.showResumeButton && (
                <button onClick={onOpenResume} className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--c-white)] bg-[var(--c-primary)] hover:bg-[var(--c-secondary)] border border-[var(--c-border)] hover:border-[var(--c-light)] transition-all cursor-pointer">
                  <FileText className="w-4 h-4 text-[var(--c-accent)]" />
                  <span>{c.resumeButton}</span>
                </button>
              )}
            </div>
          </div>

          {THEME.showContactForm && (
            <div className="lg:col-span-6 bg-[var(--c-surface)] border border-[var(--c-border)] p-6 sm:p-8 relative shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--c-border)]/60 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--c-light)]">{c.formTitle}</span>
                <span className="text-xs font-mono text-[var(--c-accent)]">{c.formStatus}</span>
              </div>

              {state === 'done' ? (
                <div className="py-12 text-center animate-fadeIn">
                  <div className="w-14 h-14 bg-[var(--c-primary)] text-[var(--c-accent)] border border-[var(--c-accent)] flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-black uppercase text-[var(--c-white)] font-heading mb-2">{c.successTitle}</h3>
                  <p className="text-xs sm:text-sm text-[var(--c-muted)] max-w-sm mx-auto mb-6">{c.successText}</p>
                  <button onClick={() => { setState('idle'); setFormData({ name: '', organization: '', email: '', roleInterest: '', message: '' }); }} className="px-4 py-2 text-xs font-mono font-bold uppercase bg-[var(--c-primary)] text-[var(--c-white)] border border-[var(--c-border)]">
                    {c.againLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={flab}>{c.nameLabel}</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={c.namePlaceholder} className={field} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={flab}>{c.orgLabel}</label>
                      <input type="text" required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} placeholder={c.orgPlaceholder} className={field} />
                    </div>
                    <div>
                      <label className={flab}>{c.emailFieldLabel}</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={c.emailPlaceholder} className={field} />
                    </div>
                  </div>
                  {roles.length > 0 && (
                    <div>
                      <label className={flab}>{c.roleLabel}</label>
                      <select value={role} onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })} className={field}>
                        {roles.map((r, i) => <option key={r + i} value={r}>{r}</option>)}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className={flab}>{c.messageLabel}</label>
                    <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={c.messagePlaceholder} className={field} />
                  </div>
                  {state === 'error' && <div className="text-sm text-red-400">Could not send right now — please email directly instead.</div>}
                  <button type="submit" disabled={state === 'sending'} className="w-full py-3.5 bg-[var(--c-primary)] hover:bg-[var(--c-accent)] hover:text-[var(--c-ink-strong)] text-[var(--c-white)] border border-[var(--c-border)] hover:border-[var(--c-accent)] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
                    <Send className="w-4 h-4" />
                    <span>{state === 'sending' ? '…' : c.submitLabel}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
