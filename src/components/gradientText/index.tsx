import React, { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export function GradientText({
    children,
    className = "",
    colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
    animationSpeed = 2,
    showBorder = false,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <span
            className={`relative mx-auto max-w-fit items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden ${className}`}
        >
            <span
                className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
                style={{
                    ...gradientStyle,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundSize: "300% 100%",
                }}
            >
                {children}
            </span>
        </span>
    );
}
