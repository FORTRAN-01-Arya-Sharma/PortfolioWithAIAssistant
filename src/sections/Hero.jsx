import React, { Suspense, lazy } from "react";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { useMediaQuery } from "react-responsive";

// LAZY LOAD the heavy 3D scene
const AstronautScene = lazy(() => import("../components/AstronautScene"));

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <ParallaxBackground />

      <div className="z-20 pointer-events-none text-center">
        <HeroText />
      </div>
      
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
           <AstronautScene isMobile={isMobile} />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;