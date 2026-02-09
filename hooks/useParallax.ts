import { useRef } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

interface ParallaxConfig {
    offset?: [string, string];
    yRange?: [number, number];
    scaleRange?: [number, number];
    opacityRange?: [number, number];
    rotateRange?: [number, number];
    springConfig?: {
        stiffness?: number;
        damping?: number;
        restDelta?: number;
    };
}

interface ParallaxReturn {
    ref: React.RefObject<HTMLElement>;
    y?: MotionValue<number>;
    scale?: MotionValue<number>;
    opacity?: MotionValue<number>;
    rotate?: MotionValue<number>;
}

export const useParallax = (config: ParallaxConfig = {}): ParallaxReturn => {
    const {
        offset = ["start end", "end start"],
        yRange,
        scaleRange,
        opacityRange,
        rotateRange,
        springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
    } = config;

    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as any,
    });

    const result: ParallaxReturn = { ref };

    // Y transform
    if (yRange) {
        const yTransform = useTransform(scrollYProgress, [0, 1], yRange);
        result.y = useSpring(yTransform, springConfig);
    }

    // Scale transform
    if (scaleRange) {
        const scaleTransform = useTransform(scrollYProgress, [0, 1], scaleRange);
        result.scale = useSpring(scaleTransform, springConfig);
    }

    // Opacity transform
    if (opacityRange) {
        const opacityTransform = useTransform(scrollYProgress, [0, 1], opacityRange);
        result.opacity = useSpring(opacityTransform, springConfig);
    }

    // Rotate transform
    if (rotateRange) {
        const rotateTransform = useTransform(scrollYProgress, [0, 1], rotateRange);
        result.rotate = useSpring(rotateTransform, springConfig);
    }

    return result;
};

// Preset configurations for common use cases
export const parallaxPresets = {
    fade: {
        opacityRange: [0, 1] as [number, number],
        yRange: [50, -50] as [number, number],
    },
    float: {
        yRange: [-30, 0] as [number, number],
    },
    zoom: {
        scaleRange: [0.8, 1] as [number, number],
        opacityRange: [0, 1] as [number, number],
    },
    subtle: {
        yRange: [-15, 15] as [number, number],
        opacityRange: [0.8, 1] as [number, number],
    },
};
