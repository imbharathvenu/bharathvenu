import React from 'react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILL_CATEGORIES, LEADERSHIP, LANGUAGES, PROFILE_TAGS } from '../data/portfolioData';
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
      <div className="relative bg-white text-[#102932] max-w-4xl w-full shadow-2xl border border-[#ADB8BD] my-6">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-[#081F26] text-white px-6 py-4 flex items-center justify-between border-b border-[#236477]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#7DAFB9]">
            <span className="w-2 h-2 rounded-full bg-[#E8892B]" />
            <span>OFFICIAL CURRICULUM VITAE // BHARATH VENU</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#063F4B] hover:bg-[#E8892B] hover:text-[#081F26] text-white text-xs font-bold font-mono tracking-wider transition-colors cursor-pointer border border-[#236477]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#ADB8BD] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-12 md:p-14 font-sans text-[#102932]">
          
          {/* Header */}
          <div className="border-b-2 border-[#063F4B] pb-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#081F26] font-heading tracking-tight">
                  BHARATH VENU
                </h1>
                <p className="text-base sm:text-lg font-bold text-[#063F4B] mt-1">
                  Warehouse Supervisor | Logistics & Supply Chain Operations
                </p>
                <p className="text-xs text-[#102932]/70 mt-1 max-w-xl">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              <div className="text-xs font-mono text-[#102932]/80 space-y-1 md:text-right shrink-0">
                <div className="flex items-center md:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E8892B]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E8892B]" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#E8892B]" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#E8892B]" />
                  <span>{PERSONAL_INFO.linkedinDisplay}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#063F4B] uppercase border-b border-[#063F4B]/20 pb-1.5 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-[#102932]/90 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#063F4B] uppercase border-b border-[#063F4B]/20 pb-1.5 mb-3">
              AREAS OF EXPERTISE & CORE CAPABILITIES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {PROFILE_TAGS.map((tag) => (
                <div key={tag} className="p-1.5 bg-[#063F4B]/5 border border-[#063F4B]/15 font-semibold text-[#063F4B]">
                  • {tag}
                </div>
              ))}
              <div className="p-1.5 bg-[#063F4B]/5 border border-[#063F4B]/15 font-semibold text-[#063F4B]">
                • SAP ERP Operations
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#063F4B] uppercase border-b border-[#063F4B]/20 pb-1.5 mb-4">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-[#063F4B]/30">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-[#081F26] uppercase">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-mono text-[#063F4B] font-semibold">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#E8892B] mb-2">
                    {exp.role} {exp.progression && `(${exp.progression})`}
                  </div>

                  <ul className="space-y-1">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx} className="text-xs text-[#102932]/85 flex items-start gap-2">
                        <span className="text-[#063F4B] font-bold">•</span>
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
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#063F4B] uppercase border-b border-[#063F4B]/20 pb-1.5 mb-3">
              EDUCATION & CERTIFICATIONS
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#081F26]">{edu.degree}</span>
                    <span className="text-[#102932]/70 ml-2">— {edu.institution}</span>
                    {edu.score && <span className="font-semibold text-[#E8892B] ml-1">({edu.score})</span>}
                  </div>
                  <span className="font-mono text-[#063F4B] shrink-0 font-medium">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Physical Discipline */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#063F4B] uppercase border-b border-[#063F4B]/20 pb-1.5 mb-3">
              DISCIPLINE, LEADERSHIP & ATHLETIC ACHIEVEMENTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LEADERSHIP.map((item) => (
                <div key={item.title} className="p-3 bg-[#063F4B]/5 border border-[#063F4B]/15">
                  <div className="text-xs font-bold text-[#081F26] uppercase">{item.title}</div>
                  <div className="text-[11px] font-mono text-[#E8892B] font-semibold">{item.award}</div>
                  <div className="text-[10px] text-[#102932]/70 mt-1">
                    {item.keywords.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#063F4B] uppercase border-b border-[#063F4B]/20 pb-1.5 mb-2">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-4 text-xs">
              {LANGUAGES.map((l) => (
                <div key={l.name} className="flex items-center gap-1.5">
                  <span className="font-bold text-[#081F26]">{l.name}:</span>
                  <span className="text-[#063F4B]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
