import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/shadcn/sheet';
import Image from 'next/image';
import { ConnectWalletButton } from './ConnectWalletButton';
import { Menu } from 'lucide-react';
import WalletStats from '@/components/WalletStats';

export function DropDownMenu() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu/>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
                <div className="grid grid-rows-[auto,1fr,auto] h-full">
                    <SheetHeader>
                        <Image
                            src={'./teleswap-w.svg'}
                            alt={'Teleswap'}
                            className="h-4 w-auto"
                            width={134}
                            height={28}
                        />
                        {/*<SheetTitle className="self-center">Menu</SheetTitle>*/}
                    </SheetHeader>
                    <WalletStats/>
                    {/*<Navbar className="flex-col bg-transparent"/>*/}
                    <ConnectWalletButton/>
                </div>
                <a
                    className="self-center text-xs text-muted-foreground flex items-center gap-1"
                    href="https://teleswap.gitbook.io/teleswap-docs/"
                >
                    Made with ❤️ by{' '}
                    <Image
                        src={'https://cdn.dev3.studio/logo.svg'}
                        alt={'Teleswap'}
                        className="h-2 w-auto"
                        width={300}
                        height={62}
                    />
                </a>
            </SheetContent>
        </Sheet>
    );
}
