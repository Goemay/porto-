// src/CommandParser.js

export const AUTOCOMPLETE_LIST = [
  "help",
  "about",
  "projects",
  "skills",
  "contact",
  "education",
  "clear",
  "shutdown",
  "cv",
  "joke",
  "stack",
  "jim",
];

// Command handlers
const COMMANDS = {
  clear: () => [{ text: "", type: "clear" }],
  cls: () => [{ text: "", type: "clear" }],

  help: () => [
    { text: "Available commands:", type: "hint" },
    { text: "about      — show personal bio", type: "stdout" },
    { text: "projects   — list featured projects", type: "stdout" },
    { text: "skills     — list technical skills", type: "stdout" },
    { text: "contact    — show contact info", type: "stdout" },
    { text: "education  — show education", type: "stdout" },
    { text: "cv         — download Jim’s CV (PDF)", type: "stdout" },
    { text: "joke       — get a random programmer joke", type: "stdout" },
    { text: "clear      — clear console", type: "stdout" },
    { text: "shutdown   — exit terminal", type: "stdout" },
    { text: "stack      — show tech stack of this project", type: "stdout" },
    { text: "jim        — display Jim ASCII art", type: "stdout" },
  ],

  about: () => [
    { text: "Jim Raihan Gumay — IT Professional & Full-Stack Developer", type: "stdout" },
    { text: "Location: Cikarang Selatan, Kab Bekasi, Jawa Barat", type: "stdout" },
    { text: "Born: 2003 — Competitive problem-solver passionate about continuous learning.", type: "stdout" },
  ],

  projects: () => [
    { text: "Projects:", type: "hint" },
    { text: "1) Inventory Management System", type: "stdout" },
    { text: "   git clone https://github.com/goemay/inventory-management-system", type: "link", href: "https://github.com/goemay/" },
    { text: "2) Attendance App", type: "stdout" },
    { text: "   git clone https://github.com/goemay/attandece-app", type: "link", href: "https://github.com/Goemay/Project-cnaindo" },
    { text: "3) Portfolio Website", type: "stdout" },
    { text: "   git clone https://github.com/goemay/porto-", type: "link", href: "https://github.com/goemay/porto-" },
    { text: "(Click links to open repository)", type: "hint" },
  ],

  skills: () => [
    { text: "Technical Skills:", type: "hint" },
    { text: "HTML, CSS, JavaScript, PHP, Python, React, Vue, Laravel, Tailwind CSS, Vite, Git, Epicor ERP, Unity", type: "stdout" },
  ],

  contact: () => [
    { text: "Email: raihangumay02@gmail.com", type: "stdout" },
    { text: "Phone: (+62) 821 2320 7891", type: "stdout" },
    { text: "GitHub: https://github.com/goemay", type: "link", href: "https://github.com/goemay" },
  ],

  education: () => [
    { text: "President University — Information Technology", type: "stdout" },
    { text: "SMK Ananda Mitra Industri Deltamas — Mechanical Engineering", type: "stdout" },
  ],

  cv: () => [
    { text: "Opening Jim Raihan Gumay’s CV:", type: "hint" },
    { text: "📄 Download CV (PDF)", type: "link", href: "CV_JImraihan (Eng).pdf" },
    { text: "Tip: Right-click > Save As to download.", type: "stdout" },
  ],

  joke: async () => {
    try {
      const res = await fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous");
      const data = await res.json();
      const joke = data.type === "single" ? data.joke : `${data.setup}\n${data.delivery}`;
      return [{ text: joke, type: "stdout" }];
    } catch (e) {
      return [{ text: "Couldn't fetch a joke right now. Try again!", type: "error" }];
    }
  },

  stack: () => [
    { text: "Project Tech Stack:", type: "hint" },
    { text: "⚙️  Frontend Framework: React (JSX-based UI rendering)", type: "stdout" },
    { text: "⚡  Build Tool: Vite (super fast dev server + bundler)", type: "stdout" },
    { text: "🎨  Styling: Tailwind CSS (utility-first styling system)", type: "stdout" },
    { text: "🧠  Extras: Custom terminal parser, interactive commands, async API calls", type: "stdout" },
  ],

  jim: () => [
    { text: `
     ██╗██╗███╗   ███╗
     ██║██║████╗ ████║
     ██║██║██╔████╔██║
██   ██║██║██║╚██╔╝██║
╚█████╔╝██║██║ ╚═╝ ██║
 ╚════╝ ╚═╝╚═╝     ╚═╝
`, type: "stdout" },
    { text: "Welcome to JIM Terminal — powered by React + Vite + Tailwind CSS", type: "hint" },
  ],

shutdown: ({ raw }) => {
  const cmdParts = raw.trim().toLowerCase().split(" ");
  const autoConfirm = cmdParts.includes("-y");

  if (autoConfirm) {
    return [{ text: "Shutting down terminal automatically...", type: "hint", autoShutdown: true }];
  }

  // Let TerminalShell handle manual confirmation
  return [{ text: "Preparing to shutdown terminal...", type: "stdout" }];
},
};

// Main parser
export async function parseCommand(raw, options = {}) {
  const cmd = raw.trim().toLowerCase();

  if (!cmd) return [{ text: "", type: "stdout" }];

  const handler = COMMANDS[cmd];
  if (!handler) return [{ text: `command not found: ${cmd}`, type: "error" }];

  return await handler(options);
}
