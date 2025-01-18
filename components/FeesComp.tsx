'use server';
import { getAmountOut } from '@/lib/swap';
import { PriceProps } from '@/types/AllTypes';
import { Quote } from '@avnu/avnu-sdk';
import { parseUnits, formatUnits } from 'ethers';

interface FeesCompProps {
  address: string | undefined;
  tokenA: PriceProps;
  tokenB: PriceProps;
  amountA: number;
}

async function handleGetQuote({
  tokenA,
  tokenB,
  amountA,
  address,
}: FeesCompProps) {
  try {
    // Check for invalid input
    if (!tokenA || !tokenB || !amountA || !address) {
      console.error('Missing required parameters:', {
        tokenA,
        tokenB,
        amountA,
        address,
      });
      return;
    }

    console.log('Fetching quote with parameters:', {
      tokenA,
      tokenB,
      amountA,
      address,
    });

    // Call the getAmountIn function
    const tempQuote: Quote[] = await getAmountOut(
      tokenA.Name,
      tokenB.Name,
      address,
      parseUnits(amountA.toFixed(tokenA.Decimals).toString())
    );

    if (tempQuote.length === 0) {
      console.warn('No quote returned from getAmountIn');
    } else {
      console.log('Quote returned:', tempQuote);
    }

    return tempQuote;
  } catch (error) {
    console.error('Error in handleGetQuote:', error);
  }
}

const FeesComp: React.FC<FeesCompProps> = async ({
  address,
  tokenA,
  tokenB,
  amountA,
}: FeesCompProps) => {
  try {
    if (address === undefined) {
      return;
    }
    console.log('Fetching quote for', { address, tokenA, tokenB, amountA });
    const isQuote = await handleGetQuote({ tokenA, tokenB, address, amountA });

    console.log('Received quote:', isQuote);

    return (
      <div className='h-[140px] overflow-hidden w-full will-change-[height]'>
        <div className='w-full px-2 flex flex-col gap-1'>
          {isQuote ? (
            <div>{JSON.stringify(isQuote)}</div>
          ) : (
            <div>No quote available</div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering FeesComp:', error);
    return (
      <div className='h-[140px] overflow-hidden w-full will-change-[height]'>
        <div className='w-full px-2 flex flex-col gap-1'>
          <div>Error occurred while fetching quote</div>
        </div>
      </div>
    );
  }
};

export default FeesComp;
