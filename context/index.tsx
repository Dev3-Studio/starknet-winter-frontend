'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode, useEffect } from 'react';
import { init } from '@telegram-apps/sdk-react';
import { swipeBehavior } from '@telegram-apps/sdk';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import checkAddressDeployed from '@/actions/checkAddressDeployed';
import { useRouter } from 'next/navigation';

// Set up queryClient
const queryClient = new QueryClient();

function ContextProvider({ children }: { children: ReactNode }) {
    
    const router = useRouter();
    const { account } = useArgentTelegram();
    
    useEffect(() => {
        init();
        if (swipeBehavior.isSupported()) {
            swipeBehavior.disableVertical();
        }
    }, []);
    useEffect(() => {
        if (account) {
            checkAddressDeployed(account.address).then((isDeployed) => {
                    // Redirect to the wallet setup page
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    !isDeployed && router.push('/wallet-setup');
                }
            )
        }
    }, [account?.address]);
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default ContextProvider;