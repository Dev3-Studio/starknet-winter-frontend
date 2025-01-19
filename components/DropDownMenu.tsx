import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet';

import { CircleChevronLeftIcon } from 'lucide-react';
import { Navbar } from './Navbar';
import Image from 'next/image';
import { ConnectWalletButton } from './ConnectWalletButton';

export function DropDownMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <CircleChevronLeftIcon />
      </SheetTrigger>
      <SheetContent className='flex flex-col justify-between'>
        <div>
          <SheetHeader>
            <a href='https://dev3.studio'>
              <Image
                src={'https://cdn.dev3.studio/logo.svg'}
                alt={'Dev3 Studio Logo'}
                className='h-4 w-auto'
                width={300}
                height={62}
              />
            </a>
            <SheetTitle className='self-center'>Menu</SheetTitle>
          </SheetHeader>
          <Navbar className='flex-col bg-transparent' />
          <ConnectWalletButton />
        </div>
        <a
          className='self-center text-xs text-muted-foreground flex items-center gap-1'
          href='https://teleswap.gitbook.io/teleswap-docs/'
        >
          Made with ❤️ by{' '}
          <Image
            src={'https://cdn.dev3.studio/logo.svg'}
            alt={'Teleswap'}
            className='h-2 w-auto'
            width={300}
            height={62}
          />
        </a>
      </SheetContent>
    </Sheet>
  );
}
