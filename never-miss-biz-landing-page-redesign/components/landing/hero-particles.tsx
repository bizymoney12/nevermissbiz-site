"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  len: number;
  angle: number;
  speed: number;
  drift: number;
  opacity: number;
  gold: boolean;
}

/**
 * Slow-drifting signal-blip particle field for the hero background.
 * Replaces the old static floating-dot effect with a canvas-driven
 * field of thin streaks that gently rise and drift, matching the
 * NeverMissBiz gold/black brand.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;

    function makeParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        len: 6 + Math.random() * 14,
        angle: ((Math.random() * 40 - 20) * Math.PI) / 180,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.15,
        opacity: 0.08 + Math.random() * 0.22,
        gold: Math.random() < 0.4,
      };
    }

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      const count = Math.floor((width * height) / 9000);
      particles = Array.from({ length: count }, makeParticle);
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        const dx = Math.cos(p.angle) * p.len;
        const dy = Math.sin(p.angle) * p.len;
        ctx.beginPath();
        ctx.moveTo(p.x - dx / 2, p.y - dy / 2);
        ctx.lineTo(p.x + dx / 2, p.y + dy / 2);
        ctx.strokeStyle = p.gold
          ? `rgba(212,175,55,${p.opacity})`
          : `rgba(180,178,170,${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      frameId = requestAnimationFrame(tick);
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);
    init();
    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
