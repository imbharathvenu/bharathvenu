export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  isSafetyCritical?: boolean;
  progression?: string;
  responsibilities: string[];
  image?: string;
  tags: string[];
}

export interface CapabilityArea {
  id: string;
  title: string;
  shortDesc: string;
  detailedScope: string[];
  image: string;
  metrics?: string;
}

export interface FlowStep {
  step: number;
  name: string;
  subtitle: string;
  sop: string;
  keyAction: string;
  supervisorCheckpoint: string;
}

export interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  score?: string;
  highlight?: string;
}

export interface LeadershipItem {
  title: string;
  award: string;
  keywords: string[];
  description: string;
  category: 'Athletics' | 'Martial Arts' | 'Cadet Corps';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'WAREHOUSE' | 'INVENTORY' | 'DISPATCH' | 'CARGO' | 'TERMINAL' | 'DISTRIBUTION';
  image: string;
  span: string; // Tailwind grid span
  caption: string;
}

export interface PersonalInfo {
  name: string; title: string; tagline: string; phone: string; email: string;
  linkedin: string; linkedinDisplay: string; location: string; hubCoordinates: string; summary: string;
}
export interface SkillCategory { category: string; skills: { name: string; level: string }[] }
export interface LanguageItem { name: string; proficiency: string; desc: string }
export interface SkillTile { name: string; type: string; icon: string; featured?: boolean }
export interface SectionConfig { id: string; visible: boolean; nav: string }
export interface Metric { label: string; value: string; highlight?: boolean }
export interface StripPanel { mode: string; label: string; sub: string; image: string; icon: string }

export interface SiteContent {
  hero: { kicker: string; hubLabel: string; primaryButton: string; resumeButton: string; imageAlt: string; cardSector: string; cardStatus: string; cardTitle: string; cardTagOne: string; cardTagTwo: string; metrics: Metric[] };
  nav: { resumeLabel: string; connectLabel: string; mobileIndexLabel: string; mobileResumeLabel: string; mobileConnectLabel: string };
  strip: { label: string; sublabel: string; panels: StripPanel[] };
  profile: { kicker: string; title: string; body: string; tagsLabel: string; stats: { value: string; label: string }[]; pillars: { icon: string; title: string; text: string }[] };
  operations: { kicker: string; title: string; desc: string; expandLabel: string; modalKicker: string; checklistLabel: string; benchmarkLabel: string; closeLabel: string };
  experience: { kicker: string; title: string; desc: string; safetyBadge: string; currentBadge: string; progressionLabel: string; listLabel: string; imageNote: string; imageBadge: string };
  flow: { kicker: string; title: string; desc: string; hint: string; sopLabel: string; actionLabel: string; signoffLabel: string; protocolLabel: string; protocolValue: string; prevLabel: string; nextLabel: string };
  banner: { image: string; kicker: string; title: string; text: string; footLeft: string; footRight: string };
  skills: { kicker: string; title: string; desc: string };
  education: { kicker: string; title: string; desc: string; scoreLabel: string };
  leadership: { kicker: string; title: string; desc: string; attributesLabel: string; languagesLabel: string };
  career: { kicker: string; title: string; desc: string };
  gallery: { kicker: string; title: string; allLabel: string; inspectLabel: string; categoryLabel: string; closeLabel: string };
  contact: {
    kicker: string; title: string; intro: string; phoneLabel: string; emailLabel: string; linkedinLabel: string; locationLabel: string; locationBadge: string;
    mailSubject: string; primaryButton: string; resumeButton: string; formTitle: string; formStatus: string; successTitle: string; successText: string; againLabel: string;
    nameLabel: string; namePlaceholder: string; orgLabel: string; orgPlaceholder: string; emailFieldLabel: string; emailPlaceholder: string;
    roleLabel: string; messageLabel: string; messagePlaceholder: string; submitLabel: string; formEndpoint: string;
  };
  footer: { base: string; rights: string; topLabel: string; cvLabel: string };
  resume: { barLabel: string; printLabel: string; summaryHeading: string; expertiseHeading: string; experienceHeading: string; educationHeading: string; leadershipHeading: string; languagesHeading: string; extraTags: string[] };
}
