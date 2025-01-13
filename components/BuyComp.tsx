'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { get_asset_price_median } from '@/actions/findPrice';
import { AssetProps } from '@/objects/Asset';

interface BuyCompProps {
  handleToggleModal: (buy: string) => void;
  isSell: AssetProps | undefined;
  isBuy: AssetProps | undefined;
}

const BuyComp = ({ handleToggleModal, isBuy, isSell }: BuyCompProps) => {
  const [price, setPrice] = useState<{
    priceInCrypto: number;
    priceInUSD: number;
  }>({ priceInCrypto: 0, priceInUSD: 0 });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function fetchPrice() {
      if (isBuy) {
        const fetchedPrice = await get_asset_price_median(
          isBuy.PairID,
          isBuy.Decimals
        );
        setPrice(fetchedPrice);
      }
    }
    fetchPrice();
  }, [isBuy, isSell]);

  return (
    <div className='bg-primary shadow-md rounded-[10px] p-2 flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <span className='opacity-80 text-sm'>Buy</span>
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
