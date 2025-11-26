import React from "react";
import { motion } from "framer-motion";

export default function AppV2() {
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl py-20"
      >
        <h1 className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Jim Raihan Gumay
        </h1>

        <div className="h-1 w-48 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>

        <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Software Engineer | Full-Stack Developer
        </p>

        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Passionate about building elegant solutions and creating beautiful digital experiences.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Projects
          </a>
          <a
            href="#"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 hover:shadow-lg transition-all duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="px-8 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 hover:shadow-lg transition-all duration-300"
          >
            Contact
          </a>
        </div>

        {/* Footer Info */}
        <div className="text-sm text-gray-500">
          <p>Welcome to my portfolio website</p>
          <p>Portfolio Version: 2.0.0</p>
        </div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}
