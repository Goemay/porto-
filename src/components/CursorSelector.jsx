import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorSelector({ currentType, onChange }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      // To adjust position:
      // "bottom-[16px]" moves it up/down (increase to go up, decrease to go down)
      // "left-[200px]" moves it left/right (increase to move right away from the text)
      className="fixed bottom-[16px] left-[200px] z-[99999] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center">
        {/* Main Button */}
        <button 
          title="Select Cursor"
          className="w-7 h-7 rounded-full bg-[#fdfbf7] border border-[#e0d0bb] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center hover:bg-[#f0e8da] transition-colors cursor-pointer text-[#9a7c5a]"
        >
          {currentType === 'dot' ? (
            <div className="w-2 h-2 rounded-full bg-[#c8974a]" />
          ) : (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="M13 13l6 6" />
            </svg>
          )}
        </button>

        {/* Dropdown Options */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, x: -5, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-full ml-1.5 flex gap-1.5 bg-[#fdfbf7] border border-[#e0d0bb] rounded-full p-1 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            >
              <button
                onClick={() => onChange('default')}
                title="Default Cursor"
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  currentType === 'default' ? 'bg-[#f0e8da] text-[#c8974a]' : 'text-[#b09a7a] hover:bg-[#faf5ec]'
                }`}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                  <path d="M13 13l6 6" />
                </svg>
              </button>
              <button
                onClick={() => onChange('dot')}
                title="Dot Cursor"
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  currentType === 'dot' ? 'bg-[#f0e8da]' : 'hover:bg-[#faf5ec]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${currentType === 'dot' ? 'bg-[#c8974a]' : 'bg-[#b09a7a]'}`} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
