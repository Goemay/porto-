import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AppV2() {
  const [version, setVersion] = useState(() => {
    try {
      return localStorage.getItem("portfolioVersion") || "2.0.7";
    } catch (e) {
      return "2.0.7";
    }
  });

  const [horizontalMode, setHorizontalMode] = useState(() => {
    try {
      return localStorage.getItem("horizontalMode") === "true";
    } catch (e) {
      return false;
    }
  });

  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);

  useEffect(() => {
    // apply/remove body class for horizontal mode
    if (horizontalMode) {
      document.body.classList.add("horizontal-mode");
    } else {
      document.body.classList.remove("horizontal-mode");
    }
    try {
      localStorage.setItem("horizontalMode", horizontalMode ? "true" : "false");
    } catch (e) {}
  }, [horizontalMode]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolioVersion", version);
    } catch (e) {}
  }, [version]);

  const toggleHorizontal = () => {
    setHorizontalMode((v) => !v);
  };

  const handleVersionChange = (newVersion) => {
    setVersion(newVersion);
    setVersionDropdownOpen(false);
    try {
      localStorage.setItem("portfolioVersion", newVersion);
    } catch (e) {}
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 overflow-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db #f3f4f6" }}>
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      {/* Header with horizontal toggle only */}
      <header className="w-full max-w-6xl mx-auto py-4 flex justify-end items-center gap-4">
        <button onClick={toggleHorizontal} className={`px-3 py-2 rounded-lg border ${horizontalMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
          {horizontalMode ? 'Disable Horizontal' : 'Enable Horizontal'}
        </button>
      </header>

      {/* Main Content - sections will sit side-by-side when horizontalMode is enabled */}
      <div className="site-inner w-full max-w-6xl mx-auto py-8">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left p-8"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Jim Raihan Gumay
            </h1>

            <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-purple-600 mb-6 rounded-full"></div>

            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Software Engineer | Full-Stack Developer</p>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">Passionate about building elegant solutions and creating beautiful digital experiences.</p>
            <div className="flex gap-4">
              <a href="#" className="px-6 py-2 bg-blue-600 text-white rounded">Projects</a>
              <a href="#" className="px-6 py-2 bg-purple-600 text-white rounded">About</a>
            </div>
          </motion.div>
        </section>

        <section>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">About / CV</h2>
            <p className="text-gray-700">This section can contain your detailed CV and other content. When horizontal mode is enabled, sections will appear side-by-side and the page will scroll horizontally.</p>
          </div>
        </section>

        <section>
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3">Contact & Footer</h2>
            <p className="text-gray-700">Email: raihangumay02@gmail.com</p>
          </div>
        </section>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}
