import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CameraRigProps {
  cupGroupRef: React.RefObject<THREE.Group | null>;
  isMobile: boolean;
  reducedMotion: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  cupGroupRef,
  isMobile,
  reducedMotion,
}) => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useEffect(() => {
    if (reducedMotion) return;

    // Monitor overall page scroll progress using ScrollTrigger
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const p = scrollProgress.current;
    const pointer = state.pointer;

    // Responsive camera and cup choreography
    // p thresholds based on actual page layout:
    // Hero: 0.0 -> 0.18
    // About: 0.18 -> 0.38
    // Menu: 0.38 -> 0.62
    // Gallery & Testimonials: 0.62 -> 0.82
    // Reservation & Footer: 0.82 -> 1.0

    let camX = 0;
    let camY = isMobile ? 1.8 : 2.4;
    let camZ = isMobile ? 9.6 : 7.2;

    let cupX = isMobile ? 0 : 2.4;
    let cupY = isMobile ? -1.25 : -0.5;
    let cupZ = 0;
    let cupScale = isMobile ? 0.62 : 0.88;

    let cupRotX = isMobile ? 0.42 : 0.32;
    let cupRotY = 0;
    let cupRotZ = 0;

    let lookX = isMobile ? 0 : 0.6;
    let lookY = isMobile ? 0.2 : 1.1;

    if (!reducedMotion) {
      if (p < 0.18) {
        // Stage 1: Hero
        const t = p / 0.18;
        camX = THREE.MathUtils.lerp(0, isMobile ? 0 : -0.4, t);
        camY = THREE.MathUtils.lerp(isMobile ? 1.8 : 2.4, isMobile ? 2.6 : 3.2, t);
        camZ = THREE.MathUtils.lerp(isMobile ? 9.6 : 7.2, isMobile ? 8.6 : 6.4, t);

        cupX = THREE.MathUtils.lerp(isMobile ? 0 : 2.4, isMobile ? 0 : 2.0, t);
        cupY = THREE.MathUtils.lerp(isMobile ? -1.25 : -0.5, isMobile ? -0.9 : -0.3, t);
        cupRotX = THREE.MathUtils.lerp(isMobile ? 0.42 : 0.32, 0.62, t);
        cupRotY = THREE.MathUtils.lerp(0, Math.PI * 0.35, t);
        lookY = THREE.MathUtils.lerp(isMobile ? 0.2 : 1.1, 1.2, t);
      } else if (p < 0.38) {
        // Stage 2: About Story (top-isometric latte art view beside the text)
        const t = (p - 0.18) / 0.20;
        camX = THREE.MathUtils.lerp(isMobile ? 0 : -0.4, isMobile ? 0 : 0.6, t);
        camY = THREE.MathUtils.lerp(isMobile ? 2.6 : 3.2, isMobile ? 3.4 : 3.8, t);
        camZ = THREE.MathUtils.lerp(isMobile ? 8.6 : 6.4, isMobile ? 8.8 : 6.6, t);

        cupX = THREE.MathUtils.lerp(isMobile ? 0 : 2.0, isMobile ? 0 : 3.2, t);
        cupY = THREE.MathUtils.lerp(isMobile ? -0.9 : -0.3, isMobile ? -1.4 : -0.8, t);
        cupRotX = THREE.MathUtils.lerp(0.62, 0.45, t);
        cupRotY = THREE.MathUtils.lerp(Math.PI * 0.35, Math.PI * 0.9, t);
        lookX = THREE.MathUtils.lerp(isMobile ? 0 : 0.6, isMobile ? 0 : 0.2, t);
      } else if (p < 0.65) {
        // Stage 3: Signature Menu (Cup moves to far right/down so menu cards and tabs are 100% unobstructed)
        const t = (p - 0.38) / 0.27;
        camX = THREE.MathUtils.lerp(isMobile ? 0 : 0.6, 0, t);
        camY = THREE.MathUtils.lerp(isMobile ? 3.4 : 3.8, isMobile ? 2.6 : 2.4, t);
        camZ = THREE.MathUtils.lerp(isMobile ? 8.8 : 6.6, isMobile ? 9.6 : 7.6, t);

        cupX = THREE.MathUtils.lerp(isMobile ? 0 : 3.2, isMobile ? 0 : 5.8, t);
        cupY = THREE.MathUtils.lerp(isMobile ? -1.4 : -0.8, isMobile ? -3.5 : -2.6, t);
        cupRotX = THREE.MathUtils.lerp(0.45, 0.22, t);
        cupRotY = THREE.MathUtils.lerp(Math.PI * 0.9, Math.PI * 1.6, t);
        lookX = 0;
        lookY = 0.8;
      } else if (p < 0.82) {
        // Stage 4: Gallery & Testimonials
        const t = (p - 0.65) / 0.17;
        camX = 0;
        camY = isMobile ? 2.4 : 2.4;
        camZ = isMobile ? 9.4 : 7.2;

        cupX = THREE.MathUtils.lerp(isMobile ? 0 : 5.8, isMobile ? 0 : 3.4, t);
        cupY = THREE.MathUtils.lerp(isMobile ? -3.5 : -2.6, isMobile ? -1.6 : -1.0, t);
        cupRotX = 0.25;
        cupRotY = THREE.MathUtils.lerp(Math.PI * 1.6, Math.PI * 2.0, t);
        lookX = 0;
        lookY = 0.8;
      } else {
        // Stage 5: Reservation & Footer (warm settled evening rest)
        const t = (p - 0.82) / 0.18;
        camX = 0;
        camY = isMobile ? 2.2 : 2.2;
        camZ = isMobile ? 9.2 : 6.8;

        cupX = isMobile ? 0 : 2.8;
        cupY = isMobile ? -1.4 : -0.6;
        cupRotX = 0.22;
        cupRotY = THREE.MathUtils.lerp(Math.PI * 2.0, Math.PI * 2.4, t);
        lookX = 0;
        lookY = 1.0;
      }
    }

    // Add gentle pointer parallax to camera
    const parallaxX = pointer.x * (isMobile ? 0.1 : 0.35);
    const parallaxY = pointer.y * (isMobile ? 0.1 : 0.25);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, camX + parallaxX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camY + parallaxY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 3.5, delta);

    targetLookAt.current.set(lookX, lookY, 0);
    currentLookAt.current.lerp(targetLookAt.current, delta * 3.5);
    camera.lookAt(currentLookAt.current);

    // Apply smooth position, scale and rotation to the cup group
    if (cupGroupRef.current) {
      cupGroupRef.current.position.x = THREE.MathUtils.damp(cupGroupRef.current.position.x, cupX, 3.5, delta);
      cupGroupRef.current.position.y = THREE.MathUtils.damp(cupGroupRef.current.position.y, cupY, 3.5, delta);
      cupGroupRef.current.position.z = THREE.MathUtils.damp(cupGroupRef.current.position.z, cupZ, 3.5, delta);

      cupGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(cupGroupRef.current.scale.x, cupScale, 3.5, delta)
      );

      cupGroupRef.current.rotation.x = THREE.MathUtils.damp(cupGroupRef.current.rotation.x, cupRotX, 3.5, delta);
      cupGroupRef.current.rotation.y = THREE.MathUtils.damp(cupGroupRef.current.rotation.y, cupRotY, 3.5, delta);
      cupGroupRef.current.rotation.z = THREE.MathUtils.damp(cupGroupRef.current.rotation.z, cupRotZ, 3.5, delta);
    }
  });

  return null;
};
