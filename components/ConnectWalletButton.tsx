'use client';

import { Button, ButtonProps } from '@/components/shadcn/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';

export const ConnectWalletButton: React.FC<ButtonProps> = ({ ...props }) => {
    const { argent, account, disconnect, isConnected } = useArgentTelegram();
    
    const handleConnectButton = async () => {
        if (!argent) {
            return;
        }
        await argent.requestConnection({
            callbackData: 'test',
        });
    };
    
    // useful for debugging
    const handleClearSessionButton = async () => {
        await disconnect();
    };
    
    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    
    return (
        <>
            {isConnected && <Button
                {...props}
                className={cn('block rounded-md w-full', props.className)}
                onClick={handleClearSessionButton}
            >
                Disconnect: {formatAddress(account?.address)}
            </Button>}
            {!isConnected && <Button
                {...props}
                className={cn('block rounded-md w-full', props.className)}
                onClick={handleConnectButton}
            >
                Connect Wallet
            </Button>}
        </>
    );
};