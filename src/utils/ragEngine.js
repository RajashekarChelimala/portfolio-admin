/**
 * Comprehensive RAG (Retrieval-Augmented Generation) Knowledge Corpus & Search Engine
 * Built from Rajashekar Chelimala's Resume, Enterprise Projects, CGG Experience, and Portfolio Database.
 */

export const KNOWLEDGE_CORPUS = [
  {
    id: "bot_identity",
    topics: ["who are you", "what is your name", "what's your name", "your name", "who made you", "jerry", "assistant name", "bot name", "chatbot", "what are you"],
    keywords: ["jerry", "assistant", "bot", "who", "your", "name"],
    answer: "My name is **Jerry**! 🤖 I'm Rajashekar Chelimala's personal AI Assistant. You can ask me anything about his technical skills, enterprise projects, career experience, or how to get in touch with him!"
  },
  {
    id: "identity_surname",
    topics: ["surname", "last name", "family name", "second name", "full name", "who is he", "what is his name", "rajashekar name", "chelimala"],
    keywords: ["surname", "last", "family", "chelimala", "called", "full"],
    answer: "Rajashekar's surname is **Chelimala**. His full legal name is **Rajashekar Chelimala**."
  },
  {
    id: "identity_gender",
    topics: ["gender", "sex", "pronouns", "is he male", "is he female"],
    keywords: ["gender", "sex", "pronouns", "male", "he"],
    answer: "Rajashekar Chelimala is **Male** (pronouns: **he/him**)."
  },
  {
    id: "personal_dob_age",
    topics: ["date of birth", "dob", "birthday", "birth date", "born", "birth", "age", "how old", "birth year"],
    keywords: ["dob", "birthday", "birth", "born", "age", "birthdate"],
    answer: "Rajashekar's exact date of birth is kept private on this public portfolio for data protection and security. However, he is a 2023 B.Tech graduate from RGUKT Basar with 3+ years of professional full-stack and AI software engineering experience. For official background verification or HR documentation, please contact him directly at **rajashekarchelimala1@gmail.com** or **+91 9908545367**."
  },
  {
    id: "personal_family",
    topics: ["father name", "father's name", "father", "mother", "parents", "family background", "family", "marital status", "married", "wife", "relationship"],
    keywords: ["father", "mother", "parents", "family", "dad", "mom", "marital", "married", "wife"],
    answer: "Information regarding Rajashekar's father's name or family details is not publicly available on his professional portfolio or resume. For official background verification or specific inquiries, please contact him directly at **rajashekarchelimala1@gmail.com**."
  },
  {
    id: "contact_mobile",
    topics: ["mobile", "phone", "contact number", "call", "cell", "phone number", "reach", "telephone", "whatsapp"],
    keywords: ["mobile", "phone", "number", "cell", "call", "dial", "telephone", "whatsapp", "contact"],
    answer: "Rajashekar's mobile number is **+91 9908545367**. You can also reach him via email at **rajashekarchelimala1@gmail.com** or through the Contact page."
  },
  {
    id: "contact_email",
    topics: ["email", "mail", "gmail", "inbox", "send email", "write", "electronic mail"],
    keywords: ["email", "mail", "gmail", "address", "inbox", "write"],
    answer: "Rajashekar's official email address is **rajashekarchelimala1@gmail.com**."
  },
  {
    id: "education_degree",
    topics: ["education", "degree", "college", "university", "btech", "b.tech", "cgpa", "gpa", "score", "marks", "graduation", "rgukt", "basar", "school", "study", "studies"],
    keywords: ["education", "degree", "college", "university", "btech", "b.tech", "cgpa", "gpa", "marks", "score", "graduated", "rgukt", "basar", "cse", "computer science"],
    answer: "Rajashekar holds a **B.Tech in Computer Science Engineering (CSE)** with a **CGPA of 8.4 / 10.0** from **Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar**."
  },
  {
    id: "location_living",
    topics: ["location", "city", "place", "where does he live", "where is he located", "hometown", "based", "address", "hyderabad", "telangana", "india", "relocate"],
    keywords: ["location", "city", "live", "located", "place", "hometown", "based", "hyderabad", "telangana", "india"],
    answer: "Rajashekar is based in **Hyderabad, Telangana, India**."
  },
  {
    id: "languages_spoken",
    topics: ["languages", "language", "speak", "speaks", "fluency", "mother tongue", "telugu", "hindi", "english"],
    keywords: ["languages", "language", "speak", "speaks", "fluent", "telugu", "hindi", "english", "linguistic"],
    answer: "Rajashekar is fluent in three languages: **English, Telugu, and Hindi**."
  },
  {
    id: "experience_cgg",
    topics: ["current job", "current role", "company", "organization", "cgg", "centre for good governance", "present job", "where does he work", "employer", "government", "govtech"],
    keywords: ["current", "job", "company", "organization", "cgg", "centre", "governance", "work", "works", "role", "designation", "developer"],
    answer: "Rajashekar currently works as a **Software Developer at Centre for Good Governance (CGG)** in Hyderabad (June 2023 – Present). He engineers mission-critical enterprise applications and financial systems for Telangana Government departments, including legacy Struts modernization to Spring Boot and React."
  },
  {
    id: "experience_total",
    topics: ["total experience", "how many years", "experience", "seniority", "tenure", "years of experience", "background"],
    keywords: ["experience", "years", "tenure", "seniority", "long", "working"],
    answer: "Rajashekar has **3+ years of professional full-stack software development experience** building high-scale distributed systems, microservices, and AI-powered applications."
  },
  {
    id: "skills_top5",
    topics: ["top 5 skills", "top skills", "best skills", "primary skills", "key skills", "core skills", "top five skills"],
    keywords: ["top", "skills", "primary", "core", "five", "5", "best"],
    answer: "Rajashekar's top 5 core engineering skills are:\n\n1. **Java & Spring Boot** (Microservices, Spring Security, Hibernate, 3+ years)\n2. **React.js & Frontend Engineering** (React Router, Context API, Vite, Modern UI)\n3. **PostgreSQL & Database Design** (Complex queries, schema design, index optimization)\n4. **AWS Cloud & DevOps** (EC2, S3, SES, Lambda, Docker, CI/CD)\n5. **AI & GenAI Integration** (Python FastAPI, Whisper STT, LLM Prompt Engineering, RAG Systems)"
  },
  {
    id: "ai_projects",
    topics: ["ai projects", "ai project", "artificial intelligence projects", "genai projects", "llm projects", "machine learning projects", "ai work"],
    keywords: ["ai", "genai", "llm", "projects", "whisper", "qwen", "rag", "fastapi"],
    answer: "Yes, Rajashekar has engineered multiple modern AI & Generative AI platforms:\n\n1. **AI-Powered Candidate Screening Platform** (FastAPI, Whisper.cpp STT, Qwen LLM, AWS EC2):\n   • Built automated candidate speech transcription and automated interview scoring algorithms.\n   • Live Platform: https://screener.tekavinya.com\n\n2. **Portfolio RAG AI Assistant** (Google Gemini, Node.js, Express, BM25 Knowledge Retrieval):\n   • Context-augmented personal assistant answering live technical and professional questions.\n\n3. **Comrade Encrypted Messaging Platform** (Socket.io, Node.js, React, End-to-End Encryption):\n   • Live: https://mycomrade.vercel.app/ | GitHub: https://github.com/RajashekarChelimala/comrade-frontend"
  },
  {
    id: "projects_using_aws",
    topics: ["projects using aws", "aws projects", "projects he used aws", "where did he use aws", "which projects used aws", "aws used"],
    keywords: ["aws", "cloud", "ec2", "s3", "ses", "projects"],
    answer: "Rajashekar leveraged **AWS Cloud Services** across several production systems:\n\n1. **Telangana Police HRMS** (Enterprise GovTech platform supporting 100K+ users):\n   • AWS EC2 for application deployment.\n   • Amazon S3 for secure departmental document uploads.\n   • Amazon SES for transactional email notifications.\n\n2. **AI Candidate Screening Platform** (Freelance, Dec 2024 – Dec 2025):\n   • AWS EC2 hosting Python FastAPI microservices, whisper.cpp speech-to-text, and Qwen LLMs for automated candidate evaluations."
  },
  {
    id: "project_cdma_fms",
    topics: ["cdma", "cdma project", "municipal administration", "municipal", "financial management system", "tgerp", "municipalities", "double entry", "accounting", "160 offices"],
    keywords: ["cdma", "municipal", "administration", "financial", "management", "accounting", "tgerp", "ulb", "160"],
    answer: "In the **CDMA (Municipal Administration Financial Management System)** project serving 160+ municipal offices across Telangana, Rajashekar utilized:\n\n• **Backend Technologies:** Java, Spring Boot, Spring Data JPA & Hibernate, REST APIs\n• **Frontend Technologies:** React.js\n• **Database:** PostgreSQL (double-entry municipal accounting, treasury, and financial statement generation)\n• **Security & Workflows:** Role-based access control (RBAC), multi-level municipal approvals, audit logging\n• **Live System:** https://tgerplive.cgg.gov.in"
  },
  {
    id: "project_comrade",
    topics: ["comrade", "messaging app", "chat app", "socket.io", "encrypted", "encryption", "e2ee", "real time chat", "personal project"],
    keywords: ["comrade", "messaging", "chat", "socket", "socket.io", "encrypted", "encryption", "e2ee", "private", "instant"],
    answer: "**Comrade** is a secure, real-time encrypted messaging application designed for genuine, algorithm-free connections. Built with **React.js, Node.js, Socket.io, Tailwind CSS, and MongoDB** with end-to-end encryption.\n• Live Link: https://mycomrade.vercel.app/\n• GitHub Repository: https://github.com/RajashekarChelimala/comrade-frontend"
  },
  {
    id: "project_police_hrms",
    topics: ["police", "tgpolice", "hrms", "telangana police", "human resource", "leave management", "grievance", "police personnel"],
    keywords: ["police", "tgpolice", "hrms", "leave", "grievance", "transfers", "personnel", "100000", "100k"],
    answer: "The **Telangana Police HRMS** is an enterprise Human Resource Management System supporting **100,000+ police personnel** across Telangana. Key technologies used:\n• Java, Spring Boot, Spring MVC & JSP, PostgreSQL\n• Amazon S3 for secure document verification\n• Amazon SES for alerts, AWS EC2 deployment\n• Live Portal: https://tgpolice.cgg.gov.in"
  },
  {
    id: "project_tekavinya",
    topics: ["tekavinya", "screener", "financial market", "stock screener", "equity", "analytics", "market screener"],
    keywords: ["tekavinya", "screener", "stock", "equity", "market", "charting", "filtering", "sub-second"],
    answer: "The **Tekavinya Financial Market Screener** (https://screener.tekavinya.com) is a high-performance equity analytics dashboard featuring dynamic multi-metric filtering across thousands of records, interactive charting, and data virtualization."
  },
  {
    id: "project_pjtsau",
    topics: ["pjtsau", "agricultural university", "university financial", "2fa", "otp", "two factor", "colleges"],
    keywords: ["pjtsau", "agricultural", "university", "2fa", "two-factor", "otp", "faculty"],
    answer: "The **Agricultural University Financial System (PJTSAU)** is a centralized financial management system serving 10+ constituent colleges, protected by 2-Factor Authentication (Email & SMS OTP) for 500+ faculty and administrators."
  },
  {
    id: "project_tghcl",
    topics: ["tghcl", "housing", "housing corporation", "struts modernization", "legacy migration"],
    keywords: ["tghcl", "housing", "corporation", "struts", "legacy", "modernization", "migration"],
    answer: "The **Housing Corporation Financial Portal** modernized a legacy Apache Struts/JSP system into Spring Boot and React.js, reducing technical debt across 60+ accounting screens."
  },
  {
    id: "skills_java_spring",
    topics: ["java", "spring boot", "spring", "spring mvc", "hibernate", "jpa", "microservices", "backend skills"],
    keywords: ["java", "spring", "boot", "hibernate", "jpa", "backend", "microservices", "rest", "api"],
    answer: "Rajashekar is an expert in **Java and Spring Boot (3+ years)**. His core backend capabilities include Spring Boot, Spring Security & RBAC, Spring Data JPA & Hibernate, Spring MVC, PostgreSQL query optimization, and resilient REST microservices."
  },
  {
    id: "skills_frontend_react",
    topics: ["frontend", "react", "react.js", "javascript", "typescript", "html", "css", "tailwind", "bootstrap", "mui"],
    keywords: ["frontend", "react", "react.js", "js", "javascript", "typescript", "html", "css", "tailwind", "bootstrap", "mui", "ui"],
    answer: "Frontend Stack: **React.js, JavaScript (ES6+), TypeScript, HTML5/CSS3, Tailwind CSS, Bootstrap 5, and Material-UI (MUI)**. He specializes in responsive glassmorphic UI/UX and real-time state management."
  },
  {
    id: "skills_databases",
    topics: ["database", "databases", "sql", "postgresql", "postgres", "mongodb", "nosql", "data store"],
    keywords: ["database", "databases", "sql", "postgresql", "postgres", "mongodb", "mongo", "nosql"],
    answer: "Database Expertise: **PostgreSQL (relational schema design, query optimization, indexing) and MongoDB (NoSQL document architecture)**."
  },
  {
    id: "skills_cloud_devops",
    topics: ["cloud", "devops", "aws", "ec2", "s3", "lambda", "ses", "docker", "git", "gitlab", "ci/cd"],
    keywords: ["cloud", "devops", "aws", "ec2", "s3", "lambda", "ses", "docker", "container", "git", "gitlab", "ci/cd"],
    answer: "Cloud & DevOps: **AWS (EC2, S3, Lambda, SES, Route53, CloudWatch), Docker containerization, Git, and GitLab CI/CD pipelines**."
  },
  {
    id: "skills_ai_genai",
    topics: ["ai", "genai", "generative ai", "llm", "large language model", "rag", "whisper", "qwen", "fastapi", "machine learning", "artificial intelligence"],
    keywords: ["ai", "genai", "generative", "llm", "rag", "whisper", "qwen", "fastapi", "agents", "prompt"],
    answer: "AI & GenAI Capabilities: **LLM Integration, Generative AI workflows, RAG (Retrieval-Augmented Generation), Python FastAPI, Whisper.cpp (Speech-to-Text), Qwen LLMs, and AI Voice Agents**."
  },
  {
    id: "hire_availability",
    topics: ["hire", "available", "hiring", "open to work", "job", "freelance", "opportunity", "contract", "join", "notice period"],
    keywords: ["hire", "available", "hiring", "job", "freelance", "opportunity", "join", "contract", "looking", "open"],
    answer: "Yes! Rajashekar is **open to Full-Stack Software Engineering roles, AI-integrated product development, and select freelance engineering contracts**. You can connect with him directly at **rajashekarchelimala1@gmail.com** or via the Contact page!"
  },
  {
    id: "social_profiles",
    topics: ["github", "linkedin", "twitter", "instagram", "social media", "profiles", "social links"],
    keywords: ["github", "linkedin", "twitter", "instagram", "social", "profiles", "links"],
    answer: "Connect with Rajashekar on social media:\n• LinkedIn: https://www.linkedin.com/in/rajashekar-chelimala\n• GitHub: https://github.com/RajashekarChelimala\n• Twitter: https://twitter.com/RajashekarChelimala\n• Instagram: https://instagram.com/RajashekarChelimala"
  },
  {
    id: "resume_download",
    topics: ["resume", "cv", "download resume", "curriculum vitae", "pdf resume", "get resume"],
    keywords: ["resume", "cv", "download", "pdf", "curriculum", "vitae"],
    answer: "You can view and download Rajashekar's complete resume PDF from the **Resume** page at `/resume` or click the Resume button in the top navigation bar!"
  },
  {
    id: "hobbies_interests",
    topics: ["hobbies", "hobby", "interests", "free time", "what does he do in free time", "passions", "pastime"],
    keywords: ["hobbies", "hobby", "interests", "free", "time", "passions", "pastime"],
    answer: "Rajashekar's personal hobbies and interests include:\n\n• **Exploring Generative AI & Voice Agents** (experimenting with local LLMs, whisper STT, and AI agents)\n• **Open Source Development & Tech Blogging** (studying system design and sharing software engineering insights)\n• **Reading Tech Literature & Architecture Whitepapers**\n• **Photography & Travel** in his leisure time."
  }
];

const STOPWORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "by", "can", "could", "did", "do", "does", "for", "from",
  "get", "give", "has", "have", "he", "her", "him", "his", "how", "i", "if", "in", "is", "it", "its", "me", "my",
  "of", "on", "or", "our", "please", "provide", "say", "show", "tell", "that", "the", "their", "them", "then",
  "there", "these", "they", "this", "to", "was", "we", "what", "when", "where", "which", "who", "whom", "will",
  "with", "would", "you", "your", "yes"
]);

// Subject tokens that appear across the portfolio; if other meaningful tokens exist, these should not inflate scores
const SUBJECT_TOKENS = new Set(["rajashekar", "chelimala"]);

/**
 * Tokenize a string into clean alphanumeric keywords
 */
export function tokenize(str) {
  if (!str) return [];
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

/**
 * RAG Retriever: Calculates relevance score of each knowledge chunk
 * against the incoming user query.
 */
export function retrieveRelevantChunks(query, corpus = KNOWLEDGE_CORPUS, topK = 3) {
  const queryTokens = tokenize(query);
  const nonStop = queryTokens.filter((t) => !STOPWORDS.has(t));
  
  // If there are other meaningful tokens beside 'rajashekar'/'chelimala', prioritize those
  const nonSubject = nonStop.filter((t) => !SUBJECT_TOKENS.has(t));
  const tokensToUse = nonSubject.length > 0 ? nonSubject : (nonStop.length > 0 ? nonStop : queryTokens);
  
  const rawQuery = (query || "").toLowerCase();

  const scored = corpus.map((chunk) => {
    let score = 0;

    // Check exact topic phrase match in raw query
    for (const topic of chunk.topics) {
      if (rawQuery.includes(topic.toLowerCase())) {
        score += 35;
      }
    }

    // Check token overlaps with whole-word precision
    for (const token of tokensToUse) {
      for (const keyword of chunk.keywords) {
        const kw = keyword.toLowerCase();
        if (kw === token) {
          score += 15;
        } else if (token.length >= 4 && (kw.startsWith(token) || token.startsWith(kw))) {
          score += 7;
        }
      }
      for (const topic of chunk.topics) {
        const topicWords = tokenize(topic);
        if (topicWords.includes(token)) {
          score += 10;
        }
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

/**
 * Perform pure RAG retrieval and synthesis
 */
export function queryRAG(userQuery, corpus = KNOWLEDGE_CORPUS) {
  const topMatches = retrieveRelevantChunks(userQuery, corpus, 3);
  const bestMatch = topMatches[0];

  // If a high-confidence match is found (score >= 10), return direct answer
  if (bestMatch && bestMatch.score >= 10) {
    return bestMatch.chunk.answer;
  }

  // Multi-chunk synthesis if moderate confidence
  if (bestMatch && bestMatch.score >= 7) {
    const combined = topMatches
      .filter((m) => m.score >= 7)
      .map((m) => m.chunk.answer)
      .join("\n\n");
    return combined;
  }

  // Polite out-of-domain response when question doesn't match any verified facts
  return "I don't have that specific information in Rajashekar's public portfolio or resume. Feel free to contact Rajashekar directly at **rajashekarchelimala1@gmail.com** or **+91 9908545367**, or ask me about his skills, projects (Comrade, Police HRMS, Screener), education (RGUKT Basar), or experience at CGG!";
}
