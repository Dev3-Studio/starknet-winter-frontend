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

import { PriceProps } from '@/objects/Price';
import { PriceItem } from './PriceItem';

interface DrawerModalProps {
  handleToggleModal: (arg: string) => void;
  handleChooseCrypto: (arg: string, action: string) => void;

  typeAction: string;
  isOpen: boolean;
  cryptos: Array<PriceProps>;
}

interface CryptoListProps {
  cryptos: Array<PriceProps>;
  typeAction: string;
  handleChooseCrypto: (arg: string, action: string) => void;
}

function CryptoList({
  cryptos,
  typeAction,
  handleChooseCrypto,
}: CryptoListProps) {
  return (
    <div className='list-none pl-5 flex flex-col gap-4 pb-3 w-full text-left'>
      {cryptos ? (
        cryptos.map((crypto, index) => (
          <PriceItem
            key={index}
            price={crypto}
            typeAction={typeAction}
            onClick={() => handleChooseCrypto(crypto.Ticker, typeAction)}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default function DrawerModal({
  handleToggleModal,
  handleChooseCrypto,
  typeAction,
  isOpen,
  cryptos = [],
}: DrawerModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={() => handleToggleModal('')}>
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
            <CryptoList
              cryptos={cryptos}
              typeAction={typeAction}
              handleChooseCrypto={handleChooseCrypto}
            />
          </div>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
