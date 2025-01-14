'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  ChartCandlestick,
  ArrowDownUp,
  BrainCircuit,
  Wallet,
  Info,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const routes = [
  { name: 'Staking', icon: Wallet, route: '/stake' },
  { name: 'Swap', icon: ArrowDownUp, route: '/swap' },
  { name: 'AI', icon: BrainCircuit, route: '/ai' },
  { name: 'Market', icon: ChartCandlestick, route: '/market' },
  { name: 'Help', icon: Info, route: '/info' },
]

export const Navbar: React.FC<{ className?: string }> = ({ className }
) => {
  // set active index based on route
  const path = usePathname();
  // find the index of the route
  const [activeIndex, setActiveIndex] = React.useState<number | null>( routes.findIndex((obj) => obj.route === path));
  
  const router = useRouter();

  const handleButtonClick = (index: number, route: string) => {
    setActiveIndex(index);
    router.push(route);
  };
  
  return (
    <div
      className={cn(
        'flex justify-evenly w-screen bottom-0 h-20 bg-accent',
        className
      )}
    >
      {routes.map((obj, index) => (
        <div
          className={cn(
            `w-full h-full flex flex-col text-center text-sm pb-4 cursor-pointer`,
            activeIndex === index ? 'border-t-2 border-primary' : ''
          )}
          key={index}
          onClick={() => handleButtonClick(index, obj.route)}
        >
          <obj.icon
            key={index}
            className={cn(
              'size-5 text-primary-foreground m-auto shadow-none font-bold bg-accent rounded-none ',
              activeIndex === index ? 'active:bg-accent' : 'bg-accent'
            )}
          />
          <p className='text-muted-foreground font-semibold'>{obj.name}</p>
        </div>
      ))}
    </div>
  );
};
