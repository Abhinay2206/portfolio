'use client';

import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Capture canvas dimensions in a way TypeScript understands is non-null
        const canvasElement = canvas;

        const resizeCanvas = () => {
            canvasElement.width = window.innerWidth;
            canvasElement.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create morphing blobs
        class Blob {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            color: string;
            pulsePhase: number;

            constructor() {
                this.x = Math.random() * canvasElement.width;
                this.y = Math.random() * canvasElement.height;
                this.radius = Math.random() * 200 + 150;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                const colors = [
                    'rgba(124, 58, 237',
                    'rgba(168, 85, 247',
                    'rgba(99, 102, 241',
                    'rgba(139, 92, 246',
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -this.radius) this.x = canvasElement.width + this.radius;
                if (this.x > canvasElement.width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = canvasElement.height + this.radius;
                if (this.y > canvasElement.height + this.radius) this.y = -this.radius;

                this.pulsePhase += 0.02;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
                const currentRadius = this.radius * pulse;

                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, currentRadius
                );
                gradient.addColorStop(0, `${this.color}, 0.3)`);
                gradient.addColorStop(0.5, `${this.color}, 0.15)`);
                gradient.addColorStop(1, `${this.color}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const blobs: Blob[] = [];
        for (let i = 0; i < 5; i++) {
            blobs.push(new Blob());
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            blobs.forEach(blob => {
                blob.update();
                blob.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ filter: 'blur(60px)', opacity: 0.7 }}
        />
    );
};

export default AnimatedBackground;
