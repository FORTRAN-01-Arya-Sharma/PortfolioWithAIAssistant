import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMotionValue, useSpring } from 'motion/react';
import * as THREE from 'three';

export function Astronaut(props) {
  const group = useRef();
  
  // 1. Optimization: Enable Draco (use 'true' as 2nd arg)
  // This will work perfectly with the compressed model we discussed.
  const { nodes, materials, animations } = useGLTF('/models/tenhun_falling_spaceman_fanart-v1.glb', true);
  const { actions } = useAnimations(animations, group);
  const { viewport } = useThree();

  // 2. Responsive logic (Kept exactly as you liked)
  const responsivePosition = useMemo(() => {
    if (viewport.width < 6) return [0.1, -1.6, 0];   
    if (viewport.width < 10) return [1.5, -1.5, 0];    
    return [1.5, -1, 0];                             
  }, [viewport.width]);

  const responsiveScale = useMemo(() => {
    if (viewport.width < 6) return 0.18; 
    if (viewport.width < 10) return 0.20; 
    return 0.206;                          
  }, [viewport.width]);

  // 3. Texture Optimization (Stops mobile lag without changing animation)
  useEffect(() => {
    if (materials['AstronautFallingTexture.png']) {
      const tex = materials['AstronautFallingTexture.png'];
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 0; 
      tex.needsUpdate = true;
    }
  }, [materials]);

  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // --- START: PROTECTED FALLING ANIMATION ---
  // Keeping your exact logic for the "Fast quick falling ripple" feel
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, {
    stiffness: 100, // You can tweak these two numbers if you want it even faster
    damping: 10     // but keeping standard spring feel for now
  });

  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });
  // --- END: PROTECTED FALLING ANIMATION ---

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[-Math.PI / 2, -0.2, 2.2]}
      scale={responsiveScale}
      position={responsivePosition}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="Root">
            <group name="metarig">
              <primitive object={nodes.metarig_rootJoint} />
              
              {/* Mapping meshes is faster for React than 10 separate tags */}
              {[
                'Cube001_0', 'Cube005_0', 'Cube002_0', 'Plane_0', 
                'Cube008_0', 'Cube004_0', 'Cube003_0', 'Cube_0', 
                'Cube009_0', 'Cube011_0'
              ].map((name) => (
                <skinnedMesh
                  key={name}
                  name={name}
                  geometry={nodes[name].geometry}
                  material={materials['AstronautFallingTexture.png']}
                  skeleton={nodes[name].skeleton}
                  // Optimization: Disable shadows to help mobile performance score
                  castShadow={false}
                  receiveShadow={false}
                />
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// 4. Preload ensures the browser starts the download earlier
useGLTF.preload('/models/tenhun_falling_spaceman_fanart-v1.glb');