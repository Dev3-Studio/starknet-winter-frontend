'use client';

import React, { useEffect, useState } from 'react';
import { PriceProps } from '@/types/AllTypes';
import { getAllPricesFormatted } from '@/actions/getAllPrices';
import { useArgent } from '@/hooks/useArgent';
import { swipeBehavior } from '@telegram-apps/sdk';
import { TokenSelector } from '@/components/TokenSelector';
import { SwapComp } from '@/components/SwapComp';
import { SwapButton } from '@/components/SwapButton';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import FeesComp from '@/components/FeesComp';

const supportedTokens = ["ETH", "USDC", "STRK"];
const usdc = { Name: 'USDC', Ticker: 'USDC/USD', PairID: '', priceInCrypto: 1, Decimals: 18, priceInUSD: 1 };

export type SwapToken = {
    token: PriceProps;
    amount: number;
}

const Swap: React.FC = () => {
    const [prices, setPrices] = useState<PriceProps[]>([]);
    const [tokenIn, settokenIn] = useState<SwapToken>({ token: usdc, amount: 0 });
    const [tokenOut, setTokenOut] = useState<SwapToken>({ token: usdc, amount: 10 });
    
    const { account } = useArgent();
    
    function setAmountIn(amount: number) {
        settokenIn((prev) => ({ ...prev, amount }));
    }
    
    function setAmountOut(amount: number) {
        setTokenOut((prev) => ({ ...prev, amount }));
    }
    
    // fetch price list
    const updatePrice = () => {
        getAllPricesFormatted().then(
            (priceList) => {
                priceList = priceList.filter((p) => supportedTokens.includes(p.Name));
                // add usdc as it is not supported in pragma
                setPrices([...priceList, usdc]);
                settokenIn({ token: priceList[0], amount: 0 });
                setTokenOut({ token: usdc, amount: 0 });
            });
    };
    
    useEffect(() => {
        updatePrice();
        if (swipeBehavior.isSupported()) {
            swipeBehavior.disableVertical();
        }
    }, []);
    
    
    const handleChooseCrypto = (ticker: string, action: string) => {
        const selectedAsset = prices.find((p) => p.Ticker === ticker);
        
        if (!selectedAsset) {
            console.error('Asset not found');
            return;
        }
        
        if (action === 'buy' && tokenOut) {
            if (selectedAsset.Ticker === tokenOut.token.Ticker) {
                handleSwapTokens();
                return;
            }
            
            settokenIn({ token: selectedAsset, amount: 0 });
        } else {
            if (!tokenIn) return;
            if (selectedAsset.Ticker === tokenIn.token.Ticker) {
                handleSwapTokens();
                return;
            }
            setTokenOut((prev) => ({ ...prev, token: selectedAsset }));
        }
    };
    
    function handleSwapTokens() {
        if (tokenIn && tokenOut) {
        
            const tempT: SwapToken = tokenOut;
            setTokenOut(tokenIn);
            settokenIn(tempT);
        }
    }
    
    function calculateOtherTokenAmount(token: SwapToken, otherToken: SwapToken) {
        if (tokenIn && tokenOut) {
            // Other token is same usd value as token
            const otherTokenAmount = (token.amount * token.token.priceInUSD) / otherToken.token.priceInUSD;
            return parseFloat(otherTokenAmount.toFixed(6));
        }
        return 0;
    }
    
    const handleAmountInChange = (amount: number) => {
        setAmountIn(amount);
        // bypass slow react state update
        const otherTokenAmount = calculateOtherTokenAmount({ ...tokenIn, amount }, tokenOut);
        setAmountOut(otherTokenAmount);
    };
    
    const handleAmountOutChange = (amount: number) => {
        setAmountOut(amount);
        // bypass slow react state update
        const otherTokenAmount = calculateOtherTokenAmount({ ...tokenOut, amount }, tokenIn);
        setAmountIn(otherTokenAmount);
    };
    
    
    return (
        <div className='flex flex-col items-center h-full bg-transparent p-12'>
            <div className='flex flex-col gap-2 w-full'>
                {/* Sell Comp */}
                <TokenSelector
                    Token={tokenIn}
                    setAmount={handleAmountInChange}
                    type="buy"
                    handleChooseCrypto={handleChooseCrypto}
                    cryptos={prices.filter((p) => p.Ticker !== tokenIn.token.Ticker)}
                />
                
                {/* Swap Feature */}
                <SwapComp isSwapped={false} handleSwap={handleSwapTokens} />
                
                {/* Buy Comp */}
                <TokenSelector
                    Token={tokenOut}
                    setAmount={handleAmountOutChange}
                    type="sell"
                    handleChooseCrypto={handleChooseCrypto}
                    cryptos={prices.filter((p) => p.Ticker !== tokenOut.token.Ticker)}
                />
                
                {account ? (
                    <SwapButton
                        className={''}
                        wallet={account.address}
                    />
                ) : (
                    <ConnectWalletButton />
                )}
                
                {/* Fees Comp */}
                {/*{!tokenIn || !tokenOut || !account ? null : (*/}
                {/*    <FeesComp*/}
                {/*        tokenIn={tokenIn}*/}
                {/*        tokenOut={tokenOut}*/}
                {/*        address={account.address}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default Swap;
