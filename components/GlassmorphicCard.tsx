"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useRef, MouseEvent } from "react";

interface GlassmorphicCardProps {
    children: ReactNode;
    className?: string;
    hover3D?: boolean;
    glowOnHover?: boolean;
}

export const GlassmorphicCard = ({
    children,
    className = "",
    hover3D = true,
    glowOnHover = true,
}: GlassmorphicCardProps) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!hover3D || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateXValue = (y - 0.5) * 15; // -7.5 to 7.5 degrees
        const rotateYValue = (x - 0.5) * -15;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`glass-card relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            animate={{
                rotateX: hover3D ? rotateX : 0,
                rotateY: hover3D ? rotateY : 0,
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
        >
            {/* Glassmorphic background */}
            <div className="absolute inset-0 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10" />

            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background:
                            "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                        backgroundSize: "200% 200%",
                        animation: "gradient-shift 3s ease infinite",
                    }}
                />
            </div>

            {/* Glow effect on hover */}
            {glowOnHover && isHovered && (
                <motion.div
                    className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 blur-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* Depth shadow */}
            <div
                className="absolute inset-0 rounded-2xl"
                style={{
                    boxShadow: `
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
            0 20px 60px -10px rgba(139, 92, 246, ${isHovered ? "0.3" : "0.1"})
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-6">{children}</div>

            {/* Shine effect */}
            <div
                className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                    transform: `translateX(${isHovered ? "100%" : "-100%"})`,
                    transition: "transform 0.6s ease",
                }}
            />
        </motion.div>
    );
};
