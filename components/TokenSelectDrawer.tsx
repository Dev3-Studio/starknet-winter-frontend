'use client';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/shadcn/drawer';
import React from 'react';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Token } from '@/components/Swap';
import { PriceLabel } from '@/components/PriceLabel';
import { useTokenPrice } from '@/hooks/useTokenPrice';

interface TokenEntryProps {
    token: Token;
    onSelectToken: (symbol: string) => void;
}

function TokenEntry({
    token,
    onSelectToken,
}: TokenEntryProps) {
    const price = useTokenPrice({ pragmaFeedId: token.pragmaId });
    return (
        <div
            className="flex items-center justify-between p-4 border-b border-muted"
            onClick={() => onSelectToken(token.symbol)}>
            <div className="flex items-center gap-4">
                <img src={`./${token.symbol}.webp`} alt={token.symbol} className="w-8 h-8 rounded-full"/>
                <div className="flex flex-col items-start">
                    <p className="text-lg font-semibold">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                </div>
            </div>
            {price !== 0 && <PriceLabel price={price}/>}
            {price === 0 && <p className="text-muted">$-.--</p>}
        </div>
    );
}

interface TokenSelectDrawerProps {
    children: React.ReactNode;
    title: string;
    tokens: Token[];
    onSelectToken: (symbol: string) => void;
}

export default function TokenSelectDrawer({
    children,
    title,
    tokens,
    onSelectToken,
}: TokenSelectDrawerProps) {
    
    
    return (
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="space-y-4">
                    <DrawerTitle>{capitalizeFirstLetter(title)}</DrawerTitle>
                    <DrawerDescription>
                        Select a token from our default list or search for a token by symbol
                        or address.
                    </DrawerDescription>
                    <DrawerClose
                        className="max-h-[250px] overflow-y-auto scrollbar-track-gray-200 pb-4 no-scrollbar">
                        {tokens.map((token) => (
                            <TokenEntry
                                key={token.symbol}
                                token={token}
                                onSelectToken={onSelectToken}
                            />
                        ))}
                    </DrawerClose>
                </DrawerHeader>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
