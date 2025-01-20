'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { Token } from '@/components/Swap';
import TokenSelectDrawer from '@/components/TokenSelectDrawer';
import React from 'react';
import { useTokenPrice } from '@/hooks/useTokenPrice';

interface TokenSelectorProps {
    type: 'buy' | 'sell';
    token: Token;
    amount: string;
    onChangeAmount: (value: string) => void;
    maxAmount: string;
    onSelectToken: (symbol: string) => void;
    tokenList: Array<Token>;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
    type,
    token,
    amount,
    onChangeAmount,
    maxAmount,
    onSelectToken,
    tokenList,
}) => {
    const assetPrice = useTokenPrice({ pragmaFeedId: token.pragmaId });
    
    function handleSelectToken(symbol: string) {
        onSelectToken(symbol);
    }
    
    return (
        <div
            className={cn(
                'shadow-md rounded-md p-2 flex flex-col justify-between space-y-1 w-full',
                type === 'buy' ? 'bg-primary' : 'bg-secondary',
            )}
        >
            <div className="flex flex-row w-full justify-between items-center p-1">
                <span className="opacity-80 text-sm">{capitalizeFirstLetter(type)}</span>
                <TokenSelectDrawer
                    onSelectToken={handleSelectToken}
                    tokens={tokenList}
                    title={type}
                >
                    <Button className="rounded-full border bg-accent flex text-primary-foreground gap-4 w-max-40">
                        <img
                            src={token ? `./${token.symbol}.webp` : undefined}
                            className="w-6 h-6 rounded-full"
                        />
                        <p>{token ? token.symbol : ''}</p>
                        <ChevronDown/>
                    </Button>
                </TokenSelectDrawer>
            </div>
            <input
                value={amount}
                placeholder="0"
                type="number"
                min={0}
                className={cn(
                    'p-1 text-lg w-full mr-1 bg-transparent placeholder-inherit focus-within:border-none focus:outline-none',
                )}
                onChange={(e) => onChangeAmount(e.target.value)}
            />
            <div className="flex flex-row w-full justify-between items-center p-1">
                <p className="text-sm">${(Number(amount) * assetPrice).toFixed(2)}</p>
                <Button
                    className="bg-secondary border-primary p-1 h-fit text-xs uppercase rounded-md"
                    onClick={() => onChangeAmount(maxAmount)}
                >
                    Max
                </Button>
            </div>
        </div>
    );
};

export { TokenSelector };
