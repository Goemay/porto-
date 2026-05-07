// src/core/CommandParser.js

export const AUTOCOMPLETE_LIST = [
  "help",
  "about",
  "projects",
  "skills",
  "contact",
  "education",
  "work",
  "clear",
  "cls",
  "shutdown",
  "cv",
  "joke",
  "stack",
  "jim",
];

// ── Command handlers ──────────────────────────────────────────────────────────
const COMMANDS = {
  clear: () => [{ text: "", type: "clear" }],
  cls:   () => [{ text: "", type: "clear" }],

  help: () => [
    { text: "Available commands:", type: "hint" },
    { text: "  about      — personal bio & current role",      type: "stdout" },
    { text: "  work       — full work history",                type: "stdout" },
    { text: "  projects   — list featured projects",           type: "stdout" },
    { text: "  skills     — list technical skills",            type: "stdout" },
    { text: "  education  — education history",                type: "stdout" },
    { text: "  contact    — show contact info",                type: "stdout" },
    { text: "  cv         — open Jim's CV (PDF)",              type: "stdout" },
    { text: "  joke       — get a random programmer joke",     type: "stdout" },
    { text: "  stack      — tech stack of this project",       type: "stdout" },
    { text: "  jim        — display Jim ASCII art",            type: "stdout" },
    { text: "  clear      — clear console",                    type: "stdout" },
    { text: "  shutdown   — exit terminal",                    type: "stdout" },
    { text: "", type: "stdout" },
    { text: "Tip: use Tab to autocomplete, ↑↓ for history", type: "hint" },
  ],

  about: () => [
    { text: "Jim Raihan Gumay", type: "hint" },
    { text: "  Role      : Junior Software Engineer & Full-Stack Developer", type: "stdout" },
    { text: "  Company   : PT Cnaindo TCT (Oct 2025 – Present)", type: "stdout" },
    { text: "  Location  : Cikarang Selatan, Kab Bekasi, Jawa Barat", type: "stdout" },
    { text: "  Born      : 2003", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  Born and raised in South Cikarang. Competitive by nature and drawn to", type: "stdout" },
    { text: "  RPG games because they push me to explore, learn, and improve.", type: "stdout" },
    { text: "  That same drive fuels my professional growth.", type: "stdout" },
  ],

  work: () => [
    { text: "Work History:", type: "hint" },
    { text: "", type: "stdout" },
    { text: "  [Oct 2025 – Present]  Junior Software Engineer", type: "stdout" },
    { text: "  PT Cnaindo TCT · Full-time · Hybrid (AXA Tower)", type: "stdout" },
    { text: "  → Server administration & application development", type: "stdout" },
    { text: "  → Automation & database management for internal tools", type: "stdout" },
    { text: "  → Linux administration & XML workflows", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  [Jun 2024 – Aug 2024]  IT Support – Administration Division", type: "stdout" },
    { text: "  PT Hume Concrete Indonesia · Internship · On-site", type: "stdout" },
    { text: "  → Supported IT operations for daily administration work", type: "stdout" },
    { text: "  → Resolved hardware, software, and network issues", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  [Feb 2024 – Apr 2024]  IT Training Administrator", type: "stdout" },
    { text: "  BPPTIK Kementrian Kominfo · Internship · On-site", type: "stdout" },
    { text: "  → Managed social media & admin tasks for training classes", type: "stdout" },
    { text: "  → Handled attendance tracking & participant data processing", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  [Aug 2023 – Dec 2023]  SEO Content & Optimization", type: "stdout" },
    { text: "  Kampus Dosen Jualan · Internship · Remote (Yogyakarta)", type: "stdout" },
    { text: "  → Created SEO articles & published content on client websites", type: "stdout" },
    { text: "  → Improved client visibility with consistent content strategy", type: "stdout" },
  ],

  projects: () => [
    { text: "Featured Projects:", type: "hint" },
    { text: "", type: "stdout" },
    { text: "  1) Porto-Jim — Interactive Developer Portfolio", type: "stdout" },
    { text: "     React + Vite + Tailwind + Framer Motion | 2025", type: "stdout" },
    { text: "     → https://github.com/Goemay/porto-", type: "link", href: "https://github.com/Goemay/porto-" },
    { text: "", type: "stdout" },
    { text: "  2) iTrucking — Inventory Management System", type: "stdout" },
    { text: "     IoT tracking device + inventory transfer system | 2024", type: "stdout" },
    { text: "     → President University Final Project", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  3) Food Ordering Website", type: "stdout" },
    { text: "     PHP + MySQL + XAMPP | 2022", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  4) Idle Endless Runner Game (Unity)", type: "stdout" },
    { text: "     UI design, VFX & gameplay polish | 2023", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  5) Bootcamp ERP with Epicor", type: "stdout" },
    { text: "     Purchasing & Sales modules | President University | 2025", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  → GitHub profile: https://github.com/Goemay", type: "link", href: "https://github.com/Goemay" },
  ],

  skills: () => [
    { text: "Technical Skills:", type: "hint" },
    { text: "", type: "stdout" },
    { text: "  Languages   : HTML, CSS, JavaScript, PHP, Python, SQL", type: "stdout" },
    { text: "  Frameworks  : React, Vue, Laravel, Tailwind CSS, Vite", type: "stdout" },
    { text: "  Tools       : Git, Linux, ERP (Epicor), Unity", type: "stdout" },
    { text: "  Practices   : SEO Optimization, Database Management,", type: "stdout" },
    { text: "               Research & Analytics, Server Administration", type: "stdout" },
  ],

  education: () => [
    { text: "Education:", type: "hint" },
    { text: "", type: "stdout" },
    { text: "  [2021 – 2025]  President University", type: "stdout" },
    { text: "  Bachelor of Information Technology", type: "stdout" },
    { text: "  GPA: 3.45 / 4.00", type: "stdout" },
    { text: "  Final Project: iTrucking – Inventory Transfer System", type: "stdout" },
    { text: "  Courses: Web Dev, ERP Systems, Internet of Things", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  [2018 – 2021]  SMK Ananda Mitra Industri Deltamas", type: "stdout" },
    { text: "  Mechanical Engineering", type: "stdout" },
    { text: "  GPA: 8 / 10", type: "stdout" },
  ],

  contact: () => [
    { text: "Contact Info:", type: "hint" },
    { text: "", type: "stdout" },
    { text: "  Email  : raihangumay02@gmail.com",    type: "stdout" },
    { text: "  Phone  : (+62) 821 2320 7891",         type: "stdout" },
    { text: "  GitHub : https://github.com/Goemay",  type: "link", href: "https://github.com/Goemay" },
    { text: "  LinkedIn : https://linkedin.com/in/jim-raihan", type: "link", href: "https://www.linkedin.com/in/jim-raihan/" },
    { text: "  Portfolio : https://jimraihan.my.id",  type: "link", href: "https://jimraihan.my.id" },
  ],

  cv: () => [
    { text: "Jim Raihan Gumay — Curriculum Vitae", type: "hint" },
    { text: "  📄 Download CV (PDF)", type: "link", href: "CV_JImraihan (Eng).pdf" },
    { text: "  Tip: Right-click → Save As to download.", type: "stdout" },
  ],

  joke: async () => {
    try {
      const res  = await fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous?safe-mode");
      const data = await res.json();
      const joke = data.type === "single"
        ? data.joke
        : `${data.setup}\n  → ${data.delivery}`;
      return [{ text: joke, type: "stdout" }];
    } catch {
      return [{ text: "Couldn't fetch a joke right now. Try again!", type: "error" }];
    }
  },

  stack: () => [
    { text: "Porto-Jim Tech Stack:", type: "hint" },
    { text: "", type: "stdout" },
    { text: "  ⚛  React 18       — component-based UI rendering", type: "stdout" },
    { text: "  ⚡  Vite 7        — ultra-fast dev server & bundler", type: "stdout" },
    { text: "  🎨  Tailwind CSS   — utility-first styling", type: "stdout" },
    { text: "  🎞  Framer Motion  — spring-based animations", type: "stdout" },
    { text: "  🔣  React Icons    — icon library", type: "stdout" },
    { text: "  📦  gh-pages       — GitHub Pages deployment", type: "stdout" },
    { text: "", type: "stdout" },
    { text: "  Repo: https://github.com/Goemay/porto-", type: "link", href: "https://github.com/Goemay/porto-" },
  ],

  jim: () => [
    {
      text: `
     ██╗██╗███╗   ███╗
     ██║██║████╗ ████║
     ██║██║██╔████╔██║
██   ██║██║██║╚██╔╝██║
╚█████╔╝██║██║ ╚═╝ ██║
 ╚════╝ ╚═╝╚═╝     ╚═╝`,
      type: "stdout",
    },
    { text: "  Junior Software Engineer & Full-Stack Developer", type: "hint" },
    { text: "  Powered by React + Vite + Tailwind CSS", type: "stdout" },
  ],

  shutdown: () => [
    { text: "Preparing to exit terminal...", type: "stdout" },
  ],
};

// ── Main parser ───────────────────────────────────────────────────────────────
export async function parseCommand(raw, options = {}) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [{ text: "", type: "stdout" }];

  const handler = COMMANDS[cmd];
  if (!handler) {
    return [
      { text: `command not found: ${cmd}`, type: "error" },
      { text: "  type 'help' to see available commands", type: "hint" },
    ];
  }

  return await handler(options);
}
