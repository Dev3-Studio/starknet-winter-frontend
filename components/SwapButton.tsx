'use client';

import { Button } from '@/components/shadcn/button';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { getQuote } from '@/lib/swap';
import { swap } from '@/lib/swap';
import { SessionAccountInterface } from '@argent/tma-wallet';
import { PriceProps } from '@/types/Price';
import { useArgent } from '@/hooks/useArgent';

interface SwapProps {
  tokenA: PriceProps;
  tokenB: PriceProps;
  className: string;
  wallet: { address: string };
  quoteID: string;
}

interface handleGetQuoteProps {
  tokenIn: string;
  tokenOut: string;
  wallet: string;
  amountIn: bigint;
}

export const SwapButton: React.FC<SwapProps> = ({
  tokenA,
  tokenB,
  className,
  wallet,
  quoteID,
}) => {
  const argent = useArgent();
  const [txQuote, setQuote] = useState<any>();

  const handleGetQuote = async ({
    tokenIn,
    tokenOut,
    wallet,
    amountIn,
  }: handleGetQuoteProps) => {
    try {
      const quote = await getQuote(tokenIn, tokenOut, wallet, amountIn);
      setQuote(quote);
      return quote;
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleSwap = async (
    { tokenIn, tokenOut, wallet, amountIn }: handleGetQuoteProps,
    quoteID: string,
    account: SessionAccountInterface
  ) => {
    if (!argent?.account?.address) {
      console.error('Argent account address is not available');
      return;
    }
    try {
      const quote = await handleGetQuote({
        tokenIn,
        tokenOut,
        wallet,
        amountIn,
      });
      if (quote) {
        await swap(account, quoteID);
      }
    } catch (error) {
      console.error('Error during swap:', error);
    }
  };
  return (
    <div>
      <Button
        className={cn('block rounded-md w-full', className)}
        onClick={() =>
          handleSwap(
            {
              tokenIn: tokenA.Name,
              tokenOut: tokenB.Name,
              wallet: wallet.address,
              amountIn: BigInt(1),
            },
            txQuote.quoteID,
            argent.account.address
          )
        }
      >
        Swap
      </Button>
    </div>
  );
};
