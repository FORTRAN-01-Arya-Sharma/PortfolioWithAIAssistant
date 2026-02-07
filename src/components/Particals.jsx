import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

export const Particles = ({
  className = "",
  quantity = 100,
  size = 0.4,
  color = "#ffffff",
  refresh = false, // 1. Destructure refresh so it doesn't go into ...props
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
    // Performance: Half the particles on mobile if not already handled
    const count = isMobile ? Math.min(30, quantity) : quantity; 

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
      if (!context.current || !containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      context.current.clearRect(0, 0, w, h);

      circles.current.forEach((c) => {
        c.x += c.dx; 
        c.y += c.dy;
        if (c.a < c.ta) c.a += 0.01;
        
        context.current.beginPath();
        context.current.arc(c.x, c.y, c.s, 0, Math.PI * 2);
        
        // Performance: Use the hex color passed in props instead of hardcoded white
        context.current.fillStyle = `${color}${Math.floor(c.a * 255).toString(16).padStart(2, '0')}`;
        context.current.fill();

        if (c.x < 0 || c.x > w || c.y < 0 || c.y > h) {
          c.x = Math.random() * w; 
          c.y = Math.random() * h; 
          c.a = 0;
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
    // 2. Add refresh to dependency array so it actually re-initializes if requested
  }, [quantity, size, color, refresh]);

  return (
    // 3. props no longer contains 'refresh', so the warning disappears
    <div className={twMerge("absolute inset-0 pointer-events-none", className)} ref={containerRef} {...props}>
      <canvas ref={canvasRef} />
    </div>
  );
};