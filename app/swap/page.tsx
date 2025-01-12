'use client';

import { Button } from '@/components/shadcn/button';
import { ArrowDownUpIcon, ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DrawerModal from '@/components/DrawerModal';
import { Price } from '@/objects/Price';
import { get_asset_price_median } from '@/hooks/findPrice';
import { assetList } from '@/objects/AssetList';
import { PriceItemProps } from '@/objects/PriceItem';

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

const SwapComp = () => {
  const [isSwapped, setSwapped] = useState(false);

  function handleSwap() {
    setSwapped(!isSwapped);
    setTimeout(() => {
      setSwapped(false);
    }, 80);
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

const SwapPage: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState('');
  const [price, setPrice] = useState<Price[]>([]);
  const [isBuy, setBuy] = useState<PriceItemProps>();
  const [isSell, setSell] = useState<PriceItemProps>();

  useEffect(() => {
    const randomBuy: PriceItemProps =
      assetList[Math.floor(Math.random() * assetList.length)];
    const randomSell: PriceItemProps =
      assetList[Math.floor(Math.random() * assetList.length)];

    setBuy(randomBuy);
    setSell(randomSell);
    console.log('Buy:', randomBuy);
    console.log('Sell:', randomSell);
    const fetchPrice = async () => {
      if (price.length === assetList.length) {
        return;
      }

      const prices = [];
      for (const asset of assetList) {
        const fetchedPrice = await get_asset_price_median(
          asset.PairID,
          asset.Decimals
        );
        prices.push({
          Name: asset.Name,
          Ticker: asset.Ticker,
          priceInCrypto: fetchedPrice.priceInCrypto,
          priceInUSD: fetchedPrice.priceInUSD,
        });
      }
      setPrice(prices);
    };
    fetchPrice();
  }, []);

  const handleToggleModal = (action: string) => {
    setAction(action);
    setOpen(!isOpen);
  };

  return (
    <div className='flex flex-col items-center h-screen bg-transparent p-12'>
      <div className='flex flex-col gap-2 w-full'>
        {/* Sell Comp */}
        <SellComp handleToggleModal={handleToggleModal} isSell={isSell} />

        {/* Swap Feature */}
        <SwapComp />

        {/* Buy Comp */}
        <BuyComp handleToggleModal={handleToggleModal} isBuy={isBuy} />

        <DrawerModal
          handleToggleModal={handleToggleModal}
          typeAction={typeAction}
          isOpen={isOpen}
          cryptos={price}
        />
      </div>
    </div>
  );
};

export default SwapPage;
