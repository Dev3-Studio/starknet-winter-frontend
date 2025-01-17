import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/context";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { ToasterPrompt } from '@/components/ToasterPrompt';
import Script from 'next/script';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// todo: update metadata
export const metadata: Metadata = {
  title: "Starknet Winter Hackathon",
  description: "Starknet Winter Hackathon Frontend",
  authors: [{ name: "Dev3 Studio", url: "https://dev3.studio" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {/* todo Figure out why adding the script breaks the wallet connection flow */}
      <Script src="https://telegram.org/js/telegram-web-app.js?56"/>
      <html lang="en">
        <body className={`${inter.className} antialiased h-dvh`}>
          <ContextProvider>
            <div className="grid grid-rows-[auto,5rem,0] h-full">
              {children}
              <div>
                <Navbar />
              </div>
            <ToasterPrompt />
            </div>
          </ContextProvider>
        </body>
      </html>
    </>
  );
}
