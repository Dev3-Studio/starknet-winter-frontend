'use client';

import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';

interface SwapProps {
    className: string;
    wallet: { address: string };
}

export const SwapButton: React.FC<SwapProps> = ({ className }) => {
    return (
        <div>
            <Button
                className={cn('block rounded-md w-full', className)}
            >
                Swap
            </Button>
        </div>
    );
};
