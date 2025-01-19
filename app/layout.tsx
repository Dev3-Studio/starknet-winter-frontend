import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ContextProvider from '@/context';
import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/shadcn/toaster';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

// todo: update metadata
export const metadata: Metadata = {
    title: 'Starknet Winter Hackathon',
    description: 'Starknet Winter Hackathon Frontend',
    authors: [{ name: 'Dev3 Studio', url: 'https://dev3.studio' }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <html lang="en">
                <body className={`${inter.className} antialiased h-dvh`}>
                    <ContextProvider>
                        <div
                            className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,hsla(var(--primary),0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsla(var(--primary),0.4)_1px,transparent_1px)] bg-[size:6rem_4rem]">
                            <div
                                className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,hsla(var(--background)),transparent)]"></div>
                        </div>
                        <div className="grid grid-rows-[auto,5rem] h-full">
                            <div className="overflow-y-scroll no-scrollbar">
                                {children}
                            </div>
                            <Navbar/>
                        </div>
                        <Toaster/>
                    </ContextProvider>
                </body>
            </html>
        </>
    );
}
