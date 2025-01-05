'use client';

import { Button } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { argentTMA } from '@/config';
import { useArgentAccount } from '@/hooks/useArgentAccount';

export const ConnectWalletButton: React.FC<{ className?: string }> = ({ className }) => {
    const { account, isConnected } = useArgentAccount();
    
    const handleConnectButton = async () => {
        await argentTMA.requestConnection({
            callbackData: 'test',
        });
    };
    
    return (
        <div>
            {isConnected && <div>
                Connected as {account?.address}
            </div>}
            {!isConnected && <Button
                className={cn('block rounded-md w-full', className)}
                onClick={handleConnectButton}
            >
                Connect Wallet
            </Button>}
        </div>
    );
};