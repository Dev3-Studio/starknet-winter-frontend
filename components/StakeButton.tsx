'use client';

import { Button } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StakeButtonProps {
  className: string;
  amountInput: number | undefined;
  balance: number;
  active: boolean | undefined;
}

export const StakeButton: React.FC<StakeButtonProps> = ({
  className,
  amountInput,
  balance,
  active,
}) => {
  const { toast } = useToast();

  function handleStake() {
    toast({
      title: 'Transaction Confirmed!✔️',
      description: `Staked ${100} STRK`,
    });
  }

  return (
    <div>
      <Button
        className={cn('block rounded-md w-full bg-secondary', className)}
        onClick={handleStake}
        disabled={active}
      >
        Stake
      </Button>
    </div>
  );
};
