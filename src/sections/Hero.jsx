import { Canvas, useFrame } from "@react-three/fiber";
import { Astronaut } from "../components/Astronaut";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { useMediaQuery } from "react-responsive";
import * as easing from 'maath/easing';
import { Float, PerspectiveCamera } from "@react-three/drei"; 
import { Suspense } from "react";

function Rig() {
  useFrame((state, delta) => {
    // Desktop mouse movement restored
    if (window.innerWidth > 1024) {
      easing.damp3(
        state.camera.position,
        [state.mouse.x * 0.7, 1 + state.mouse.y * 0.3, 5.5],
        0.4,
        delta
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
}

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Full-width Background */}
      <ParallaxBackground />

      {/* Hero Text centered over everything */}
      <div className="z-20 pointer-events-none text-center">
        <HeroText />
      </div>
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <Canvas 
          dpr={isMobile ? 1 : [1, 2]} 
          gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 1, 5.5]} fov={isMobile ? 50 : 35} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>         
              <Astronaut
                // Position and Scale adjusted for perfect visibility
                position={isMobile ? [0, -1.2, 0] : [0, -2.2, 0]}
                scale={isMobile ? 0.3 : 0.65} 
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;