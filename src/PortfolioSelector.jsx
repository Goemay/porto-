import React, { useState, useEffect, useRef } from "react";
import App from "./pages/App";
import AppV2 from "./v2/AppV2";

export default function PortfolioSelector() {
  const [version, setVersion] = useState(() => {
    // Always start on v2 on every load
    return "2.1.0";
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Only manage body overflow for v1 — v2 (AppV2) manages its own
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (version === "1.0.4") {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      body.style.height = "auto";
    }
    // v2: reset so AppV2's own useEffect can take control
    if (version === "2.1.0") {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.height = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.height = "";
    };
  }, [version]);

  const handleVersionChange = (v) => {
    setVersion(v);
    setIsOpen(false);
  };

  const isV1 = version === "1.0.4";

  return (
    <>
      {/* ── Version switcher — personality changes per version ── */}
      <div className="fixed bottom-4 right-4 md:bottom-auto md:top-4 md:right-4 z-50" ref={dropdownRef}>

        {/* Trigger button */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          title="Switch portfolio version"
          className={
            isV1
              ? // V1 CLI style — terminal prompt look
                "flex items-center gap-1.5 font-mono text-xs tracking-widest px-3 py-1.5 rounded border transition-all duration-200 bg-black text-green-400 border-green-600 shadow-[0_0_10px_rgba(0,255,100,0.15)] hover:shadow-[0_0_18px_rgba(0,255,100,0.35)] hover:border-green-400"
              : // V2 Modern style — clean warm pill
                "flex items-center gap-2 font-sans text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 bg-white/90 text-[#7a5c34] border-[#d9c9b0] shadow-sm hover:border-[#c8974a] hover:text-[#b07030] hover:shadow-md backdrop-blur-sm"
          }
        >
          {/* Icon/indicator */}
          {isV1 ? (
            <span className="text-green-600 select-none">{">"}</span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-[#c8974a] shrink-0" />
          )}

          {/* Version label */}
          <span>{version}</span>

          {/* Chevron */}
          <svg
            className={`w-2.5 h-2.5 opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={`absolute bottom-full right-0 mb-2 md:bottom-auto md:top-full md:mt-2 md:mb-0 min-w-[160px] overflow-hidden shadow-xl transition-all ${
              isV1
                ? "bg-[#030d03] border border-green-800 rounded"
                : "bg-white border border-[#e0d0bb] rounded-2xl"
            }`}
          >
            {/* V2 option */}
            <button
              onClick={() => handleVersionChange("2.1.0")}
              className={`w-full text-left px-4 py-3 text-xs transition-all border-b ${
                isV1
                  ? "font-mono border-green-900/50 text-gray-500 hover:text-green-400 hover:bg-green-950/40"
                  : `font-sans border-[#ede5d8] ${
                      version === "2.1.0"
                        ? "text-[#c8974a] bg-[#fdf6ec]"
                        : "text-[#6a5f4b] hover:bg-[#faf5ec]"
                    }`
              }`}
            >
              {isV1 ? (
                <span>
                  <span className="text-green-700">$</span> load{" "}
                  <span className="text-green-400">modern</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8974a] shrink-0" />
                  v2.1.0 — Modern
                </span>
              )}
            </button>

            {/* V1 option */}
            <button
              onClick={() => handleVersionChange("1.0.4")}
              className={`w-full text-left px-4 py-3 text-xs transition-all ${
                isV1
                  ? `font-mono ${
                      version === "1.0.4"
                        ? "text-green-400 bg-green-950/40"
                        : "text-gray-500 hover:text-green-400 hover:bg-green-950/40"
                    }`
                  : "font-sans text-[#6a5f4b] hover:bg-[#faf5ec]"
              }`}
            >
              {isV1 ? (
                <span>
                  <span className="text-green-700">$</span> load{" "}
                  <span className="text-green-400">cli</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  v1.0.4 — CLI
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Render selected version */}
      {isV1 ? <App /> : <AppV2 />}
    </>
  );
}
