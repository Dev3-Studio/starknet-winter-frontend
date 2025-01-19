'use client';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { SwapToken } from '@/components/Swap';
import DrawerModal from '@/components/DrawerModal';
import React from 'react';
import { PriceProps } from '@/types/AllTypes';

interface TokenSelectorProps {
    handleChooseCrypto: (buy: string, action: string) => void;
    Token: SwapToken;
    setAmount: (amount: number) => void;
    type: "buy" | "sell";
    cryptos: Array<PriceProps>;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
    handleChooseCrypto,
    Token,
    setAmount,
    type,
    cryptos,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setAmount(value);
    };
    
    const [isOpen, setIsOpen] = React.useState(false);
    
    function chooseCrypto(crypto: string, action: string) {
        handleChooseCrypto(crypto, action);
        setIsOpen(false);
    }
    
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    }
    
    return (
        <div className={cn('shadow-md rounded-[10px] p-2 flex flex-row justify-between', type === 'buy' ? 'bg-primary' : 'bg-secondary')} onKeyDown={handleKeyDown}>
            <div className='flex flex-col gap-2'>
                <span className='opacity-80 text-sm'>{capitalizeFirstLetter(type)}</span>
                <input
                    value={Token.amount || '0'}
                    type='number'
                    min={0}
                    className={cn(
                        'w-full mr-1 bg-transparent placeholder-inherit focus-within:border-none focus:outline-none'
                    )}
                    onChange={handleInputChange}
                />
                
                <span className='flex opacity-80 items-baseline'>
          <p className='text-lg'>
            $ {(Token.amount * (Token.token.priceInUSD ?? 0)).toFixed(2)}
          </p>
        </span>
            </div>
            <div className='flex items-center text-xl text-left h-full '>
                <Button
                    className='rounded-full bg-accent flex text-primary-foreground gap-4 w-max-40'
                    onClick={() => setIsOpen(true)}
                >
                    <img
                        src={Token ? `./${Token.token.Name}.webp` : undefined}
                        className='w-6 h-6 rounded-full'
                    />
                    <p>{Token ? Token.token.Name : ''}</p>
                    <ChevronDown />
                </Button>
            </div>
            
            {/*buy modal*/}
            <DrawerModal
                handleChooseCrypto={chooseCrypto}
                typeAction={type}
                cryptos={cryptos}
                isOpen={isOpen}
            />
        </div>
    );
};

export { TokenSelector };
