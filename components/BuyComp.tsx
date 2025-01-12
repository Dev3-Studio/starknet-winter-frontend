import { Price } from '@/objects/Price';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
interface BuyCompProps {
  handleToggleModal: (buy: string) => void;
  isBuy: Price | any;
}

const BuyComp = ({ handleToggleModal, isBuy }: BuyCompProps) => {
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
          className='rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40'
          onClick={() => handleToggleModal('Buy')}
        >
          <img src='/ethereum.webp' className='w-6 h-6 rounded-full' />
          <p>{isBuy ? isBuy.Name : ''}</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export { BuyComp };
