'use client';

import { Button } from '@/components/shadcn/button';
import { ArrowDownUpIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DrawerModal from '@/components/DrawerModal';

interface SellCompProps {
  handleToggleModal: (sell: string) => void;
}

const SellComp = ({ handleToggleModal }: SellCompProps) => {
  return (
    <div className='bg-gray-500 shadow-md rounded-[10px] p-2 flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <span className='opacity-80 text-sm'>Sell</span>
        <input
          placeholder='0.00'
          className='w-2/3 bg-transparent placeholder-inherit'
        />

        <span className='flex opacity-80 items-baseline'>
          <p className='text-lg'>$ 0</p>
          <p className='text-sm'>.00</p>
        </span>
      </div>
      <div className='flex items-center text-xl text-left h-full '>
        <Button
          className='rounded-full bg-accent flex text-primary-foreground gap-4 w-32'
          onClick={() => handleToggleModal('Sell')}
        >
          <img src='/Sushi.webp' className='w-6 h-6 rounded-full' />
          <p>SUSHI</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

interface BuyCompProps {
  handleToggleModal: (buy: string) => void;
}

const BuyComp = ({ handleToggleModal }: BuyCompProps) => {
  return (
    <div className='bg-primary shadow-md rounded-[10px] p-2 flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <span className='opacity-80 text-sm'>Buy</span>
        <input
          placeholder='0.00'
          className='w-2/3 bg-transparent placeholder-inherit'
        />

        <span className='flex opacity-80 items-baseline'>
          <p className='text-lg'>$ 0</p>
          <p className='text-sm'>.00</p>
        </span>
      </div>
      <div className='flex items-center text-xl text-left h-full '>
        <Button
          className='rounded-full bg-accent flex text-primary-foreground gap-4 w-32'
          onClick={() => handleToggleModal('Buy')}
        >
          <img src='/ethereum.webp' className='w-6 h-6 rounded-full' />
          <p>ETH</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

const SwapComp = () => {
  const [isSwapped, setSwapped] = useState(false);

  function handleSwap() {
    setSwapped(!isSwapped);
    setTimeout(() => {
      setSwapped(false);
    }, 150);
  }

  return (
    <div
      className='flex flex-col justify-center bg-accent items-center size-12 rounded-full self-center active:bg-foreground'
      onClick={handleSwap}
    >
      <ArrowDownUpIcon color={isSwapped ? '#FFA600' : 'white'} size={28} />
    </div>
  );
};

const SwapPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState('');

  const handleToggleModal = (action: string) => {
    setAction(action);
    setOpen(!isOpen);
  };

  return (
    <div className='flex flex-col items-center h-screen bg-transparent p-12'>
      <div className='flex flex-col gap-2 w-full'>
        {/* Sell Comp */}
        <SellComp handleToggleModal={handleToggleModal} />

        {/* Swap Feature */}
        <SwapComp />

        {/* Buy Comp */}
        <BuyComp handleToggleModal={handleToggleModal} />

        <DrawerModal
          handleToggleModal={handleToggleModal}
          typeAction={typeAction}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default SwapPage;
