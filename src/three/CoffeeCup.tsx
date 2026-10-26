import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createLatteArtTexture } from './LatteArt';

interface CoffeeCupProps {
  pointerParallax?: boolean;
}

export const CoffeeCup: React.FC<CoffeeCupProps> = ({ pointerParallax = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);

  // 1. Procedural LatheGeometry for Cup
  const { cupGeometry, coffeeDiskGeometry } = useMemo(() => {
    const points: THREE.Vector2[] = [];

    // Outer wall profile (from base center up to rim, then inside cavity down to bottom)
    // Base bottom center
    points.push(new THREE.Vector2(0.0, 0.0));
    points.push(new THREE.Vector2(0.85, 0.0));
    points.push(new THREE.Vector2(0.95, 0.1));
    points.push(new THREE.Vector2(1.05, 0.35));
    points.push(new THREE.Vector2(1.25, 0.8));
    points.push(new THREE.Vector2(1.48, 1.4));
    points.push(new THREE.Vector2(1.68, 2.0));
    points.push(new THREE.Vector2(1.82, 2.45));
    points.push(new THREE.Vector2(1.85, 2.5)); // outer lip top

    // Rounded lip
    points.push(new THREE.Vector2(1.83, 2.53));
    points.push(new THREE.Vector2(1.78, 2.54));
    points.push(new THREE.Vector2(1.72, 2.5)); // inner lip

    // Inner cavity profile
    points.push(new THREE.Vector2(1.65, 2.2));
    points.push(new THREE.Vector2(1.50, 1.6));
    points.push(new THREE.Vector2(1.30, 1.0));
    points.push(new THREE.Vector2(1.05, 0.45));
    points.push(new THREE.Vector2(0.80, 0.25));
    points.push(new THREE.Vector2(0.0, 0.25)); // inner floor center

    const cupGeom = new THREE.LatheGeometry(points, 64);
    cupGeom.computeVertexNormals();

    // Coffee surface disc (placed just below the inner lip at y = 2.25)
    const diskGeom = new THREE.CircleGeometry(1.65, 48);

    return { cupGeometry: cupGeom, coffeeDiskGeometry: diskGeom };
  }, []);

  // 2. Procedural Cup Handle
  const handleGeometry = useMemo(() => {
    // Elegant ergonomic D-shaped handle curving out from upper wall to lower wall
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.65, 2.05, 0),
      new THREE.Vector3(2.45, 2.15, 0),
      new THREE.Vector3(2.65, 1.5, 0),
      new THREE.Vector3(2.35, 0.85, 0),
      new THREE.Vector3(1.35, 0.75, 0),
    ]);
    return new THREE.TubeGeometry(curve, 36, 0.16, 16, false);
  }, []);

  // 3. Procedural Saucer Geometry
  const saucerGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.0, 0.0));
    points.push(new THREE.Vector2(1.1, 0.0));
    points.push(new THREE.Vector2(1.2, 0.08));
    points.push(new THREE.Vector2(1.35, 0.08)); // cup resting indentation
    points.push(new THREE.Vector2(1.7, 0.12));
    points.push(new THREE.Vector2(2.3, 0.28));
    points.push(new THREE.Vector2(2.8, 0.55));
    points.push(new THREE.Vector2(2.95, 0.65)); // saucer upturned rim
    points.push(new THREE.Vector2(2.9, 0.62));
    points.push(new THREE.Vector2(2.7, 0.45));
    points.push(new THREE.Vector2(2.2, 0.2));
    points.push(new THREE.Vector2(1.3, 0.04));
    points.push(new THREE.Vector2(0.0, 0.0));

    const saucer = new THREE.LatheGeometry(points, 64);
    saucer.computeVertexNormals();
    return saucer;
  }, []);

  // 4. Procedural Latte Art Texture
  const latteArtTexture = useMemo(() => createLatteArtTexture(), []);

  // 5. Materials
  const ceramicMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FAF5EE'), // Warm creamy ceramic
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });
  }, []);

  const goldTrimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C98B4B'),
      metalness: 0.85,
      roughness: 0.25,
    });
  }, []);

  const coffeeLiquidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: latteArtTexture,
      roughness: 0.35,
      metalness: 0.05,
    });
  }, [latteArtTexture]);

  // Gentle floating animation & mouse-parallax in useFrame
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (floatRef.current) {
      // Natural gentle breathing float
      floatRef.current.position.y = Math.sin(t * 1.6) * 0.07;
      floatRef.current.rotation.y = Math.sin(t * 0.7) * 0.06;
      floatRef.current.rotation.z = Math.cos(t * 1.2) * 0.02;
    }

    if (pointerParallax && groupRef.current) {
      // Smooth cursor parallax reaction
      const targetRotX = -state.pointer.y * 0.25;
      const targetRotY = state.pointer.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} castShadow receiveShadow>
      <group ref={floatRef}>
        {/* Saucer */}
        <mesh
          geometry={saucerGeometry}
          material={ceramicMaterial}
          position={[0, -0.15, 0]}
          castShadow
          receiveShadow
        />

        {/* Saucer Gold Rim Accent */}
        <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.82, 2.87, 48]} />
          <primitive object={goldTrimMaterial} attach="material" />
        </mesh>

        {/* Ceramic Cup Body */}
        <mesh
          geometry={cupGeometry}
          material={ceramicMaterial}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />

        {/* Cup Handle */}
        <mesh
          geometry={handleGeometry}
          material={ceramicMaterial}
          castShadow
          receiveShadow
        />

        {/* Cup Rim Gold Accent */}
        <mesh position={[0, 2.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.75, 1.83, 48]} />
          <primitive object={goldTrimMaterial} attach="material" />
        </mesh>

        {/* Coffee Liquid Surface with Latte Art */}
        <mesh
          geometry={coffeeDiskGeometry}
          material={coffeeLiquidMaterial}
          position={[0, 2.22, 0]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          receiveShadow
        />
      </group>
    </group>
  );
};
