'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';

// Set up queryClient
const queryClient = new QueryClient();

function ContextProvider({ children }: { children: ReactNode; }) {
    
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default ContextProvider;