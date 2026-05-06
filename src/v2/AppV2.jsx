import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ── Static data (outside component — no useMemo needed) ───────────────────────
const PROFILE = {
  name: "Jim Raihan Gumay",
  role: "IT Support & Full-Stack Developer",
  location: "Cikarang Selatan, Kab Bekasi",
  email: "raihangumay02@gmail.com",
  phone: "(+62) 821 2320 7891",
  about:
    "Born in 2003, raised in South Cikarang. Competitive by nature and drawn to RPG games because they push me to explore, learn, and improve. That same drive fuels my professional growth.",
};

const CAREER = [
  {
    year: "Oct 2025 – Present",
    title: "Junior Software Engineer",
    org: "PT Cnaindo TCT",
    type: "Full-time",
    location: "CEO Suite, AXA Tower · Hybrid",
    bullets: [
      "Server administration and application development.",
      "Automation and database management for internal tools.",
      "Working with Linux and XML workflows.",
    ],
  },
  {
    year: "Jun 2024 – Aug 2024",
    title: "IT Support - Administration Division",
    org: "PT Hume Concrete Indonesia",
    type: "Internship",
    location: "Cikarang Selatan · On-site",
    bullets: [
      "Supported IT operations for daily administration work.",
      "Helped staff resolve hardware, software, and network issues.",
      "Maintained records and assisted data entry and documentation.",
    ],
  },
  {
    year: "Feb 2024 – Apr 2024",
    title: "IT Training Administrator",
    org: "BPPTIK Kementrian Kominfo",
    type: "Internship",
    location: "Bekasi · On-site",
    bullets: [
      "Managed social media and administrative tasks for training classes.",
      "Handled attendance tracking and participant data processing.",
      "Coordinated training sessions and class logistics.",
    ],
  },
  {
    year: "Aug 2023 – Dec 2023",
    title: "SEO Content and Optimization (Web)",
    org: "Kampus Dosen Jualan",
    type: "Internship",
    location: "Yogyakarta · Remote",
    bullets: [
      "Created SEO articles and published content on client websites.",
      "Maintained website accuracy, functionality, and performance.",
      "Checked broken links, outdated content, and layout issues.",
      "Improved client visibility with consistent content strategy.",
    ],
  },
];

const EDUCATION = [
  {
    year: "2021 – 2025",
    school: "President University",
    program: "Information Technology",
    details: [
      "Relevant Courses: Web Development, ERP Systems, Internet of Things",
      "Final Project: iTrucking - Inventory Transfer System",
      "GPA: 3.45 / 4.00",
    ],
  },
  {
    year: "2018 – 2021",
    school: "SMK Ananda Mitra Industri Deltamas",
    program: "Mechanical Engineering",
    details: [
      "Relevant Courses: Lathe Machine, Welding, Grinding, Cutting",
      "Final Project: Standard Government Exam",
      "GPA: 8 / 10",
    ],
  },
];

const PROJECTS = [
  {
    year: "2025",
    name: "Bootcamp ERP with Epicor",
    org: "President University",
    bullets: [
      "Completed intensive bootcamp focused on Purchasing and Sales modules.",
      "Hands-on experience operating Epicor ERP.",
    ],
  },
  {
    year: "2024",
    name: "iTrucking - Management System",
    org: "President University",
    bullets: [
      "Inventory transfer system for goods and raw materials.",
      "IoT tracking device installed on delivery trucks.",
      "Assisted UI design and implementation.",
    ],
  },
  {
    year: "2024",
    name: "DEA Batch 2 (Digital Entrepreneurship Academy)",
    org: "BPPTIK Kementrian Kominfo",
    bullets: [
      "Managed attendance and participant data for Classes F and G.",
      "Handled data backup and communication between instructors and participants.",
    ],
  },
  {
    year: "2023",
    name: "Idle Endless Runner Game (Unity)",
    org: "President University",
    bullets: [
      "Designed visual effects and UI interfaces.",
      "Performed gameplay testing and polishing with the team.",
    ],
  },
  {
    year: "2022",
    name: "Food Ordering Website (PHP & MySQL)",
    org: "President University",
    bullets: [
      "Built front-end and back-end, hosted locally via XAMPP.",
      "Developed core features with guidance from tutorials.",
    ],
  },
];

const SKILLS = [
  "Front End Development",
  "SEO Optimization",
  "Research & Analytics",
  "ERP Data Entry",
  "Linux Administration",
  "Database Management",
];

const SECTION_LABELS = ["Intro", "Experience", "Projects", "Education", "Skills"];

// ── Small reusable components ─────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="block w-6 h-px bg-[#c8974a]" />
      <p className="uppercase text-[10px] tracking-[0.3em] text-[#9a7c5a] font-sans font-semibold">
        {children}
      </p>
    </div>
  );
}

function Card({ children, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-[#ede5d8] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {children}
    </motion.article>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1.5 mt-3">
      {items.map((line, i) => (
        <li key={i} className="flex gap-2 text-xs text-[#43382a] font-sans leading-relaxed">
          <span className="text-[#c8974a] shrink-0 mt-px">▸</span>
          {line}
        </li>
      ))}
    </ul>
  );
}

// ── Git commit calendar widget ──────────────────────────────────────────────
// __GIT_LOG__ and __GIT_LAST_DATE__ are injected by Vite at build/dev time
// from the real git log — no manual updates needed.
const COMMIT_LOG  = __GIT_LOG__;
const LAST_DATE   = __GIT_LAST_DATE__;

const CAL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CAL_DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Derive default month/year from the most recent commit date
function parseLastDate() {
  const keys = Object.keys(COMMIT_LOG).sort().reverse();
  if (!keys.length) return { y: new Date().getFullYear(), m: new Date().getMonth() };
  const [y, m] = keys[0].split("-").map(Number);
  return { y, m: m - 1 };
}

function CommitCalendar() {
  const [open, setOpen] = useState(false);
  const [cur, setCur]   = useState(parseLastDate);

  const firstDay    = new Date(cur.y, cur.m, 1).getDay();
  const daysInMonth = new Date(cur.y, cur.m + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const toKey = (d) =>
    `${cur.y}-${String(cur.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const prev = () => setCur(({ y, m }) => m === 0  ? { y: y - 1, m: 11 } : { y, m: m - 1 });
  const next = () => setCur(({ y, m }) => m === 11 ? { y: y + 1, m: 0  } : { y, m: m + 1 });

  const monthEntries = Object.entries(COMMIT_LOG).filter(([date]) => {
    const [y, m] = date.split("-").map(Number);
    return y === cur.y && m - 1 === cur.m;
  });
  const totalCommits = monthEntries.reduce((s, [, c]) => s + c.length, 0);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger — invisible bg, just the text with a subtle dotted underline */}
      <span className="text-xs text-[#9a7c5a] cursor-default border-b border-dotted border-[#c8974a]/50 pb-px">
        Updated {LAST_DATE}
      </span>

      {/* Calendar popup */}
      {open && (
        <div
          className="absolute bottom-full left-0 mb-2 z-50 w-56 rounded-2xl border border-[#e0d0bb] bg-[#fdfbf7] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-3 select-none"
          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-2.5">
            <button
              onClick={prev}
              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#f0e8da] text-[#9a7c5a] hover:text-[#c8974a] text-sm transition-colors"
            >‹</button>
            <span className="text-[11px] font-semibold text-[#3d3326]">
              {CAL_MONTHS[cur.m]} {cur.y}
            </span>
            <button
              onClick={next}
              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#f0e8da] text-[#9a7c5a] hover:text-[#c8974a] text-sm transition-colors"
            >›</button>
          </div>

          {/* Day-name row */}
          <div className="grid grid-cols-7 mb-1">
            {CAL_DAYS.map(d => (
              <div key={d} className="text-center text-[9px] text-[#b09a7a] font-semibold py-0.5">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const commits = COMMIT_LOG[toKey(day)];
              return (
                <div key={i} className="flex justify-center py-0.5">
                  <div className={`relative w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-medium transition-colors ${
                    commits
                      ? "bg-[#c8974a] text-white"
                      : "text-[#5a4e3c] hover:bg-[#f0e8da]"
                  }`}>
                    {day}
                    {commits && commits.length > 1 && (
                      <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#8a5e28] text-white text-[7px] rounded-full flex items-center justify-center font-bold">
                        {commits.length}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Commit list */}
          <div className="mt-2.5 pt-2 border-t border-[#ede5d8]">
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#b09a7a] mb-1.5">
              {totalCommits > 0 ? `${totalCommits} commits` : "No commits this month"}
            </p>
            {monthEntries.flatMap(([, commits]) =>
              commits.slice(0, 5).map((msg, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1">
                  <span className="w-1 h-1 mt-1 rounded-full bg-[#c8974a] shrink-0" />
                  <span className="text-[9px] text-[#5a4e3c] leading-tight line-clamp-1">{msg}</span>
                </div>
              ))
            )}
            {totalCommits > 5 && (
              <p className="text-[9px] text-[#b09a7a] italic">+{totalCommits - 5} more</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AppV2() {
  const scrollerRef = useRef(null);
  const dragStateRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const wheelStateRef = useRef({ rafId: 0, pending: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  // Detect desktop vs mobile/tablet
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body+html overflow on desktop; release on mobile so natural scroll works
  useEffect(() => {
    const html = document.documentElement;
    if (isDesktop) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isDesktop]);

  // Wheel → horizontal scroll (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const normalizeDelta = (e) => {
      let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (e.deltaMode === 1) d *= 16;
      if (e.deltaMode === 2) d *= window.innerHeight;
      return d;
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return;
      const d = normalizeDelta(e);
      if (d === 0) return;
      e.preventDefault();
      wheelStateRef.current.pending += d * 0.9;
      if (!wheelStateRef.current.rafId) {
        wheelStateRef.current.rafId = requestAnimationFrame(() => {
          scroller.scrollLeft += wheelStateRef.current.pending;
          wheelStateRef.current.pending = 0;
          wheelStateRef.current.rafId = 0;
        });
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      if (wheelStateRef.current.rafId) {
        cancelAnimationFrame(wheelStateRef.current.rafId);
        wheelStateRef.current.rafId = 0;
        wheelStateRef.current.pending = 0;
      }
    };
  }, [isDesktop]);

  // Track active section dot from scroll position
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !isDesktop) return;
    const onScroll = () => {
      const total = scroller.scrollWidth - scroller.clientWidth;
      const ratio = total > 0 ? scroller.scrollLeft / total : 0;
      const idx = Math.round(ratio * (SECTION_LABELS.length - 1));
      setActiveSection(idx);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  // Drag handlers
  const onDragStart = useCallback((clientX) => {
    const s = scrollerRef.current;
    if (!s) return;
    dragStateRef.current = { isDown: true, startX: clientX, scrollLeft: s.scrollLeft };
  }, []);
  const onDragMove = useCallback((clientX) => {
    const s = scrollerRef.current;
    if (!s || !dragStateRef.current.isDown) return;
    s.scrollLeft = dragStateRef.current.scrollLeft - (clientX - dragStateRef.current.startX) * 1.1;
  }, []);
  const onDragEnd = useCallback(() => { dragStateRef.current.isDown = false; }, []);

  const onKeyScroll = useCallback((e) => {
    const s = scrollerRef.current;
    if (!s) return;
    if (e.key === "ArrowRight") s.scrollLeft += 120;
    if (e.key === "ArrowLeft") s.scrollLeft -= 120;
  }, []);

  const scrollToSection = (idx) => {
    const s = scrollerRef.current;
    if (!s) return;
    const sectionW = s.scrollWidth / SECTION_LABELS.length;
    s.scrollTo({ left: idx * sectionW, behavior: "smooth" });
  };

  // Shared section class
  const sectionCls = isDesktop
    ? "shrink-0 flex flex-col justify-center px-10 xl:px-14 py-8"
    : "w-full px-5 sm:px-8 py-12";

  return (
    <div
      className={`v2-app bg-[#f7f4ee] text-[#101010] ${
        isDesktop ? "h-screen overflow-hidden flex flex-col" : "min-h-screen"
      }`}
    >
      {/* Scoped scrollbar styling */}
      <style>{`
        .v2-scroller::-webkit-scrollbar { width: 6px; height: 5px; }
        .v2-scroller::-webkit-scrollbar-track { background: #ede8df; }
        .v2-scroller::-webkit-scrollbar-thumb { background: #c5b59b; border-radius: 3px; }
        .v2-scroller::-webkit-scrollbar-thumb:hover { background: #a8916e; }
        .v2-app, .v2-app * { font-family: 'IBM Plex Sans', sans-serif !important; }
        .v2-app h1 { font-weight: 700; }
      `}</style>

      {/* ── Header ── */}
      {/* Header — right side intentionally empty (version button is fixed top-right via PortfolioSelector) */}
      <header className="shrink-0 w-full px-6 md:px-10 py-5">
        <span className="font-semibold text-sm tracking-wide">jimraihan.my.id</span>
      </header>

      {/* ── Scrollable area ── */}
      <div
        ref={scrollerRef}
        className={`v2-scroller ${
          isDesktop
            ? "flex flex-1 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
            : "flex flex-col overflow-x-hidden"
        }`}
        style={{ overscrollBehaviorX: "contain" }}
        onMouseDown={isDesktop ? (e) => onDragStart(e.pageX) : undefined}
        onMouseLeave={isDesktop ? onDragEnd : undefined}
        onMouseUp={isDesktop ? onDragEnd : undefined}
        onMouseMove={isDesktop ? (e) => onDragMove(e.pageX) : undefined}
        onTouchStart={(e) => onDragStart(e.touches[0]?.pageX ?? 0)}
        onTouchMove={(e) => onDragMove(e.touches[0]?.pageX ?? 0)}
        onTouchEnd={onDragEnd}
        onKeyDown={onKeyScroll}
        tabIndex={0}
      >

        {/* ── INTRO ── */}
        <section
          className={sectionCls}
          style={isDesktop ? { width: "88vw", maxWidth: "860px" } : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <SectionLabel>Career Flow</SectionLabel>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-[#0d0b08]">
              {PROFILE.name}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#4a4030] font-sans leading-relaxed">
              {PROFILE.role} &mdash; {PROFILE.location}
            </p>
            <p className="mt-3 text-sm text-[#5a4e3c] font-sans leading-relaxed max-w-lg">
              {PROFILE.about}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-xs font-sans border border-[#d4c4ad] bg-white/80 px-4 py-2.5 rounded-full text-[#4a4030] hover:border-[#c8974a] hover:text-[#c8974a] transition-colors duration-200"
              >
                {PROFILE.email}
              </a>
              <span className="text-xs font-sans border border-[#d4c4ad] bg-white/80 px-4 py-2.5 rounded-full text-[#4a4030]">
                {PROFILE.phone}
              </span>
            </div>
          </motion.div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          className={sectionCls}
          style={isDesktop ? { width: "92vw", maxWidth: "1100px" } : undefined}
        >
          <SectionLabel>Experience</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            {CAREER.map((item, idx) => (
              <Card key={`${item.org}-${idx}`} delay={idx * 0.08}>
                <span className="text-[10px] text-[#c8974a] uppercase tracking-[0.2em] font-sans font-semibold">
                  {item.year}
                </span>
                <h2 className="text-base font-bold mt-1.5 leading-snug">{item.title}</h2>
                <div className="text-xs text-[#6a5f4b] font-sans mt-0.5">
                  {item.org} &middot; {item.type}
                </div>
                <div className="text-[10px] text-[#8b7a64] font-sans mt-0.5">{item.location}</div>
                <BulletList items={item.bullets} />
              </Card>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section
          className={sectionCls}
          style={isDesktop ? { width: "90vw", maxWidth: "1060px" } : undefined}
        >
          <SectionLabel>Projects & Training</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((item, idx) => (
              <Card key={`${item.name}-${idx}`} delay={idx * 0.07}>
                <span className="text-[10px] text-[#c8974a] uppercase tracking-[0.2em] font-sans font-semibold">
                  {item.year}
                </span>
                <h3 className="text-sm font-bold mt-1.5 leading-snug">{item.name}</h3>
                <div className="text-xs text-[#6a5f4b] font-sans mt-0.5">{item.org}</div>
                <BulletList items={item.bullets} />
              </Card>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section
          className={sectionCls}
          style={isDesktop ? { width: "72vw", maxWidth: "800px" } : undefined}
        >
          <SectionLabel>Education</SectionLabel>
          <div className="grid gap-4">
            {EDUCATION.map((item, idx) => (
              <Card key={`${item.school}-${idx}`} delay={idx * 0.1}>
                <span className="text-[10px] text-[#c8974a] uppercase tracking-[0.2em] font-sans font-semibold">
                  {item.year}
                </span>
                <h3 className="text-base font-bold mt-1.5">{item.school}</h3>
                <div className="text-xs text-[#6a5f4b] font-sans mt-0.5">{item.program}</div>
                <BulletList items={item.details} />
              </Card>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section
          className={sectionCls}
          style={isDesktop ? { width: "58vw", maxWidth: "640px" } : undefined}
        >
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-wrap gap-2.5 mt-2">
            {SKILLS.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className="text-xs font-sans border border-[#d4c4ad] bg-white px-4 py-2.5 rounded-full text-[#3d3326] shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

      </div>

      {/* ── Footer / Nav ── */}
      <footer className="shrink-0 px-6 md:px-10 py-5 flex items-center justify-between">
        <CommitCalendar />

        {/* Section dot navigation — desktop only */}
        {isDesktop && (
          <div className="flex items-center gap-2.5">
            {SECTION_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollToSection(i)}
                title={label}
                className={`rounded-full transition-all duration-300 ${
                  activeSection === i
                    ? "w-6 h-2 bg-[#c8974a]"
                    : "w-2 h-2 bg-[#d4c4ad] hover:bg-[#b09a7a]"
                }`}
              />
            ))}
          </div>
        )}

        <span className="text-xs text-[#9a7c5a] font-sans">
          {isDesktop ? "Drag or scroll →" : "Scroll to explore"}
        </span>
      </footer>
    </div>
  );
}
