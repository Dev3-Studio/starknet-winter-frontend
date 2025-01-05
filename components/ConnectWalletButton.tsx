'use client';

import { Button } from '@/components/shadcn/button';
import React, { useEffect, useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { cn } from '@/lib/utils';

export const ConnectWalletButton: React.FC<{ className?: string }> = ({ className }) => {
    const [isClient, setIsClient] = useState(false);
    const { open } = useAppKit();
    const { isConnected } = useAppKitAccount();
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    // Show the custom button if the wallet is not connected, appkit-button otherwise. We use css to prevent hydration errors
    return (
        <div>
            {isClient && <>
                <div className={isConnected ? 'block' : 'hidden'}>
                    <appkit-button/>
                </div>
                <Button
                    className={cn(
                        isConnected ? 'hidden' : 'block',
                        'rounded-md w-full',
                        className,
                    )}
                    onClick={() => open()}
                >
                    Connect Wallet
                </Button>
            </>}
        </div>
    );
};