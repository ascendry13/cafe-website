import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { CoffeeCup } from './CoffeeCup';
import { SteamParticles } from './SteamParticles';
import { CoffeeBeans } from './CoffeeBeans';
import { AmbientDust } from './AmbientDust';
import { CameraRig } from './CameraRig';

interface SceneProps {
  reducedMotion?: boolean;
}

export const Scene: React.FC<SceneProps> = ({ reducedMotion = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const cupGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 2.2, isMobile ? 6.8 : 5.6], fov: 42 }}
        dpr={isMobile ? [1, 1.3] : [1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting Environment */}
          {/* Warm Ambient Sunlight */}
          <ambientLight intensity={0.8} color="#FFEED9" />

          {/* Key Warm Sunlight */}
          <directionalLight
            position={[5, 8, 4]}
            intensity={2.2}
            color="#FFF2DF"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={20}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
            shadow-bias={-0.0001}
          />

          {/* Caramel Rim Backlight */}
          <directionalLight
            position={[-4, 4, -4]}
            intensity={1.4}
            color="#C98B4B"
          />

          {/* Warm Foam Uplight Accent */}
          <pointLight
            position={[0, 2.8, 0.5]}
            intensity={1.2}
            distance={5}
            color="#FFE5B4"
          />

          {/* Ambient Dust Motes in Sunlight */}
          <AmbientDust count={isMobile ? 32 : 80} />

          {/* Dynamic 3D Objects Group */}
          <group ref={cupGroupRef} position={[isMobile ? 0 : 1.6, -0.5, 0]}>
            {/* The Stylized Procedural Porcelain Cup & Saucer with Latte Art */}
            <CoffeeCup pointerParallax={!reducedMotion && !isMobile} />

            {/* Rising Animated Steam Particles */}
            {!reducedMotion && <SteamParticles count={isMobile ? 18 : 36} />}

            {/* Orbiting Roasted Coffee Beans */}
            {!reducedMotion && <CoffeeBeans count={isMobile ? 5 : 9} />}
          </group>

          {/* Scroll Choreography Camera Controller */}
          <CameraRig
            cupGroupRef={cupGroupRef}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
