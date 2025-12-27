import { Canvas, useFrame } from "@react-three/fiber";
import { Astronaut } from "../components/Astronaut";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { useMediaQuery } from "react-responsive";
import * as easing from 'maath/easing';
import { Float } from "@react-three/drei"; 
import { Suspense } from "react";
import Loader from "../components/Loader"; // your custom one, not from drei

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        state.mouse.x / 10,
        1 + state.mouse.y / 10,
        3
      ],
      0.5,
      delta
    );
  });
}

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section 
      id="home" // <-- ID ADDED HERE
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0 w-full h-full z-1 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader/>}>
            <Float>         
              <Astronaut
                position={isMobile ? [0, -1.5, 0] : [0, -1.5, 0]}
                scale={isMobile ? 0.23 : 0.4}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;


