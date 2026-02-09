'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
    glare?: boolean;
    scale?: number;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
    children,
    className = '',
    intensity = 15,
    glare = true,
    scale = 1.02,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
        stiffness: 300,
        damping: 30,
    });

    const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), {
        stiffness: 300,
        damping: 30,
    });
    const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) / (rect.width / 2));
        y.set((e.clientY - centerY) / (rect.height / 2));
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative preserve-3d ${className}`}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{
                scale: isHovered ? scale : 1,
            }}
            transition={{
                scale: { type: 'spring', stiffness: 300, damping: 30 },
            }}
        >
            {children}

            {/* Glare effect */}
            {glare && (
                <motion.div
                    className="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"
                    style={{
                        background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
};

export default Tilt3D;
