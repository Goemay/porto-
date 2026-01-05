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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start px-6 overflow-auto font-serif" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db #f3f4f6" }}>
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

      {/* Minimal header */}
      <header className="w-full max-w-6xl mx-auto py-6 flex items-center justify-between">
        <div className="text-lg font-bold">jimraihan.my.id</div>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#">Siapa Jim?</a>
          <a href="#">Portfolio</a>
        </nav>
      </header>

      {/* Main Content - light layout similar to screenshots */}
      <main className="site-inner w-full max-w-6xl mx-auto py-12 text-gray-900">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="px-4 md:px-0">
          <h1 className="text-5xl md:text-6xl font-black mb-2">Lorem ipsum dolor sit amet.</h1>
          <p className="text-gray-600 mb-6">-lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="flex items-center gap-3 text-sm text-blue-600">
            <span>😊</span>
            <a href="#" className="font-semibold">Jim Raihan</a>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="p-6">
              <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
              <div className="text-xs text-gray-500 mb-2">mm dd, yyyy</div>
              <h2 className="text-2xl font-bold mb-2">Lorem ipsum dolor sit amet.</h2>
              <p className="text-gray-600">jimraihan.my.id - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo ipsum quisquam earum, nemo pariatur?.</p>
              <a href="#" className="text-blue-600 mt-3 inline-block">Baca selengkapnya →</a>
            </article>

            <div className="h-40 bg-gray-200 rounded-md"></div>
          </div>

          {/* Experience timeline */}
          <section className="mt-20">
            <h3 className="text-xl font-bold mb-6">Experience</h3>
            <div className="space-y-6">
              {/* PT. CNAINDO TEKNOLOGI */}
              <div className="flex flex-col md:flex-row bg-white border rounded-md overflow-hidden shadow-sm">
                <div className="md:w-40 bg-gray-100 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">Logo</div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-sm text-gray-500">PT. CNAINDO TEKNOLOGI · Full-time</div>
                  <h4 className="font-semibold text-lg mt-1">Junior Software Engineer</h4>
                  <div className="text-xs text-gray-500 mt-1">Oct 2025 - Present · CEO SUITE, AXA Tower · Hybrid</div>
                  <p className="text-gray-700 mt-3">Linux, XML and other tools. Responsible for server administration, application development, automation and database management.</p>
                </div>
              </div>

              {/* hume concrete */}
              <div className="flex flex-col md:flex-row bg-white border rounded-md overflow-hidden shadow-sm">
                <div className="md:w-40 bg-gray-100 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">Logo</div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-sm text-gray-500">hume concrete · Internship</div>
                  <h4 className="font-semibold text-lg mt-1">IT Support (Intern)</h4>
                  <div className="text-xs text-gray-500 mt-1">May 2024 - Aug 2024 · Kecamatan Cikarang Selatan, West Java · On-site</div>
                  <ul className="list-disc list-inside text-gray-700 mt-3">
                    <li>Supported IT operations in administration division to ensure smooth daily technology use.</li>
                    <li>Assisted staff with hardware, software and network issues.</li>
                    <li>Maintained records and helped with data entry and documentation.</li>
                  </ul>
                </div>
              </div>

              {/* Kominfo */}
              <div className="flex flex-col md:flex-row bg-white border rounded-md overflow-hidden shadow-sm">
                <div className="md:w-40 bg-gray-100 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">Logo</div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-sm text-gray-500">Kominfo · Internship</div>
                  <h4 className="font-semibold text-lg mt-1">IT Training Administrator (Intern)</h4>
                  <div className="text-xs text-gray-500 mt-1">Feb 2024 - Apr 2024 · Bekasi, West Java · On-site</div>
                  <ul className="list-disc list-inside text-gray-700 mt-3">
                    <li>Managed social media and assisted administrative tasks for training classes.</li>
                    <li>Tracked attendance, processed participant data, and coordinated sessions.</li>
                    <li>Provided technical support for virtual meetings and live online sessions.</li>
                  </ul>
                </div>
              </div>

              {/* Kampus Dosen Jualan */}
              <div className="flex flex-col md:flex-row bg-white border rounded-md overflow-hidden shadow-sm">
                <div className="md:w-40 bg-gray-100 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">Logo</div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-sm text-gray-500">Kampus Dosen Jualan · Internship</div>
                  <h4 className="font-semibold text-lg mt-1">SEO Specialist | WEB Service (Intern)</h4>
                  <div className="text-xs text-gray-500 mt-1">Sep 2023 - Dec 2023 · Yogyakarta · On-site</div>
                  <ul className="list-disc list-inside text-gray-700 mt-3">
                    <li>Created SEO-optimized articles and published them on client websites.</li>
                    <li>Managed and updated website content, checked for broken links and layout issues.</li>
                    <li>Contributed to content strategy and improved client visibility.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Footer - modernized theme */}
        <footer className="mt-12 w-full bg-transparent text-gray-700 py-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="space-y-1">
                <div className="font-medium text-gray-800 text-sm">jimraihan.my.id</div>
                <p className="text-xs text-gray-500">A place where every word has power</p>
              </div>

              <div>
                <div className="font-medium text-gray-800 mb-2 text-sm">Menu</div>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><a href="#" className="inline-block transition-colors duration-150 hover:text-gray-800">Home</a></li>
                  <li><a href="#" className="inline-block transition-colors duration-150 hover:text-gray-800">About</a></li>
                  <li><a href="#" className="inline-block transition-colors duration-150 hover:text-gray-800">Portfolio</a></li>
                </ul>
              </div>

              <div>
                <div className="font-medium text-gray-800 mb-2 text-sm">Kontak</div>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><a href="mailto:raihangumay02@gmail.com" className="transition-colors duration-150 hover:text-gray-800">raihangumay02@gmail.com</a></li>
                  <li><a href="https://wa.me/082123207891" className="transition-colors duration-150 hover:text-gray-800">WhatsApp: +62 821-2320-7891</a></li>
                  <li><a href="https://github.com/Gomay" className="transition-colors duration-150 hover:text-gray-800">GitHub: github/Gomay</a></li>
                </ul>
              </div>

              <div>
                <div className="font-medium text-gray-800 mb-2 text-sm">Kategori</div>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>Teknologi</li>
                  <li>Desain</li>
                  <li>Lifestyle</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                <div>© {new Date().getFullYear()} jimraihan.my.id. All rights reserved.</div>
                <div className="text-right">Version {version}</div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* background removed for clean light layout */}
    </div>
  );
}
