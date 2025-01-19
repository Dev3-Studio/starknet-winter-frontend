'use client';

import React, { useEffect, useState } from 'react';
import DrawerModal from '@/components/DrawerModal';
import { PriceProps } from '@/types/AllTypes';
import swapList from '@/public/swapList.json';
import { SellComp } from '@/components/SellComp';
import { BuyComp } from '@/components/BuyComp';
import { SwapComp } from '@/components/SwapComp';
import { getAllPricesFormatted } from '@/actions/getAllPrices';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { SwapButton } from '@/components/SwapButton';
import FeesComp from '@/components/FeesComp';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { swipeBehavior } from '@telegram-apps/sdk';

const SwapPage: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState('');
  const [prices, setPrices] = useState<PriceProps[]>([]);
  const [tokenA, setTokenA] = useState<PriceProps>();
  const [tokenB, setTokenB] = useState<PriceProps>();
  const [amountA, setAmountA] = useState<number>(0);
  const [amountB, setAmountB] = useState<number>(0);
  const [isSwapped, setSwapped] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isSwipeSetup, setSwipeSetup] = useState(false);
  
  const argent = useArgentTelegram();

  const fetchPrice = async () => {
    if (prices.length === swapList.length) {
      return;
    }

    const priceList = await getAllPricesFormatted(swapList);

    setTokenA(priceList ? priceList[0] : undefined);
    setTokenB(priceList[1]);
    setPrices(priceList);
  };

  useEffect(() => {
    if (swipeBehavior.isSupported()) {
      swipeBehavior.disableVertical();
      setSwipeSetup(true);
    }
  }, []);

  useEffect(() => {
    fetchPrice().catch();
    if (amountA === 0 || amountB === 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [amountA, amountB]);

  const handleToggleModal = (action: string) => {
    setAction(action);
    setOpen(!isOpen);
  };

  const handleChooseCrypto = (ticker: string, action: string) => {
    const selectedAsset = prices.find((p) => p.Ticker === ticker);

    if (!selectedAsset) {
      console.error('Asset not found');
      return;
    }

    if (action === 'Buy') {
      if (selectedAsset.Ticker === tokenB?.Ticker) {
        console.error('Cannot buy the same asset being sold');
        return;
      }

      const buyAsset: PriceProps = {
        Name: selectedAsset.Name,
        Ticker: selectedAsset.Ticker,
        PairID: selectedAsset.PairID,
        Decimals: selectedAsset.Decimals,
        priceInCrypto: selectedAsset.priceInCrypto || 0, // Default or fetched value
        priceInUSD: selectedAsset.priceInUSD || 0, // Default or fetched value
      };

      setTokenA(buyAsset);
    } else {
      if (selectedAsset.Ticker === tokenA?.Ticker) {
        console.error('Cannot sell the same asset being bought');
        return;
      }

      const sellAsset: PriceProps = {
        Name: selectedAsset.Name,
        Ticker: selectedAsset.Ticker,
        PairID: selectedAsset.PairID,
        Decimals: selectedAsset.Decimals,
        priceInCrypto: selectedAsset.priceInCrypto || 0, // Default or fetched value
        priceInUSD: selectedAsset.priceInUSD || 0, // Default or fetched value
      };

      setTokenB(sellAsset);
    }

    setOpen(false);
  };

  async function handleSwapTokens() {
    if (tokenA && tokenB) {
      console.log('Swapping..:', tokenA, tokenB);
      if (!isSwapped) {
        const tempT: PriceProps = tokenB;
        setTokenB(tokenA);
        setTokenA(tempT);
        setAmountA(amountA);
        setAmountB(amountB);
      }
    } else {
      console.error('Cannot swap: one of the assets is undefined');
    }

    setTimeout(() => {
      setSwapped(!isSwapped);
    }, 80);
  }

  const handleAmountAChange = (amount: number) => {
    setAmountA(amount);
    if (tokenA && tokenB) {
      const tokenBamount =
        (amount * tokenA.priceInCrypto) / tokenB.priceInCrypto;
      setAmountB(parseFloat(tokenBamount.toFixed(6)));
    }
  };

  const handleAmountBChange = (amount: number) => {
    setAmountB(amount);
    if (tokenA && tokenB) {
      const tokenAamount =
        (amount * tokenB.priceInCrypto) / tokenA.priceInCrypto;
      setAmountA(parseFloat(tokenAamount.toFixed(6)));
    }
  };

  return (
    <div className='flex flex-col items-center h-full bg-transparent p-12'>
      <div className='flex flex-col gap-2 w-full'>
        {/* Sell Comp */}
        <SellComp
          handleToggleModal={handleToggleModal}
          Token={tokenB}
          amount={amountB}
          setAmount={handleAmountBChange}
        />

        {/* Swap Feature */}
        <SwapComp isSwapped={isSwapped} handleSwap={handleSwapTokens} />

        {/* Buy Comp */}
        <BuyComp
          handleToggleModal={handleToggleModal}
          Token={tokenA}
          amount={amountA}
          setAmount={handleAmountAChange}
        />

        <DrawerModal
          handleToggleModal={handleToggleModal}
          handleChooseCrypto={handleChooseCrypto}
          typeAction={typeAction}
          isOpen={isOpen}
          cryptos={prices}
        />

        {argent.isConnected ? (
          <SwapButton
            callback={() => {}}
            className={''}
            wallet={argent.account?.address}
            active={isActive}
          />
        ) : (
          <ConnectWalletButton />
        )}

        {/* Fees Comp */}
        {!amountA || !amountB ? null : (
          <FeesComp
            amountA={amountA}
            tokenA={tokenA}
            tokenB={tokenB}
            address={argent.account.address}
          />
        )}
      </div>
    </div>
  );
};

export default SwapPage;
