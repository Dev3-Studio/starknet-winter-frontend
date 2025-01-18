'use client';

import { Button } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';

export const UnstakeButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div>
      <Button className={cn('block rounded-md w-full bg-accent', className)}>
        Unstake
      </Button>
    </div>
  );
};
