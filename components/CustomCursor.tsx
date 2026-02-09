"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.getAttribute("role") === "button"
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", updateCursor);
        window.addEventListener("mouseenter", () => setIsVisible(true));
        window.addEventListener("mouseleave", handleMouseOut);

        const interactiveElements = document.querySelectorAll(
            "button, a, [role='button']"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter as EventListener);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll(
                "button, a, [role='button']"
            );
            newElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter as EventListener);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            window.removeEventListener("mousemove", updateCursor);
            window.removeEventListener("mouseenter", () => setIsVisible(true));
            window.removeEventListener("mouseleave", handleMouseOut);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });

            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    // Hide on touch devices
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

    return (
        <>
            {/* Simple dot cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="relative rounded-full bg-white"
                    animate={{
                        width: isHovering ? 40 : 8,
                        height: isHovering ? 40 : 8,
                        x: isHovering ? -20 : -4,
                        y: isHovering ? -20 : -4,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                    }}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
