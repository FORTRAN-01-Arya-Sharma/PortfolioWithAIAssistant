"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

export function Globe({ className }) {
  let phi = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    let width = 0;
    // PERFORMANCE: Check for mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: isMobile ? 1 : 2, // PERFORMANCE: Lower res on mobile
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 0.4,
      mapSamples: isMobile ? 3000 : 6000, // PERFORMANCE: Reduced dots (Big Score Boost)
      mapBrightness: 1.2,
      baseColor: [0.223, 1, 0.078],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
      ],
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Guaranteed visibility
    if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
    }

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs]);

  return (
    <div className={twMerge("mx-auto aspect-[1/1] w-full max-w-[600px] flex items-center justify-center", className)}>
      <canvas
        className="size-[20rem] sm:size-[25rem] md:size-[30rem] transition-opacity duration-500 [contain:layout_paint_size] opacity-0"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}