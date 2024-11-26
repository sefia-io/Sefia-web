import React, { useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import styles from "./ConstellationBackground.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 100;
    const maxDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const update = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(255, 255, 255, ${1 - distance / maxDistance})`
                : `rgba(75, 85, 99, ${1 - distance / maxDistance})`; // gray-600
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === "dark"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(75, 85, 99, 0.8)"; // gray-600
        ctx.fill();
      });

      requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <div className={styles["particle-container"]}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default ConstellationBackground;
