'use client';

import { networks, projectId, wagmiAdapter } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { AppKitNetwork } from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { type Config, cookieToInitialState, WagmiProvider } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
    throw new Error('Project ID is not defined');
}

// todo: update metadata
const metadata = {
    name: 'reown-next-shadcn-boilerplate',
    description: 'Template repository for use in new Dev3 Studio projects',
    url: 'http://localhost:3000', // origin must match your domain & subdomain
    icons: ['https://cdn.dev3.studio/logo.png'],
};

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: networks as [AppKitNetwork, ...AppKitNetwork[]],
    defaultNetwork: networks[0],
    metadata: metadata,
    features: {
        analytics: false,
    },
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);
    
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}

export default ContextProvider;