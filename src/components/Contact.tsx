import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Phone, Mail, Linkedin, MapPin, Send, Check, Copy, FileText, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    roleInterest: 'Warehouse Supervisor',
    message: '',
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#081F26] text-white relative overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 warehouse-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Numbering */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#7DAFB9] mb-12">
          <span className="font-bold text-[#E8892B]">09</span>
          <span>/</span>
          <span>DIRECT DISPATCH & PLACEMENT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Editorial Pitch */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-heading leading-[0.95] mb-6">
              LET'S
              <br />
              <span className="text-[#E8892B]">CONNECT</span>
            </h2>

            <p className="text-base sm:text-lg text-[#ADB8BD] font-normal leading-relaxed mb-10 max-w-lg">
              Open to warehouse, cargo, terminal and logistics operations opportunities across India and international logistics hubs.
            </p>

            {/* Structured Contact Cards */}
            <div className="space-y-4 mb-10">
              {/* Phone */}
              <div className="p-4 bg-[#063F4B]/50 border border-[#236477]/70 flex items-center justify-between hover:border-[#E8892B] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#081F26] text-[#E8892B] border border-[#236477]/60">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#7DAFB9] block">
                      TELEPHONE / WHATSAPP
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-base font-bold text-white hover:text-[#E8892B] font-mono transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 text-[#7DAFB9] hover:text-white"
                  title="Copy Phone"
                >
                  {copiedKey === 'phone' ? <Check className="w-4 h-4 text-[#E8892B]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email */}
              <div className="p-4 bg-[#063F4B]/50 border border-[#236477]/70 flex items-center justify-between hover:border-[#E8892B] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#081F26] text-[#E8892B] border border-[#236477]/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#7DAFB9] block">
                      DIRECT EMAIL DISPATCH
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-base font-bold text-white hover:text-[#E8892B] font-mono transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-2 text-[#7DAFB9] hover:text-white"
                  title="Copy Email"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-[#E8892B]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-4 bg-[#063F4B]/50 border border-[#236477]/70 flex items-center justify-between hover:border-[#E8892B] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#081F26] text-[#E8892B] border border-[#236477]/60">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#7DAFB9] block">
                      PROFESSIONAL NETWORK
                    </span>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#E8892B] transition-colors flex items-center gap-1.5"
                    >
                      <span>{PERSONAL_INFO.linkedinDisplay}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-[#063F4B]/50 border border-[#236477]/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#081F26] text-[#E8892B] border border-[#236477]/60">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#7DAFB9] block">
                      OPERATIONAL LOCATION
                    </span>
                    <span className="text-sm font-bold text-white">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#7DAFB9]">HUB READY</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Logistics%20Role%20Inquiry%20-%20Bharath%20Venu`}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#081F26] bg-[#E8892B] hover:bg-white transition-colors cursor-pointer"
              >
                CONTACT BHARATH
              </a>
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#063F4B] hover:bg-[#0B5260] border border-[#236477] hover:border-[#7DAFB9] transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#E8892B]" />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Placement Inquiry Form */}
          <div className="lg:col-span-6 bg-[#102932] border border-[#236477] p-6 sm:p-8 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#236477]/60 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7DAFB9]">
                FACILITY RECRUITMENT DISPATCH
              </span>
              <span className="text-xs font-mono text-[#E8892B]">STATUS // STANDBY</span>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center animate-fadeIn">
                <div className="w-14 h-14 bg-[#063F4B] text-[#E8892B] border border-[#E8892B] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white font-heading mb-2">
                  MESSAGE DISPATCHED
                </h3>
                <p className="text-xs sm:text-sm text-[#ADB8BD] max-w-sm mx-auto mb-6">
                  Thank you for reaching out. Bharath Venu will review your operational requirements and respond promptly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase bg-[#063F4B] text-white border border-[#236477]"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7DAFB9] mb-1.5">
                    YOUR NAME / RECRUITER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Operations Director / HR Manager"
                    className="w-full px-4 py-2.5 bg-[#081F26] border border-[#236477] text-sm text-white placeholder-[#ADB8BD]/40 focus:outline-none focus:border-[#E8892B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7DAFB9] mb-1.5">
                      ORGANIZATION / TERMINAL *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Lulu, DP World, DHL"
                      className="w-full px-4 py-2.5 bg-[#081F26] border border-[#236477] text-sm text-white placeholder-[#ADB8BD]/40 focus:outline-none focus:border-[#E8892B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7DAFB9] mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@freight.com"
                      className="w-full px-4 py-2.5 bg-[#081F26] border border-[#236477] text-sm text-white placeholder-[#ADB8BD]/40 focus:outline-none focus:border-[#E8892B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7DAFB9] mb-1.5">
                    ROLE OF INTEREST
                  </label>
                  <select
                    value={formData.roleInterest}
                    onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#081F26] border border-[#236477] text-sm text-white focus:outline-none focus:border-[#E8892B]"
                  >
                    <option value="Warehouse Supervisor">Warehouse Supervisor</option>
                    <option value="Cargo Team Leader">Cargo Team Leader</option>
                    <option value="Terminal Team Leader">Terminal Team Leader</option>
                    <option value="Logistics Operations Specialist">Logistics Operations Specialist</option>
                    <option value="Supply Chain Lead">Supply Chain Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7DAFB9] mb-1.5">
                    OPERATIONAL BRIEF / MESSAGE *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe facility location, shift scale, and target operational mandate..."
                    className="w-full px-4 py-2.5 bg-[#081F26] border border-[#236477] text-sm text-white placeholder-[#ADB8BD]/40 focus:outline-none focus:border-[#E8892B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#063F4B] hover:bg-[#E8892B] hover:text-[#081F26] text-white border border-[#236477] hover:border-[#E8892B] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT DISPATCH MESSAGE</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
