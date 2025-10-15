import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalShell from "../components/TerminalShell";
import MatrixBackground from "../components/MatrixBackground";

export default function App() {
  const [showConsole, setShowConsole] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setShowScrollTop(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-gray-200 font-sans overflow-x-hidden overflow-y-auto scroll-smooth">
      {/* === Background === */}
      <MatrixBackground />

      {/* === MAIN CONTENT === */}
      {!showConsole && (
        <div className="relative z-10 snap-y snap-proximity">
          {/* === HERO === */}
          <section className="snap-start h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-5xl md:text-7xl font-bold text-green-400 mb-3 drop-shadow-[0_0_12px_rgba(0,255,150,0.5)]"
            >
              Jim Raihan Gumay
            </motion.h1>
            <p className="text-gray-400 mb-10 max-w-xl">
              IT Helpdesk & Full-Stack Developer — passionate about systems,
              automation, and elegant design.
            </p>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowConsole(true)}
              className="flex items-center gap-2 border border-green-500 text-green-400 px-6 py-3 rounded-md bg-black/50 hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(0,255,100,0.4)] hover:shadow-[0_0_20px_rgba(0,255,150,0.7)]"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3214/3214765.png"
                alt="console"
                className="w-5 h-5"
              />
              Open Terminal
            </motion.button>
          </section>

          {/* === EXPERIENCE === */}
          <section className="snap-start min-h-screen flex flex-col items-center justify-center px-8 text-center space-y-10 bg-black/95 transition-all duration-1000">
            <h2 className="text-3xl font-semibold text-green-400 mb-4">
              Experience
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
              {[
                {
                  title: "IT Support",
                  company: "PT Hume Concrete Indonesia",
                  time: "Jun 2024 – Aug 2024",
                  desc: "Maintained IT infrastructure, supported hardware & network operations.",
                },
                {
                  title: "IT Admin Intern",
                  company: "BPPTIK Kominfo",
                  time: "Feb 2024 – Apr 2024",
                  desc: "Managed digital training systems and maintained databases efficiently.",
                },
                {
                  title: "SEO Web Intern",
                  company: "Kampus Dosen Jualan",
                  time: "Aug 2023 – Dec 2023",
                  desc: "Created SEO-focused content and optimized website visibility.",
                },
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/60 border border-green-800 p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,100,0.1)] hover:shadow-[0_0_25px_rgba(0,255,100,0.2)] transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-green-300">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-400">{exp.company}</p>
                  <p className="text-xs text-gray-500 mb-2">{exp.time}</p>
                  <p>{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* === CONTACT === */}
          <section className="snap-start h-screen flex flex-col items-center justify-center space-y-6 bg-black transition-all duration-1000">
            <h2 className="text-3xl font-semibold text-green-400 mb-2">
              Contact
            </h2>
            <div className="flex gap-6 flex-wrap justify-center">
              {[
                { img: "gmail.png", link: "mailto:raihangumay02@gmail.com" },
                { img: "github.png", link: "https://github.com/goemay" },
                { img: "linkedin.png", link: "https://linkedin.com/in/jim-raihan" },
              ].map((c, i) => (
                <motion.a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full w-16 h-16 flex items-center justify-center bg-black/60 border border-green-600 shadow-[0_0_15px_rgba(0,255,100,0.3)] hover:bg-green-500 transition-all duration-300"
                >
                  <img src={c.img} alt="icon" className="w-8 h-8" />
                </motion.a>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* === SCROLL TO TOP === */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-black px-4 py-2 rounded-full shadow-lg hover:bg-green-400 transition-all duration-300"
        >
          ↑
        </motion.button>
      )}

      {/* === TERMINAL === */}
      {showConsole && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-[90%] md:w-[70%] lg:w-[60%] border border-green-500 rounded-lg shadow-lg shadow-green-900/40">
            <button
              onClick={() => setShowConsole(false)}
              className="absolute top-2 right-3 text-green-400 hover:text-green-200"
            >
              ✕
            </button>
            <TerminalShell onShutdown={() => setShowConsole(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
