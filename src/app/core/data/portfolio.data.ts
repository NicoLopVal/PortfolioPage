import { NavSection, PortfolioData } from '../models/portfolio.models';

export const NAV_SECTIONS: NavSection[] = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reference', label: 'Reference' },
  { id: 'contact', label: 'Contact' },
];

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    firstName: 'Your',
    lastName: 'Name',
    tagline: "I'm Your Name",
    heroSubtitle: 'Web Designer & Developer',
    aboutTitle: 'Who I Am?',
    aboutParagraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Curabitur pretium tincidunt lacus. Nulla facilisi. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue.',
    ],
    cvUrl: 'assets/files/cv-placeholder.pdf',
    heroImage: 'assets/images/hero.svg',
    aboutImage: 'assets/images/about.svg',
  },
  socialLinks: [
    { id: 'facebook', label: 'Facebook', url: '#', icon: 'facebook' },
    { id: 'twitter', label: 'Twitter', url: '#', icon: 'twitter' },
    { id: 'linkedin', label: 'LinkedIn', url: '#', icon: 'linkedin' },
    { id: 'github', label: 'GitHub', url: '#', icon: 'github' },
  ],
  education: [
    {
      id: 'edu-1',
      period: '2010-2012',
      degree: 'Master Degree of Design',
      institution: 'Stanford University',
      accentBar: true,
    },
    {
      id: 'edu-2',
      period: '2008-2010',
      degree: 'Bachelor of Arts',
      institution: 'New York University',
      accentBar: false,
    },
    {
      id: 'edu-3',
      period: '2006-2008',
      degree: 'Associate Degree',
      institution: 'Community College',
      accentBar: true,
    },
    {
      id: 'edu-4',
      period: '2004-2006',
      degree: 'High School Diploma',
      institution: 'Central High School',
      accentBar: false,
    },
  ],
  experience: [
    {
      id: 'exp-1',
      period: '2018-Present',
      title: 'Senior Web Developer',
      company: 'Tech Solutions Inc.',
      accentBar: true,
    },
    {
      id: 'exp-2',
      period: '2015-2018',
      title: 'Frontend Developer',
      company: 'Digital Agency Co.',
      accentBar: false,
    },
    {
      id: 'exp-3',
      period: '2012-2015',
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      accentBar: true,
    },
    {
      id: 'exp-4',
      period: '2010-2012',
      title: 'Junior Developer',
      company: 'Startup Labs',
      accentBar: false,
    },
  ],
  skillsLeft: [
    { id: 'sk-1', name: 'Photoshop', level: 90 },
    { id: 'sk-2', name: 'HTML/CSS', level: 95 },
    { id: 'sk-3', name: 'JavaScript', level: 85 },
    { id: 'sk-4', name: 'Angular', level: 80 },
  ],
  skillsRight: [
    { id: 'sk-5', name: 'UI Design', level: 88 },
    { id: 'sk-6', name: 'Responsive Design', level: 92 },
    { id: 'sk-7', name: 'Git', level: 75 },
    { id: 'sk-8', name: 'Node.js', level: 70 },
  ],
  services: [
    {
      id: 'svc-1',
      title: 'Web Design',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      icon: 'laptop',
    },
    {
      id: 'svc-2',
      title: 'Development',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
      icon: 'code',
    },
    {
      id: 'svc-3',
      title: 'Branding',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
      icon: 'palette',
    },
  ],
  portfolio: [
    { id: 'pf-1', title: 'Project One', image: 'assets/images/portfolio-1.svg', size: 'large' },
    { id: 'pf-2', title: 'Project Two', image: 'assets/images/portfolio-2.svg', size: 'medium' },
    { id: 'pf-3', title: 'Project Three', image: 'assets/images/portfolio-3.svg', size: 'medium' },
    { id: 'pf-4', title: 'Project Four', image: 'assets/images/portfolio-4.svg', size: 'small' },
  ],
  testimonials: [
    {
      id: 'ref-1',
      quote:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      authorName: 'Jane Doe',
      authorTitle: 'CEO, Example Corp',
      authorImage: 'assets/images/avatar.svg',
    },
  ],
  contact: {
    address: '123 Main Street, City, Country',
    phone: '+1 (555) 123-4567',
    email: 'hello@yourname.com',
  },
  footerCopyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
};
