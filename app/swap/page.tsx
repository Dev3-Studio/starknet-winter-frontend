'use client';

import React, { useCallback, useEffect, useState } from 'react';
import DrawerModal from '@/components/DrawerModal';
import { PriceProps } from '@/types/Price';
import { get_asset_price_median } from '@/actions/findPrice';
import assetList from '@/public/AssetList.json';
import { AssetProps } from '@/types/Asset';
import { SellComp } from '@/components/SellComp';
import { BuyComp } from '@/components/BuyComp';
import { SwapComp } from '@/components/SwapComp';

const SwapPage: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState('');
  const [price, setPrice] = useState<PriceProps[]>([]);
  const [isBuy, setBuy] = useState<PriceProps>();
  const [isSell, setSell] = useState<PriceProps>();

  useEffect(() => {
    const randomBuy: AssetProps = assetList[0];
    const randomSell: AssetProps = assetList[1];

    const fetchPrice = async () => {
      if (price.length === assetList.length) {
        return;
      }

      const prices = [];
      let fetchedBuy: PriceProps | null = null;
      let fetchedSell: PriceProps | null = null;

      for (const asset of assetList) {
        const fetchedPrice = await get_asset_price_median(
          asset.PairID,
          asset.Decimals
        );

        // current asset matches the random buy or sell
        if (asset.Name === randomBuy.Name) {
          fetchedBuy = {
            Name: asset.Name,
            Ticker: asset.Ticker,
            priceInCrypto: fetchedPrice.priceInCrypto,
            priceInUSD: fetchedPrice.priceInUSD,
          };
        }
        if (asset.Name === randomSell.Name) {
          fetchedSell = {
            Name: asset.Name,
            Ticker: asset.Ticker,
            priceInCrypto: fetchedPrice.priceInCrypto,
            priceInUSD: fetchedPrice.priceInUSD,
          };
        }

        prices.push({
          Name: asset.Name,
          Ticker: asset.Ticker,
          priceInCrypto: fetchedPrice.priceInCrypto,
          priceInUSD: fetchedPrice.priceInUSD,
        });
      }

      // Update the buy and sell state after all prices are fetched
      if (fetchedBuy) {
        setBuy(fetchedBuy);
      }
      if (fetchedSell) {
        setSell(fetchedSell);
      }

      setPrice(prices);
    };

    fetchPrice();
  }, [assetList, setBuy, setSell, setPrice]);

  const handleToggleModal = (action: string) => {
    setAction(action);
    setOpen(!isOpen);
  };

  const handleChooseCrypto = useCallback(
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
    },
    [assetList, isBuy, isSell, setBuy, setSell, setOpen] // Dependencies
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
