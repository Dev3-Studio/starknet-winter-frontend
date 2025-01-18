'use client';

import { Button } from '@/components/shadcn/button';

import { cn } from '@/lib/utils';
import { Quote } from '@avnu/avnu-sdk';

interface SwapProps {
  active: boolean;
  className: string;
  wallet: { address: string };
}

export const SwapButton: React.FC<SwapProps> = ({ className, active }) => {
  return (
    <div>
      <Button
        className={cn('block rounded-md w-full', className)}
        disabled={active}
      >
        Swap
      </Button>
    </div>
  );
};
