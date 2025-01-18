'use client';

import React, { useEffect, useState } from 'react';
import { PriceProps } from '@/types/AllTypes';

import { getAllPricesFormatted } from '@/actions/getAllPrices';

import { useArgent } from '@/hooks/useArgent';
import { swipeBehavior } from '@telegram-apps/sdk';
import { TokenSelector } from '@/components/TokenSelector';
import { SwapComp } from '@/components/SwapComp';
import DrawerModal from '@/components/DrawerModal';
import { SwapButton } from '@/components/SwapButton';
import FeesComp from '@/components/FeesComp';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';

const supportedTokens = ["ETH", "USDC", "STRK"];

export type SwapToken = {
    token: PriceProps;
    amount: number;
}

const placeHolderToken: PriceProps = {
    Name: '',
    Ticker: '',
    PairID: '',
    priceInCrypto: 0,
    Decimals: 0,
    priceInUSD: 0,
};


const Swap: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const [typeAction, setAction] = useState('');
    const [prices, setPrices] = useState<PriceProps[]>([]);
    const [tokenIn, settokenIn] = useState<SwapToken>({ token: placeHolderToken, amount: 0 });
    const [tokenOut, setTokenOut] = useState<SwapToken>({ token: placeHolderToken, amount: 0 });

    const [isActive, setActive] = useState(false);
    const [isSwipeSetup, setSwipeSetup] = useState(false);
    
    const { account } = useArgent();
    
    function setAmountIn(amount: number) {
        settokenIn((prev) => ({ ...prev, amount }));
    }
    
    function setAmountOut(amount: number) {
        setTokenOut((prev) => ({ ...prev, amount }));
    }
    
    // fetches and sets prices for buy and sell
    const updatePrice = () => {
        console.log('Updating Prices');
        getAllPricesFormatted().then(
            (priceList) => {
                // console.log('PriceList:', priceList);
                priceList = priceList.filter((p) => supportedTokens.includes(p.Name));
                const tInAmt = tokenIn.amount;
                const tOutAmt = tokenOut.amount;
                    settokenIn({ token: priceList[0], amount: tInAmt });
                    setTokenOut({ token: priceList[1], amount: tOutAmt });
                    setPrices(priceList);
            });
    };
    
    useEffect(() => {
        if (swipeBehavior.isSupported()) {
            swipeBehavior.disableVertical();
            setSwipeSetup(true);
        }
    }, []);
    
    useEffect(() => {
        console.log(tokenIn)
        
        updatePrice();
        if (tokenIn.amount === 0 || tokenOut.amount === 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [tokenIn]);
    
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
        
        if (action === 'Buy' && tokenOut) {
            if (selectedAsset.Ticker === tokenOut.token.Ticker) {
                console.error('Cannot buy the same asset being sold');
                return;
            }
            
            settokenIn({ token: selectedAsset, amount: 0 });
        } else {
            if (!tokenIn) return;
            if (selectedAsset.Ticker === tokenIn.token.Ticker) {
                console.error('Cannot sell the same asset being bought');
                return;
            }
            
            setTokenOut((prev) => ({ ...prev, token: selectedAsset }));
        }
        
        setOpen(false);
    };
    
    function handleSwapTokens() {
        if (tokenIn && tokenOut) {
            console.log('Swapping..:', tokenIn, tokenOut);
        
            const tempT: SwapToken = tokenOut;
            setTokenOut(tokenIn);
            settokenIn(tempT);
        }
    }
    
    const handleAmountInChange = (amount: number) => {
        setAmountIn(amount);
        if (tokenIn && tokenOut) {
            const tokenBamount =
                (amount * tokenIn.token.priceInCrypto) / tokenOut.token.priceInCrypto;
            setAmountOut(parseFloat(tokenBamount.toFixed(6)));
        }
    };
    
    const handleAmountOutChange = (amount: number) => {
        setAmountOut(amount);
        if (tokenIn && tokenOut) {
            const tokenInAmt = (amount * tokenOut.token.priceInCrypto) / tokenIn.token.priceInCrypto;
            
            settokenIn((prev) => ({ ...prev,  amount: parseFloat(tokenInAmt.toFixed(6)) }));
        }
    };
    
    return (
        <div className='flex flex-col items-center h-full bg-transparent p-12'>
            <div className='flex flex-col gap-2 w-full'>
                {/* Sell Comp */}
                <TokenSelector
                    handleToggleModal={handleToggleModal}
                    Token={tokenOut}
                    setAmount={handleAmountOutChange}
                    type="buy"
                />
                
                {/* Swap Feature */}
                {/* todo replace isSwapped */}
                <SwapComp isSwapped={false} handleSwap={handleSwapTokens} />
                
                {/* Buy Comp */}
                <TokenSelector
                    handleToggleModal={handleToggleModal}
                    Token={tokenIn}
                    setAmount={handleAmountInChange}
                    type="sell"
                />
                
                <DrawerModal
                    handleToggleModal={handleToggleModal}
                    handleChooseCrypto={handleChooseCrypto}
                    typeAction={typeAction}
                    isOpen={isOpen}
                    cryptos={prices}
                />
                
                {account ? (
                    <SwapButton
                        className={''}
                        wallet={account.address}
                        active={isActive}
                    />
                ) : (
                    <ConnectWalletButton />
                )}
                
                {/* Fees Comp */}
                {!tokenIn || !tokenOut || !account ? null : (
                    <FeesComp
                        tokenIn={tokenIn}
                        tokenOut={tokenOut}
                        address={account.address}
                    />
                )}
            </div>
        </div>
    );
};

export default Swap;
