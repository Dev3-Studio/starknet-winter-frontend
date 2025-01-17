'use client';

import { Button } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { PriceProps } from '@/types/AllTypes';

interface SwapProps {
  tokenA: PriceProps;
  tokenB: PriceProps;
  className: string;
  wallet: { address: string };
  quoteID: string;
  callback: () => void;
}

export const SwapButton: React.FC<SwapProps> = ({
  tokenA,
  tokenB,
  className,
  wallet,
}) => {
  return (
    <div>
      <Button
        className={cn('block rounded-md w-full', className)}
        onClick={() => {}}
      >
        Swap
      </Button>
    </div>
  );
};
