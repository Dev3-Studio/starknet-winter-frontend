'use client';

import React, { useEffect, useState } from 'react';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { TokenSelector } from '@/components/TokenSelector';
import { SwapComp } from '@/components/SwapComp';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import supportedTokens from '@/public/supportedTokens.json';
import { formatUnits, parseUnits } from 'ethers';
import { useDebounce } from 'use-debounce';
import { Quote } from '@avnu/avnu-sdk';
import { getAmountIn, getAmountOut, swap } from '@/lib/swap';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/shadcn/button';

export type Token = {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    pragmaId: string;
}

export type SwapToken = Token & { amount: bigint };

const Swap: React.FC = () => {
    const { account } = useArgentTelegram();
    
    const [amountInText, setAmountInText] = useState('');
    const [amountOutText, setAmountOutText] = useState('');
    
    const [lockQuote, setLockQuote] = useState(false);
    
    const [debounceAmountInText] = useDebounce(amountInText, 2000);
    const [debounceAmountOutText] = useDebounce(amountOutText, 2000);
    
    const [tokenIn, setTokenIn] = useState<Token>({ ...supportedTokens[0] });
    const [tokenOut, setTokenOut] = useState<Token>({ ...supportedTokens[1] });
    
    const [quote, setQuote] = useState<Quote | null>(null);
    
    const swapMutator = useMutation({
        mutationFn: async () => {
            if (!quote) return;
            if (!account) return;
            toast({
                title: 'Broadcasting swap',
                description: 'Executing swap...',
            });
            await swap(account, quote.quoteId);
        },
        onError: (e) => {
            console.log(e);
            if (e instanceof Error) {
                toast({
                    title: 'Error',
                    description: e.message,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: 'Error',
                description: 'An error occurred',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Success!',
                description: 'Swapped successfully',
            });
        },
    });
    
    useEffect(() => {
        if (lockQuote) {
            setLockQuote(() => false);
            return;
        }
        
        async function handleDebounceAmountInTextChange() {
            setQuote(() => null);
            if (!account) return;
            if (debounceAmountInText) {
                try {
                    const parsedAmountIn = parseUnits(debounceAmountInText, tokenIn.decimals);
                    const quotes = await getAmountOut(
                        tokenIn.address,
                        tokenOut.address,
                        account.address,
                        parsedAmountIn,
                    );
                    if (!quotes[0]) {
                        toast({
                            title: 'Quote Failed!',
                            description: 'Insufficient liquidity',
                            variant: 'destructive',
                        });
                        return;
                    }
                    setQuote(() => quotes[0]);
                    setLockQuote(() => true);
                    setAmountOutText(() => formatUnits(quotes[0].buyAmount, tokenOut.decimals));
                } catch {
                    // Do nothing
                }
            }
        }
        
        void handleDebounceAmountInTextChange();
    }, [debounceAmountInText]);
    
    useEffect(() => {
        if (lockQuote) {
            setLockQuote(() => false);
            return;
        }
        
        async function handleDebounceAmountOutTextChange() {
            setQuote(() => null);
            if (!account) return;
            if (debounceAmountOutText) {
                try {
                    const parsedAmountOut = parseUnits(debounceAmountOutText, tokenOut.decimals);
                    const quotes = await getAmountIn(
                        tokenIn.address,
                        tokenOut.address,
                        account.address,
                        parsedAmountOut,
                    );
                    if (!quotes[0]) {
                        toast({
                            title: 'Quote Failed!',
                            description: 'Insufficient liquidity',
                            variant: 'destructive',
                        });
                        return;
                    }
                    setQuote(() => quotes[0]);
                    setLockQuote(() => true);
                    setAmountInText(() => formatUnits(quotes[0].sellAmount, tokenIn.decimals));
                } catch {
                    // Do nothing
                }
            }
        }
        
        void handleDebounceAmountOutTextChange();
    }, [debounceAmountOutText]);
    
    function handleChooseTokenIn(symbol: string) {
        const selectedAsset = supportedTokens.find((t) => t.symbol === symbol);
        if (!selectedAsset) return;
        setTokenIn(() => selectedAsset);
    }
    
    function handleChooseTokenOut(symbol: string) {
        const selectedAsset = supportedTokens.find((t) => t.symbol === symbol);
        if (!selectedAsset) return;
        setTokenOut(() => selectedAsset);
    }
    
    function handleSwapTokens() {
        if (tokenIn && tokenOut) {
            
            const tempToken: Token = tokenOut;
            setTokenOut(() => tokenIn);
            setTokenIn(() => tempToken);
            
            if (amountOutText) {
                setAmountInText(() => amountOutText);
            } else if (amountInText) {
                setAmountOutText(() => amountInText);
            }
        }
    }
    
    
    return (
        <div className="flex flex-col items-center h-full bg-transparent p-12">
            <div className="flex flex-col gap-2 w-full">
                {/* Sell Comp */}
                <TokenSelector
                    token={tokenIn}
                    amount={amountInText}
                    onChangeAmount={(value) => setAmountInText(value)}
                    type="buy"
                    onSelectToken={handleChooseTokenIn}
                    tokenList={supportedTokens.filter((t) => t.name !== tokenIn.symbol)}
                />
                
                {/* Swap Feature */}
                <SwapComp isSwapped={false} handleSwap={handleSwapTokens}/>
                
                {/* Buy Comp */}
                <TokenSelector
                    token={tokenOut}
                    amount={amountOutText}
                    onChangeAmount={(value) => setAmountOutText(value)}
                    type="sell"
                    onSelectToken={handleChooseTokenOut}
                    tokenList={supportedTokens.filter((t) => t.name !== tokenOut.symbol)}
                />
                
                {account ? (
                    <Button
                        onClick={() => swapMutator.mutate()}
                        className="bg-primary text-white px-4 py-2 rounded-xl w-full mt-2"
                    >
                        Swap
                    </Button>
                ) : (
                    <ConnectWalletButton/>
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
