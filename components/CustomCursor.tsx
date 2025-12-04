"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorState {
    variant: "default" | "hover" | "text" | "click";
}

export const CustomCursor = () => {
    const [cursorState, setCursorState] = useState<CursorState>({
        variant: "default",
    });
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const trailRefs = useRef<Array<{ x: number; y: number; opacity: number }>>([]);
    const [trails, setTrails] = useState<Array<{ x: number; y: number; opacity: number }>>([]);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);

            // Add trail point
            trailRefs.current.push({
                x: e.clientX,
                y: e.clientY,
                opacity: 1,
            });

            // Keep only last 10 trail points
            if (trailRefs.current.length > 10) {
                trailRefs.current.shift();
            }
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-magnetic")
            ) {
                setCursorState({ variant: "hover" });
            } else if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                setCursorState({ variant: "text" });
            }
        };

        const handleMouseLeave = () => {
            setCursorState({ variant: "default" });
        };

        const handleMouseDown = () => {
            setCursorState({ variant: "click" });
        };

        const handleMouseUp = () => {
            setCursorState({ variant: "default" });
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", updateCursor);
        window.addEventListener("mouseenter", () => setIsVisible(true));
        window.addEventListener("mouseleave", handleMouseOut);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        // Add event listeners for interactive elements
        const interactiveElements = document.querySelectorAll(
            "button, a, input, textarea, [contenteditable], .cursor-magnetic"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter as EventListener);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Trail animation
        const trailInterval = setInterval(() => {
            trailRefs.current = trailRefs.current.map((trail) => ({
                ...trail,
                opacity: trail.opacity * 0.9,
            }));
            setTrails([...trailRefs.current.filter((t) => t.opacity > 0.05)]);
        }, 50);

        return () => {
            window.removeEventListener("mousemove", updateCursor);
            window.removeEventListener("mouseenter", () => setIsVisible(true));
            window.removeEventListener("mouseleave", handleMouseOut);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            clearInterval(trailInterval);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    // Hide on mobile/tablet
    useEffect(() => {
        const checkDevice = () => {
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
            if (isTouchDevice) {
                setIsVisible(false);
            }
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    if (!isVisible) return null;

    const cursorSize = {
        default: 16,
        hover: 40,
        text: 4,
        click: 12,
    };

    const size = cursorSize[cursorState.variant];

    return (
        <>
            {/* Trail particles */}
            {trails.map((trail, index) => (
                <motion.div
                    key={`trail-${index}`}
                    className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
                    style={{
                        x: trail.x - 4,
                        y: trail.y - 4,
                        opacity: trail.opacity,
                    }}
                >
                    <div
                        className="w-2 h-2 rounded-full bg-violet-500"
                        style={{
                            filter: "blur(2px)",
                            boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)",
                        }}
                    />
                </motion.div>
            ))}

            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="relative"
                    animate={{
                        width: size,
                        height: size,
                        x: -size / 2,
                        y: -size / 2,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                    }}
                >
                    <div
                        className={`w-full h-full rounded-full ${cursorState.variant === "hover"
                                ? "bg-white/30 border-2 border-white"
                                : cursorState.variant === "text"
                                    ? "bg-violet-500"
                                    : "bg-white"
                            }`}
                        style={{
                            boxShadow:
                                cursorState.variant === "hover"
                                    ? "0 0 20px rgba(255, 255, 255, 0.5)"
                                    : "0 0 10px rgba(255, 255, 255, 0.3)",
                        }}
                    />

                    {/* Outer glow ring for hover state */}
                    {cursorState.variant === "hover" && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-white/20"
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />
                    )}
                </motion.div>
            </motion.div>
        </>
    );
};
