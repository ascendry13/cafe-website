import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SteamParticlesProps {
  count?: number;
}

export const SteamParticles: React.FC<SteamParticlesProps> = ({ count = 36 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // 1. Procedural Soft Steam Puff Texture
  const steamTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 250, 245, 0.7)');
    grad.addColorStop(0.3, 'rgba(245, 235, 225, 0.45)');
    grad.addColorStop(0.7, 'rgba(235, 220, 205, 0.15)');
    grad.addColorStop(1, 'rgba(235, 220, 205, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 2. Initialize particle attributes
  const { positions, velocities, phases, originalAlphas } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const pha = new Float32Array(count);
    const alp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.95; // inside cup rim
      
      // Position: starts near cup liquid level (y = 1.6 to 2.0)
      pos[i * 3 + 0] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 1.6 + Math.random() * 2.5; // distributed along height
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Drift velocities
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = 0.012 + Math.random() * 0.014; // upward speed
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;

      pha[i] = Math.random() * Math.PI * 2;
      alp[i] = 0.2 + Math.random() * 0.4;
    }

    return {
      positions: pos,
      velocities: vel,
      phases: pha,
      originalAlphas: alp,
    };
  }, [count]);

  // 3. Update particle motion every frame
  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Upward drift
      pos[idx + 1] += velocities[idx + 1];

      // Gentle curling / sinusoidal turbulence
      pos[idx + 0] += Math.sin(time * 1.5 + phases[i]) * 0.004 + velocities[idx + 0];
      pos[idx + 2] += Math.cos(time * 1.2 + phases[i]) * 0.004 + velocities[idx + 2];

      // Respawn when reaching top
      if (pos[idx + 1] > 4.5) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.85;
        pos[idx + 0] = Math.cos(angle) * radius;
        pos[idx + 1] = 1.6 + Math.random() * 0.2;
        pos[idx + 2] = Math.sin(angle) * radius;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.65}
        map={steamTexture}
        transparent={true}
        opacity={0.38}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
        color={new THREE.Color('#FAF5EE')}
      />
    </points>
  );
};
