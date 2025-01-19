'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownUp, BrainCircuit, ChartCandlestick, Info, Wallet } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const routes = [
    { name: 'Staking', icon: Wallet, route: '/stake' },
    { name: 'Swap', icon: ArrowDownUp, route: '/swap' },
    { name: 'AI', icon: BrainCircuit, route: '/ai' },
    { name: 'Market', icon: ChartCandlestick, route: '/market' },
    { name: 'Help', icon: Info, route: '/info' },
];

export const Navbar: React.FC<{ className?: string }> = ({ className }) => {
    // set active index based on route
    const path = usePathname();
    // find the index of the route
    const [activeIndex, setActiveIndex] = React.useState<number | null>(
        routes.findIndex((obj) => obj.route === path),
    );
    
    const router = useRouter();
    
    const handleButtonClick = (index: number, route: string) => {
        setActiveIndex(index);
        router.push(route);
    };
    
    return (
        <div
            className={cn('flex justify-evenly bottom-0 h-full bg-accent', className)}
        >
            {routes.map((obj, index) => (
                <div
                    className={cn(
                        `w-full h-full flex flex-col text-center text-sm pb-4 cursor-pointer pt-2`,
                        activeIndex === index ? 'border-t-2 border-primary' : '',
                    )}
                    key={index}
                    onClick={() => handleButtonClick(index, obj.route)}
                >
                    <obj.icon
                        key={index}
                        className={cn(
                            'size-5 text-primary-foreground m-auto shadow-none font-bold bg-transparent rounded-none ',
                            activeIndex === index ? 'active:bg-accent' : 'bg-transparent',
                        )}
                    />
                    <p className="text-muted-foreground font-semibold">{obj.name}</p>
                </div>
            ))}
        </div>
    );
};
