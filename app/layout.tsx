import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { headers } from 'next/headers'; // added
import ContextProvider from '@/context';
import { ReactNode } from 'react';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

// todo: update metadata
export const metadata: Metadata = {
    title: 'Reown Next Shadcn Boilerplate',
    description: 'Template repository for use in new Dev3 Studio projects',
    authors: [{ name: 'Dev3 Studio', url: 'https://dev3.studio' }],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    const headersObj = headers();
    const cookies = headersObj.get('cookie');
    
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <ContextProvider cookies={cookies}>{children}</ContextProvider>
            </body>
        </html>
    );
}
