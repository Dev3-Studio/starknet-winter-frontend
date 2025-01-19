'use client';

import { useState } from 'react';
import { Button } from '@/components/shadcn/button';
import { AlignJustifyIcon, Grid2X2Icon } from 'lucide-react';
import TokenPriceCard from '@/components/TokenPriceCard';
import TokenPriceList from './TokenPriceList';

type MarketClientProps = {
  prices: {
    Name: string;
    priceInUSD: number;
  }[];
};

export default function MarketClient({ prices }: MarketClientProps) {
  const [toggle, setToggle] = useState(true);

  function getTokenImage(token: string) {
    return `./${token}.webp`;
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  const MarketCards = () => {
    return (
      <div className='grid grid-cols-3 gap-4 p-4'>
        {prices.map((asset, index) => (
          <TokenPriceCard
            key={index}
            token={asset.Name}
            image={getTokenImage(asset.Name)}
            price={asset.priceInUSD}
            className='card'
          />
        ))}
      </div>
    );
  };

  const MarketList = () => {
    return (
      <div className='flex flex-rows flex-wrap gap-4 px-4 w-md mx-4 mt-4 rounded-t-2xl bg-secondary'>
        {prices.map((asset, index) => (
          <TokenPriceList
            key={index}
            token={asset.Name}
            image={getTokenImage(asset.Name)}
            price={asset.priceInUSD}
            className='list'
          />
        ))}
      </div>
    );
  };

  return (
    <div className=''>
      <div className='flex flex-rows overflow-clip place-content-end'>
        <Button
          onClick={handleToggle}
          className='bg-transparent hover:bg-secondary absolute left-48 top-4'
        >
          {toggle ? <AlignJustifyIcon /> : <Grid2X2Icon />}
        </Button>
      </div>
      <div className='w-screen h-[calc(100vh-133px)] overflow-x-auto'>
        {toggle ? <MarketCards /> : <MarketList />}
      </div>
    </div>
  );
}
