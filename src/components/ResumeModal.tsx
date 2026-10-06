import React from 'react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILL_CATEGORIES, LEADERSHIP, LANGUAGES, PROFILE_TAGS, SITE } from '../data/portfolioData';
import { X, Printer, Download, MapPin, Phone, Mail, Linkedin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-start justify-center p-2 sm:p-6 md:p-10 animate-fadeIn">
      <div className="relative bg-[var(--c-card)] text-[var(--c-ink)] max-w-4xl w-full shadow-2xl border border-[var(--c-muted)] my-6">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-[var(--c-bg)] text-[var(--c-white)] px-6 py-4 flex items-center justify-between border-b border-[var(--c-border)]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--c-light)]">
            <span className="w-2 h-2 rounded-full bg-[var(--c-accent)]" />
            <span>{SITE.resume.barLabel} {PERSONAL_INFO.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--c-primary)] hover:bg-[var(--c-accent)] hover:text-[var(--c-ink-strong)] text-[var(--c-white)] text-xs font-bold font-mono tracking-wider transition-colors cursor-pointer border border-[var(--c-border)]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{SITE.resume.printLabel}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[var(--c-muted)] hover:text-[var(--c-white)] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-12 md:p-14 font-sans text-[var(--c-ink)]">
          
          {/* Header */}
          <div className="border-b-2 border-[var(--c-primary)] pb-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-[var(--c-ink-strong)] font-heading tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-base sm:text-lg font-bold text-[var(--c-primary)] mt-1">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-xs text-[var(--c-ink)]/70 mt-1 max-w-xl">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              <div className="text-xs font-mono text-[var(--c-ink)]/80 space-y-1 md:text-right shrink-0">
                <div className="flex items-center md:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                  <span>{PERSONAL_INFO.linkedinDisplay}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--c-primary)] uppercase border-b border-[var(--c-primary)]/20 pb-1.5 mb-3">
              {SITE.resume.summaryHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--c-ink)]/90 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--c-primary)] uppercase border-b border-[var(--c-primary)]/20 pb-1.5 mb-3">
              {SITE.resume.expertiseHeading}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {PROFILE_TAGS.map((tag) => (
                <div key={tag} className="p-1.5 bg-[var(--c-primary)]/5 border border-[var(--c-primary)]/15 font-semibold text-[var(--c-primary)]">
                  • {tag}
                </div>
              ))}
              {SITE.resume.extraTags.map((t) => (
                <div key={t} className="p-1.5 bg-[var(--c-primary)]/5 border border-[var(--c-primary)]/15 font-semibold text-[var(--c-primary)]">• {t}</div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--c-primary)] uppercase border-b border-[var(--c-primary)]/20 pb-1.5 mb-4">
              {SITE.resume.experienceHeading}
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-[var(--c-primary)]/30">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-[var(--c-ink-strong)] uppercase">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-mono text-[var(--c-primary)] font-semibold">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[var(--c-accent)] mb-2">
                    {exp.role} {exp.progression && `(${exp.progression})`}
                  </div>

                  <ul className="space-y-1">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx} className="text-xs text-[var(--c-ink)]/85 flex items-start gap-2">
                        <span className="text-[var(--c-primary)] font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--c-primary)] uppercase border-b border-[var(--c-primary)]/20 pb-1.5 mb-3">
              {SITE.resume.educationHeading}
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-[var(--c-ink-strong)]">{edu.degree}</span>
                    <span className="text-[var(--c-ink)]/70 ml-2">— {edu.institution}</span>
                    {edu.score && <span className="font-semibold text-[var(--c-accent)] ml-1">({edu.score})</span>}
                  </div>
                  <span className="font-mono text-[var(--c-primary)] shrink-0 font-medium">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Physical Discipline */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--c-primary)] uppercase border-b border-[var(--c-primary)]/20 pb-1.5 mb-3">
              {SITE.resume.leadershipHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LEADERSHIP.map((item) => (
                <div key={item.title} className="p-3 bg-[var(--c-primary)]/5 border border-[var(--c-primary)]/15">
                  <div className="text-xs font-bold text-[var(--c-ink-strong)] uppercase">{item.title}</div>
                  <div className="text-[11px] font-mono text-[var(--c-accent)] font-semibold">{item.award}</div>
                  <div className="text-[10px] text-[var(--c-ink)]/70 mt-1">
                    {item.keywords.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--c-primary)] uppercase border-b border-[var(--c-primary)]/20 pb-1.5 mb-2">
              {SITE.resume.languagesHeading}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs">
              {LANGUAGES.map((l) => (
                <div key={l.name} className="flex items-center gap-1.5">
                  <span className="font-bold text-[var(--c-ink-strong)]">{l.name}:</span>
                  <span className="text-[var(--c-primary)]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
