export const DEFAULT_CONTENT = {
  name: "Rajashekar Chelimala",
  designation: "Java Full Stack Developer",
  organization: "Centre for Good Governance (CGG)",
  location: "Hyderabad, Telangana",
  degree: "B.Tech in Computer Science Engineering (CGPA: 8.4 / 10.0)",
  education: "Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar",
  languages: "English, Telugu, Hindi",
  footerText: "Crafted with precision & passion by Rajashekar Chelimala. © 2026",
  introduction: "Java Full Stack Developer with 3+ years of experience building large-scale enterprise and financial applications using Java, Spring Boot, Spring MVC, React.js, Hibernate, PostgreSQL, and AWS. Contributed to financial management platforms supporting 160+ municipal offices and enterprise HR systems supporting 100,000+ users.",
  imageLink: "https://res.cloudinary.com/ddsmuhr7k/image/upload/v1794806325/portfolio/profile/bw3ytpqw0vayl4478ab1.jpg",
  resumeLink: "https://res.cloudinary.com/ddsmuhr7k/raw/upload/v1794762776/portfolio/resume/rajashekar_chelimala_resume.pdf",
  typeWriterText: "Java Full Stack Developer,Spring Boot & Microservices Specialist,React.js Frontend Engineer,AWS Cloud Solutions Architect,High-Scale Enterprise Systems Engineer",
  hobbies: "Enterprise Architecture, Distributed Microservices, Open Source, AI & Voice Agents, Performance Optimization",
  instagram: "https://instagram.com/RajashekarChelimala",
  twitter: "https://twitter.com/RajashekarChelimala",
  linkedin: "https://www.linkedin.com/in/rajashekar-chelimala",
  github: "https://github.com/RajashekarChelimala",
  phone: "+91 9908545367"
};

export const DEFAULT_EXPERIENCES = [
  {
    role: "Software Developer",
    organization: "Centre for Good Governance (CGG)",
    location: "Hyderabad, Telangana",
    period: "June 2023 – Present",
    type: "Full-Time",
    highlights: [
      "Developed enterprise applications using Spring Boot, Spring MVC, React.js, JSP, Hibernate and PostgreSQL for Telangana Government departments.",
      "Migrated 3 legacy Struts/JSP applications to Spring Boot and React.js, improving maintainability across 60+ application screens.",
      "Designed REST APIs, optimized PostgreSQL queries, implemented RBAC, transactional workflows, reporting modules and multi-level approval processes.",
      "Maintained enterprise systems supporting 100,000+ users and 160+ municipal offices across HR and financial management domains."
    ]
  },
  {
    role: "Freelance Full Stack Developer",
    organization: "Independent",
    location: "Remote",
    period: "Dec 2024 – Dec 2025",
    type: "Part-Time",
    highlights: [
      "Built an AI-powered candidate screening platform using React.js, Node.js, Express.js, and MongoDB for automated interview evaluation and transcript analysis.",
      "Designed microservice architecture with Python FastAPI services for Speech-to-Text (whisper.cpp), TTS, and Qwen LLM question and candidate feedback generation via REST APIs.",
      "Deployed services on AWS EC2, S3, IAM, CloudWatch, and MongoDB for secure storage, monitoring, and application data persistence."
    ]
  }
];

export const DEFAULT_SKILLS = [
  // Languages
  { _id: "s1", name: "Java", type: "Languages", experience: "3+ Years", icon: "java-icon", proficiency: 94, organizationName: "CGG" },
  { _id: "s2", name: "JavaScript (ES6+)", type: "Languages", experience: "3+ Years", icon: "js-icon", proficiency: 92, organizationName: "CGG & Freelance" },
  { _id: "s3", name: "SQL", type: "Languages", experience: "3+ Years", icon: "mysql-icon", proficiency: 90, organizationName: "CGG" },

  // Backend
  { _id: "s4", name: "Spring Boot", type: "Backend", experience: "3+ Years", icon: "java-icon", proficiency: 95, organizationName: "CGG" },
  { _id: "s5", name: "Spring Security & RBAC", type: "Backend", experience: "3+ Years", icon: "java-icon", proficiency: 90, organizationName: "CGG" },
  { _id: "s6", name: "Spring Data JPA & Hibernate", type: "Backend", experience: "3+ Years", icon: "java-icon", proficiency: 92, organizationName: "CGG" },
  { _id: "s7", name: "Spring MVC & JSP", type: "Backend", experience: "2+ Years", icon: "java-icon", proficiency: 88, organizationName: "CGG" },
  { _id: "s8", name: "Node.js & Express.js", type: "Backend", experience: "2+ Years", icon: "node-icon", proficiency: 88, organizationName: "Freelance AI Platform" },
  { _id: "s9", name: "REST APIs & Microservices", type: "Backend", experience: "3+ Years", icon: "api-icon", proficiency: 94, organizationName: "CGG & Freelance" },

  // Frontend
  { _id: "s10", name: "React.js", type: "Frontend", experience: "3+ Years", icon: "react-icon", proficiency: 92, organizationName: "CGG & Freelance" },
  { _id: "s11", name: "HTML5 & CSS3", type: "Frontend", experience: "3+ Years", icon: "html-icon", proficiency: 94, organizationName: "CGG" },
  { _id: "s12", name: "Material-UI (MUI)", type: "Frontend", experience: "2+ Years", icon: "css-icon", proficiency: 88, organizationName: "CGG" },
  { _id: "s13", name: "Bootstrap 5", type: "Frontend", experience: "3+ Years", icon: "bootstrap-icon", proficiency: 92, organizationName: "CGG" },

  // Databases
  { _id: "s14", name: "PostgreSQL", type: "Database", experience: "3+ Years", icon: "mysql-icon", proficiency: 92, organizationName: "CGG" },
  { _id: "s15", name: "MongoDB", type: "Database", experience: "2+ Years", icon: "mysql-icon", proficiency: 88, organizationName: "Freelance AI Platform" },

  // Cloud & DevOps
  { _id: "s16", name: "AWS (EC2, S3, Lambda, SES, Route53)", type: "Cloud & DevOps", experience: "2+ Years", icon: "docker-icon", proficiency: 86, organizationName: "CGG & Freelance" },
  { _id: "s17", name: "Docker", type: "Cloud & DevOps", experience: "2+ Years", icon: "docker-icon", proficiency: 85, organizationName: "CGG & Freelance" },
  { _id: "s18", name: "Git & GitLab CI/CD", type: "Cloud & DevOps", experience: "3+ Years", icon: "github-icon", proficiency: 92, organizationName: "CGG" },
];

export const DEFAULT_PROJECTS = [
  {
    _id: "p1",
    projectName: "Telangana Police HRMS",
    organizationName: "Centre for Good Governance (CGG)",
    projectLink: "https://tgpolice.cgg.gov.in",
    githubLink: "",
    fromDate: "2023-06-01T00:00:00.000Z",
    toDate: null,
    currentlyWorking: true,
    description: "Large-scale Human Resource Management System supporting 100,000+ police personnel with a multi-level organizational hierarchy across the Telangana Police department. Implemented leave management, grievance handling, transfer allotment workflows, and multi-level approval processes with role-based access control (RBAC). Integrated Amazon S3 for secure document uploads, Amazon SES for email notifications, and supported AWS EC2 deployment with SQL query optimization.",
    skills: [{ name: "Spring Boot" }, { name: "Spring MVC" }, { name: "PostgreSQL" }, { name: "React.js" }, { name: "AWS S3/SES/EC2" }]
  },
  {
    _id: "p2",
    projectName: "Municipal Administration Financial Management System",
    organizationName: "Centre for Good Governance (CGG)",
    projectLink: "https://tgerplive.cgg.gov.in",
    githubLink: "",
    fromDate: "2023-06-01T00:00:00.000Z",
    toDate: null,
    currentlyWorking: true,
    description: "Centralized double-entry accounting web application serving 160+ municipal offices across Telangana, supporting end-to-end accounting, budgeting, treasury, and financial reporting operations. Engineered complex work order workflows with 100+ dynamic fields, conditional validations, approval hierarchies, and secure document management capabilities.",
    skills: [{ name: "Spring Boot" }, { name: "Hibernate" }, { name: "PostgreSQL" }, { name: "React.js" }, { name: "REST APIs" }]
  },
  {
    _id: "p3",
    projectName: "Agricultural University Financial System",
    organizationName: "Centre for Good Governance (CGG)",
    projectLink: "https://pjtaufms.telangana.gov.in",
    githubLink: "",
    fromDate: "2023-08-01T00:00:00.000Z",
    toDate: "2024-06-30T00:00:00.000Z",
    currentlyWorking: false,
    description: "Centralized financial platform serving 10+ constituent colleges with configurable approval workflows, user roles, and permission structures. Implemented robust two-factor authentication (2FA) through Email and SMS OTP, securing access for 500+ active faculty and administrative users.",
    skills: [{ name: "Spring Boot" }, { name: "Spring Security (2FA)" }, { name: "PostgreSQL" }, { name: "React.js" }, { name: "Bootstrap 5" }]
  },
  {
    _id: "p4",
    projectName: "Housing Corporation Financial Portal",
    organizationName: "Centre for Good Governance (CGG)",
    projectLink: "https://tghclfms.cgg.gov.in",
    githubLink: "",
    fromDate: "2023-06-01T00:00:00.000Z",
    toDate: "2024-02-28T00:00:00.000Z",
    currentlyWorking: false,
    description: "Modernized a legacy Struts/JSP financial system to Spring Boot and React.js, improving application performance, responsiveness, and reducing technical debt across 60+ critical accounting screens.",
    skills: [{ name: "Spring Boot" }, { name: "React.js" }, { name: "PostgreSQL" }, { name: "Legacy Modernization" }]
  },
  {
    _id: "p5",
    projectName: "Tekavinya Financial Market Screener",
    organizationName: "Freelance Client (Remote)",
    projectLink: "https://screener.tekavinya.com",
    githubLink: "",
    fromDate: "2024-12-01T00:00:00.000Z",
    toDate: "2025-12-31T00:00:00.000Z",
    currentlyWorking: false,
    description: "Engineered a high-performance financial market screener and analytical dashboard for real-time equity insights. Implemented dynamic multi-metric filtering across thousands of records, interactive charting, responsive data virtualization, and sub-second API responses.",
    skills: [{ name: "React.js" }, { name: "Node.js" }, { name: "PostgreSQL" }, { name: "REST APIs" }, { name: "Data Virtualization" }]
  },
  {
    _id: "p6",
    projectName: "Comrade — Secure & Encrypted Messaging",
    organizationName: "Personal / Open Source",
    projectLink: "https://mycomrade.vercel.app/",
    githubLink: "https://github.com/RajashekarChelimala/comrade-frontend",
    fromDate: "2024-05-01T00:00:00.000Z",
    toDate: null,
    currentlyWorking: true,
    description: "Comrade: Secure & Encrypted Messaging. Connect with true Comrades anywhere. Experience a new era of messaging: fast, secure, and designed for genuine connections with no algorithms. Built with real-time Socket.io instant delivery, end-to-end encryption for privacy, and simple clutter-free pure communication.",
    skills: [{ name: "React.js" }, { name: "Node.js" }, { name: "Socket.IO" }, { name: "Tailwind CSS" }, { name: "MongoDB" }, { name: "Express.js" }, { name: "End-to-End Encryption" }]
  },
  {
    _id: "p7",
    projectName: "AI-Powered Candidate Screening Platform",
    organizationName: "Independent / AI Systems",
    projectLink: "https://github.com/RajashekarChelimala",
    githubLink: "https://github.com/RajashekarChelimala",
    fromDate: "2024-12-01T00:00:00.000Z",
    toDate: "2025-12-31T00:00:00.000Z",
    currentlyWorking: false,
    description: "Built an AI-powered candidate screening platform using React.js, Node.js, Express.js, and MongoDB, supporting AI-based interview evaluation, transcript analysis, and role-based workflows. Architected microservices with Python FastAPI services for Speech-to-Text (STT using whisper.cpp), TTS, and Qwen-based question and candidate feedback generation communicating via REST APIs. Deployed on AWS EC2, S3, IAM, CloudWatch, and MongoDB.",
    skills: [{ name: "React.js" }, { name: "Node.js" }, { name: "MongoDB" }, { name: "FastAPI" }, { name: "Whisper & Qwen" }, { name: "AWS EC2/S3" }]
  }
];

export const DEFAULT_POSTS = [
  {
    _id: "post1",
    headline: "Architecting Large-Scale Enterprise Systems with Spring Boot & Microservices",
    content: "<p>Building software for 100,000+ users and 160+ municipal offices requires deep architectural discipline. From double-entry accounting to multi-level approval hierarchies, transactional consistency and role-based access control (RBAC) are paramount.</p><p>By combining Spring Boot, PostgreSQL query optimization, and modern React.js frontend interfaces, legacy Struts systems can be successfully modernized into high-performance, maintainable platforms with zero data loss.</p>",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    likes: 54,
    engagementCount: 92,
    createdAt: new Date().toISOString()
  }
];
