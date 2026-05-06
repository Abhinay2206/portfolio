'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  proficiency: number;
  experience: string;
}

interface SkillOrbitGraphProps {
  skills: { [category: string]: Skill[] };
}

const CATEGORY_CONFIG: Record<string, { radius: number; height: number; color: string; speed: number; label: string }> = {
  Frontend:       { radius: 3.0, height: 0.9, color: '#a78bfa', speed: 0.38,  label: 'Frontend' },
  Backend:        { radius: 4.6, height: 0.4, color: '#60a5fa', speed: -0.28, label: 'Backend' },
  Languages:      { radius: 6.2, height: 0.0, color: '#34d399', speed: 0.22,  label: 'Languages' },
  MachineLearning:{ radius: 7.8, height: -0.4,color: '#fbbf24', speed: -0.16, label: 'ML / AI' },
};

// Skill node that orbits its ring
const SkillNode = ({ skill, category, index, total }: {
  skill: Skill;
  category: string;
  index: number;
  total: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.Frontend;
  const angleRef = useRef((index / total) * Math.PI * 2);
  const size = skill.proficiency >= 90 ? 0.28 : skill.proficiency >= 70 ? 0.22 : 0.17;

  useFrame((_, delta) => {
    angleRef.current += delta * cfg.speed;
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(angleRef.current) * cfg.radius,
        cfg.height,
        Math.sin(angleRef.current) * cfg.radius,
      );
    }
    if (meshRef.current) {
      const t = hovered ? 1.4 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(t, t, t), 0.12);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={cfg.color}
          emissive={cfg.color}
          emissiveIntensity={hovered ? 2.5 : 0.7}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Skill name always visible */}
      <Html center distanceFactor={14} position={[0, size + 0.2, 0]} style={{ pointerEvents: 'none' }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '9px',
          fontWeight: 600,
          color: cfg.color,
          whiteSpace: 'nowrap',
          textShadow: `0 0 8px ${cfg.color}80`,
          letterSpacing: '0.02em',
        }}>
          {skill.name}
        </span>
      </Html>

      {/* Hover tooltip */}
      {hovered && (
        <Html center distanceFactor={10} position={[0, -size - 0.4, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            backgroundColor: 'rgba(0,0,0,0.92)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '11px',
            border: `1px solid ${cfg.color}50`,
            boxShadow: `0 0 20px ${cfg.color}30`,
            whiteSpace: 'nowrap',
          }}>
            <div style={{ fontWeight: 700 }}>{skill.name}</div>
            <div style={{ color: cfg.color, marginTop: 3, fontSize: '10px' }}>
              {skill.experience} · {skill.proficiency}%
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Ring torus
const Ring = ({ category }: { category: string }) => {
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.Frontend;
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, cfg.height, 0]}>
      <torusGeometry args={[cfg.radius, 0.014, 8, 120]} />
      <meshBasicMaterial color={cfg.color} transparent opacity={0.18} />
    </mesh>
  );
};

// Rotating central icosahedron
const Core = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshStandardMaterial
        color="#2d1060"
        emissive="#7c3aed"
        emissiveIntensity={0.9}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
};

export const SkillOrbitGraph: React.FC<SkillOrbitGraphProps> = ({ skills }) => {
  return (
    <div className="relative w-full h-[600px] lg:h-[680px]">
      <Canvas
        camera={{ position: [0, 11, 13], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[0, 12, 0]} intensity={2.5} color="#a78bfa" />
          <pointLight position={[0, -8, 0]} intensity={0.8} color="#818cf8" />

          <Core />

          {Object.entries(skills).map(([category, categorySkills]) => (
            <group key={category}>
              <Ring category={category} />
              {categorySkills.map((skill, i) => (
                <SkillNode
                  key={skill.name}
                  skill={skill}
                  category={category}
                  index={i}
                  total={categorySkills.length}
                />
              ))}
            </group>
          ))}

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={9}
            maxDistance={28}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>

      {/* Category legend */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 px-5 py-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10">
        {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full shadow-lg" style={{ backgroundColor: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />
            <span className="text-xs font-medium text-gray-300">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-violet-600/80 backdrop-blur-xl text-white text-xs font-medium pointer-events-none">
        Drag to explore · Hover for details
      </div>
    </div>
  );
};

export default SkillOrbitGraph;
