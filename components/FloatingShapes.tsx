'use client';

import { motion } from 'framer-motion';

export const FloatingShapes = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Very subtle floating shapes */}
            <motion.div
                className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-violet-500/5 dark:bg-violet-500/3 blur-3xl"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/3 right-[15%] w-96 h-96 rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-3xl"
                animate={{
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/4 left-[20%] w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/3 blur-3xl"
                animate={{
                    y: [0, 15, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

export default FloatingShapes;
