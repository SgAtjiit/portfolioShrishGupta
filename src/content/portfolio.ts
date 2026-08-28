export const profile = {
  name: "Shrish Gupta",
  title: "Full Stack Software Engineer",
  subtitle:
    "Building AI-powered software, scalable backend systems, and immersive web experiences.",
  location: "Noida, India",
  email: "shrishpankajguptadbd6@gmail.com",
  phone: "+91-7310677900",
  linkedin: "https://www.linkedin.com/in/shrish-gupta-/",
  github: "https://github.com/SgAtjiit",
  resumeUrl: "https://drive.google.com/file/d/1fxYzsIyUEiI4LIyRQJrft-gIlNVA_yM5/view?usp=drive_link",
};


export const about = {
  headline: "Engineer building products, not clones.",
  paragraphs: [
    "Computer Science undergraduate at JIIT Noida passionate about building production-grade software with scalable architecture, clean UI/UX, and maintainable code.",
    "Experienced in Full-Stack Web Development, RESTful API design, Real-time WebSockets, AI/LLM integration (LangChain, Groq, RAG), and database modeling with MongoDB & PostgreSQL.",
    "Active problem solver with 900+ DSA problems solved across LeetCode (Contest Rating 1634, Top 20% globally) and GeeksforGeeks.",
  ],
  facts: [
    { label: "Based in", value: "Noida, India" },
    { label: "Focus", value: "Full Stack + AI" },
    { label: "CGPA", value: "8.9 / 10" },
    { label: "DSA Solved", value: "900+" },
  ],
};

export const education = [
  {
    year: "2023 – Expected June 2027",
    institution: "Jaypee Institute of Information Technology, Noida",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    details: ["CGPA: 8.9 / 10.0", "Semester SGPA: 9.8 / 10.0"],
  },
  {
    year: "May 2023",
    institution: "The Doon Valley Public School, Deoband, U.P.",
    degree: "Higher Secondary Education (Class XII) — CBSE (PCM)",
    details: ["Class XII: 95.8%", "Class X: 99.6%"],
  },
];

export const experience = [
  {
    role: "Full-Stack Web Development Intern",
    company: "CODTECH IT Solutions Pvt. Ltd.",
    location: "Remote",
    period: "June 2026 – July 2026",
    bullets: [
      "Completed a 6-week remote, project-based internship, independently building full-stack applications under deadline-driven deliverables while applying OOP, RESTful API design, and database modeling principles.",
      "Built a real-time collaborative document editor using Socket.IO for live multi-user sync and conflict handling.",
      "Developed a blog management platform with RESTful CRUD APIs, JWT-based authentication, and MongoDB schema design for users, posts, and comments.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "REST APIs"],
  },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    handle: "Shrish_Gupta",
    url: "https://leetcode.com/Shrish_Gupta",
    accent: "from-amber-500/20 to-orange-500/10",
    stats: [
      { label: "Solved", value: "623" },
      { label: "Contest Rating", value: "1634" },
      { label: "Hard", value: "86" },
      { label: "Medium", value: "328" },
      { label: "Easy", value: "209" },
    ],
  },
  {
    platform: "GeeksForGeeks",
    handle: "shrishgupta1",
    url: "https://www.geeksforgeeks.org/profile/shrishgupta1",
    accent: "from-emerald-500/20 to-green-500/10",
    stats: [
      { label: "Coding Score", value: "1068" },
      { label: "Problems", value: "306" },
      { label: "Institute Rank", value: "187" },
      { label: "POTD", value: "191" },
      { label: "Longest Streak", value: "56d" },
    ],
  },
  {
    platform: "CodeChef",
    handle: "shrish57",
    url: "https://www.codechef.com/users/shrish57",
    accent: "from-fuchsia-500/20 to-pink-500/10",
    stats: [
      { label: "Rating", value: "1414" },
      { label: "Stars", value: "2★" },
      { label: "Division", value: "3" },
    ],
  },
  {
    platform: "GitHub",
    handle: "SgAtjiit",
    url: "https://github.com/SgAtjiit",
    accent: "from-sky-500/20 to-cyan-500/10",
    stats: [
      { label: "Focus", value: "Full Stack + AI" },
      { label: "Top Langs", value: "JS · TS · Py · Cpp" },
      { label: "Active", value: "True" },
    ],
  },
];

export type Project = {
  name: string;
  featured?: boolean;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    name: "ScholarSync",
    featured: true,
    tagline: "AI-Powered Academic Workspace",
    description:
      "Engineered a unified academic workspace connecting Google Classroom with AI-powered coursework assistance, using React/Vite and Node.js/Express services with a 6-provider LLM abstraction and stateless SSE streaming.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Google APIs", "LLM Abstraction"],
    highlights: [
      "6-provider LLM abstraction layer with stateless SSE streaming",
      "Google OAuth 2.0, Classroom, Docs & Drive API integration",
      "5-worker concurrency pool for syncing assignments",
      "One-click solution export, PDF generation, Drive upload & submission",
    ],
    live: "https://scholarsync.shrish.in.net",
    github: "https://github.com/SgAtjiit/ScholarSync",
  },
  {
    name: "BuildMyResume",
    featured: true,
    tagline: "AI-Powered Resume & Portfolio Engineering Platform",
    description:
      "Developed a full-stack career platform using React, TypeScript, Node.js/Express, and MongoDB that centralizes professional data to generate resumes, parse documents, and create personalized developer portfolios.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "LangChain", "Groq", "Cloudflare Pages"],
    highlights: [
      "RAG-based AI tailoring pipeline with LangChain/Groq for JD-to-profile matching",
      "Asynchronous Vite portfolio generation & Cloudflare Pages deployment",
      "Document parsing & GitHub REST API export",
      "Centralized master profile architecture",
    ],
    live: "https://buildmyresume.shrish.in.net",
    github: "https://github.com/SgAtjiit/BuildMyResume",
  },
  {
    name: "StreamIt",
    featured: true,
    tagline: "Video Streaming Platform Backend",
    description:
      "Architected a scalable RESTful backend for a YouTube-like platform using Node.js, Express, and MongoDB (Mongoose ODM), covering video management and subscriptions.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose ODM", "JWT", "Bcrypt"],
    highlights: [
      "Implemented JWT dual-token (Access/Refresh) auth in HTTP-only cookies with bcrypt hashing",
      "Designed MongoDB aggregation pipelines powering 25+ REST endpoints",
      "Comprehensive video management, subscriptions, watch history & playlists",
    ],
    github: "https://github.com/SgAtjiit/StreamIt-Backend",
  },
  {
    name: "Synapse",
    tagline: "Real-time Collaboration Platform",
    description:
      "Built a real-time collaborative workspace featuring rich text editing, Socket.IO multi-user sync, live chat, presence indicators, and an AI assistant.",
    stack: ["React", "Socket.IO", "Node.js", "Express", "Firebase"],
    highlights: [
      "Real-time multi-user document sync via Socket.IO",
      "Presence & typing indicators with low latency",
      "Integrated AI assistant for writing & editing",
    ],
    live: "https://synapse.shrish.in.net",
    github: "https://github.com/SgAtjiit/synapse",
  },
  {
    name: "HateShield",
    tagline: "Bilingual Hate Speech Detection",
    description:
      "Bilingual (English + Bengali) hate speech detection using an ensemble ML architecture combining RoBERTa with Logistic Regression via FastAPI + React.",
    stack: ["Python", "FastAPI", "React", "RoBERTa", "scikit-learn"],
    highlights: [
      "Bilingual (English + Bengali) text analysis",
      "Ensemble ML classifier combining RoBERTa & Logistic Regression",
      "URL & document upload analysis",
    ],
    live: "https://hateshieldbn.shrish.in.net",
    github: "https://github.com/SgAtjiit/HateShield-bn",
  },
];

export const skills = [
  {
    category: "Core CS",
    items: [
      "Data Structures & Algorithms",
      "Complexity Analysis",
      "Object-Oriented Programming (OOP)",
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Distributed Systems",
    ],
  },
  {
    category: "Languages",
    items: ["C++", "Python", "JavaScript (ES6+)", "TypeScript", "SQL"],
  },
  {
    category: "Frontend & Backend",
    items: [
      "React.js",
      "Node.js",
      "Express.js",
      "RESTful API Design",
      "MVC Architecture",
      "WebSockets (Socket.IO)",
      "Middleware",
    ],
  },
  {
    category: "Databases & Security",
    items: [
      "MongoDB (Mongoose ODM)",
      "Aggregation Pipelines",
      "PostgreSQL",
      "JWT",
      "OAuth 2.0",
      "Firebase Auth",
    ],
  },
  {
    category: "Cloud & Tools",
    items: [
      "Vercel",
      "Render",
      "Cloudflare Pages",
      "Git",
      "GitHub",
      "Postman",
      "CI/CD",
      "Debugging",
      "Documentation",
    ],
  },
];

export const achievements = [
  {
    title: "900+ DSA Problems Solved",
    label: "PROBLEM SOLVING",
    detail: "Across LeetCode (Contest Rating 1634, Top 20% globally) and GeeksforGeeks.",
    category: "problem_solving",
    highlighted: true,
  },
  {
    title: "91st Rank in CodeChef Starters 247",
    label: "COMPETITIVE PROGRAMMING",
    detail: "Secured 91st rank in Division C among 3,138 participants.",
    category: "rating",
    highlighted: true,
  },
  {
    title: "Semester SGPA 9.8 / 10.0",
    label: "ACADEMICS",
    detail: "Overall CGPA: 8.9 / 10.0 at JIIT Noida (Class XII: 95.8%, Class X: 99.6%).",
    category: "academic",
  },
  {
    title: "Flipkart GRiD 2026 Semi-Finalist",
    label: "NATIONAL HACKATHONS",
    detail: "Reached Semi-Finals (Round 3) of Flipkart GRiD 2026.",
    category: "hackathon",
    highlighted: true,
  },
  {
    title: "Adobe India Hackathon 2025",
    label: "NATIONAL HACKATHONS",
    detail: "Qualified for Round 2 of Adobe India Hackathon 2025.",
    category: "hackathon",
  },
  {
    title: "Smart India Hackathon (SIH)",
    label: "NATIONAL HACKATHONS",
    detail: "Advanced to SIH national-level screening.",
    category: "hackathon",
  },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "coding", label: "Profiles" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
