import React from "react";
import { motion } from "framer-motion";

export default function AppV2() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db #f3f4f6" }}>
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

      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">
            Jim.my.id
          </div>
          <div className="flex gap-8 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Siapa Jim?</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Portfolio</a>
            <button className="text-gray-700 hover:text-blue-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Lorem ipsum dolor sit amet.
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            -lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          </p>
          <p className="text-xl text-gray-700 mb-4">
            😊 <span className="text-blue-600 font-semibold">Jim Raihan</span>
          </p>
        </motion.div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm text-gray-500 mb-2">mm dd, yyyy</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-gray-600 mb-4">
              Jim.my.id – Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo ipsum quisquam earum, nemo pariatur?.
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">
              Baca selengkapnya →
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-200 h-80 rounded-lg overflow-hidden"
          >
            <img 
              src="https://via.placeholder.com/500x400?text=Featured+Article" 
              alt="Featured"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tambah Blok experience disini  */}
          {[1, 2].map((item) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-gray-300 h-48"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">PT.xx {item}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Judul {item}
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Quisque nisl eros,
                </p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">
                  Baca selengkapnya →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Jim.my.id</h3>
              <p className="text-gray-400">A place where every word has power</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:jim@my.id" className="hover:text-white transition">Email</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategori</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Teknologi</a></li>
                <li><a href="#" className="hover:text-white transition">Desain</a></li>
                <li><a href="#" className="hover:text-white transition">Lifestyle</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Jim.my.id. All rights reserved. | Version 2.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
