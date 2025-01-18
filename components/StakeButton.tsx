'use client';

import { Button } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const StakeButton: React.FC<{ className?: string }> = ({
  className,
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
      >
        Stake
      </Button>
    </div>
  );
};
