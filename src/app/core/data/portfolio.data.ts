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
      id: 'exp-0',
      period: '2025-2026',
      total: 'Present 9 mos',
      title: 'Senior Software Developer',
      company: 'Introsmatter',
      companyLinkedin: 'https://www.linkedin.com/company/introsmatter',
      Description: '- Developed backend features for lead generation platform using .NET 8.0, SQL Server, and Clean Architecture principles.\n- Built and maintain structure for automated tests with Playwright for the web application and browser extension.\n- Implemented multiple functionalities and integrations to multiple services such as Salesforce and AthenaAi.\n- Built database migration processes and optimized SQL queries for LinkedIn connection processing systems.\n- Collaborated within SCRUM framework to deliver solutions for B2B lead generation and social network data extraction.\n- Contributed to CI/CD pipeline improvements using GitLab and Octopus Deploy for deployment automation.',
      accentBar: true,
    },
    {
      id: 'exp-1',
      period: '2023-2025',
      total: '1 yr 9 mos',
      title: 'Senior Software Developer',
      company: 'Ubimia',
      companyLinkedin: 'https://www.linkedin.com/company/ubimia%C2%AE/posts/?feedView=all',
      Description: '- Developed robust financial solutions using ASP.NET, SQL, and VBA for banking sector clients.\n- Created cross-platform integrations using Spire for .NET to automate MS Word and Excel document processing.\n- Improved development processes through strategic code reviews and SubVersion version control.\n- Built connections between multiple banking services to enhance interoperability of the application.\n',
      accentBar: false,
    },
    {
      id: 'exp-2',
      period: '2022-2023',
      total: '1 yr 7 mos',
      title: 'Software Engineer',
      company: 'BAIRESDEV',
      companyLinkedin: 'https://www.linkedin.com/company/bairesdev',
      Description: '- Develop and maintain scalable desktop and web applications for BairesDev using C#, SQL Server, and Angular, optimizing user experience and improving productivity and transparency for our users.\n- Collaborate with cross-functional agile teams to streamline database processes, optimize ERP solutions, and integrate Atlassian platform, reducing operational costs and enhancing system performance.\n- Conduct code reviews, estimate tasks, and provide technical guidance to junior developers to improve code quality and ensure adherence to best practices and coding standards.\n- Utilize REST APIs to integrate Jira, Confluence, Gmail, and other communication and collaboration tools, enabling seamless teamwork and facilitating knowledge sharing among teams.',
      accentBar: false,
    },
    {
      id: 'exp-3',
      period: '2021-2022',
      total: '9 mos',
      title: 'Program Management Office Analyst',
      company: 'BAIRESDEV',
      companyLinkedin: 'https://www.linkedin.com/company/bairesdev',
      Description: '- Be responsible for ensuring and improving the quality of information and processes in BairesDev.\n- Review existing information to corroborate its consistency and update.\n- Ensure correct compliance with established processes.\n- Creation and implementation of new processes.\n- Collaborate with the implementation of new initiatives for the company.\n- Look for new ideas and disruptive and original solutions.\n- Prepare reports and monitoring of KPIs.',
      accentBar: false,
    },
    {
      id: 'exp-4',
      period: '2015-2021',
      total: '5 yrs 11 mos',
      title: 'Product Owner | Process Engineer',
      company: 'TECMO SA',
      companyLinkedin: 'https://www.linkedin.com/company/tecmo-sa',
      Description: 'As Process Engineer:\n- Conducted operational research to optimize material costs and processes for construction projects, reducing traceable costs by 12% (500k+ USD).\n- Implemented optimization models using metaheuristics, SIMPLEX, and Solver to manage 10,000+ tons of steel inventory across 1M+ elements.\n- Balanced cost efficiency with project timelines through effective resource allocation models.\n- Design processes based on new requirements that the operation demanded.\n- Manage stakeholders to create and determine the best workflows for the company.\n- Train employees on the processes and dynamics of the designed workflows.\n- Perform efficiency tests on supplies and recurrent inputs.\n\nAs Product Owner:\n- Led the design and development of in-house software for purchases, production, QA, logistics, HR and other departments.\n- Define product vision and strategy aligned with business goals.\n- Maintain and communicate the product roadmap.\n- Gather and analyze requirements from stakeholders.\n- Facilitate communication between business and development teams.\n- Manage stakeholder expectations and feedback.\n- Provide clarification and make decisions during development.\n- Accept or reject completed work based on defined criteria.\n- Train and do follow ups on the users to ensure launch success.\n- Monitor product performance and user feedback post-launch.',
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
        "\"Nico is a great engineer, but that's actually not the main reason I'd recommend him.\nNico's super-power is being like \"glue\" for engineering teams: he does good work, and more importantly, he helps everyone else around him be better.\nHe brings a great energy to teams, lifts people up, and is always willing to help colleagues with technical problems.\nEvery engineering team would be better with someone like Nico around!\"",
      authorName: 'Chris Hart',
      authorTitle: 'Founder & CEO',
      authorImage: 'assets/images/ChrisHart.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/chart',
    },
    {
      id: 'ref-2',
      quote:
        "\"Tuve el gusto enorme de trabajar con Nicolás, donde demostró ser un profesional confiable y muy proactivo (en aspectos integrales, no solo en la parte técnica) y que ha comprendido rápidamente los desafíos que tenemos en el sector financiero.\nSu compromiso es medible en iniciativas que aportaron mejoras a nuestros procesos y para fomentar excelente clima laboral con todo el equipo, también destaco su responsabilidad en la gestión y su autonomía profesional para avanzar con los proyectos y desafíos asignados.\nLe deseo el mejor de los éxitos siempre !\"",
      authorName: 'Ignacio Tellería Chazarreta',
      authorTitle: 'Country Manager',
      authorImage: 'assets/images/Nacho.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/ignaciotelleriachazarreta',
    },
    {
      id: 'ref-3',
      quote:
        "\"Once I was assigned to assist another team with keeping their project up-to-date with our libs, and that was the first I came across Nico.\nBack then, Nico was a .NET developer, but was stuck with the task of taking care of the Angular front end, as well, with which he wasn't all that familiarized.\nAngular is a robust framework but with a very steep learning curve, but within a week or two of some mob programming calls he had been able to learn how to maintain and grow the project by himself.\nI was baffled watching it happen first hand.\nNico is a fast learner, a highly adaptable developer with excellent critical thinking and one who's willing to take a challenge, even if it takes learning stuff from scratch, and for that alone, I'd tip my hat to him.\nBut more than anything: he's not only a top tier dev, but also a top tier friend.\nIf one needs a dev who can take it, I strongly recommend Nico anytime, anywhere.\nThanks for everything and I can only hope to one day be on the same team as you again.\nCheers and rock on, man!\"",
      authorName: 'Daniel Nagaoka',
      authorTitle: 'Senior TypeScript & JavaScript Software Engineer',
      authorImage: 'assets/images/DanNagaoka.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/daninagaoka',
    },
    {
      id: 'ref-4',
      quote:
        "\"Nico is one of those professionals who always give the extra mile.\nI had the fortune to work alongside him on the development team and was impressed with his capacity to make things move forward.\nHe is very committed, passionate, proactive, and a team worker.\nI highly recommend Nico because beyond being a professional with strong technical skills, he is an exceptional person with outstanding soft skills who will help you promote a collaborative work environment and help the whole team achieve their goals.\"",
      authorName: 'Veronica Aristizabal',
      authorTitle: 'Product Manager & Product Owner',
      authorImage: 'assets/images/Vero.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/varistizabalg',
    },
    {
      id: 'ref-5',
      quote:
        "\"During the time we worked together, Nicolas consistently demonstrated an exceptional commitment to his work and a proactive approach to addressing any issues that arose.\nHis genuine concern for customer satisfaction and coding abilities significantly contributed to his success.\nNicolas's strong work ethic, attention to detail, and dedication to taking on more significant challenges made him an invaluable asset to our team.\nHis customer-focused mindset ensured our users received the highest service and support.\"",
      authorName: 'Juan Manuel Arce',
      authorTitle: 'Product & Technology Strategist',
      authorImage: 'assets/images/JuanmaArce.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/juan-manuel-arce',
    },
    {
      id: 'ref-6',
      quote:
        "\"Nico is one of the best persons I’ve had the pleasure of working with and I will always remember him fondly.\nWhen I started working at BairesDev, Nico showed me many tricks and helped me every time I needed it.\nI learned a lot from him.\nHe’s always willing to lend a hand to anyone who needs it.\nI also had the opportunity to watch him adapt to changes when he was moved to a different team.\nHis ability to overcome challenges with a smile made hin stand out as a cut above the rest!\nI totally recommend Nico, he is a great asset for any company!\"",
      authorName: 'Adriana Aguirre',
      authorTitle: 'Business Engineer',
      authorImage: 'assets/images/AdriAguirre.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/adriana-aguirre4',
    },
    {
      id: 'ref-7',
      quote:
        "\"I have had the pleasure of working with Nico for some time and have been consistently impressed by his talent and dedication to his work.\nNico has an innate ability to learn quickly and is always eager to explore new technologies and approaches to his work.\nHis proactivity and motivation make him a valuable member of any team.\nOne of Nico's standout skills is his ability to communicate effectively, bringing together diverse groups of people to solve complex problems.\nIn addition, Nico possesses solid skills in both front-end and back-end development, with a deep understanding of database mssql, .NET and JavaScript.\nHis knowledge in these areas has been invaluable to our team, and I have no doubt that he would be an asset to any organization.\nI highly recommend Nico for any role where his skills, knowledge, and passion can be put to use.\nHe is a talented and driven professional who would be a valuable addition to any team.\"",
      authorName: 'Michael Becker',
      authorTitle: 'Tech Lead & Software Engineer',
      authorImage: 'assets/images/Mike.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/michael-rbecker',
    },
    {
      id: 'ref-8',
      quote:
        "\"Nico has a best attitude ever!\nalways going above and beyond without a fear of success!\"",
      authorName: 'Iurii Ernich',
      authorTitle: 'Senior Product Manager',
      authorImage: 'assets/images/Iurii.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/iurii-ernich',
    },
    {
      id: 'ref-9',
      quote:
        "\"As one of Nicolas' university classmate, I highly recommend his exceptional skills and qualities.\nHe is an intelligent, disciplined, and fast learner with great teamwork skills and exceptional creative and communication skills.\nHe is a visionary thinker who is always willing to take on new challenges and collaborate with others to achieve goals.\"",
      authorName: 'Camilo Dominguez Mesa',
      authorTitle: 'Regional Commercial Lead',
      authorImage: 'assets/images/CamiDomi.jpg',
      linkedInUrl: 'https://www.linkedin.com/in/camilo-dominguez-mesa-7bb79a65',
    },
  ],
  contact: {
    address: 'Calle Angel Carazo Gomez 6, Torremolinos, Spain',
    phone: '+34 645 639 986',
    email: 'nicolaslopval@gmail.com',
  },
  footerCopyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
};
