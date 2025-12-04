"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Shape {
    type: "cube" | "sphere" | "pyramid" | "torus";
    size: number;
    initialX: string;
    initialY: string;
    depth: number;
    rotation: number;
}

const ShapeComponent = ({ shape, index, mousePosition, scrollYProgress }: {
    shape: Shape;
    index: number;
    mousePosition: { x: number; y: number };
    scrollYProgress: MotionValue<number>;
}) => {
    const yTransform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -shape.depth * 500]
    );

    return (
        <motion.div
            key={index}
            className="absolute"
            style={{
                left: shape.initialX,
                top: shape.initialY,
                y: yTransform,
                x: mousePosition.x * shape.depth * 50,
            }}
            animate={{
                rotate: [shape.rotation, shape.rotation + 360],
                scale: [1, 1.1, 1],
            }}
            transition={{
                rotate: {
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: "linear",
                },
                scale: {
                    duration: 3 + index,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                },
            }}
        >
            {shape.type === "cube" && (
                <div
                    className="relative"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Cube faces */}
                    {[
                        { transform: `rotateY(0deg) translateZ(${shape.size / 2}px)` },
                        { transform: `rotateY(90deg) translateZ(${shape.size / 2}px)` },
                        { transform: `rotateY(180deg) translateZ(${shape.size / 2}px)` },
                        { transform: `rotateY(-90deg) translateZ(${shape.size / 2}px)` },
                        { transform: `rotateX(90deg) translateZ(${shape.size / 2}px)` },
                        { transform: `rotateX(-90deg) translateZ(${shape.size / 2}px)` },
                    ].map((face, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-md border border-violet-500/20"
                            style={{
                                transform: face.transform,
                                boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                            }}
                        />
                    ))}
                </div>
            )}

            {shape.type === "sphere" && (
                <div
                    className="rounded-full bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 backdrop-blur-md border border-fuchsia-500/20"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        boxShadow: "0 0 30px rgba(217, 70, 239, 0.2)",
                    }}
                />
            )}

            {shape.type === "pyramid" && (
                <div
                    className="relative"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-md border border-indigo-500/20"
                        style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                            boxShadow: "0 0 25px rgba(99, 102, 241, 0.2)",
                        }}
                    />
                </div>
            )}

            {shape.type === "torus" && (
                <div
                    className="rounded-full border-8 border-violet-500/20 backdrop-blur-md"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        boxShadow:
                            "0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)",
                    }}
                />
            )}
        </motion.div>
    );
};

export const FloatingShapes = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const shapes: Shape[] = [
        {
            type: "cube",
            size: 120,
            initialX: "10%",
            initialY: "20%",
            depth: 0.3,
            rotation: 45,
        },
        {
            type: "sphere",
            size: 80,
            initialX: "80%",
            initialY: "15%",
            depth: 0.5,
            rotation: 0,
        },
        {
            type: "pyramid",
            size: 100,
            initialX: "70%",
            initialY: "60%",
            depth: 0.4,
            rotation: 30,
        },
        {
            type: "torus",
            size: 90,
            initialX: "15%",
            initialY: "70%",
            depth: 0.6,
            rotation: 60,
        },
        {
            type: "cube",
            size: 60,
            initialX: "50%",
            initialY: "40%",
            depth: 0.2,
            rotation: 15,
        },
    ];

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            style={{ perspective: "1000px" }}
        >
            {shapes.map((shape, index) => (
                <ShapeComponent
                    key={index}
                    shape={shape}
                    index={index}
                    mousePosition={mousePosition}
                    scrollYProgress={scrollYProgress}
                />
            ))}

            {/* Gradient mesh overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(217, 70, 239, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
          `,
                }}
            />
        </div>
    );
};
