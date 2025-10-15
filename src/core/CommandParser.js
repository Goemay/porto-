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
  "jim",
  "cv",
  "joke",
];


export async function parseCommand(raw, { setThemeClass } = {}) {
  const cmd = raw.trim().toLowerCase();

  if (!cmd) return [{ text: "", type: "stdout" }];

  if (cmd === "clear" || cmd === "cls") {
    return [{ text: "", type: "clear" }];
  }

  if (cmd === "help") {
    return [
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
    ];
  }

  if (cmd === "about") {
    return [
      { text: "Jim Raihan Gumay — IT Professional & Full-Stack Developer", type: "stdout" },
      { text: "Location: Cikarang Selatan, Kab Bekasi, Jawa Barat", type: "stdout" },
      { text: "Born: 2003 — Competitive problem-solver passionate about continuous learning.", type: "stdout" },
    ];
  }

  if (cmd === "projects") {
    return [
      { text: "Projects:", type: "hint" },
      { text: "1) Inventory Management System", type: "stdout" },
      {
        text: "   git clone https://github.com/goemay/inventory-management-system",
        type: "link",
        href: "https://github.com/goemay/",
      },
      { text: "2) Attendance App", type: "stdout" },
      {
        text: "   git clone https://github.com/goemay/attandece-app",
        type: "link",
        href: "https://github.com/Goemay/Project-cnaindo",
      },
      { text: "3) Portfolio Website", type: "stdout" },
      {
        text: "   git clone https://github.com/goemay/porto-",
        type: "link",
        href: "https://github.com/goemay/porto-",
      },
      { text: "(Click links to open repository)", type: "hint" },
    ];
  }

  if (cmd === "skills") {
    return [
      { text: "Technical Skills:", type: "hint" },
      { text: "HTML, CSS, JavaScript, PHP, Python, React, Vue, Laravel, Tailwind CSS, vite, Git, Epicor ERP, Unity", type: "stdout" },
    ];
  }

  if (cmd === "contact") {
    return [
      { text: "Email: raihangumay02@gmail.com", type: "stdout" },
      { text: "Phone: (+62) 821 2320 7891", type: "stdout" },
      { text: "GitHub: https://github.com/goemay", type: "link", href: "https://github.com/goemay" },
    ];
  }

  if (cmd === "education") {
    return [
      { text: "President University — Information Technology", type: "stdout" },
      { text: "SMK Ananda Mitra Industri Deltamas — Mechanical Engineering", type: "stdout" },
    ];
  }

  if (cmd === "cv") {
  return [
    { text: "Opening Jim Raihan Gumay’s CV:", type: "hint" },
    {
      text: "📄 Download CV (PDF)",
      type: "link",
      href: "CV_JImraihan (Eng).pdf", // change this to your real CV link
    },
    { text: "Tip: Right-click > Save As to download.", type: "stdout" },
  ];
}

if (cmd === "joke") {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous");
    const data = await res.json();
    const joke = data.type === "single"
      ? data.joke
      : `${data.setup}\n${data.delivery}`;
    return [{ text: joke, type: "stdout" }];
  } catch (e) {
    return [{ text: "Couldn't fetch a joke right now. Try again!", type: "error" }];
  }
}


  // Let shutdown confirmation be handled by TerminalShell
  if (cmd === "shutdown") {
    return [{ text: "Preparing to shutdown terminal...", type: "stdout" }];
  }

  return [{ text: `command not found: ${cmd}`, type: "error" }];
}
