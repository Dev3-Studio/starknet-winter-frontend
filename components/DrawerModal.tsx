import { SearchIcon, XIcon } from 'lucide-react';
import { Button } from './shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/shadcn/drawer';

interface TokenListModalProps {
  handleToggleModal: () => void;
  typeAction: string;
  isOpen: boolean;
  cryptos?: Array<string>;
}

const Cryptos = [
  'ETH',
  'BTC',
  'ADA',
  'SOL',
  'XRP',
  'DOGE',
  'BNB',
  'LTC',
  'DOT',
  'SHIB',
  'AVAX',
];

function CryptoList({ cryptos }: { cryptos: string[] }) {
  return (
    <div className='list-none pl-5 flex flex-col gap-4 pb-3 w-full text-left'>
      {cryptos.map((crypto, index) => (
        <div key={index}>{crypto}</div>
      ))}
    </div>
  );
}

export default function DrawerModal({
  handleToggleModal,
  typeAction,
  isOpen,
  cryptos = [],
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
            <CryptoList cryptos={Cryptos} />
          </div>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
