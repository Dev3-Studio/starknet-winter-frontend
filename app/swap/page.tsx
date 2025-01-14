'use client';

import React, { useEffect, useState } from 'react';
import DrawerModal from '@/components/DrawerModal';
import { PriceProps } from '@/types/Price';
import assetList from '@/public/AssetList.json';
import { SellComp } from '@/components/SellComp';
import { BuyComp } from '@/components/BuyComp';
import { SwapComp } from '@/components/SwapComp';
import { getAllPricesFormatted } from '@/actions/getAllPrices';

const SwapPage: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState('');
  const [price, setPrice] = useState<PriceProps[]>([]);
  const [isBuy, setBuy] = useState<PriceProps>();
  const [isSell, setSell] = useState<PriceProps>();
  
  const fetchPrice = async () => {
    if (price.length === assetList.length) {
      return;
    }
    
    const prices = await getAllPricesFormatted();
    setPrice(prices);
  };
  
  useEffect(() => {
    fetchPrice().catch();
  }, []);

  const handleToggleModal = (action: string) => {
    setAction(action);
    setOpen(!isOpen);
  };

  const handleChooseCrypto =
    (ticker: string, action: string) => {
      const selectedAsset = price.find((p) => p.Ticker === ticker);

      if (!selectedAsset) {
        console.error('Asset not found');
        return;
      }

      if (action === 'Buy') {
        if (selectedAsset.Ticker === isSell?.Ticker) {
          console.error('Cannot buy the same asset being sold');
          return;
        }

        const buyAsset: PriceProps = {
          Name: selectedAsset.Name,
          Ticker: selectedAsset.Ticker,
          priceInCrypto: selectedAsset.priceInCrypto || 0, // Default or fetched value
          priceInUSD: selectedAsset.priceInUSD || 0, // Default or fetched value
        };

        setBuy(buyAsset);
      } else {
        if (selectedAsset.Ticker === isBuy?.Ticker) {
          console.error('Cannot sell the same asset being bought');
          return;
        }

        const sellAsset: PriceProps = {
          Name: selectedAsset.Name,
          Ticker: selectedAsset.Ticker,
          priceInCrypto: selectedAsset.priceInCrypto || 0, // Default or fetched value
          priceInUSD: selectedAsset.priceInUSD || 0, // Default or fetched value
        };

        setSell(sellAsset);
      }

      setOpen(false);
    };

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
