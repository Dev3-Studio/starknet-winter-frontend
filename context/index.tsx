'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { init } from '@telegram-apps/sdk-react';

// Set up queryClient
const queryClient = new QueryClient();

function ContextProvider({ children }: { children: ReactNode; }) {
    init();
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default ContextProvider;