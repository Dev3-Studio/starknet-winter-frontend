'use client';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { PriceProps } from '@/types/AllTypes';

interface SellCompProps {
  handleToggleModal: (buy: string) => void;
  Token: PriceProps | undefined;
  amount: number;
  setAmount: (amount: number) => void;
}

const SellComp: React.FC<SellCompProps> = ({
  handleToggleModal,
  Token,
  amount,
  setAmount,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  return (
    <div className='bg-gray-500 shadow-md rounded-[10px] p-2 flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <span className='opacity-80 text-sm'>Sell</span>
        <input
          placeholder={amount.toString() || '0'}
          type='number'
          className={cn(
            'w-2/3 bg-transparent placeholder-inherit focus-within:border-none focus:outline-none'
          )}
          onChange={handleInputChange}
        />

        <span className='flex opacity-80 items-baseline'>
          <p className='text-lg'>
            $ {(amount * (Token?.priceInCrypto ?? 0)).toFixed(4)}
          </p>
        </span>
      </div>
      <div className='flex items-center text-xl text-left h-full '>
        <Button
          className='rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40'
          onClick={() => handleToggleModal('Sell')}
        >
          <img
            src={Token ? `./${Token.Name}.webp` : undefined}
            className='w-6 h-6 rounded-full'
          />
          <p>{Token ? Token.Name : ''}</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export { SellComp };
