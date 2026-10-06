import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogisticsStrip } from './components/LogisticsStrip';
import { Profile } from './components/Profile';
import { CapabilitiesBoard } from './components/CapabilitiesBoard';
import { Experience } from './components/Experience';
import { OperationalFlow } from './components/OperationalFlow';
import { FeatureBanner } from './components/FeatureBanner';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Leadership } from './components/Leadership';
import { CareerFocus } from './components/CareerFocus';
import { OperationsGallery } from './components/OperationsGallery';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#081F26] text-[#F4F2EB] selection:bg-[#E8892B] selection:text-white">
      {/* 3-Zone Navigation Header */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main>
        {/* Full-Screen Asymmetrical Editorial Hero */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 3-Panel Sea, Land, Air Logistics Story Strip */}
        <LogisticsStrip />

        {/* 01 / Professional Profile (Warm White Editorial Layout) */}
        <Profile />

        {/* 02 / Portfolio-Board Style Rectangular Operations Grid */}
        <CapabilitiesBoard />

        {/* 03 / Large Editorial Experience Timeline (Lulu, Prabhath, Bharat Gas) */}
        <Experience />

        {/* 04 / Visual Operational Flow (Receiving to Dispatch with Animated Node) */}
        <OperationalFlow />

        {/* 05 / Full-Width Feature Banner (Control. Coordination. Compliance.) */}
        <FeatureBanner />

        {/* 06 / Core Capabilities Typographic Grid */}
        <Skills />

        {/* 07 / Structured Education Timeline */}
        <Education />

        {/* 08 / Leadership, Martial Arts, Cadet Corps & Multilingual Section */}
        <Leadership />

        {/* 09 / Career Placement Focus */}
        <CareerFocus />

        {/* 10 / Pinterest-style Operations Moodboard & Lightbox Gallery */}
        <OperationsGallery />

        {/* 11 / Direct Dispatch & Placement Contact Form */}
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Corporate Executive Resume Modal (Print/PDF Ready) */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Quiet Industrial Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />
    </div>
  );
}
