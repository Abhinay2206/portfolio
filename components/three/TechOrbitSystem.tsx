'use client';

import { useRef, useState, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Tech node data ─────────────────────────────── */
const TECH_NODES = [
  { name: 'React',       color: '#61DAFB', ring: 0, angle: 0 },
  { name: 'Node.js',    color: '#68A063', ring: 0, angle: Math.PI },
  { name: 'Next.js',    color: '#a5b4fc', ring: 1, angle: Math.PI / 3 },
  { name: 'TypeScript', color: '#3B82F6', ring: 1, angle: Math.PI + Math.PI / 3 },
  { name: 'MongoDB',    color: '#4ADE80', ring: 2, angle: Math.PI / 6 },
  { name: 'Python',     color: '#FCD34D', ring: 2, angle: Math.PI * 0.75 },
  { name: 'TensorFlow', color: '#FB923C', ring: 2, angle: Math.PI * 1.5 },
];

/* ─── Ring configurations ────────────────────────── */
const RINGS = [
  { radius: 3.2,  speed: 0.42,  euler: new THREE.Euler(Math.PI / 2, 0, 0) },
  { radius: 4.8,  speed: -0.30, euler: new THREE.Euler(Math.PI / 2 - 0.65, 0, Math.PI / 4) },
  { radius: 6.5,  speed: 0.22,  euler: new THREE.Euler(Math.PI / 2 + 0.55, 0, -Math.PI / 3.5) },
];

function posOnRing(angle: number, radius: number, euler: THREE.Euler) {
  return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0).applyEuler(euler);
}

/* ─── Ambient particles ──────────────────────────── */
const Particles = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array | null>(null);

  useEffect(() => {
    const arr = new Float32Array(600);
    for (let i = 0; i < 200; i++) {
      const r = 18 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    positions.current = arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  if (!positions.current) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} count={200} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#8b5cf6" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
};

/* ─── Orbiting tech node ─────────────────────────── */
const TechNode = ({ tech, isHovered, onHover }: {
  tech: typeof TECH_NODES[0];
  isHovered: boolean;
  onHover: (n: string | null) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef  = useRef<THREE.Mesh>(null);
  const ring     = RINGS[tech.ring];
  const angleRef = useRef(tech.angle);

  useFrame((_, dt) => {
    angleRef.current += dt * ring.speed;
    const p = posOnRing(angleRef.current, ring.radius, ring.euler);
    groupRef.current?.position.copy(p);
    if (meshRef.current) {
      const t = isHovered ? 1.6 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(t, t, t), 0.13);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.38, 12, 12]} />
        <meshBasicMaterial color={tech.color} transparent opacity={isHovered ? 0.25 : 0.1} />
      </mesh>
      {/* Core orb */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(tech.name); }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={isHovered ? 3 : 1.0}
          metalness={0.4}
          roughness={0.15}
        />
      </mesh>
      {/* Always-on label */}
      <Html center distanceFactor={12} position={[0, 0.52, 0]} style={{ pointerEvents: 'none' }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '9.5px',
          fontWeight: 600,
          color: tech.color,
          whiteSpace: 'nowrap',
          textShadow: `0 0 14px ${tech.color}cc`,
          letterSpacing: '0.04em',
          opacity: isHovered ? 1 : 0.8,
        }}>
          {tech.name}
        </span>
      </Html>
    </group>
  );
};

/* ─── Torus ring ─────────────────────────────────── */
const OrbitalRing = ({ i }: { i: number }) => {
  const { radius, euler } = RINGS[i];
  return (
    <mesh rotation={[euler.x, euler.y, euler.z]}>
      <torusGeometry args={[radius, 0.016, 8, 140]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.28} />
    </mesh>
  );
};

/* ─── Glowing central core ───────────────────────── */
const CenterCore = () => {
  const icoRef  = useRef<THREE.Mesh>(null);
  const glow1   = useRef<THREE.Mesh>(null);
  const glow2   = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.5;
      icoRef.current.rotation.x = t * 0.25;
    }
    if (glow1.current) glow1.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.07);
    if (glow2.current) glow2.current.scale.setScalar(1 + Math.sin(t * 1.2 + 1) * 0.05);
  });

  return (
    <group>
      {/* Outer soft glow */}
      <mesh ref={glow2}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#4c1d95" transparent opacity={0.06} />
      </mesh>
      {/* Mid glow */}
      <mesh ref={glow1}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.12} />
      </mesh>
      {/* Wireframe icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#1e0545"
          emissive="#8b5cf6"
          emissiveIntensity={0.9}
          metalness={0.98}
          roughness={0.02}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[0.74, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} />
      </mesh>
      {/* HTML label */}
      <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: '11px',
          letterSpacing: '0.18em',
          color: '#c4b5fd',
          textShadow: '0 0 20px rgba(139,92,246,1), 0 0 50px rgba(139,92,246,0.5)',
          userSelect: 'none',
        }}>
          AK
        </div>
      </Html>
    </group>
  );
};

/* ─── Mouse-driven camera shift ──────────────────── */
const CameraController = ({ mx, my }: { mx: number; my: number }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mx * 2.5 - camera.position.x) * 0.035;
    camera.position.y += (my * 1.8 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ─── Full scene ─────────────────────────────────── */
const Scene = ({ mx, my }: { mx: number; my: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[8, 8, 8]}   intensity={3}   color="#a78bfa" />
      <pointLight position={[-8, -6, -8]} intensity={1.2} color="#818cf8" />
      <pointLight position={[0, 0, 14]}   intensity={1}   color="#ffffff" />
      <CameraController mx={mx} my={my} />
      <Particles />
      {[0, 1, 2].map(i => <OrbitalRing key={i} i={i} />)}
      <CenterCore />
      {TECH_NODES.map(tech => (
        <TechNode key={tech.name} tech={tech} isHovered={hovered === tech.name} onHover={setHovered} />
      ))}
    </>
  );
};

/* ─── Export ─────────────────────────────────────── */
export const TechOrbitSystem = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: -((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  }, []);

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene mx={mouse.x} my={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechOrbitSystem;
