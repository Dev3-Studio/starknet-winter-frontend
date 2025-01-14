'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { PriceProps } from '@/objects/Price';

interface SellCompProps {
  handleToggleModal: (sell: string) => void;
  isSell: PriceProps | undefined;
  isBuy: PriceProps | undefined;
}

const SellComp = ({ handleToggleModal, isSell, isBuy }: SellCompProps) => {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (value: string) => {
    if (!isBuy) {
      console.error('isSell is undefined');
      setAmount(0);
      return;
    }

    const newAmount = value ? Number(value) * (isBuy.priceInCrypto || 0) : 0;
    setAmount(newAmount);
  };

  return (
    <div className='bg-gray-500 shadow-md rounded-[10px] p-2 flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <span className='opacity-80 text-sm'>Sell</span>
        <input
          placeholder='0.00'
          type='number'
          className={cn(
            'w-2/3 bg-transparent placeholder-inherit focus-within:border-none focus:outline-none'
          )}
          onChange={(e) => handleAmountChange(e.target.value)}
        />

        <span className='flex opacity-80 items-baseline'>
          <p className='text-lg'>$ {amount.toFixed(4)}</p>
        </span>
      </div>
      <div className='flex items-center text-xl text-left h-full '>
        <Button
          className='rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40'
          onClick={() => handleToggleModal('Sell')}
        >
          <img
            src={isSell ? `./${isSell.Name}.webp` : undefined}
            className='w-6 h-6 rounded-full'
          />
          <p>{isSell ? isSell.Name : ''}</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export { SellComp };
