"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle cinematic parallax on desktop
  const handleMouseMove = (e) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / centerX,
      y: (clientY - centerY) / centerY,
    });
  };

  // Scroll down smoothly to next section
  const handleScrollToContent = () => {
    const nextSection = document.getElementById("foundations-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Rising golden celestial embers/particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle pool
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      maxOpacity: Math.random() * 0.7 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      growing: Math.random() > 0.5,
    }));

    // Pause when hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = () => {
      if (isVisible && ctx && canvas.width && canvas.height) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.y -= p.speedY;
          p.x += p.speedX;

          if (p.growing) {
            p.opacity += p.pulseSpeed;
            if (p.opacity >= p.maxOpacity) p.growing = false;
          } else {
            p.opacity -= p.pulseSpeed;
            if (p.opacity <= 0.1) p.growing = true;
          }

          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 118, ${p.opacity})`;
          ctx.shadowColor = "rgba(139, 106, 69, 0.45)";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={styles.heroWrapper}
      onMouseMove={handleMouseMove}
      aria-label="About Antidote Movement Hero"
    >
      {/* Divine Atmospheric Radiance */}
      <div className={styles.divineAura} aria-hidden="true" />

      {/* Floating Celestial Particles */}
      <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />

      {/* Living Crosses with Trailing Fading Ends (Echoing the handwritten sketch) */}
      <svg
        className={styles.crossesSvg}
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -6}px, 0)`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <defs>
          {/* Fading Horizontal Line Gradients */}
          <linearGradient id="line-h-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="8%" stopColor="#8B6A45" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#C9A876" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#8B6A45" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line-h-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="12%" stopColor="#8B6A45" stopOpacity="0.35" />
            <stop offset="48%" stopColor="#C9A876" stopOpacity="0.85" />
            <stop offset="88%" stopColor="#8B6A45" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line-h-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="16%" stopColor="#8B6A45" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#C9A876" stopOpacity="0.9" />
            <stop offset="92%" stopColor="#8B6A45" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line-h-4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="22%" stopColor="#8B6A45" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#C9A876" stopOpacity="0.85" />
            <stop offset="88%" stopColor="#8B6A45" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line-h-base" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="25%" stopColor="#8B6A45" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#C9A876" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          {/* Fading Vertical Cross Line Gradients */}
          <linearGradient id="line-v-tall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="10%" stopColor="#8B6A45" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#C9A876" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#8B6A45" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line-v-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="15%" stopColor="#8B6A45" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#C9A876" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#8B6A45" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line-v-short" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6A45" stopOpacity="0" />
            <stop offset="20%" stopColor="#C9A876" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#8B6A45" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </linearGradient>

          {/* Glowing Radial Node Gradient */}
          <radialGradient id="node-radiance" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#C9A876" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#8B6A45" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B6A45" stopOpacity="0" />
          </radialGradient>

          {/* Soft Filter Glow */}
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. TOP HORIZONTAL CROSSBAR (Sketch Tier 1: Horizontal line + Left Cross + Right Cross) */}
        <line
          x1="60"
          y1="100"
          x2="1380"
          y2="100"
          stroke="url(#line-h-1)"
          className={`${styles.crossLine} ${styles.crossLineHorizontal}`}
          filter="url(#glow-filter)"
        />
        {/* Shimmer light gliding through top crossbar */}
        <line
          x1="60"
          y1="100"
          x2="1380"
          y2="100"
          className={styles.lineShimmer}
          strokeWidth="3"
        />

        {/* Sketch: Prominent Vertical Cross Stem (Left) */}
        <line
          x1="360"
          y1="25"
          x2="360"
          y2="360"
          stroke="url(#line-v-tall)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
          filter="url(#glow-filter)"
        />
        {/* Glowing Node at Intersection (360, 100) */}
        <circle cx="360" cy="100" r="16" fill="url(#node-radiance)" className={styles.crossGlowNode} />
        <circle cx="360" cy="100" r="3.5" fill="#8B6A45" />

        {/* Sketch: Upper Right Vertical Cross Stem */}
        <line
          x1="1080"
          y1="35"
          x2="1080"
          y2="280"
          stroke="url(#line-v-mid)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
          filter="url(#glow-filter)"
        />
        <circle cx="1080" cy="100" r="13" fill="url(#node-radiance)" className={styles.crossGlowNode} />
        <circle cx="1080" cy="100" r="3" fill="#8B6A45" />

        {/* 2. SECOND HORIZONTAL LINE (Sketch Tier 2) */}
        <line
          x1="40"
          y1="200"
          x2="1400"
          y2="200"
          stroke="url(#line-h-2)"
          className={`${styles.crossLine} ${styles.crossLineHorizontal}`}
        />
        {/* Leftmost Cross Stem (Sketch far-left line) */}
        <line
          x1="170"
          y1="120"
          x2="170"
          y2="520"
          stroke="url(#line-v-tall)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
          filter="url(#glow-filter)"
        />
        <circle cx="170" cy="200" r="14" fill="url(#node-radiance)" className={styles.crossGlowNode} />
        <circle cx="170" cy="200" r="3" fill="#8B6A45" />

        {/* Mid-Right Cross Stem */}
        <line
          x1="880"
          y1="130"
          x2="880"
          y2="360"
          stroke="url(#line-v-short)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
        />
        <circle cx="880" cy="200" r="11" fill="url(#node-radiance)" className={styles.crossGlowNode} />

        {/* 3. THIRD HORIZONTAL LINE (Sketch Tier 3: Midground) */}
        <line
          x1="100"
          y1="310"
          x2="1340"
          y2="310"
          stroke="url(#line-h-3)"
          className={`${styles.crossLine} ${styles.crossLineHorizontal}`}
        />
        <line
          x1="100"
          y1="310"
          x2="1340"
          y2="310"
          className={styles.lineShimmer}
          strokeWidth="2.6"
        />
        {/* Center-Right Vertical Cross (Sketch "We" area) */}
        <line
          x1="560"
          y1="220"
          x2="560"
          y2="480"
          stroke="url(#line-v-mid)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
          filter="url(#glow-filter)"
        />
        <circle cx="560" cy="310" r="14" fill="url(#node-radiance)" className={styles.crossGlowNode} />
        <circle cx="560" cy="310" r="3" fill="#8B6A45" />

        {/* 4. FOURTH HORIZONTAL LINE (Sketch Tier 4: Lower-Mid) */}
        <line
          x1="60"
          y1="430"
          x2="1380"
          y2="430"
          stroke="url(#line-h-4)"
          className={`${styles.crossLine} ${styles.crossLineHorizontal}`}
        />
        {/* Lower-Right Cross Stem (Sketch "Are" cross) */}
        <line
          x1="960"
          y1="350"
          x2="960"
          y2="610"
          stroke="url(#line-v-tall)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
          filter="url(#glow-filter)"
        />
        <circle cx="960" cy="430" r="15" fill="url(#node-radiance)" className={styles.crossGlowNode} />
        <circle cx="960" cy="430" r="3.5" fill="#8B6A45" />

        {/* 5. BASE HORIZONTAL GROUND LINE WITH LOWER CROSSES */}
        <line
          x1="40"
          y1="560"
          x2="680"
          y2="560"
          stroke="url(#line-h-base)"
          className={`${styles.crossLine} ${styles.crossLineHorizontal}`}
        />
        <line
          x1="110"
          y1="500"
          x2="110"
          y2="630"
          stroke="url(#line-v-short)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
        />
        <circle cx="110" cy="560" r="9" fill="url(#node-radiance)" className={styles.crossGlowNode} />

        <line
          x1="1140"
          y1="560"
          x2="1420"
          y2="560"
          stroke="url(#line-h-base)"
          className={`${styles.crossLine} ${styles.crossLineHorizontal}`}
        />
        <line
          x1="1280"
          y1="510"
          x2="1280"
          y2="630"
          stroke="url(#line-v-short)"
          className={`${styles.crossLine} ${styles.crossLineVertical}`}
        />
        <circle cx="1280" cy="560" r="9" fill="url(#node-radiance)" className={styles.crossGlowNode} />
      </svg>

      {/* Worshipping Figures & Creatives Flanking the Stage (Center Completely Clear) */}
      <div
        className={styles.figuresContainer}
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * -5}px, ${mousePos.y * -3}px, 0)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* 1. Lead Vocalist with Microphone (Far Left Flank) */}
        <div className={`${styles.figureWrapper} ${styles.figureSinger}`}>
          <svg viewBox="0 0 160 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-singer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A876" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#8B6A45" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            {/* Natural anatomical head tilted upward in praise */}
            <path
              d="M78 44 C82 32 94 28 106 32 C116 36 120 48 116 60 C112 70 102 74 92 72 C82 70 76 56 78 44 Z"
              fill="url(#grad-singer)"
            />
            {/* Elegant neck & shoulders */}
            <path d="M88 68 C86 76 90 84 92 88 L114 122 L64 122 L74 86 Z" fill="url(#grad-singer)" />
            {/* Hand holding microphone */}
            <path
              d="M112 118 C124 104 128 82 120 66 C116 58 108 64 112 70 C116 78 118 90 108 110 Z"
              fill="url(#grad-singer)"
            />
            {/* Microphone */}
            <ellipse cx="114" cy="54" rx="4.5" ry="6.5" fill="#C9A876" />
            <line x1="114" y1="60" x2="118" y2="78" stroke="#8B6A45" strokeWidth="2.2" />
            {/* Left arm extended in worship */}
            <path
              d="M66 122 C48 114 32 98 22 84 C18 78 22 74 28 78 C38 86 52 102 70 116 Z"
              fill="url(#grad-singer)"
            />
            {/* Flowing garment */}
            <path
              d="M64 122 C58 180 50 250 38 340 L138 340 C128 250 120 180 114 122 Z"
              fill="url(#grad-singer)"
            />
          </svg>
        </div>

        {/* 2. Worshipper with Raised Hand (Mid Left Flank) */}
        <div className={`${styles.figureWrapper} ${styles.figureWorshipperFarLeft}`}>
          <svg viewBox="0 0 140 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-worship-l" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A876" stopOpacity="0.75" />
                <stop offset="40%" stopColor="#8B6A45" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Head */}
            <circle cx="72" cy="58" r="12" fill="url(#grad-worship-l)" />
            {/* Torso */}
            <path d="M66 70 L78 70 L90 112 L54 112 Z" fill="url(#grad-worship-l)" />
            {/* Body */}
            <path d="M54 112 C46 175 38 245 30 320 L112 320 C104 245 98 175 90 112 Z" fill="url(#grad-worship-l)" />
            {/* Raised Hand */}
            <path
              d="M82 110 C96 78 108 42 116 16 C120 10 114 6 108 10 C98 28 88 66 76 106 Z"
              fill="url(#grad-worship-l)"
            />
          </svg>
        </div>

        {/* 3. Acoustic Guitarist (Inner Left Flank - Worship Minstrel) */}
        <div className={`${styles.figureWrapper} ${styles.figureGuitarist}`}>
          <svg viewBox="0 0 180 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-guitarist" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#8B6A45" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="guitar-wood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A876" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#8B6A45" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            {/* Head in gentle contemplation */}
            <path
              d="M88 48 C86 36 96 28 106 30 C116 32 122 42 120 54 C118 64 108 70 98 70 C90 70 88 60 88 48 Z"
              fill="url(#grad-guitarist)"
            />
            {/* Torso & Shoulders */}
            <path d="M94 68 L108 68 L124 116 L74 116 Z" fill="url(#grad-guitarist)" />
            <path d="M74 116 C66 180 56 260 46 350 L144 350 C134 260 126 180 120 116 Z" fill="url(#grad-guitarist)" />

            {/* Acoustic Guitar Body */}
            <path
              d="M74 145 C60 130 46 148 50 168 C54 184 40 198 44 220 C48 244 78 254 98 248 C118 242 126 220 122 202 C118 184 124 168 118 152 C110 134 88 134 74 145 Z"
              fill="url(#guitar-wood)"
              stroke="#5A4333"
              strokeWidth="1.4"
            />
            {/* Rosette & Soundhole */}
            <circle cx="84" cy="188" r="11" fill="#3A2E26" />
            <circle cx="84" cy="188" r="13" stroke="#C9A876" strokeWidth="1" fill="none" />
            {/* Neck */}
            <path d="M90 148 L148 94 L154 102 L96 156 Z" fill="#5A4333" stroke="#C9A876" strokeWidth="0.8" />
            <polygon points="148,94 160,82 166,88 154,102" fill="#3A2E26" />
            {/* Fretting arm */}
            <path d="M120 114 C138 102 152 94 156 100 C152 106 138 118 118 126 Z" fill="url(#grad-guitarist)" />
            {/* Strumming arm */}
            <path d="M78 116 C68 144 78 178 86 188 C90 184 84 158 86 124 Z" fill="url(#grad-guitarist)" />
          </svg>
        </div>

        {/* 4. Worshipper with Arms Uplifted in Deep Adoration (Inner Right Flank) */}
        <div className={`${styles.figureWrapper} ${styles.figureWorshipperCenterRight}`}>
          <svg viewBox="0 0 190 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-worship-r" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#8B6A45" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            {/* Head tilted back toward heaven */}
            <circle cx="95" cy="54" r="14" fill="url(#grad-worship-r)" />
            <circle cx="95" cy="54" r="22" fill="#C9A876" opacity="0.2" />
            {/* Torso */}
            <path d="M88 68 L102 68 L118 114 L72 114 Z" fill="url(#grad-worship-r)" />
            <path d="M72 114 C62 190 48 268 36 360 L156 360 C144 268 130 190 118 114 Z" fill="url(#grad-worship-r)" />
            {/* Left Arm raised to the Lord */}
            <path
              d="M74 114 C56 78 38 38 28 14 C24 8 30 4 36 6 C48 22 62 64 82 108 Z"
              fill="url(#grad-worship-r)"
            />
            {/* Right Arm raised to the Lord */}
            <path
              d="M116 114 C134 78 152 38 162 14 C166 8 160 4 154 6 C142 22 128 64 108 108 Z"
              fill="url(#grad-worship-r)"
            />
          </svg>
        </div>

        {/* 5. Keyboardist / Pianist (Mid Right Flank) */}
        <div className={`${styles.figureWrapper} ${styles.figureKeyboardist}`}>
          <svg viewBox="0 0 190 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-keys" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A876" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#8B6A45" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            {/* Head focused over instrument */}
            <circle cx="92" cy="56" r="13" fill="url(#grad-keys)" />
            {/* Torso */}
            <path d="M86 70 L100 70 L112 116 L72 116 Z" fill="url(#grad-keys)" />
            <path d="M72 116 C66 185 60 260 52 340 L132 340 C124 260 118 185 112 116 Z" fill="url(#grad-keys)" />
            {/* Arms at keyboard */}
            <path d="M74 116 C68 140 85 162 108 166 L124 166 C114 146 112 132 110 116 Z" fill="url(#grad-keys)" />
            {/* Keyboard & Stand */}
            <rect x="52" y="162" width="112" height="9" rx="2" fill="#3A2E26" />
            <rect x="56" y="160" width="104" height="3.5" fill="#F4F3F0" />
            <line x1="64" y1="171" x2="50" y2="340" stroke="#5A4333" strokeWidth="2.2" />
            <line x1="152" y1="171" x2="166" y2="340" stroke="#5A4333" strokeWidth="2.2" />
          </svg>
        </div>

        {/* 6. Praise Dancer / Creative Movement (Far Right Flank) */}
        <div className={`${styles.figureWrapper} ${styles.figurePraiseDancer}`}>
          <svg viewBox="0 0 170 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-dancer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#8B6A45" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3A2E26" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Head arched gracefully */}
            <circle cx="82" cy="52" r="12" fill="url(#grad-dancer)" />
            {/* Dynamic arched body */}
            <path
              d="M78 64 C85 92 82 125 72 160 C64 220 52 280 38 340 L128 340 C116 280 106 220 96 160 C90 125 88 92 85 64 Z"
              fill="url(#grad-dancer)"
            />
            {/* Sweeping dynamic arms in worship */}
            <path
              d="M80 120 C58 92 44 48 38 36 C32 30 40 26 46 30 C60 45 74 80 85 115 Z"
              fill="url(#grad-dancer)"
            />
            <path
              d="M94 118 C114 88 132 46 140 34 C146 28 152 32 148 38 C138 55 122 88 102 120 Z"
              fill="url(#grad-dancer)"
            />
            {/* Flowing praise ribbon */}
            <path
              d="M38 34 C74 14 130 24 146 36 C155 24 122 10 84 8 C52 6 34 20 38 34 Z"
              fill="#C9A876"
              opacity="0.45"
            />
          </svg>
        </div>
      </div>

      {/* Atmospheric Bottom Blend to ground figures seamlessly into next section */}
      <div className={styles.bottomBlendGradient} aria-hidden="true" />

      {/* Foreground Editorial Hero Content (100% Unobstructed Sanctuary) */}
      <div className={styles.heroContent}>
        {/* "WHO WE ARE" Tapestry - Directly echoing user's sketch */}
        <div className={styles.whoWeAreTapestry}>
          <div className={styles.whoWordItem}>
            <span className={styles.whoWordText}>WHO</span>
            <svg className={styles.whoCrossAccent} viewBox="0 0 12 16" fill="none">
              <line x1="6" y1="0" x2="6" y2="16" stroke="var(--color-bronze)" strokeWidth="1.8" />
              <line x1="1" y1="5" x2="11" y2="5" stroke="var(--color-bronze)" strokeWidth="1.8" />
            </svg>
          </div>

          <div className={styles.whoLineConnector} />

          <div className={styles.whoWordItem}>
            <span className={styles.whoWordText}>WE</span>
            <svg className={styles.whoCrossAccent} viewBox="0 0 12 16" fill="none">
              <line x1="6" y1="0" x2="6" y2="16" stroke="var(--color-bronze)" strokeWidth="1.8" />
              <line x1="1" y1="5" x2="11" y2="5" stroke="var(--color-bronze)" strokeWidth="1.8" />
            </svg>
          </div>

          <div className={styles.whoLineConnector} />

          <div className={styles.whoWordItem}>
            <span className={styles.whoWordText}>ARE</span>
            <svg className={styles.whoCrossAccent} viewBox="0 0 12 16" fill="none">
              <line x1="6" y1="0" x2="6" y2="16" stroke="var(--color-bronze)" strokeWidth="1.8" />
              <line x1="1" y1="5" x2="11" y2="5" stroke="var(--color-bronze)" strokeWidth="1.8" />
            </svg>
          </div>
        </div>

        {/* Majestic Editorial Title */}
        <h1 className={`${styles.heroTitle} font-editorial`}>Antidote</h1>

        {/* Slogan / Mission Lead */}
        <p className={styles.heroLead}>The cure the world needs.</p>

        {/* Theological Declaration Pill Badge */}
        <div className={styles.theologicalDeclaration}>
          <span className={styles.pillCrossIcon}>†</span>
          <span className={styles.pillText}>Jesus is the Antidote</span>
        </div>

        {/* Guide / Explore Button to anchor interaction */}
        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.scrollGuideBtn}
            onClick={handleScrollToContent}
            aria-label="Scroll down to view vision, mission, and goals"
          >
            Explore Foundations
            <span className={`material-symbols-outlined ${styles.scrollIcon}`}>
              expand_more
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
