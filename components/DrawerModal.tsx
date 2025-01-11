'use client';
import { SearchIcon } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/shadcn/drawer';

import { PriceItemProps } from '@/objects/PriceItem';
import { PriceItem } from '@/components/PriceItem';
import { assetList } from '@/hooks/findPrice';

interface TokenListModalProps {
  handleToggleModal: () => void;
  typeAction: string;
  isOpen: boolean;
  cryptos: Array<PriceItemProps>;
}

function CryptoList({ cryptos }: { cryptos: Array<PriceItemProps> }) {
  return (
    <div className='list-none pl-5 flex flex-col gap-4 pb-3 w-full text-left'>
      {cryptos.map((crypto, index) => (
        <PriceItem
          key={index}
          Ticker={crypto.Ticker}
          PairID={crypto.PairID}
          Decimals={crypto.Decimals}
        />
      ))}
    </div>
  );
}

export default function DrawerModal({
  handleToggleModal,
  typeAction,
  isOpen,
  cryptos = assetList,
}: TokenListModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={handleToggleModal}>
      <DrawerContent>
        <DrawerHeader className='space-y-4'>
          <DrawerTitle>{typeAction}</DrawerTitle>
          <DrawerDescription>
            Select a token from our default list or search for a token by symbol
            or address.
          </DrawerDescription>
          <div className='flex gap-2 border-b-2 border-muted pb-2'>
            <SearchIcon />
            <input
              placeholder='Search Tokens'
              className='bg-transparent outline-none placeholder-white'
            />
          </div>
          <div className='max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4'>
            <CryptoList cryptos={cryptos} />
          </div>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
