import React, { useState, useEffect } from "react";
import App from "./pages/App";
import AppV2 from "./v2/AppV2";

export default function PortfolioSelector() {
  const [version, setVersion] = useState(() => {
    // Load version from localStorage, default to newest version 2.0.0
    const saved = localStorage.getItem("portfolioVersion");
    // If nothing is saved, default to 2.0.0
    if (!saved) {
      localStorage.setItem("portfolioVersion", "2.0.0");
      return "2.0.0";
    }
    return saved;
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Save version preference
    localStorage.setItem("portfolioVersion", version);
  }, [version]);

  const handleVersionChange = (newVersion) => {
    setVersion(newVersion);
    setIsOpen(false);
  };

  return (
    <>
      {/* Version Dropdown - Fixed Position Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative inline-block">
          {/* Main Button - Theme changes based on current version */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              version === "1.0.4"
                ? "bg-black border border-green-500 text-green-400"
                : "bg-black border border-blue-500 text-blue-400"
            }`}
            title="Portfolio Version"
          >
            {version}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className={`absolute top-full right-0 mt-2 bg-black rounded-lg shadow-lg overflow-hidden min-w-max ${
              version === "1.0.4" 
                ? "border border-green-500" 
                : "border border-blue-500"
            }`}>
              <button
                onClick={() => handleVersionChange("2.0.0")}
                className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                  version === "2.0.0"
                    ? "bg-blue-500/20 text-blue-400 border-b border-blue-500"
                    : "text-gray-400 hover:bg-blue-500/10 border-b border-gray-700"
                }`}
              >
                v2.0.0 - Modern
              </button>
              <button
                onClick={() => handleVersionChange("1.0.4")}
                className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                  version === "1.0.4"
                    ? "bg-green-500/20 text-green-400"
                    : "text-gray-400 hover:bg-green-500/10"
                }`}
              >
                v1.0.4 - CLI
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render Selected Version */}
      {version === "1.0.4" ? <App /> : <AppV2 />}
    </>
  );
}
