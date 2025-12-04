"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef, MouseEvent, useState } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
}

export const MagneticButton = ({
    children,
    className = "",
    onClick,
    variant = "primary",
}: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic pull effect (stronger when closer)
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const strength = 1 - distance / maxDistance;
            x.set(distanceX * strength * 0.3);
            y.set(distanceY * strength * 0.3);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const variantStyles = {
        primary:
            "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-transparent hover:from-violet-500 hover:to-purple-500",
        secondary:
            "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white border-transparent hover:from-fuchsia-500 hover:to-pink-500",
        outline:
            "bg-transparent text-violet-600 dark:text-violet-400 border-violet-600 dark:border-violet-400 hover:bg-violet-600/10",
    };

    return (
        <motion.button
            ref={ref}
            className={`cursor-magnetic relative px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 overflow-hidden group ${variantStyles[variant]} ${className}`}
            style={{
                x: xSpring,
                y: ySpring,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            {/* Ripple effect container */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Glow effect */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-400/30 via-purple-400/30 to-fuchsia-400/30 blur-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* Shine effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "translateX(-100%)",
                    animation: isHovered ? "shine 1.5s ease-in-out" : "none",
                }}
            />

            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-[-2px]"
                    style={{
                        background:
                            "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.5), transparent 60deg)",
                    }}
                    animate={{
                        rotate: isHovered ? 360 : 0,
                    }}
                    transition={{
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Particle burst on hover */}
            {isHovered && (
                <>
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                            }}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                x: Math.cos((i * Math.PI) / 3) * 30,
                                y: Math.sin((i * Math.PI) / 3) * 30,
                                opacity: [1, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </>
            )}
        </motion.button>
    );
};
