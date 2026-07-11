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
  resumeUrl: "https://drive.google.com/file/d/12amZkRfaqBrxemj0YWoSyQSFP1Hu701_/view?usp=sharing",
};

export const about = {
  headline: "Engineer building products, not clones.",
  paragraphs: [
    "Computer Science undergraduate passionate about building production-grade software with scalable architecture, clean UI/UX, and maintainable code.",
    "Focused on real problems across Full Stack Development, Backend Engineering, AI Applications, Generative AI, Real-time Systems, and Software Architecture.",
    "Actively practices DSA and enjoys learning tools that improve developer productivity — always shipping.",
  ],
  facts: [
    { label: "Based in", value: "Noida, India" },
    { label: "Focus", value: "Full Stack + AI" },
    { label: "CGPA", value: "8.9 / 10" },
    { label: "DSA Problems", value: "862+" },
  ],
};

export const education = [
  {
    year: "2023 – Present",
    institution: "Jaypee Institute of Information Technology, Noida",
    degree: "B.Tech, Computer Science & Engineering",
    details: ["CGPA: 8.9 / 10", "Expected Graduation: 2027"],
  },
  {
    year: "2023",
    institution: "The Doon Valley Public School, Deoband, U.P.",
    degree: "CBSE — Class X & XII (PCM)",
    details: ["Class X: 99.6%", "Class XII: 95.8%"],
  },
];

export const journey = [
  { title: "Started B.Tech", desc: "Began CSE at JIIT Noida." },
  { title: "Learned C++", desc: "Foundations of programming & OOP." },
  { title: "Started solving DSA", desc: "Daily practice on LeetCode & GFG." },
  { title: "Learned MERN Stack", desc: "React, Node, Express, MongoDB." },
  { title: "Backend Development", desc: "REST APIs, auth, scalable services." },
  { title: "Real-Time Systems", desc: "WebSockets, presence, collab editors." },
  { title: "LLMs in Production", desc: "Integrated multi-provider AI into real apps." },
  { title: "Built ScholarSync", desc: "AI learning workspace with BYOK architecture." },
  { title: "Built Synapse", desc: "Real-time collaboration platform." },
  { title: "Built BuildMyResume", desc: "AI resume tailoring & portfolio generator." },
  { title: "Today", desc: "Building Full Stack + AI apps. Active problem solver." },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    handle: "Shrish_Gupta",
    url: "https://leetcode.com/Shrish_Gupta",
    accent: "from-amber-500/20 to-orange-500/10",
    stats: [
      { label: "Solved", value: "567" },
      { label: "Contest Rating", value: "1608" },
      { label: "Hard", value: "79" },
      { label: "Medium", value: "308" },
      { label: "Easy", value: "180" },
    ],
  },
  {
    platform: "GeeksForGeeks",
    handle: "shrishgupta",
    url: "https://www.geeksforgeeks.org/user/shrishgupta/",
    accent: "from-emerald-500/20 to-green-500/10",
    stats: [
      { label: "Coding Score", value: "1020" },
      { label: "Problems", value: "295" },
      { label: "Institute Rank", value: "202" },
      { label: "POTD", value: "185" },
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
    tagline: "AI-powered assignment learning workspace.",
    description:
      "Integrates Google Classroom, Google Drive, and multi-provider LLMs. Client-side AI execution with BYOK architecture, Vision AI extraction, Google Docs sync, Socratic Tutor, Quiz Generator, Flashcards, and an encrypted API key vault.",
    stack: ["React", "Node.js", "MongoDB", "Supabase", "LangChain", "Google APIs"],
    highlights: [
      "BYOK — Bring Your Own Key architecture",
      "Client-side AI execution for privacy",
      "Vision AI extraction from assignments",
      "Socratic Tutor, Quiz & Flashcard generators",
    ],
    live: "https://scholarsync.shrish.in.net",
    github: "https://github.com/SgAtjiit/ScholarSync",
  },
  {
    name: "BuildMyResume",
    featured: true,
    tagline: "AI resume tailoring & portfolio generator.",
    description:
      "Master profile architecture with Resume Builder, AI Resume Tailoring, Portfolio Generator, and Cloudflare Pages deployment. Includes Resume Parsing, Firebase Auth, OCR support, and LangChain + Groq pipelines.",
    stack: ["React", "LangChain", "Groq", "Firebase", "Cloudflare Pages", "OCR"],
    highlights: [
      "Master profile → tailored resumes on demand",
      "Portfolio auto-generation & deployment",
      "OCR + parsing for existing PDFs",
      "Firebase Auth with secure vaults",
    ],
    live: "https://buildmyresume.shrish.in.net",
    github: "https://github.com/SgAtjiit/BuildMyResume",
  },
  {
    name: "Synapse",
    tagline: "Real-time collaboration platform.",
    description:
      "Rich text editor with live chat, presence, typing indicators, and an AI assistant. Built on Socket.IO with Firebase Auth for a low-latency multi-user workspace.",
    stack: ["React", "Socket.IO", "Firebase", "Node.js", "AI"],
    highlights: [
      "Live presence & typing indicators",
      "Collaborative rich text editor",
      "Integrated AI assistant",
    ],
    live: "https://synapse.shrish.in.net",
    github: "https://github.com/SgAtjiit/synapse",
  },
  {
    name: "HateShield",
    tagline: "Bilingual hate speech detection.",
    description:
      "English + Bengali hate speech detection. Ensemble ML combining RoBERTa with Logistic Regression. Supports URL and document analysis via FastAPI + React.",
    stack: ["FastAPI", "React", "RoBERTa", "scikit-learn", "Python"],
    highlights: [
      "Bilingual (English + Bengali)",
      "Ensemble ML architecture",
      "URL & document analysis",
    ],
    live: "https://hateshieldbn.shrish.in.net",
    github: "https://github.com/SgAtjiit/HateShield-bn",
  },
  {
    name: "QuickShow",
    tagline: "Movie booking MERN app.",
    description:
      "MERN application with Clerk auth, Stripe payments, Nodemailer, and Inngest-powered background jobs. Includes a full admin portal.",
    stack: ["MERN", "Clerk", "Stripe", "Inngest", "Nodemailer"],
    highlights: [
      "Stripe payments end-to-end",
      "Background jobs with Inngest",
      "Admin portal & analytics",
    ],
    live: "https://quickshow.shrish.in.net",
    github: "https://github.com/SgAtjiit/QuickShow",
  },
  {
    name: "StreamIt Backend",
    tagline: "YouTube-like backend service.",
    description:
      "Production-style video platform backend: JWT auth, Cloudinary uploads, watch history, dashboard analytics, playlists, likes, and tweets.",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    highlights: [
      "JWT auth & refresh flow",
      "Cloudinary media pipeline",
      "Playlists, likes, tweets, analytics",
    ],
    github: "https://github.com/SgAtjiit/StreamIt-Backend",
  },
  {
    name: "Online Billing & Inventory",
    tagline: "Java Swing desktop suite.",
    description:
      "Desktop app for invoice generation and inventory tracking with PDF export. Built with Java Swing + SQLite using the Strategy Pattern and a modular architecture.",
    stack: ["Java", "Swing", "SQLite", "PDF"],
    highlights: [
      "PDF invoice export",
      "Strategy Pattern architecture",
      "Modular desktop UI",
    ],
    github: "https://github.com/SgAtjiit/Online-Billing-and-Inventory-Management-System",
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["C++", "JavaScript", "TypeScript", "Python", "SQL", "Java"],
  },
  {
    category: "Frontend",
    items: ["React", "Vite", "TailwindCSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "MVC"],
  },
  {
    category: "AI / ML",
    items: [
      "Groq",
      "LangChain",
      "OpenAI",
      "Gemini",
      "Anthropic",
      "Ollama",
      "Hugging Face",
      "FastAPI",
    ],
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "SQLite", "Supabase"],
  },
  {
    category: "Auth & Security",
    items: ["Firebase", "OAuth2", "JWT"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Vercel", "Render", "Cloudflare Pages", "Git", "GitHub", "Postman"],
  },
];

export const achievements = [
  {
    title: "862+ DSA problems",
    label: "PROBLEM SOLVING",
    detail: "Across LeetCode and GeeksforGeeks.",
    category: "problem_solving"
  },
  {
    title: "LeetCode 1608",
    label: "RATING",
    detail: "Contest rating on LeetCode.",
    category: "rating",
    highlighted: true
  },
  {
    title: "CodeChef 2★ (1414)",
    label: "RATING",
    detail: "Division 3 competitive programmer.",
    category: "rating"
  },
  {
    title: "CGPA 8.9 / 10",
    label: "ACADEMIC",
    detail: "B.Tech, Computer Science — JIIT Noida.",
    category: "academic"
  },
  {
    title: "95.8% Class XII",
    label: "ACADEMIC",
    detail: "PCM, CBSE.",
    category: "academic"
  },
  {
    title: "99.6% Class X",
    label: "ACADEMIC",
    detail: "CBSE.",
    category: "academic"
  },
  {
    title: "Adobe India Hackathon 2025",
    label: "HACKATHON",
    detail: "Qualified for Round 2.",
    category: "hackathon"
  },
  {
    title: "Smart India Hackathon",
    label: "HACKATHON",
    detail: "Cleared college-level screening.",
    category: "hackathon"
  },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "timeline", label: "Timeline" },
  { id: "coding", label: "Profiles" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
