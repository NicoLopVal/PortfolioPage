export type SkillLevel = 'Expert' | 'Proficient' | 'Familiar';

// ─── Flat records from skills_database.csv ───────────────────────────────────
// Used to build the "By Skill" view (grouped by Hability).
// The `implemented` field mirrors the comma-separated column in the CSV.

export interface SkillEntry {
  hability: string;
  technique: string;
  implemented: string[];
  level: SkillLevel;
}

export const SKILL_ENTRIES: SkillEntry[] = [
  // .NET
  { hability: '.NET', technique: 'C#', implemented: ['Ubimia', 'BairesDev', 'IntrosMatter', "Bachelor's publication"], level: 'Expert' },
  { hability: '.NET', technique: '.NET 8', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: '.NET', technique: '.NET Framework', implemented: ['Ubimia', 'BairesDev'], level: 'Proficient' },
  { hability: '.NET', technique: 'Clean Architecture', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: '.NET', technique: 'REST API development', implemented: ['Ubimia', 'BairesDev', 'IntrosMatter'], level: 'Proficient' },
  { hability: '.NET', technique: 'WPF (Windows Presentation Foundation)', implemented: ['Ubimia'], level: 'Proficient' },
  { hability: '.NET', technique: 'WinForms', implemented: ['Tecmo', 'BairesDev'], level: 'Proficient' },
  { hability: '.NET', technique: 'Object-Oriented Programming (OOP)', implemented: ['Ubimia', 'BairesDev', 'IntrosMatter', "Bachelor's publication"], level: 'Expert' },
  { hability: '.NET', technique: 'Dependency Injection', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: '.NET', technique: 'Scalability', implemented: ['BairesDev'], level: 'Familiar' },
  { hability: '.NET', technique: 'TickerQ (background jobs)', implemented: ['IntrosMatter'], level: 'Familiar' },
  { hability: '.NET', technique: 'Docker', implemented: ['IntrosMatter'], level: 'Familiar' },
  { hability: '.NET', technique: 'Service integrations (Google Suite, Atlassian Suite, AthenaAI, SalesForce)', implemented: ['Ubimia', 'BairesDev', 'IntrosMatter'], level: 'Proficient' },
  { hability: '.NET', technique: 'Document manipulation (Spire)', implemented: ['Ubimia'], level: 'Proficient' },
  // Database
  { hability: 'Database', technique: 'SQL Server', implemented: ['Ubimia', 'BairesDev', 'IntrosMatter', 'IBM Data Analyst certification'], level: 'Expert' },
  { hability: 'Database', technique: 'Oracle SQL', implemented: ['Ubimia'], level: 'Familiar' },
  { hability: 'Database', technique: 'T-SQL', implemented: ['Ubimia', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Database', technique: 'Database design / data modeling', implemented: ['Ubimia', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Database', technique: 'Stored Procedures', implemented: ['BairesDev', 'IntrosMatter'], level: 'Proficient' },
  // Frontend Development
  { hability: 'Frontend Development', technique: 'Angular', implemented: ['BairesDev', 'IntrosMatter', 'Personal portfolio'], level: 'Proficient' },
  { hability: 'Frontend Development', technique: 'TypeScript', implemented: ['IntrosMatter', 'Personal portfolio'], level: 'Proficient' },
  { hability: 'Frontend Development', technique: 'HTML / CSS', implemented: ['IntrosMatter', 'Personal portfolio'], level: 'Proficient' },
  // Automated Testing
  { hability: 'Automated Testing', technique: 'Test Automation', implemented: ['BairesDev', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Automated Testing', technique: 'Unit Testing', implemented: ['BairesDev'], level: 'Proficient' },
  { hability: 'Automated Testing', technique: 'Playwright', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: 'Automated Testing', technique: 'E2E test orchestration', implemented: ['IntrosMatter'], level: 'Expert' },
  { hability: 'Automated Testing', technique: 'SQL fixture management', implemented: ['IntrosMatter'], level: 'Proficient' },
  // Operations Research / Optimization
  { hability: 'Operations Research / Optimization', technique: 'Mathematical Modeling', implemented: ['Tecmo', "Bachelor's publication", 'MSc thesis', 'NTU Operations Research courses'], level: 'Expert' },
  { hability: 'Operations Research / Optimization', technique: 'Linear Programming (LP)', implemented: ["Bachelor's publication", 'MSc thesis', 'NTU Operations Research courses'], level: 'Proficient' },
  { hability: 'Operations Research / Optimization', technique: 'MILP (Mixed Integer Linear Programming)', implemented: ["Bachelor's publication", 'NTU Operations Research courses'], level: 'Proficient' },
  { hability: 'Operations Research / Optimization', technique: 'GRASP metaheuristic', implemented: ["Bachelor's publication"], level: 'Expert' },
  { hability: 'Operations Research / Optimization', technique: 'Heuristics & Metaheuristics', implemented: ["Bachelor's publication", "Bachelor's degree", 'Tecmo'], level: 'Expert' },
  { hability: 'Operations Research / Optimization', technique: 'Greedy algorithms', implemented: ["Bachelor's degree", "Bachelor's publication"], level: 'Proficient' },
  { hability: 'Operations Research / Optimization', technique: 'Genetic algorithms', implemented: ["Bachelor's degree"], level: 'Familiar' },
  { hability: 'Operations Research / Optimization', technique: 'Simplex method', implemented: ["Bachelor's degree", 'NTU Operations Research courses'], level: 'Proficient' },
  { hability: 'Operations Research / Optimization', technique: 'Shortest path algorithms', implemented: ["Bachelor's degree"], level: 'Familiar' },
  { hability: 'Operations Research / Optimization', technique: '1D Cutting stock problem', implemented: ['Tecmo'], level: 'Expert' },
  { hability: 'Operations Research / Optimization', technique: 'Combinatorial optimization', implemented: ['IBM Ponder This', "Bachelor's degree"], level: 'Proficient' },
  { hability: 'Operations Research / Optimization', technique: 'Algorithm design', implemented: ['IBM Ponder This', "Bachelor's publication"], level: 'Proficient' },
  { hability: 'Operations Research / Optimization', technique: 'Gurobi', implemented: ['NTU Operations Research courses'], level: 'Familiar' },
  { hability: 'Operations Research / Optimization', technique: 'GAMS / CPLEX', implemented: ["Bachelor's publication"], level: 'Familiar' },
  // Simulation
  { hability: 'Simulation', technique: 'Monte Carlo simulation', implemented: ["Bachelor's publication", "Bachelor's degree", 'IBM Ponder This'], level: 'Expert' },
  { hability: 'Simulation', technique: 'Discrete event simulation', implemented: ["Bachelor's degree"], level: 'Proficient' },
  { hability: 'Simulation', technique: 'Agent-based modeling', implemented: ['MSc thesis'], level: 'Proficient' },
  { hability: 'Simulation', technique: 'System Dynamics Simulation', implemented: ['MSc degree'], level: 'Proficient' },
  { hability: 'Simulation', technique: 'AnyLogic', implemented: ['MSc thesis'], level: 'Proficient' },
  { hability: 'Simulation', technique: 'Arena', implemented: ["Bachelor's degree"], level: 'Proficient' },
  { hability: 'Simulation', technique: 'Vensim', implemented: ["Bachelor's degree", 'MSc degree'], level: 'Familiar' },
  { hability: 'Simulation', technique: 'Flexsim', implemented: ["Bachelor's degree"], level: 'Familiar' },
  { hability: 'Simulation', technique: 'Bass diffusion model', implemented: ['MSc thesis'], level: 'Proficient' },
  // Statistics / Data Analysis
  { hability: 'Statistics / Data Analysis', technique: 'Multinomial logistic regression', implemented: ['MSc thesis'], level: 'Proficient' },
  { hability: 'Statistics / Data Analysis', technique: 'R', implemented: ['MSc thesis'], level: 'Proficient' },
  { hability: 'Statistics / Data Analysis', technique: 'Statistical hypothesis testing (ANOVA / Tukey / K-S)', implemented: ["Bachelor's publication", 'MSc thesis'], level: 'Proficient' },
  { hability: 'Statistics / Data Analysis', technique: 'Probability distribution fitting', implemented: ["Bachelor's publication"], level: 'Proficient' },
  { hability: 'Statistics / Data Analysis', technique: 'Survey design and execution', implemented: ['MSc thesis'], level: 'Proficient' },
  { hability: 'Statistics / Data Analysis', technique: 'Applied statistics', implemented: ['Ubimia', 'BairesDev', 'MSc thesis', "Bachelor's publication"], level: 'Proficient' },
  // Python
  { hability: 'Python', technique: 'Data Science', implemented: ['IBM Ponder This', 'IBM Data Analyst certification'], level: 'Proficient' },
  { hability: 'Python', technique: 'Pandas / NumPy', implemented: ['IBM Data Analyst certification'], level: 'Proficient' },
  { hability: 'Python', technique: 'Data visualization', implemented: ['IBM Data Analyst certification'], level: 'Familiar' },
  // VBA
  { hability: 'VBA', technique: 'Excel and Word', implemented: ['Tecmo', 'Ubimia', 'IBM Ponder This'], level: 'Expert' },
  { hability: 'VBA', technique: 'Excel Macro', implemented: ['Tecmo', 'Ubimia'], level: 'Expert' },
  // Version Control
  { hability: 'Version Control', technique: 'Git', implemented: ['IntrosMatter', 'BairesDev'], level: 'Proficient' },
  { hability: 'Version Control', technique: 'Subversion (SVN)', implemented: ['Ubimia'], level: 'Proficient' },
  { hability: 'Version Control', technique: 'CI/CD pipelines', implemented: ['BairesDev', 'IntrosMatter'], level: 'Proficient' },
  // Project & Collaboration
  { hability: 'Project & Collaboration', technique: 'Project ownership', implemented: ['Ubimia'], level: 'Proficient' },
  { hability: 'Project & Collaboration', technique: 'Remote work', implemented: ['Ubimia', 'BairesDev', 'IntrosMatter'], level: 'Expert' },
  { hability: 'Project & Collaboration', technique: 'Cross-functional coordination', implemented: ['Tecmo', 'BairesDev'], level: 'Expert' },
  { hability: 'Project & Collaboration', technique: 'Offsite/remote meeting coordination', implemented: ['Tecmo', 'BairesDev', 'Ubimia', 'IntrosMatter'], level: 'Expert' },
  { hability: 'Project & Collaboration', technique: 'Technical research and academic writing', implemented: ["Bachelor's publication", 'MSc thesis'], level: 'Proficient' },
  { hability: 'Project & Collaboration', technique: 'Decision-Making', implemented: ['Tecmo', 'Ubimia', 'BairesDev', 'IntrosMatter', 'MSc thesis', "Bachelor's publication"], level: 'Expert' },
  { hability: 'Project & Collaboration', technique: 'Agile Methodologies (Scrum / Kanban)', implemented: ['BairesDev', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Project & Collaboration', technique: 'Problem Solving', implemented: ['Tecmo', "Bachelor's publication", 'MSc thesis', 'IBM Ponder This', 'NTU Operations Research courses'], level: 'Expert' },
  // Tools
  { hability: 'Tools', technique: 'GitLab', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: 'Tools', technique: 'Octopus Deploy', implemented: ['BairesDev', 'IntrosMatter'], level: 'Familiar' },
  { hability: 'Tools', technique: 'JFrog Artifactory', implemented: ['BairesDev', 'IntrosMatter'], level: 'Familiar' },
  { hability: 'Tools', technique: 'Jenkins', implemented: ['BairesDev'], level: 'Familiar' },
  { hability: 'Tools', technique: 'Atlassian Suite (Jira, Confluence, Bitbucket)', implemented: ['BairesDev', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Tools', technique: 'Google Suite', implemented: ['BairesDev', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Tools', technique: 'Microsoft Suite', implemented: ['Tecmo', 'Ubimia'], level: 'Expert' },
  { hability: 'Tools', technique: 'Rider Jetbrains', implemented: ['BairesDev', 'Ubimia', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Tools', technique: 'DataGrip Jetbrains', implemented: ['BairesDev', 'Ubimia', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Tools', technique: 'R Studio', implemented: ['MSc thesis'], level: 'Familiar' },
  { hability: 'Tools', technique: 'VsCode', implemented: ['BairesDev', 'Ubimia', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'Tools', technique: 'Visual Studio', implemented: ['BairesDev', 'Ubimia'], level: 'Proficient' },
  { hability: 'Tools', technique: 'SolidWorks', implemented: ["Bachelor's degree"], level: 'Familiar' },
  // AI Tools
  { hability: 'AI Tools', technique: 'Claude', implemented: ['BairesDev', 'Ubimia', 'IntrosMatter'], level: 'Expert' },
  { hability: 'AI Tools', technique: 'Cursor', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: 'AI Tools', technique: 'GitHub Copilot', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: 'AI Tools', technique: 'Claude Code', implemented: ['IntrosMatter'], level: 'Proficient' },
  { hability: 'AI Tools', technique: 'ChatGPT', implemented: ['BairesDev', 'Ubimia', 'IntrosMatter'], level: 'Proficient' },
  { hability: 'AI Tools', technique: 'AthenaAI', implemented: ['IntrosMatter'], level: 'Familiar' },
  // Organizational
  { hability: 'Organizational', technique: 'Logistics management', implemented: ['Tecmo'], level: 'Proficient' },
  { hability: 'Organizational', technique: 'Purchases management', implemented: ['Tecmo'], level: 'Expert' },
  { hability: 'Organizational', technique: 'Maintenance management', implemented: ['Tecmo'], level: 'Proficient' },
  { hability: 'Organizational', technique: 'Allocation management', implemented: ['Tecmo'], level: 'Expert' },
  { hability: 'Organizational', technique: 'Product Owner', implemented: ['Tecmo'], level: 'Expert' },
  // Engineering
  { hability: 'Engineering', technique: 'Industrial Engineering', implemented: ['Tecmo', "Bachelor's degree", 'MSc degree'], level: 'Expert' },
  // Languages
  { hability: 'Languages', technique: 'English', implemented: ['C1'], level: 'Expert' },
  { hability: 'Languages', technique: 'Spanish', implemented: ['Native'], level: 'Expert' },
];

// ─── Flat records from Implementations_database.csv ──────────────────────────
// Used to build the "By Implementation" view (grouped by place).
// Each row is one technique at one specific place.

export interface ImplEntry {
  implemented: string;
  technique: string;
  hability: string;
  level: SkillLevel;
}

export const IMPL_ENTRIES: ImplEntry[] = [
  // Bachelor's
  { implemented: "Bachelor's", technique: 'C#', hability: '.NET', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Object-Oriented Programming (OOP)', hability: '.NET', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Mathematical Modeling', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Linear Programming (LP)', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'MILP (Mixed Integer Linear Programming)', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'GRASP metaheuristic', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Heuristics & Metaheuristics', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Greedy algorithms', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Genetic algorithms', hability: 'Operations Research / Optimization', level: 'Familiar' },
  { implemented: "Bachelor's", technique: 'Simplex method', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Shortest path algorithms', hability: 'Operations Research / Optimization', level: 'Familiar' },
  { implemented: "Bachelor's", technique: 'Combinatorial optimization', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Algorithm design', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'GAMS / CPLEX', hability: 'Operations Research / Optimization', level: 'Familiar' },
  { implemented: "Bachelor's", technique: 'Monte Carlo simulation', hability: 'Simulation', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Discrete event simulation', hability: 'Simulation', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Arena', hability: 'Simulation', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Vensim', hability: 'Simulation', level: 'Familiar' },
  { implemented: "Bachelor's", technique: 'Flexsim', hability: 'Simulation', level: 'Familiar' },
  { implemented: "Bachelor's", technique: 'Statistical hypothesis testing (ANOVA / Tukey / K-S)', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Probability distribution fitting', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Applied statistics', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Technical research and academic writing', hability: 'Project & Collaboration', level: 'Proficient' },
  { implemented: "Bachelor's", technique: 'Decision-Making', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'Problem Solving', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: "Bachelor's", technique: 'SolidWorks', hability: 'Tools', level: 'Familiar' },
  { implemented: "Bachelor's", technique: 'Industrial Engineering', hability: 'Engineering', level: 'Expert' },
  // Master's
  { implemented: "Master's", technique: 'Mathematical Modeling', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: "Master's", technique: 'Linear Programming (LP)', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: "Master's", technique: 'Agent-based modeling', hability: 'Simulation', level: 'Proficient' },
  { implemented: "Master's", technique: 'System Dynamics Simulation', hability: 'Simulation', level: 'Proficient' },
  { implemented: "Master's", technique: 'AnyLogic', hability: 'Simulation', level: 'Proficient' },
  { implemented: "Master's", technique: 'Vensim', hability: 'Simulation', level: 'Familiar' },
  { implemented: "Master's", technique: 'Bass diffusion model', hability: 'Simulation', level: 'Proficient' },
  { implemented: "Master's", technique: 'Multinomial logistic regression', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Master's", technique: 'R', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Master's", technique: 'Statistical hypothesis testing (ANOVA / Tukey / K-S)', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Master's", technique: 'Survey design and execution', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Master's", technique: 'Applied statistics', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: "Master's", technique: 'Technical research and academic writing', hability: 'Project & Collaboration', level: 'Proficient' },
  { implemented: "Master's", technique: 'Decision-Making', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: "Master's", technique: 'Problem Solving', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: "Master's", technique: 'R Studio', hability: 'Tools', level: 'Familiar' },
  { implemented: "Master's", technique: 'Industrial Engineering', hability: 'Engineering', level: 'Expert' },
  // Tecmo
  { implemented: 'Tecmo', technique: 'WinForms', hability: '.NET', level: 'Proficient' },
  { implemented: 'Tecmo', technique: 'Mathematical Modeling', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Heuristics & Metaheuristics', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: 'Tecmo', technique: '1D Cutting stock problem', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Excel and Word', hability: 'VBA', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Excel Macro', hability: 'VBA', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Cross-functional coordination', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Offsite/remote meeting coordination', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Decision-Making', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Problem Solving', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Microsoft Suite', hability: 'Tools', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Logistics management', hability: 'Organizational', level: 'Proficient' },
  { implemented: 'Tecmo', technique: 'Purchases management', hability: 'Organizational', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Maintenance management', hability: 'Organizational', level: 'Proficient' },
  { implemented: 'Tecmo', technique: 'Allocation management', hability: 'Organizational', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Product Owner', hability: 'Organizational', level: 'Expert' },
  { implemented: 'Tecmo', technique: 'Industrial Engineering', hability: 'Engineering', level: 'Expert' },
  // BairesDev
  { implemented: 'BairesDev', technique: 'C#', hability: '.NET', level: 'Expert' },
  { implemented: 'BairesDev', technique: '.NET Framework', hability: '.NET', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'REST API development', hability: '.NET', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'WinForms', hability: '.NET', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Object-Oriented Programming (OOP)', hability: '.NET', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'Scalability', hability: '.NET', level: 'Familiar' },
  { implemented: 'BairesDev', technique: 'Service integrations (Google Suite, Atlassian Suite, AthenaAI, SalesForce)', hability: '.NET', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'SQL Server', hability: 'Database', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'Stored Procedures', hability: 'Database', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Angular', hability: 'Frontend Development', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Test Automation', hability: 'Automated Testing', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Unit Testing', hability: 'Automated Testing', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Applied statistics', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Git', hability: 'Version Control', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'CI/CD pipelines', hability: 'Version Control', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Remote work', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'Cross-functional coordination', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'Offsite/remote meeting coordination', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'Decision-Making', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'Agile Methodologies (Scrum / Kanban)', hability: 'Project & Collaboration', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Octopus Deploy', hability: 'Tools', level: 'Familiar' },
  { implemented: 'BairesDev', technique: 'JFrog Artifactory', hability: 'Tools', level: 'Familiar' },
  { implemented: 'BairesDev', technique: 'Jenkins', hability: 'Tools', level: 'Familiar' },
  { implemented: 'BairesDev', technique: 'Atlassian Suite (Jira, Confluence, Bitbucket)', hability: 'Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Google Suite', hability: 'Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Rider Jetbrains', hability: 'Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'DataGrip Jetbrains', hability: 'Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'VsCode', hability: 'Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Visual Studio', hability: 'Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'Claude', hability: 'AI Tools', level: 'Expert' },
  { implemented: 'BairesDev', technique: 'ChatGPT', hability: 'AI Tools', level: 'Proficient' },
  { implemented: 'BairesDev', technique: 'English', hability: 'Languages', level: 'Expert' },
  // Ubimia
  { implemented: 'Ubimia', technique: 'C#', hability: '.NET', level: 'Expert' },
  { implemented: 'Ubimia', technique: '.NET Framework', hability: '.NET', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'REST API development', hability: '.NET', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'WPF (Windows Presentation Foundation)', hability: '.NET', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Object-Oriented Programming (OOP)', hability: '.NET', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Service integrations (Google Suite, Atlassian Suite, AthenaAI, SalesForce)', hability: '.NET', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Document manipulation (Spire)', hability: '.NET', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'SQL Server', hability: 'Database', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Oracle SQL', hability: 'Database', level: 'Familiar' },
  { implemented: 'Ubimia', technique: 'T-SQL', hability: 'Database', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Database design / data modeling', hability: 'Database', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Applied statistics', hability: 'Statistics / Data Analysis', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Excel and Word', hability: 'VBA', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Excel Macro', hability: 'VBA', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Subversion (SVN)', hability: 'Version Control', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Project ownership', hability: 'Project & Collaboration', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Remote work', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Offsite/remote meeting coordination', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Decision-Making', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Microsoft Suite', hability: 'Tools', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'Rider Jetbrains', hability: 'Tools', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'DataGrip Jetbrains', hability: 'Tools', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'VsCode', hability: 'Tools', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Visual Studio', hability: 'Tools', level: 'Proficient' },
  { implemented: 'Ubimia', technique: 'Claude', hability: 'AI Tools', level: 'Expert' },
  { implemented: 'Ubimia', technique: 'ChatGPT', hability: 'AI Tools', level: 'Proficient' },
  // IntrosMatter
  { implemented: 'IntrosMatter', technique: 'C#', hability: '.NET', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: '.NET 8', hability: '.NET', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Clean Architecture', hability: '.NET', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'REST API development', hability: '.NET', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Object-Oriented Programming (OOP)', hability: '.NET', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'Dependency Injection', hability: '.NET', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'TickerQ (background jobs)', hability: '.NET', level: 'Familiar' },
  { implemented: 'IntrosMatter', technique: 'Docker', hability: '.NET', level: 'Familiar' },
  { implemented: 'IntrosMatter', technique: 'Service integrations (Google Suite, Atlassian Suite, AthenaAI, SalesForce)', hability: '.NET', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'SQL Server', hability: 'Database', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'T-SQL', hability: 'Database', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Database design / data modeling', hability: 'Database', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Stored Procedures', hability: 'Database', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Angular', hability: 'Frontend Development', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'TypeScript', hability: 'Frontend Development', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'HTML / CSS', hability: 'Frontend Development', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Test Automation', hability: 'Automated Testing', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Playwright', hability: 'Automated Testing', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'E2E test orchestration', hability: 'Automated Testing', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'SQL fixture management', hability: 'Automated Testing', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Git', hability: 'Version Control', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'CI/CD pipelines', hability: 'Version Control', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Remote work', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'Offsite/remote meeting coordination', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'Decision-Making', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'Agile Methodologies (Scrum / Kanban)', hability: 'Project & Collaboration', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'GitLab', hability: 'Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Octopus Deploy', hability: 'Tools', level: 'Familiar' },
  { implemented: 'IntrosMatter', technique: 'JFrog Artifactory', hability: 'Tools', level: 'Familiar' },
  { implemented: 'IntrosMatter', technique: 'Atlassian Suite (Jira, Confluence, Bitbucket)', hability: 'Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Google Suite', hability: 'Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Rider Jetbrains', hability: 'Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'DataGrip Jetbrains', hability: 'Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'VsCode', hability: 'Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Claude', hability: 'AI Tools', level: 'Expert' },
  { implemented: 'IntrosMatter', technique: 'Cursor', hability: 'AI Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'GitHub Copilot', hability: 'AI Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'Claude Code', hability: 'AI Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'ChatGPT', hability: 'AI Tools', level: 'Proficient' },
  { implemented: 'IntrosMatter', technique: 'AthenaAI', hability: 'AI Tools', level: 'Familiar' },
  { implemented: 'IntrosMatter', technique: 'English', hability: 'Languages', level: 'Expert' },
  // NTU OR courses
  { implemented: 'NTU OR courses', technique: 'Mathematical Modeling', hability: 'Operations Research / Optimization', level: 'Expert' },
  { implemented: 'NTU OR courses', technique: 'Linear Programming (LP)', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: 'NTU OR courses', technique: 'MILP (Mixed Integer Linear Programming)', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: 'NTU OR courses', technique: 'Simplex method', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: 'NTU OR courses', technique: 'Gurobi', hability: 'Operations Research / Optimization', level: 'Familiar' },
  { implemented: 'NTU OR courses', technique: 'Problem Solving', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'NTU OR courses', technique: 'English', hability: 'Languages', level: 'Expert' },
  // IBM Certification
  { implemented: 'IBM Certification', technique: 'SQL Server', hability: 'Database', level: 'Expert' },
  { implemented: 'IBM Certification', technique: 'Pandas / NumPy', hability: 'Python', level: 'Proficient' },
  { implemented: 'IBM Certification', technique: 'Data visualization', hability: 'Python', level: 'Familiar' },
  { implemented: 'IBM Certification', technique: 'English', hability: 'Languages', level: 'Expert' },
  // IBM Ponder This
  { implemented: 'IBM Ponder This', technique: 'Combinatorial optimization', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: 'IBM Ponder This', technique: 'Algorithm design', hability: 'Operations Research / Optimization', level: 'Proficient' },
  { implemented: 'IBM Ponder This', technique: 'Monte Carlo simulation', hability: 'Simulation', level: 'Expert' },
  { implemented: 'IBM Ponder This', technique: 'Data Science', hability: 'Python', level: 'Proficient' },
  { implemented: 'IBM Ponder This', technique: 'Excel and Word', hability: 'VBA', level: 'Expert' },
  { implemented: 'IBM Ponder This', technique: 'Problem Solving', hability: 'Project & Collaboration', level: 'Expert' },
  { implemented: 'IBM Ponder This', technique: 'English', hability: 'Languages', level: 'Expert' },
  // Languages
  { implemented: 'Languages', technique: 'Spanish', hability: 'Native', level: 'Expert' },
];

// ─── Derived group types ──────────────────────────────────────────────────────

export interface TechniqueDetail {
  technique: string;
  implementedPlaces: string[];
  level: SkillLevel;
}

export interface SkillsGroup {
  hability: string;
  techniques: TechniqueDetail[];
}

export interface HabilityGroup {
  hability: string;
  techniques: { technique: string; level: SkillLevel }[];
}

export interface ImplGroup {
  place: string;
  totalTechniques: number;
  habilities: HabilityGroup[];
}

// ─── Builder functions ────────────────────────────────────────────────────────

export function buildSkillsGroups(): SkillsGroup[] {
  const map = new Map<string, TechniqueDetail[]>();
  for (const e of SKILL_ENTRIES) {
    if (!map.has(e.hability)) map.set(e.hability, []);
    map.get(e.hability)!.push({ technique: e.technique, implementedPlaces: e.implemented, level: e.level });
  }
  return Array.from(map.entries()).map(([hability, techniques]) => ({ hability, techniques }));
}

export function buildImplGroups(): ImplGroup[] {
  const placeMap = new Map<string, Map<string, { technique: string; level: SkillLevel }[]>>();
  for (const e of IMPL_ENTRIES) {
    if (!placeMap.has(e.implemented)) placeMap.set(e.implemented, new Map());
    const habMap = placeMap.get(e.implemented)!;
    if (!habMap.has(e.hability)) habMap.set(e.hability, []);
    habMap.get(e.hability)!.push({ technique: e.technique, level: e.level });
  }
  return Array.from(placeMap.entries()).map(([place, habMap]) => {
    const habilities = Array.from(habMap.entries()).map(([hability, techniques]) => ({ hability, techniques }));
    return {
      place,
      totalTechniques: habilities.reduce((sum, h) => sum + h.techniques.length, 0),
      habilities,
    };
  });
}
