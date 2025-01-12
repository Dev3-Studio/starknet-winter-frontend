'use client';

import { Button } from '@/components/shadcn/button';
import { ArrowDownUpIcon, ChevronDown } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import DrawerModal from '@/components/DrawerModal';
import { Price } from '@/objects/Price';
import { get_asset_price_median } from '@/hooks/findPrice';
import { assetList } from '@/objects/AssetList';
import { PriceItemProps } from '@/objects/PriceItem';
import { SellComp } from '@/components/SellComp';
import { BuyComp } from '@/components/BuyComp';

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

    randomBuy != randomSell;

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

  const handleChooseCrypto = useCallback(
    (ticker: string, action: string) => {
      if (action === 'Buy') {
        const buy = assetList.find((p) => p.Ticker === ticker);
        setBuy(buy);
        console.log('Set Buy', buy);
      } else {
        const sell = assetList.find((p) => p.Ticker === ticker);
        setSell(sell);
        console.log('Set Sell', sell);
      }
      setOpen(false);
    },
    [assetList, setBuy, setSell, setOpen] // Dependencies
  );

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
          handleChooseCrypto={handleChooseCrypto}
          typeAction={typeAction}
          isOpen={isOpen}
          cryptos={price}
        />
      </div>
    </div>
  );
};

export default SwapPage;
