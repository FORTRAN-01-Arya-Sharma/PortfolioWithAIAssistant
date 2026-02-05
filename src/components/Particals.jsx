import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

export const Particles = ({
  className = "",
  quantity = 100,
  size = 0.4,
  color = "#ffffff",
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const rafID = useRef(null);

  useEffect(() => {
    if (canvasRef.current) context.current = canvasRef.current.getContext("2d");
    
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 30 : quantity; // Drastically reduce only on mobile

    const initCanvas = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvasRef.current.width = w * dpr;
      canvasRef.current.height = h * dpr;
      canvasRef.current.style.width = `${w}px`;
      canvasRef.current.style.height = `${h}px`;
      context.current.scale(dpr, dpr);

      circles.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 2 + size,
        a: 0,
        ta: Math.random() * 0.6 + 0.1,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
      }));
    };

    const animate = () => {
      if (!context.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      context.current.clearRect(0, 0, w, h);

      circles.current.forEach((c) => {
        c.x += c.dx; c.y += c.dy;
        if (c.a < c.ta) c.a += 0.01;
        context.current.beginPath();
        context.current.arc(c.x, c.y, c.s, 0, Math.PI * 2);
        context.current.fillStyle = `rgba(255, 255, 255, ${c.a})`;
        context.current.fill();

        if (c.x < 0 || c.x > w || c.y < 0 || c.y > h) {
          c.x = Math.random() * w; c.y = Math.random() * h; c.a = 0;
        }
      });
      rafID.current = requestAnimationFrame(animate);
    };

    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
      cancelAnimationFrame(rafID.current);
    };
  }, [quantity]);

  return (
    <div className={twMerge("absolute inset-0 pointer-events-none", className)} ref={containerRef} {...props}>
      <canvas ref={canvasRef} />
    </div>
  );
};