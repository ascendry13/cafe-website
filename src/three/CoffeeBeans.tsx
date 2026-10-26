import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface BeanData {
  radius: number;
  baseAngle: number;
  height: number;
  speed: number;
  floatFreq: number;
  floatAmp: number;
  scale: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
}

interface CoffeeBeansProps {
  count?: number;
}

export const CoffeeBeans: React.FC<CoffeeBeansProps> = ({ count = 9 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const beanRefs = useRef<(THREE.Mesh | null)[]>([]);

  // 1. Procedural 3D Coffee Bean Geometry with longitudinal center crease
  const beanGeometry = useMemo(() => {
    const geom = new THREE.SphereGeometry(0.28, 32, 32);
    // Scale sphere to oblong bean shape: elongated in Y, flattened in Z
    geom.scale(0.85, 1.4, 0.62);

    const pos = geom.attributes.position as THREE.BufferAttribute;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      vertex.fromBufferAttribute(pos, i);

      // On the front face (z > 0), create the iconic deep center crease
      if (vertex.z > 0.02) {
        // Center furrow
        const distFromCenter = Math.abs(vertex.x);
        const furrowWidth = 0.14;

        if (distFromCenter < furrowWidth) {
          const depthFactor = (1.0 - distFromCenter / furrowWidth);
          const yFade = Math.cos((vertex.y / 0.4) * Math.PI * 0.45);
          if (yFade > 0) {
            vertex.z -= 0.14 * depthFactor * yFade;
          }
        } else {
          // Slightly bulbous outer bean lobes
          vertex.z += 0.02 * Math.sin((distFromCenter / 0.25) * Math.PI);
        }
      }

      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geom.computeVertexNormals();
    return geom;
  }, []);

  // 2. Realistic Roasted Bean Material
  const beanMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#381E12'), // Dark roasted arabica
      roughness: 0.38,
      metalness: 0.08,
      bumpScale: 0.05,
    });
  }, []);

  // 3. Orbit & floating dynamics for each bean
  const beans = useMemo<BeanData[]>(() => {
    const list: BeanData[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        radius: 2.8 + (i % 3) * 0.7 + Math.random() * 0.4,
        baseAngle: (i / count) * Math.PI * 2,
        height: -0.4 + (i % 4) * 0.7 + (Math.random() - 0.5) * 0.3,
        speed: 0.22 + (i % 2 === 0 ? 0.06 : -0.04),
        floatFreq: 1.2 + Math.random() * 0.8,
        floatAmp: 0.08 + Math.random() * 0.06,
        scale: 0.85 + Math.random() * 0.35,
        rotSpeedX: 0.4 + Math.random() * 0.6,
        rotSpeedY: 0.5 + Math.random() * 0.5,
        rotSpeedZ: 0.3 + Math.random() * 0.4,
      });
    }
    return list;
  }, [count]);

  // 4. Update orbiting and tumbling in useFrame
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    beans.forEach((b, i) => {
      const mesh = beanRefs.current[i];
      if (!mesh) return;

      const currentAngle = b.baseAngle + t * b.speed;
      const x = Math.cos(currentAngle) * b.radius;
      const z = Math.sin(currentAngle) * b.radius;
      const y = b.height + Math.sin(t * b.floatFreq + i) * b.floatAmp;

      mesh.position.set(x, y, z);
      mesh.rotation.x += b.rotSpeedX * delta;
      mesh.rotation.y += b.rotSpeedY * delta;
      mesh.rotation.z += b.rotSpeedZ * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {beans.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            beanRefs.current[i] = el;
          }}
          geometry={beanGeometry}
          material={beanMaterial}
          scale={b.scale}
          castShadow
        />
      ))}
    </group>
  );
};
