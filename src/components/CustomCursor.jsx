import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth movement
  const springConfigBig = { damping: 25, stiffness: 200, mass: 0.5 };
  const bigCursorX = useSpring(cursorX, springConfigBig);
  const bigCursorY = useSpring(cursorY, springConfigBig);

  // The small cursor moves faster
  const springConfigSmall = { damping: 30, stiffness: 500, mass: 0.1 };
  const smallCursorX = useSpring(cursorX, springConfigSmall);
  const smallCursorY = useSpring(cursorY, springConfigSmall);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Scale up when hovering over interactive elements
      const isHoverable = e.target.closest('a, button, input, textarea, [role="button"], .hoverable, .cursor-pointer');
      setIsHovering(!!isHoverable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If on a touch device, hide the cursor component
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <style>{`
        /* Hide default cursor globally */
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Big Ball */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center drop-shadow-md"
        style={{
          x: bigCursorX,
          y: bigCursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="12" strokeWidth="1.5" stroke="rgba(0,0,0,0.15)" fill="#f7f8fa" />
        </svg>
      </motion.div>

      {/* Small Ball */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center drop-shadow-sm"
        style={{
          x: smallCursorX,
          y: smallCursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" strokeWidth="1" stroke="rgba(0,0,0,0.2)" fill="#c8974a" />
        </svg>
      </motion.div>
    </>
  );
}
