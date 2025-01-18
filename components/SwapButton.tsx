'use client';

import { Button } from '@/components/shadcn/button';

import { cn } from '@/lib/utils';

interface SwapProps {
  active: boolean;
  className: string;
  wallet: { address: string };
  quoteID: string | null;
  callback: () => void;
}

export const SwapButton: React.FC<SwapProps> = ({ className, active }) => {
  return (
    <div>
      <Button
        className={cn('block rounded-md w-full', className)}
        onClick={() => {}}
        disabled={active}
      >
        Swap
      </Button>
    </div>
  );
};
