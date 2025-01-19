'use client';

import { SearchIcon } from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/shadcn/drawer';
import { PriceProps } from '@/types/AllTypes';
import { PriceItem } from './PriceItem';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/shadcn/input';
import { capitalizeFirstLetter } from '@/lib/utils';

interface DrawerModalProps {
    handleChooseCrypto: (arg: string, action: string) => void;
    isOpen: boolean;
    typeAction: "buy" | "sell";
    cryptos: Array<PriceProps>;
}

interface CryptoListProps {
    cryptos: Array<PriceProps>;
    typeAction: "buy" | "sell";
    handleChooseCrypto: (arg: string, action: string) => void;
}

// todo add search functionality
function CryptoList({
    cryptos,
    typeAction,
    handleChooseCrypto,
}: CryptoListProps) {
    return (
        <div className="list-none pl-5 flex flex-col gap-4 pb-3 w-full text-left">
            {cryptos ? (
                cryptos.map((crypto, index) => (
                    <PriceItem
                        key={index}
                        price={crypto}
                        typeAction={typeAction}
                        onClick={() => handleChooseCrypto(crypto.Ticker, typeAction)}
                    />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default function DrawerModal({
    handleChooseCrypto,
    typeAction,
    isOpen,
    cryptos = [],
}: DrawerModalProps) {
    const searchRef = React.useRef<HTMLInputElement>(null);
    
    // filter
    const [tokensToDisplay, setTokensToDisplay] = useState<PriceProps[]>(cryptos);
    
    function handleSearch() {
        if (searchRef.current?.value) {
            const searchValue = searchRef.current?.value;
            if (searchValue === '') return;

            const filteredTokens = cryptos.filter((token) =>
                token.Name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            setTokensToDisplay(filteredTokens);
        } else {
            setTokensToDisplay(cryptos);
        }
    }
    
    useEffect(() => {
        setTokensToDisplay(cryptos);
    }, [cryptos]);
    
    
    return (
        <Drawer open={isOpen}>
            <DrawerContent>
                <DrawerHeader className="space-y-4">
                    <DrawerTitle>{capitalizeFirstLetter(typeAction)}</DrawerTitle>
                    <DrawerDescription>
                        Select a token from our default list or search for a token by symbol
                        or address.
                    </DrawerDescription>
                    <div className="flex gap-2 border-b-2 border-muted pb-2">
                        <SearchIcon/>
                        <Input
                            placeholder="Search Tokens"
                            className="bg-transparent outline-none placeholder-white"
                            ref={searchRef}
                            onChange={handleSearch}
                        />
                    </div>
                    <div
                        className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4">
                        <CryptoList
                            cryptos={tokensToDisplay}
                            typeAction={typeAction}
                            handleChooseCrypto={handleChooseCrypto}
                        />
                    </div>
                </DrawerHeader>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
