'use client';

import React, { useCallback, useEffect, useState } from 'react';
import DrawerModal from '@/components/DrawerModal';
import { Price } from '@/objects/Price';
import { get_asset_price_median } from '@/actions/findPrice';
import { assetList } from '@/objects/AssetList';
import { AssetProps } from '@/objects/Asset';
import { SellComp } from '@/components/SellComp';
import { BuyComp } from '@/components/BuyComp';
import { SwapComp } from '@/components/SwapComp';

const SwapPage: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState('');
  const [price, setPrice] = useState<Price[]>([]);
  const [isBuy, setBuy] = useState<AssetProps>();
  const [isSell, setSell] = useState<AssetProps>();

  useEffect(() => {
    const randomBuy: AssetProps =
      assetList[Math.floor(Math.random() * assetList.length)];
    const randomSell: AssetProps =
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
        if (buy === isSell) {
          console.error('Cannot buy the same asset');
          return;
        }
        setBuy(buy);
      } else {
        const sell = assetList.find((p) => p.Ticker === ticker);
        if (sell === isBuy) {
          console.error('Cannot buy the same asset');
          return;
        }
        setSell(sell);
      }
      setOpen(false);
    },
    [assetList, setBuy, setSell, setOpen] // Dependencies
  );

  return (
    <div className='flex flex-col items-center h-screen bg-transparent p-12'>
      <div className='flex flex-col gap-2 w-full'>
        {/* Sell Comp */}
        <SellComp
          handleToggleModal={handleToggleModal}
          isSell={isSell}
          isBuy={isBuy}
        />

        {/* Swap Feature */}
        <SwapComp
          isBuy={isBuy}
          isSell={isSell}
          setBuy={setBuy}
          setSell={setSell}
        />

        {/* Buy Comp */}
        <BuyComp
          handleToggleModal={handleToggleModal}
          isBuy={isBuy}
          isSell={isSell}
        />

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
