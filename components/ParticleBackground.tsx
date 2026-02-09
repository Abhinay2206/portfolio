'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        const createParticles = () => {
            const particleCount = Math.floor((canvas.width * canvas.height) / 8000); // Doubled density
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1, // Larger particles
                    speedX: (Math.random() - 0.5) * 0.8,
                    speedY: (Math.random() - 0.5) * 0.8,
                    opacity: Math.random() * 0.8 + 0.3, // More visible
                    color: Math.random() > 0.5 ? 'rgba(124, 58, 237' : 'rgba(99, 102, 241',
                });
            }
        };
        createParticles();

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Mouse interaction
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.x -= dx * force * 0.02;
                    particle.y -= dy * force * 0.02;
                }

                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `${particle.color}, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particlesRef.current.forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `${particle.color}, ${(1 - distance / 100) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-60 dark:opacity-50"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default ParticleBackground;
