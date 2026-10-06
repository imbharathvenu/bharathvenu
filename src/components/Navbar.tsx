import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['profile', 'operations', 'experience', 'flow', 'skills', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROFILE', href: '#profile', id: 'profile' },
    { label: 'OPERATIONS', href: '#operations', id: 'operations' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'FLOW', href: '#flow', id: 'flow' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'EDUCATION', href: '#education', id: 'education' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081F26]/95 backdrop-blur-md border-b border-[#236477]/40 shadow-lg py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#"
          className="text-lg md:text-xl font-extrabold tracking-wider text-white font-heading hover:text-[#7DAFB9] transition-colors flex items-center gap-2"
        >
          <span>BHARATH VENU</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8892B]"></span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs uppercase font-medium tracking-widest transition-colors py-1 relative ${
                  isActive ? 'text-[#E8892B]' : 'text-[#ADB8BD] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8892B]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#063F4B] hover:bg-[#0B5260] border border-[#236477] transition-all hover:border-[#7DAFB9] whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-[#E8892B]" />
            <span>Resume</span>
          </button>
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#081F26] bg-[#F4F2EB] hover:bg-[#E8892B] hover:text-white transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenResume}
            className="p-2 text-white bg-[#063F4B] border border-[#236477] text-xs"
            aria-label="View Resume"
          >
            <FileDown className="w-4 h-4 text-[#E8892B]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#7DAFB9] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081F26] border-b border-[#236477] px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-[#7DAFB9] uppercase">Navigation Index</span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-[#F4F2EB] hover:text-[#E8892B] py-1 border-b border-[#102932] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#7DAFB9]">→</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 text-center text-xs uppercase font-semibold text-white bg-[#063F4B] border border-[#236477]"
              >
                Download Resume
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs uppercase font-semibold text-[#081F26] bg-[#F4F2EB]"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
