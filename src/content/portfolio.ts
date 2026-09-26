export const profile = {
  name: "Shrish Gupta",
  title: "Full Stack Software Engineer",
  subtitle:
    "Backend-leaning full-stack developer — I build APIs and systems in Node.js & Express, put clean interfaces on top with React, and actually ship the result.",
  location: "Noida, India",
  email: "shrishpankajguptadbd6@gmail.com",
  phone: "+91-7310677900",
  linkedin: "https://www.linkedin.com/in/shrish-gupta-/",
  github: "https://github.com/SgAtjiit",
  resumeUrl: "https://drive.google.com/file/d/1fxYzsIyUEiI4LIyRQJrft-gIlNVA_yM5/view?usp=drive_link",
};

export const about = {
  headline: "Backend-focused developer who cares more about what ships than what looks good in a slide.",
  paragraphs: [
    "I'm a computer science undergrad at JIIT Noida, and most of what I build ends up being backend-heavy — REST APIs, database design, the parts of a system that have to actually hold up once real users start hitting them. I'm just as comfortable in React and TypeScript on the frontend, but the server side is where I spend most of my thinking time.",
    "Day to day, that means writing APIs and WebSocket servers in Node.js and Express 5, building MongoDB aggregation pipelines that don't fall over on real data, modeling relational schemas in PostgreSQL with Drizzle ORM, wiring event-driven background jobs with Inngest, and finding practical places to fold AI into a product instead of bolting it on because it's trendy.",
    "I care about getting things live — services running on Vercel and Render, webhooks that don't silently fail, code I'd be fine handing off to someone else. I also use tools like Claude and Antigravity to move faster while building, without letting that replace actually understanding what the code is doing.",
  ],
  facts: [
    { label: "Based in", value: "Noida, India" },
    { label: "Focus", value: "Backend & Full Stack" },
    { label: "CGPA", value: "8.9 / 10" },
    { label: "Problem Solving", value: "1000+ DSA Problems Solved" },
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
      "6-week remote, project-based internship — built full-stack applications independently against real deadlines, applying OOP, RESTful API design, and database modeling throughout.",
      "Built Synapse, a real-time collaborative document editor using Socket.IO for live multi-user sync and conflict handling.",
      "Built InkForge, a blog management platform with RESTful CRUD APIs, JWT-based authentication, and MongoDB schema design for users, posts, and comments.",
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
      { label: "Solved", value: "650+" },
      { label: "Contest Rating", value: "1634" },
      { label: "Peak Rating", value: "1645" },
      { label: "Medium", value: "328" },
      { label: "Hard", value: "86" },
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
      { label: "Rating", value: "1543" },
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
      { label: "Focus", value: "Backend + Full Stack" },
      { label: "Top Langs", value: "TS · JS · Py · C++" },
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
  isBackendOnly?: boolean;
};

export const projects: Project[] = [
  {
    name: "BuildMyResume",
    featured: true,
    tagline: "AI Resume Builder & Automated Portfolio Deployment",
    description:
      "A career-tooling platform I built around one rule: the AI isn't allowed to hallucinate your resume. It has a locked single-source Master Resume, tailors content per job using a two-stage RAG pipeline running mostly in memory, and can spin up and deploy a full portfolio site straight to Cloudflare Pages on its own.",
    stack: [
      "React 18",
      "Vite",
      "Node.js 22",
      "Express 5",
      "MongoDB Atlas",
      "Cloudflare Pages Edge",
      "Groq AI (Llama 3.3 70B)",
      "Local MiniLM ONNX",
      "Firebase Auth",
      "Tailwind CSS",
    ],
    highlights: [
      "Two-stage RAG tailoring using local MiniLM-L6-v2 ONNX embeddings computed in-process, paired with Groq's LLaMA 3.3 70B for generation",
      "Async compilation queue (HTTP 202) that builds a standalone Vite + React portfolio and deploys it live to Cloudflare Pages",
      "High-DPI (300 DPI), multi-page ATS-friendly PDF export that avoids scroll-clipping via an off-screen fixed overlay render",
      "Handles PDF, DOCX (via mammoth), and scanned resumes through an OCR pipeline (tesseract.js)",
      "One-click GitHub repository export using the Octokit REST client",
    ],
    live: "https://buildmyresume.shrish.in.net/",
    github: "https://github.com/SgAtjiit/BuildMyResume",
  },
  {
    name: "ScholarSync",
    featured: true,
    tagline: "AI Academic Workspace on top of Google Classroom",
    description:
      "A workspace that syncs directly with Google Classroom and layers AI coursework help on top of it. The client and server are fully decoupled — heavy document processing runs in browser Web Workers, and AI responses stream over SSE with nothing logged on the backend.",
    stack: [
      "React 19",
      "Vite 7",
      "Node.js",
      "Express 5",
      "MongoDB Atlas (Mongoose 9)",
      "Supabase Storage",
      "Google Classroom API",
      "SSE Streaming",
      "TipTap Editor",
    ],
    highlights: [
      "Abstracts across 6 LLM providers behind one interface, streaming responses via SSE with zero prompt logging on the server",
      "Worker pool (concurrency capped at 5) syncing active Classroom courses, assignments, and coursework",
      "Dual-consent Google OAuth 2.0 with HttpOnly session cookies signed and verified using Node's native crypto (timing-safe comparisons)",
      "Offloads PDF page rasterization and context-window slicing entirely to browser Web Workers — none of it touches the server",
      "One-click solution export via PDFKit, plus direct submission to Google Drive / Docs",
    ],
    live: "https://scholarsync.shrish.in.net/",
    github: "https://github.com/SgAtjiit/ScholarSync",
  },
  {
    name: "QuickShow",
    featured: true,
    tagline: "Cinema Ticket Booking with Event-Driven Seat Locking",
    description:
      "A movie ticket booking platform where seat reservations, payments, and cancellations are all handled as events rather than one long request chain — so a payment timing out doesn't leave a seat stuck as 'reserved' forever.",
    stack: [
      "React 19",
      "Vite 6",
      "Tailwind CSS v4",
      "Node.js",
      "Express 5",
      "MongoDB Atlas",
      "Clerk Auth",
      "Stripe Payments",
      "Inngest Workflows",
      "TMDB API",
    ],
    highlights: [
      "Event-driven background jobs via Inngest, including an automatic 10-minute seat release if payment times out",
      "Interactive seat map (rows A–J) with real-time occupancy and a per-booking selection limit",
      "Stripe checkout with signed webhook verification driving booking state transitions",
      "Role-based access via Clerk metadata, with an admin dashboard and show scheduling kept in sync with the TMDB API",
    ],
    live: "https://quickshow.shrish.in.net/",
    github: "https://github.com/SgAtjiit/QuickShow",
  },
  {
    name: "InkForge",
    featured: true,
    tagline: "Technical Blogging Platform with Automated AI Moderation",
    description:
      "A blogging platform built for developers, with content moderation that runs quietly in the background instead of blocking anyone's post, and an auth model designed so a stolen token doesn't get very far.",
    stack: [
      "React 19",
      "Vite 6",
      "Tailwind CSS v4",
      "Node.js 22",
      "Express 5",
      "PostgreSQL",
      "Neon Serverless",
      "Drizzle ORM",
      "OpenRouter AI",
      "Cloudinary CDN",
      "JWT Auth",
    ],
    highlights: [
      "Dual-token auth: memory-only access tokens, HttpOnly refresh cookies, DB-backed rotation with reuse-detection and a silent Axios replay queue on the client",
      "Background AI moderation via Node's setImmediate() calling Meta Llama 3.3 70B on OpenRouter — never blocks the request",
      "Direct-to-Cloudinary image uploads signed with backend HMAC-SHA256, so uploads skip the server entirely",
      "O(N) single-pass hash-map assembly of nested comment threads, with tombstone soft deletes",
      "Two feed modes: cursor-paginated infinite scroll on the home feed, offset-paginated search on explore",
    ],
    live: "https://inkforge.shrish.in.net/",
    github: "https://github.com/SgAtjiit/InkForge",
  },
  {
    name: "Synapse",
    featured: false,
    tagline: "Real-Time Collaborative Editor with AI Ghost-Text",
    description:
      "A collaborative document editor with live multi-cursor editing over WebSockets and an AI autocomplete that suggests inline without ever touching the document's actual content.",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB Atlas",
      "Groq AI",
      "Google Gemini",
      "Firebase Auth",
      "TipTap Editor",
    ],
    highlights: [
      "Split transport: REST for persistence, Socket.IO for real-time room sync",
      "Non-destructive AI ghost-text using TipTap/ProseMirror widget decorations — no schema mutation",
      "Streaming, room-wide AI chat copilot (/ai) broadcast token-by-token over WebSockets",
      "Live presence and typing indicators, with client-side content hashing to cancel echoes",
      "Client-side export to Word (.docx), PDF, and plain text",
    ],
    live: "https://synapse.shrish.in.net/",
    github: "https://github.com/SgAtjiit/synapse",
  },
  {
    name: "StreamIt Backend",
    featured: false,
    tagline: "YouTube-Style Video Backend, REST API Only",
    description:
      "A backend-only video sharing API modeled on YouTube's core mechanics — uploads, playlists, subscriptions, comments — built to be a clean reference for layered API design and real aggregation-pipeline work in MongoDB.",
    stack: [
      "Node.js (ESM)",
      "Express v5.2",
      "MongoDB Atlas",
      "Mongoose v9",
      "Dual-Token JWT",
      "Cloudinary CDN",
      "Multer",
      "Bcrypt",
    ],
    highlights: [
      "25+ REST endpoints across users, videos, channels, playlists, comments, and tweets, in a layered N-tier structure",
      "Multi-stage MongoDB aggregation pipelines for faceted video search, subscriber metrics, and nested watch history",
      "Polymorphic likes system covering videos, comments, and tweets with atomic counter updates",
      "Dual-token (access/refresh) JWT auth in HttpOnly cookies, bcrypt-hashed passwords",
      "Upload pipeline using Multer for temporary disk staging with deterministic cleanup afterward",
    ],
    github: "https://github.com/SgAtjiit/StreamIt-Backend",
    isBackendOnly: true,
  },
];

export const skills = [
  {
    category: "Backend & Architecture",
    items: [
      "Node.js",
      "Express 5",
      "RESTful APIs",
      "WebSockets (Socket.IO)",
      "Inngest Queues",
      "Concurrency Pools",
      "MVC Architecture",
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      "React 19 / 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TipTap / ProseMirror",
      "Web Workers",
    ],
  },
  {
    category: "Databases & Storage",
    items: [
      "MongoDB (Aggregations)",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Supabase Storage",
      "Cloudinary CDN",
    ],
  },
  {
    category: "Applied AI & LLMs",
    items: [
      "Two-Stage Vector RAG",
      "Local ONNX Embeddings",
      "Groq",
      "Google Gemini",
      "SSE Streaming",
    ],
  },
  {
    category: "AI-Native Stack & Tools",
    items: [
      "Claude (Architecture & Analysis)",
      "Antigravity (Agentic Pairing)",
      "Postman API Suite",
      "Git & GitHub",
    ],
  },
  {
    category: "Languages & Core CS",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "SQL",
      "DSA",
      "OOPS",
      "OS",
      "DBMS"
    ],
  },
];

export const achievements = [
  {
    title: "1000+ DSA Problems Solved",
    label: "PROBLEM SOLVING",
    detail: "650+ on LeetCode alone, with the rest split across GeeksforGeeks and CodeChef.",
    category: "problem_solving",
    highlighted: true,
  },
  {
    title: "Peak Ratings: 1645 LeetCode · 1543 CodeChef",
    label: "COMPETITIVE PROGRAMMING",
    detail: "Highest contest ratings reached to date on LeetCode and CodeChef, both in the 2★+ / top-tier contest bands.",
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