'use client';

import { Button } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { useArgent } from '@/hooks/useArgent';

export const ConnectWalletButton: React.FC<{ className?: string }> = ({ className }) => {
    const { argentTMA, account, isConnected } = useArgent();
    
    const handleConnectButton = async () => {
        await argentTMA.requestConnection({
            callbackData: 'test',
        });
    };
    
    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    
    return (
        <div>
            {isConnected && <Button
                className={cn('block rounded-md w-full', className)}
                disabled
            >
                Connected: {formatAddress(account?.address)}
            </Button>}
            {!isConnected && <Button
                className={cn('block rounded-md w-full', className)}
                onClick={handleConnectButton}
            >
                Connect Wallet
            </Button>}
        </div>
    );
};