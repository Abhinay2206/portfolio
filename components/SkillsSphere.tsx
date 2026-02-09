'use client';

import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
    name: string;
    proficiency: number;
    experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    category?: string;
}

interface SkillNode {
    skill: Skill;
    position: [number, number, number];
    color: string;
    size: number;
}

interface SkillsSphereProps {
    skills: { [category: string]: Skill[] };
}

// Category color mapping with vibrant colors
const categoryColors: { [key: string]: string } = {
    'Frontend': '#a78bfa',     // violet-400
    'Backend': '#818cf8',      // indigo-400
    'Database': '#60a5fa',     // blue-400
    'Tools': '#34d399',        // emerald-400
    'ML/AI': '#fbbf24',        // amber-400
    'Other': '#f472b6',        // pink-400
};

// Animated wireframe globe
const WireframeGlobe = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[5.8, 32, 32]} />
            <meshBasicMaterial
                color="#8b5cf6"
                wireframe
                transparent
                opacity={0.1}
            />
        </mesh>
    );
};

// Glowing skill orb with animated effects
const SkillOrb = ({
    node,
    onClick,
    isHovered,
    onHover
}: {
    node: SkillNode;
    onClick: () => void;
    isHovered: boolean;
    onHover: (hover: boolean) => void;
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating animation
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + node.position[0]) * 0.0005;

            // Pulse effect when hovered
            if (isHovered) {
                const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
                meshRef.current.scale.setScalar(node.size * 1.3 * pulse);
            } else {
                meshRef.current.scale.setScalar(node.size);
            }
        }

        if (glowRef.current) {
            glowRef.current.scale.setScalar(isHovered ? 2.5 : 1.8);
        }
    });

    return (
        <group position={node.position}>
            {/* Outer glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                    color={node.color}
                    transparent
                    opacity={isHovered ? 0.3 : 0.15}
                />
            </mesh>

            {/* Main orb */}
            <mesh
                ref={meshRef}
                onClick={onClick}
                onPointerOver={() => onHover(true)}
                onPointerOut={() => onHover(false)}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={isHovered ? 1.5 : 0.6}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Tooltip */}
            {isHovered && (
                <Html center distanceFactor={15}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-4 py-3 bg-black/95 text-white rounded-xl whitespace-nowrap backdrop-blur-xl border border-white/20 shadow-2xl pointer-events-none"
                    >
                        <div className="font-bold text-base mb-1">{node.skill.name}</div>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                            <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">
                                {node.skill.experience}
                            </span>
                            <span className="font-semibold">{node.skill.proficiency}%</span>
                        </div>
                    </motion.div>
                </Html>
            )}
        </group>
    );
};

// Particle system for added visual interest
const Particles = () => {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = [];
        const radius = 12;

        for (let i = 0; i < 200; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * (0.8 + Math.random() * 0.4);

            positions.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
        }

        return new Float32Array(positions);
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#8b5cf6"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
};

// Main 3D scene
const Scene = ({
    nodes,
    onNodeClick,
    hoveredNode,
    setHoveredNode
}: {
    nodes: SkillNode[];
    onNodeClick: (skill: Skill) => void;
    hoveredNode: string | null;
    setHoveredNode: (name: string | null) => void;
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    useEffect(() => {
        // Set initial camera position
        camera.position.set(0, 0, 18);
    }, [camera]);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle auto-rotation
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <>
            {/* Ambient lighting */}
            <ambientLight intensity={0.4} />

            {/* Key lights */}
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#818cf8" />
            <pointLight position={[0, 0, 15]} intensity={1} color="#ffffff" />

            {/* Stars background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Particles */}
            <Particles />

            {/* Wireframe globe */}
            <WireframeGlobe />

            {/* Skill orbs */}
            <group ref={groupRef}>
                {nodes.map((node, index) => (
                    <SkillOrb
                        key={index}
                        node={node}
                        onClick={() => onNodeClick(node.skill)}
                        isHovered={hoveredNode === node.skill.name}
                        onHover={(hover) => setHoveredNode(hover ? node.skill.name : null)}
                    />
                ))}
            </group>
        </>
    );
};

export const SkillsSphere: React.FC<SkillsSphereProps> = ({ skills }) => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Convert skills to 3D nodes
    const skillNodes = useMemo(() => {
        const nodes: SkillNode[] = [];
        const allSkills: (Skill & { category: string })[] = [];

        Object.entries(skills).forEach(([category, categorySkills]) => {
            categorySkills.forEach(skill => {
                allSkills.push({ ...skill, category });
            });
        });

        const radius = 6;
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angleIncrement = Math.PI * 2 * goldenRatio;

        allSkills.forEach((skill, index) => {
            const t = index / allSkills.length;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleIncrement * index;

            const x = radius * Math.sin(inclination) * Math.cos(azimuth);
            const y = radius * Math.sin(inclination) * Math.sin(azimuth);
            const z = radius * Math.cos(inclination);

            const size = skill.proficiency >= 90 ? 0.35 :
                skill.proficiency >= 70 ? 0.28 : 0.22;

            const color = categoryColors[skill.category] || categoryColors['Other'];

            nodes.push({
                skill,
                position: [x, y, z],
                color,
                size,
            });
        });

        return nodes;
    }, [skills]);

    return (
        <div className="relative w-full h-[650px] lg:h-[750px]">
            {/* 3D Canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent rounded-2xl overflow-hidden">
                <Canvas
                    camera={{ position: [0, 0, 18], fov: 45 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <Suspense fallback={null}>
                        <Scene
                            nodes={skillNodes}
                            onNodeClick={setSelectedSkill}
                            hoveredNode={hoveredNode}
                            setHoveredNode={setHoveredNode}
                        />

                        <OrbitControls
                            enableZoom={true}
                            enablePan={false}
                            minDistance={12}
                            maxDistance={25}
                            autoRotate={false}
                            rotateSpeed={0.5}
                            zoomSpeed={0.8}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Skill Detail Panel */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-violet-500/30 shadow-2xl max-w-md z-10"
                    >
                        <button
                            onClick={() => setSelectedSkill(null)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
                            {selectedSkill.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="px-3 py-1.5 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 rounded-full font-medium text-violet-700 dark:text-violet-300">
                                {selectedSkill.experience}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${selectedSkill.proficiency}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>
                                <span className="font-bold text-violet-600 dark:text-violet-400 text-lg">
                                    {selectedSkill.proficiency}%
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instructions Overlay */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-violet-600/90 to-indigo-600/90 backdrop-blur-xl rounded-full text-white text-sm font-medium shadow-lg pointer-events-none z-10">
                <span className="hidden sm:inline">🎯 Drag to explore • Hover for details • Click to select</span>
                <span className="sm:hidden">Touch & drag to explore</span>
            </div>

            {/* Legend */}
            <div className="absolute top-8 right-8 px-5 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-violet-500/10 shadow-xl">
                <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                    Skill Categories
                </div>
                <div className="space-y-2">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-2.5 text-sm">
                            <div
                                className="w-3 h-3 rounded-full shadow-lg"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 10px ${color}50`
                                }}
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsSphere;
