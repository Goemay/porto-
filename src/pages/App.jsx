import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TerminalShell from "../components/TerminalShell";
import MatrixBackground from "../components/MatrixBackground";

// ── Static data ───────────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    title: "Junior Software Engineer",
    company: "PT Cnaindo TCT",
    time: "Oct 2025 – Present",
    desc: "Server administration and application development. Automation and database management for internal tools. Working with Linux and XML workflows.",
  },
  {
    title: "IT Support – Administration Division",
    company: "PT Hume Concrete Indonesia",
    time: "Jun 2024 – Aug 2024",
    desc: "Supported IT operations for daily administration work. Helped staff resolve hardware, software, and network issues.",
  },
  {
    title: "IT Training Administrator",
    company: "BPPTIK Kementrian Kominfo",
    time: "Feb 2024 – Apr 2024",
    desc: "Managed social media and administrative tasks for training classes. Handled attendance tracking and participant data processing.",
  },
  {
    title: "SEO Content & Optimization",
    company: "Kampus Dosen Jualan",
    time: "Aug 2023 – Dec 2023",
    desc: "Created SEO articles and published content on client websites. Improved client visibility with consistent content strategy.",
  },
];

const CONTACTS = [
  { Icon: MdEmail,    link: "mailto:raihangumay02@gmail.com", label: "Email"    },
  { Icon: FaGithub,   link: "https://github.com/Goemay",      label: "GitHub"   },
  { Icon: FaLinkedin, link: "https://linkedin.com/in/jim-raihan", label: "LinkedIn" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showConsole, setShowConsole]   = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-gray-200 font-sans overflow-x-hidden overflow-y-auto scroll-smooth">
      <MatrixBackground />

      {/* ── Main scrollable content ── */}
      {!showConsole && (
        <div className="relative z-10 snap-y snap-proximity">

          {/* ── HERO ── */}
          <section className="snap-start h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-green-700 font-mono text-xs tracking-[0.35em] uppercase mb-5"
            >
              &gt; portfolio.exe — loading...
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-green-400 mb-4 drop-shadow-[0_0_14px_rgba(0,255,150,0.55)]"
            >
              Jim Raihan Gumay
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-gray-400 mb-10 max-w-lg leading-relaxed"
            >
              Junior Software Engineer &amp; Full-Stack Developer —{" "}
              passionate about systems, automation, and elegant design.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setShowConsole(true)}
              className="flex items-center gap-2.5 border border-green-600 text-green-400 px-7 py-3 rounded-md bg-black/50 hover:bg-green-500 hover:text-black hover:border-green-400 transition-all duration-300 shadow-[0_0_14px_rgba(0,255,100,0.35)] hover:shadow-[0_0_24px_rgba(0,255,150,0.7)] font-mono text-sm tracking-wide"
            >
              <span className="text-green-600 select-none">$</span>
              open_terminal
            </motion.button>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.2, delay: 1.8, repeat: Infinity }}
              className="absolute bottom-10 flex flex-col items-center gap-1 text-green-800 text-xs font-mono pointer-events-none"
            >
              <span>scroll to explore</span>
              <span className="text-base">↓</span>
            </motion.div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section className="snap-start min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-20 bg-black/95">
            <h2 className="text-2xl font-semibold text-green-400 mb-10 font-mono tracking-wide">
              <span className="text-green-800">// </span>experience
            </h2>

            <div className="grid sm:grid-cols-2 gap-5 max-w-5xl w-full">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.title + i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/60 border border-green-900 p-6 rounded-xl text-left shadow-[0_0_18px_rgba(0,255,100,0.05)] hover:border-green-700 hover:shadow-[0_0_22px_rgba(0,255,100,0.14)] transition-all duration-300"
                >
                  <p className="text-[10px] text-green-700 font-mono tracking-[0.2em] uppercase mb-2">
                    {exp.time}
                  </p>
                  <h3 className="text-base font-semibold text-green-300 mb-0.5">{exp.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{exp.company}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section className="snap-start h-screen flex flex-col items-center justify-center space-y-6 bg-black px-6">
            <h2 className="text-2xl font-semibold text-green-400 font-mono tracking-wide">
              <span className="text-green-800">// </span>contact
            </h2>
            <p className="text-gray-600 text-xs font-mono text-center">
              raihangumay02@gmail.com &nbsp;·&nbsp; (+62) 821 2320 7891
            </p>

            <div className="flex gap-8 flex-wrap justify-center mt-2">
              {CONTACTS.map(({ Icon, link, label }, i) => (
                <motion.a
                  key={label}
                  href={link}
                  target={link.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  whileHover={{ scale: 1.18, y: -5, transition: { type: "spring", stiffness: 420, damping: 14 } }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                  className="flex flex-col items-center gap-2.5 group"
                >
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-black/60 border border-green-900 shadow-[0_0_12px_rgba(0,255,100,0.15)] group-hover:border-green-500 group-hover:shadow-[0_0_28px_rgba(0,255,100,0.4)] group-hover:bg-green-950 transition-all duration-300">
                    <Icon size={26} className="text-green-500 group-hover:text-green-300 transition-colors duration-200" />
                  </div>
                  <span className="text-[11px] text-green-800 font-mono group-hover:text-green-400 transition-colors duration-200 tracking-widest uppercase">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* ── Scroll-to-top ── */}
      <AnimatePresence>
        {showScrollTop && !showConsole && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-16 right-6 z-50 bg-green-950 border border-green-800 text-green-500 px-3 py-1.5 rounded-full text-xs font-mono hover:border-green-600 hover:text-green-300 transition-all duration-300 shadow-[0_0_10px_rgba(0,255,100,0.2)]"
          >
            ↑ top
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Terminal — full-screen immersive ── */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black"
          >
            <TerminalShell onShutdown={() => setShowConsole(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
