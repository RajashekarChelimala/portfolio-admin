export const DEFAULT_CONTENT = {
  name: "Rajashekar Chelimala",
  organization: "Software Development",
  designation: "Full Stack Software Engineer",
  location: "Hyderabad, India",
  degree: "B.Tech in Computer Science & Engineering",
  education: "Jawaharlal Nehru Technological University",
  languages: "English, Telugu, Hindi",
  footerText: "Crafted with passion & precision by Rajashekar Chelimala. © 2026",
  introduction: "I am a passionate Full Stack Software Engineer specializing in building scalable web architectures, resilient microservices, and sleek modern user experiences. Proficient across the MERN stack, Java Spring Boot, and cloud environments.",
  imageLink: "",
  resumeLink: "https://drive.google.com/file/d/sample-resume/preview",
  typeWriterText: "Full Stack Developer,React & Node Specialist,Java & Spring Boot Engineer,Cloud Solutions Architect",
  instagram: "https://instagram.com/RajashekarChelimala",
  twitter: "https://twitter.com/RajashekarChelimala",
  linkedin: "https://linkedin.com/in/rajashekarchelimala",
  github: "https://github.com/RajashekarChelimala",
  hobbies: "System Architecture, Open Source, Tech Blogging, UI/UX Craft"
};

export const DEFAULT_SKILLS = [
  { _id: "s1", name: "React.js", type: "Frontend", experience: "3+ Years", icon: "react-icon", proficiency: 92, organizationName: "Industry Experience" },
  { _id: "s2", name: "JavaScript (ES6+)", type: "Frontend", experience: "4+ Years", icon: "js-icon", proficiency: 95, organizationName: "Industry Experience" },
  { _id: "s3", name: "TypeScript", type: "Languages", experience: "2+ Years", icon: "typescript-icon", proficiency: 88, organizationName: "Industry Experience" },
  { _id: "s4", name: "Node.js & Express", type: "Backend", experience: "3+ Years", icon: "node-icon", proficiency: 90, organizationName: "Industry Experience" },
  { _id: "s5", name: "Java & Spring Boot", type: "Backend", experience: "2+ Years", icon: "java-icon", proficiency: 85, organizationName: "Industry Experience" },
  { _id: "s6", name: "MongoDB & Mongoose", type: "Database", experience: "3+ Years", icon: "mysql-icon", proficiency: 88, organizationName: "Industry Experience" },
  { _id: "s7", name: "HTML5 / CSS3 / SASS", type: "Frontend", experience: "4+ Years", icon: "html-icon", proficiency: 94, organizationName: "Industry Experience" },
  { _id: "s8", name: "REST APIs & WebSockets", type: "Architecture", experience: "3+ Years", icon: "bootstrap-icon", proficiency: 90, organizationName: "Industry Experience" },
  { _id: "s9", name: "Docker & Cloud Deploy", type: "DevOps", experience: "2+ Years", icon: "node-icon", proficiency: 82, organizationName: "Industry Experience" },
  { _id: "s10", name: "Git & CI/CD Pipelines", type: "DevOps", experience: "3+ Years", icon: "github-icon", proficiency: 90, organizationName: "Industry Experience" }
];

export const DEFAULT_PROJECTS = [
  {
    _id: "p1",
    projectName: "Enterprise MERN CMS & Dynamic Portfolio",
    organizationName: "Personal Initiative",
    fromDate: "2024-01-01T00:00:00.000Z",
    toDate: null,
    currentlyWorking: true,
    description: "Full-stack portfolio and real-time content management system featuring JWT role-based security, WebSockets for live alerts, rich text editing, and dynamic portfolio content sync.",
    projectLink: "https://github.com/RajashekarChelimala/portfolio-admin",
    skills: [{ name: "React" }, { name: "Node.js" }, { name: "MongoDB" }, { name: "Socket.IO" }]
  },
  {
    _id: "p2",
    projectName: "Cloud Microservices Backend Platform",
    organizationName: "Engineering Initiative",
    fromDate: "2023-06-01T00:00:00.000Z",
    toDate: "2023-12-31T00:00:00.000Z",
    currentlyWorking: false,
    description: "Scalable backend architecture featuring distributed authentication, rate limiting, MongoDB aggregation pipelines, and automated email dispatching with nodemailer.",
    projectLink: "https://github.com/RajashekarChelimala/portfolio-backend",
    skills: [{ name: "Node.js" }, { name: "Express" }, { name: "JWT" }, { name: "Docker" }]
  },
  {
    _id: "p3",
    projectName: "Real-time Collaboration & Analytics Hub",
    organizationName: "FinTech Innovation",
    fromDate: "2023-01-01T00:00:00.000Z",
    toDate: "2023-05-31T00:00:00.000Z",
    currentlyWorking: false,
    description: "Interactive dashboard featuring real-time collaborative task tracking, socket synchronization, analytics charts, and comprehensive audit logs.",
    projectLink: "https://github.com/RajashekarChelimala",
    skills: [{ name: "React" }, { name: "Spring Boot" }, { name: "Bootstrap 5" }]
  }
];

export const DEFAULT_POSTS = [
  {
    _id: "post1",
    headline: "Building Scalable Modern Web Applications with MERN & WebSockets",
    content: "<p>Modern web engineering requires responsiveness, low latency, and modular architecture. In this article, we explore how combining React, Node.js, and Socket.IO creates engaging real-time user experiences with seamless synchronization.</p><p>Key principles include state isolation, optimistic updates, and robust error boundaries to guarantee 99.9% client uptime even during flaky connections.</p>",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    likes: 42,
    engagementCount: 78,
    createdAt: new Date().toISOString()
  }
];
