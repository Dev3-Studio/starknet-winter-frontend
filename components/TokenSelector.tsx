'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { SwapToken } from '@/components/Swap';
import DrawerModal from '@/components/DrawerModal';
import React, { useEffect, useState } from 'react';
import { PriceProps } from '@/types/AllTypes';
import { useDebounce } from 'use-debounce';
import { useTokenPrice } from '@/hooks/useTokenPrice';
import { formatUnits, parseUnits } from 'ethers';

interface TokenSelectorProps {
    type: 'buy' | 'sell';
    token: SwapToken;
    onSelectToken: (buy: string, action: string) => void;
    onAmountChange: (amount: bigint) => void;
    tokenList: Array<PriceProps>;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
    type,
    token,
    onSelectToken,
    onAmountChange,
    tokenList,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState<bigint>(0n);
    const assetPrice = useTokenPrice({ pragmaFeedId: token.token.PairID });
    const [debounceAmount] = useDebounce(amount, 500);
    
    useEffect(() => {
        onAmountChange(debounceAmount);
    }, [debounceAmount]);
    
    const parseInput = (value: number) => {
        const valueStr = value.toString();
        try {
            return parseUnits(valueStr, token.token.Decimals);
        } catch {
            return 0n;
        }
    };
    
    const formatAmount = (value: bigint) => {
        return Number(formatUnits(value, token.token.Decimals));
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setAmount(parseInput(value));
    };
    
    function chooseCrypto(crypto: string, action: string) {
        onSelectToken(crypto, action);
        setIsOpen(false);
    }
    
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    }
    
    return (
        <div
            className={cn('shadow-md rounded-[10px] p-2 flex flex-row justify-between', type === 'buy' ? 'bg-primary' : 'bg-secondary')}
            onKeyDown={handleKeyDown}>
            <div className="flex flex-col gap-2">
                <span className="opacity-80 text-sm">{capitalizeFirstLetter(type)}</span>
                <input
                    value={formatUnits(amount, token.token.Decimals)}
                    type="number"
                    min={0}
                    className={cn(
                        'w-full mr-1 bg-transparent placeholder-inherit focus-within:border-none focus:outline-none',
                    )}
                    onChange={handleInputChange}
                />
                
                <span className="flex opacity-80 items-baseline">
          <p className="text-lg">
            ${(formatAmount(amount) * assetPrice).toFixed(2)}
          </p>
        </span>
            </div>
            <div className="flex items-center text-xl text-left h-full ">
                <Button
                    className="rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40"
                    onClick={() => setIsOpen(true)}
                >
                    <img
                        src={token ? `./${token.token.Name}.webp` : undefined}
                        className="w-6 h-6 rounded-full"
                    />
                    <p>{token ? token.token.Name : ''}</p>
                    <ChevronDown/>
                </Button>
            </div>
            
            {/*buy modal*/}
            <DrawerModal
                handleChooseCrypto={chooseCrypto}
                typeAction={type}
                cryptos={tokenList}
                isOpen={isOpen}
            />
        </div>
    );
};

export { TokenSelector };
