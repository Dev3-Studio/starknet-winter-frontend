'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode, useEffect } from 'react';
import { init } from '@telegram-apps/sdk-react';
import { swipeBehavior } from '@telegram-apps/sdk';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import checkAddressDeployed from '@/actions/checkAddressDeployed';

// Set up queryClient
const queryClient = new QueryClient();

function ContextProvider({ children }: { children: ReactNode }) {
    const { account } = useArgentTelegram();
    
    useEffect(() => {
        init();
        if (swipeBehavior.isSupported()) {
            swipeBehavior.disableVertical();
        }
    }, []);
    useEffect(() => {
        
        if (account && !checkAddressDeployed(account.address)) {
            // Redirect to the wallet setup page
            window.location.href = '/wallet-setup';
        }
    }, [account]);
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default ContextProvider;