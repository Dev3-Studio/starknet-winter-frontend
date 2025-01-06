'use client';

import React from "react";
import { Button } from '@/components/shadcn/button';
import { cn } from "@/lib/utils";

export const Navbar: React.FC<{ className?: string }> = ({ className }) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

    const handleButtonClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className={cn('static flex justify-evenly w-screen bottom-0 bg-gray-800 py-2', className)}>
            {['E', 'S', 'AI', 'H', 'K'].map((label, index) => (
                <Button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={cn(
                        'w-14 h-14 rounded-full bg-transparent text-white shadow-none font-bold',
                    )}
                    style={{
                        transform: activeIndex === index ? 'translateY(-22px)' : 'translateY(0)', // Slight upward shift
                        backgroundColor: activeIndex === index ? '#1f2937':'#1f2937',
                        transition: 'transform 0.4s ease', // Smooth transition
                    }}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
};
