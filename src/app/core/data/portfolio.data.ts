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
    firstName: 'Nicolas',
    lastName: 'Lopez',
    tagline: "I'm Nicolas Lopez",
    heroSubtitle: 'Product Manager | Operations Research Engineer | Software Developer',
    aboutTitle: 'Who I Am?',
    aboutParagraphs: [
      'I am a Software Engineer and Operations Research practitioner with genuine depth in both fields. I design and test optimization and simulation models, and I build production software.',
      'I build production software in .NET 8, C#, and SQL Server (Clean Architecture, REST APIs, Playwright), and I formulate and solve LP, IP, and MILP models with Gurobi and Simplex.',
      'I also believe a model is only as good as its behavior under uncertainty. Real systems are dynamic and stochastic, so rather than optimizing for a single snapshot, I use simulation, discrete event, agent based, and system dynamics, to test how a model holds up under changing conditions and tune it for the best result across them.',
      'A few results I am proud of: a published surgery scheduling model (MILP plus GRASP metaheuristic) that cut delays by 5% and lifted room occupancy by up to 9%, and an optimization system at TECMO that reduced steel procurement costs by 12%, over 500,000 USD in traceable savings across more than 10,000 tons of material, before counting the handling and storage costs it eliminated. Today I build and integrate features for a B2B lead generation platform, wiring in services like Salesforce, HiveApi, and AthenaAI.',
      'I am in love with problem solving. I reach for whatever language fits, Python, C#, or R, to build a model or implement a solver like Gurobi, then ship something that measurably works.'
    ],
    cvUrl: 'assets/files/cv-placeholder.pdf',
    heroImage: 'assets/images/ProfilePic.webp',
    aboutImage: 'assets/images/Profile2.webp',
  },
  socialLinks: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nicolas-lopval',
      icon: 'linkedin',
    },
  ],
  education: [
    {
      id: 'edu-1',
      period: '2018-2020',
      degree: 'Master Degree of Engineering Managament',
      institution: 'Universidad de la Sabana',
      accentBar: true,
      issuerLogo: 'assets/images/universidad_de_la_sabana_logo.jpg',
    },
    {
      id: 'edu-2',
      period: '2010-2016',
      degree: 'Bachelor\'s in Industrial Engineering',
      institution: 'Pontificia Universidad Javeriana',
      accentBar: true,
      issuerLogo: 'assets/images/pontificia_universidad_javeriana_logo.jpg',
    },
    {
      id: 'edu-3',
      period: 'September 2025',
      degree: 'Operations Research (3): Theory',
      institution: 'National Taiwan University',
      accentBar: false,
      issuerLogo: 'assets/images/national_taiwan_university_logo.jpg',
      certificateUrl:
        'https://www.coursera.org/account/accomplishments/verify/1J2Q8L7LS3BY',
    },
    {
      id: 'edu-4',
      period: 'August 2025',
      degree: 'Operations Research (2): Optimization Algorithms',
      institution: 'National Taiwan University',
      accentBar: false,
      issuerLogo: 'assets/images/national_taiwan_university_logo.jpg',
      certificateUrl:
        'https://www.coursera.org/account/accomplishments/verify/RQLCE6WA6PQD',
    },
    {
      id: 'edu-5',
      period: 'August 2025',
      degree: 'Operations Research (1): Models and Applications',
      institution: 'National Taiwan University',
      accentBar: false,
      issuerLogo: 'assets/images/national_taiwan_university_logo.jpg',
      certificateUrl:
        'https://www.coursera.org/account/accomplishments/verify/ICTVKM2QNMDI',
    },
    {
      id: 'edu-6',
      period: 'January 2021',
      degree: 'IBM Data Analyst Professional Certificate',
      institution: 'IBM - Coursera',
      accentBar: false,
      issuerLogo: 'assets/images/coursera_logo.jpg',
      certificateUrl:
        'https://www.coursera.org/account/accomplishments/professional-cert/EWRM345QXWZZ',
    },
    {
      id: 'edu-7',
      period: 'December 2020',
      degree: 'Data Analysis with Python',
      institution: 'IBM - Coursera',
      accentBar: false,
      issuerLogo: 'assets/images/coursera_logo.jpg',
      certificateUrl:
        'https://www.credly.com/badges/49d1c6d3-7703-4052-bf3d-1389707a57ff',
    },
    {
      id: 'edu-8',
      period: 'December 2020',
      degree: 'Databases and SQL for Data Science',
      institution: 'IBM - Coursera',
      accentBar: false,
      issuerLogo: 'assets/images/coursera_logo.jpg',
      certificateUrl:
        'https://www.credly.com/badges/216a14be-c48c-4f0a-838d-a2b1a49aebf8',
    },
    {
      id: 'edu-9',
      period: 'December 2020',
      degree: 'Python for Data Science and AI',
      institution: 'IBM - Coursera',
      accentBar: false,
      issuerLogo: 'assets/images/coursera_logo.jpg',
      certificateUrl:
        'https://www.credly.com/badges/9c4689d9-b5c7-47b7-8831-ec8e52f758e0',
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
      title: 'Operations Research',
      description:
        'Optimization models on different fronts, validated through simulation for supply chain, production, scheduling, and more.',
      icon: 'sigma',
    },
    {
      id: 'svc-2',
      title: 'Development',
      description:
        'Software development of complex systems using mainly .NET, Angular, SQL',
      icon: 'code',
    },
    {
      id: 'svc-3',
      title: 'Systems Integration and Automation',
      description:
        'Interconnecting systems such as Salesforce, HiveApi, AI service integrations, REST APIs, Office document automation, ERP workflows among others.',
      icon: 'gear',
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
        "\"Nico is a great engineer, but that's actually not the main reason I'd recommend him. Nico's super-power is being like \"glue\" for engineering teams: he does good work, and more importantly, he helps everyone else around him be better. He brings a great energy to teams, lifts people up, and is always willing to help colleagues with technical problems. Every engineering team would be better with someone like Nico around!\"",
      authorName: 'Chris Hart',
      authorTitle: 'Founder & CEO',
      authorImage: 'assets/images/ChrisHart.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/chart',
    },
  ],
  contact: {
    address: 'Calle Angel Carazo Gomez 6, Torremolinos, Spain',
    phone: '+34 645 639 986',
    email: 'nicolaslopval@gmail.com',
  },
  footerCopyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
};
