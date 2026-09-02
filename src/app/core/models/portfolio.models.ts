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
  instituteLinkedIn: string;
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

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectModalImage {
  src: string;
  alt: string;
  caption?: string;
}

/** Which of the gallery's two disciplines a project belongs to. A project can
 *  sit in both — the gallery filter treats these as overlapping sets, not as a
 *  partition. */
export type ProjectTrack = 'or-sim' | 'software';

export type TileSize = 'small' | 'medium' | 'wide' | 'large';

/** Typeset figure rendered inside a project's detail view. Each id maps to a
 *  component under `shared/math-figure` — markup rather than an image so the
 *  equations stay sharp, selectable, and theme-aware. */
export type MathFigureId = 'energy-lp';

export interface PortfolioItem {
  id: string;
  tileTitle: string;
  tagline: string;
  techBadges: string[];
  modalTitle: string;
  modalBody: string;
  links?: ProjectLink[];
  modalImages?: ProjectModalImage[];
  /** Optional typeset figure shown after the body text. */
  mathFigure?: MathFigureId;
  image: string;
  /** Preferred tile footprint. A guide, not a rule — the gallery shrinks or
   *  grows tiles when the preferred set can't tile a clean rectangle. */
  size: TileSize;
  tracks: ProjectTrack[];
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
