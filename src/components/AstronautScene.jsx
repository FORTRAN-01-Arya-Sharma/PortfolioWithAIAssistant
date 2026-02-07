import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { Astronaut } from "./Astronaut";
import * as easing from 'maath/easing';
import { Suspense } from "react";

function Rig() {
  useFrame((state, delta) => {
    if (window.innerWidth > 1024) {
      easing.damp3(state.camera.position, [state.mouse.x * 0.7, 1 + state.mouse.y * 0.3, 5.5], 0.4, delta);
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
}

export default function AstronautScene({ isMobile }) {
  return (
    <Canvas 
      dpr={isMobile ? 1 : [1, 2]} 
      gl={{ antialias: false, powerPreference: "high-performance" }} // Antialias off for speed
      camera={{ position: [0, 1, 5.5], fov: isMobile ? 50 : 35 }}
    >
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>         
          <Astronaut
            position={isMobile ? [0, -1.2, 0] : [0, -2.2, 0]}
            scale={isMobile ? 0.3 : 0.65} 
          />
        </Float>
        <Rig />
      </Suspense>
    </Canvas>
  );
}