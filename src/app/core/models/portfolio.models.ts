export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface PersonProfile {
  firstName: string;
  lastName: string;
  tagline: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  cvUrl: string;
  heroImage: string;
  aboutImage: string;
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  accentBar: boolean;
  issuerLogo: string;
  certificateUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  total: string;
  title: string;
  company: string;
  companyLogo: string;
  companyLinkedin: string;
  Description: string;
  accentBar: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  link?: string;
  size: 'small' | 'medium' | 'large';
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  linkedInUrl: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface PortfolioData {
  profile: PersonProfile;
  socialLinks: SocialLink[];
  education: EducationItem[];
  experience: ExperienceItem[];
  skillsLeft: SkillItem[];
  skillsRight: SkillItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  footerCopyright: string;
}
