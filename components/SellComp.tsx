import { Price } from '@/objects/Price';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
interface SellCompProps {
  handleToggleModal: (sell: string) => void;
  isSell: Price | any;
}

const SellComp = ({ handleToggleModal, isSell }: SellCompProps) => {
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
          className='rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40'
          onClick={() => handleToggleModal('Sell')}
        >
          <img src='/Sushi.webp' className='w-6 h-6 rounded-full' />
          <p>{isSell ? isSell.Name : ''}</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export { SellComp };
