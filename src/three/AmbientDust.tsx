import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AmbientDustProps {
  count?: number;
}

export const AmbientDust: React.FC<AmbientDustProps> = ({ count = 75 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, randomFactors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const factors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.3) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      factors[i * 3 + 0] = Math.random() * Math.PI * 2;
      factors[i * 3 + 1] = 0.5 + Math.random() * 0.8;
      factors[i * 3 + 2] = 0.003 + Math.random() * 0.006;
    }

    return { positions: pos, randomFactors: factors };
  }, [count]);

  const dustTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 230, 190, 0.9)');
    grad.addColorStop(0.3, 'rgba(230, 175, 110, 0.4)');
    grad.addColorStop(1, 'rgba(201, 139, 75, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = (geo.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const phase = randomFactors[idx + 0];
      const speed = randomFactors[idx + 2];

      // Subtle atmospheric Brownian float
      pos[idx + 0] += Math.sin(time * 0.6 + phase) * 0.002;
      pos[idx + 1] += Math.cos(time * 0.5 + phase) * 0.0025 + speed * 0.5;
      pos[idx + 2] += Math.sin(time * 0.4 + phase) * 0.002;

      // Wrap around vertical boundary
      if (pos[idx + 1] > 8) {
        pos[idx + 1] = -4;
      }
    }

    geo.attributes.position.needsUpdate = true;
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
        size={0.16}
        map={dustTexture}
        transparent={true}
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={new THREE.Color('#F5EBDD')}
      />
    </points>
  );
};
