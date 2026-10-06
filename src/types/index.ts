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
