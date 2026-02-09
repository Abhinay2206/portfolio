'use client';

import { ReactNode } from 'react';

interface GradientBorderProps {
    children: ReactNode;
    className?: string;
    borderWidth?: number;
    colors?: string[];
    speed?: number;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
    children,
    className = '',
    borderWidth = 2,
    colors = ['#7c3aed', '#a855f7', '#6366f1', '#8b5cf6'],
    speed = 3,
}) => {
    const gradientColors = colors.join(', ');

    return (
        <div className={`relative ${className}`}>
            {/* Animated gradient border */}
            <div
                className="absolute inset-0 rounded-inherit -z-10"
                style={{
                    padding: `${borderWidth}px`,
                    background: `linear-gradient(90deg, ${gradientColors})`,
                    backgroundSize: '400% 400%',
                    animation: `gradient-rotate ${speed}s linear infinite`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
            {children}
        </div>
    );
};

export default GradientBorder;
