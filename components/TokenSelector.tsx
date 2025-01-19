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
    onSelectToken: (symbol: string) => void;
    tokenList: Array<Token>;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
    type,
    token,
    amount,
    onChangeAmount,
    onSelectToken,
    tokenList,
}) => {
    const assetPrice = useTokenPrice({ pragmaFeedId: token.pragmaId });
    
    function handleSelectToken(symbol: string) {
        onSelectToken(symbol);
    }
    
    return (
        <div
            className={cn('shadow-md rounded-[10px] p-2 flex flex-row justify-between', type === 'buy' ? 'bg-primary' : 'bg-secondary')}
        >
            <div className="flex flex-col gap-2">
                <span className="opacity-80 text-sm">{capitalizeFirstLetter(type)}</span>
                <input
                    value={amount}
                    placeholder="0"
                    type="number"
                    min={0}
                    className={cn(
                        'w-full mr-1 bg-transparent placeholder-inherit focus-within:border-none focus:outline-none',
                    )}
                    onChange={(e) => onChangeAmount(e.target.value)}
                />
                
                <span className="flex opacity-80 items-baseline">
          <p className="text-lg">
            ${(Number(amount) * assetPrice).toFixed(2)}
          </p>
        </span>
            </div>
            <div className="flex items-center text-xl text-left h-full ">
                <TokenSelectDrawer
                    onSelectToken={handleSelectToken}
                    tokens={tokenList}
                    title={type}
                >
                    <Button className="rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40">
                        <img
                            src={token ? `./${token.symbol}.webp` : undefined}
                            className="w-6 h-6 rounded-full"
                        />
                        <p>{token ? token.symbol : ''}</p>
                        <ChevronDown/>
                    </Button>
                </TokenSelectDrawer>
            </div>
        </div>
    );
};

export { TokenSelector };
