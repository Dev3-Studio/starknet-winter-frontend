'use client';

import React, { useEffect, useState } from 'react';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { TokenSelector } from '@/components/TokenSelector';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import supportedTokens from '@/public/supportedTokens.json';
import { formatUnits, parseUnits } from 'ethers';
import { useDebounce } from 'use-debounce';
import { Quote } from '@avnu/avnu-sdk';
import { getAmountIn, getAmountOut, swap } from '@/lib/swap';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/shadcn/button';
import { ArrowDownUpIcon } from 'lucide-react';
import { getTokenBalance } from '@/lib/starknet';
import { customToast } from '@/lib/utils';

interface FlipTokensButtonProps {
    isSwapped: boolean;
    handleSwap: () => void;
}

const FlipTokensButton: React.FC<FlipTokensButtonProps> = ({
    isSwapped,
    handleSwap,
}: FlipTokensButtonProps) => {
    return (
        <ArrowDownUpIcon
            color={isSwapped ? '#FFA600' : 'white'}
            size={50}
            onClick={handleSwap}
            className="self-center bg-secondary rounded-full p-2 cursor-pointer"
        />
    );
};

export type Token = {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    pragmaId: string;
}

const Swap: React.FC = () => {
    const { account } = useArgentTelegram();
    
    const [amountInText, setAmountInText] = useState('');
    const [amountOutText, setAmountOutText] = useState('');
    
    const [lockQuote, setLockQuote] = useState(false);
    
    const [debounceAmountInText] = useDebounce(amountInText, 2000);
    const [debounceAmountOutText] = useDebounce(amountOutText, 2000);
    
    const [tokenIn, setTokenIn] = useState<Token>({ ...supportedTokens[0] });
    const [balanceTokenIn, setBalanceTokenIn] = useState<string>('0');
    const [tokenOut, setTokenOut] = useState<Token>({ ...supportedTokens[1] });
    const [balanceTokenOut, setBalanceTokenOut] = useState<string>('0');
    
    const [quote, setQuote] = useState<Quote | null>(null);
    
    const swapMutator = useMutation({
        mutationFn: async () => {
            if (!quote) return;
            if (!account) return;
            customToast({
                title: 'Pending',
                description: 'Swapping...',
            });
            await swap(account, quote.quoteId);
        },
        onError: (e) => {
            console.log(e);
            if (e instanceof Error) {
                customToast({
                    variant: 'error',
                    description: e.message,
                });
                return;
            }
            customToast({ variant: 'error' });
        },
        onSuccess: () => {
            customToast({
                variant: 'success',
                description: 'Swap completed',
            });
        },
    });
    
    useEffect(() => {
        if (lockQuote) {
            setLockQuote(false);
            return;
        }
        
        async function handleDebounceAmountInTextChange() {
            setQuote(null);
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
                        customToast({
                            variant: 'error',
                            description: 'Quote Failed! Insufficient liquidity',
                        });
                        return;
                    }
                    setQuote(() => quotes[0]);
                    setLockQuote(true);
                    setAmountOutText(formatUnits(quotes[0].buyAmount, tokenOut.decimals));
                } catch {
                    // Do nothing
                }
            }
        }
        
        void handleDebounceAmountInTextChange();
    }, [debounceAmountInText]);
    
    useEffect(() => {
        if (lockQuote) {
            setLockQuote(false);
            return;
        }
        
        async function handleDebounceAmountOutTextChange() {
            setQuote(null);
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
                        customToast({
                            variant: 'error',
                            description: 'Quote Failed! Insufficient liquidity',
                        });
                        return;
                    }
                    setQuote(() => quotes[0]);
                    setLockQuote(true);
                    setAmountInText(formatUnits(quotes[0].sellAmount, tokenIn.decimals));
                } catch {
                    // Do nothing
                }
            }
        }
        
        void handleDebounceAmountOutTextChange();
    }, [debounceAmountOutText]);
    
    useEffect(() => {
        if (!account) return;
        getTokenBalance(account, tokenIn.address).then((balance) => {
            setBalanceTokenIn(formatUnits(balance, tokenIn.decimals));
        });
        getTokenBalance(account, tokenOut.address).then((balance) => {
            setBalanceTokenOut(formatUnits(balance, tokenOut.decimals));
        });
    }, [tokenIn.address, tokenOut.address, account?.address]);
    
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
            setAmountInText('');
            setAmountOutText('');
        }
    }
    
    
    return (
        <div className="flex flex-col gap-2 items-center h-full bg-transparent p-4">
            {/* Sell Comp */}
            <TokenSelector
                token={tokenIn}
                amount={amountInText}
                onChangeAmount={(value) => setAmountInText(value)}
                maxAmount={balanceTokenIn}
                type="buy"
                onSelectToken={handleChooseTokenIn}
                tokenList={supportedTokens.filter((t) => t.name !== tokenIn.symbol)}
            />
            
            {/* Swap Feature */}
            <FlipTokensButton isSwapped={false} handleSwap={handleSwapTokens}/>
            
            {/* Buy Comp */}
            <TokenSelector
                token={tokenOut}
                amount={amountOutText}
                onChangeAmount={(value) => setAmountOutText(value)}
                maxAmount={balanceTokenOut}
                type="sell"
                onSelectToken={handleChooseTokenOut}
                tokenList={supportedTokens.filter((t) => t.name !== tokenOut.symbol)}
            />
            
            {account ? (
                <Button
                    onClick={() => swapMutator.mutate()}
                    className="bg-primary text-white px-4 py-2 rounded-md w-full"
                    disabled={lockQuote}
                >
                    Swap
                </Button>
            ) : (
                <ConnectWalletButton/>
            )}
        </div>
    );
};

export default Swap;
