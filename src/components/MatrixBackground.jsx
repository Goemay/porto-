// src/MatrixBackground.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MatrixBackground() {
  const canvasRef = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0);
    let frameId;

    // ===== Matrix Rain Animation =====
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.floor(Math.random() * 10);
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const fade = Math.max(0, 1 - y / (height / 1.3));
        ctx.fillStyle = `rgba(0,255,100,${fade})`;
        ctx.fillText(text, x, y);
        if (y > height / 1.2 && Math.random() > 0.95) drops[i] = 0;
        else drops[i] += 2.5;
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();

    // ===== Resize Handler =====
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // ===== Scroll Fade Effect (fast, direct DOM update) =====
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fade = Math.max(0, 1 - scrollY / (window.innerHeight * 0.5)); // faster fade
      if (blurRef.current) {
        blurRef.current.style.opacity = fade.toFixed(2);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Matrix Canvas */}
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Glass Blur - fades on scroll */}
      <div
        ref={blurRef}
        className="fixed top-0 left-0 right-0 h-[40vh] z-[1] backdrop-blur-[3px] transition-opacity duration-500 ease-in-out"
        style={{
          background: "rgba(255,255,255,0.02)",
          opacity: 0.9,
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%)",
        }}
      />
    </>
  );
}
