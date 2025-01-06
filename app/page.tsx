import Image from 'next/image';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import {Navbar} from "@/components/Navbar";

export default function Home() {
    return (
        <div
            className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
            <main className="flex flex-col gap-8 w-full items-center sm:items-start">
                <div className="justify-self-center">
                    {/*<ConnectWalletButton/>*/}
                    <button className="bg-purple-500 px-8 py-2 rounded-[8px]">Connect Wallet</button>
                </div>

                <div className="flex gap-2 fixed bottom-0 flex-col sm:flex-row">
                    <Navbar />
                </div>

            </main>

            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
