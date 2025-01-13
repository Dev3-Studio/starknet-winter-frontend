'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { get_asset_price_median } from '@/actions/findPrice';
import { AssetProps } from '@/objects/Asset';

interface SellCompProps {
  handleToggleModal: (sell: string) => void;
  isSell: AssetProps | undefined;
  isBuy: AssetProps | undefined;
}

const SellComp = ({ handleToggleModal, isSell, isBuy }: SellCompProps) => {
  const [price, setPrice] = useState<{
    priceInCrypto: number;
    priceInUSD: number;
  }>({ priceInCrypto: 0, priceInUSD: 0 });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function fetchPrice() {
      if (isSell) {
        const fetchedPrice = await get_asset_price_median(
          isSell.PairID,
          isSell.Decimals
        );
        setPrice(fetchedPrice);
      }
    }
    fetchPrice();
  }, [isSell]);
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
          onChange={(e) =>
            setAmount(
              e.target.value
                ? Number(e.target.value) * (price.priceInCrypto || 0)
                : 0
            )
          }
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
          <img src='/Sushi.webp' className='w-6 h-6 rounded-full' />
          <p>{isSell ? isSell.Name : ''}</p>
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export { SellComp };
