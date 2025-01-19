'use server';
import { getAmountOut } from '@/lib/swap';
import { Quote } from '@avnu/avnu-sdk';
import { parseUnits } from 'ethers';
import supportedTokens from '@/public/supportedTokens.json';
import { SwapToken } from '@/components/Swap';

interface FeesCompProps {
  address: string | undefined;
  tokenIn: SwapToken;
  tokenOut: SwapToken;
}

async function handleGetQuote({
  tokenIn,
  tokenOut,
  address,
}: FeesCompProps) {
  try {
    // Check for invalid input
    if (!tokenIn || !tokenOut || !address) {
      console.error('Missing required parameters:', {
        tokenIn,
        tokenOut,
        address,
      });
      return;
    }

    interface TempTokenProps {
      name: string;
      symbol: string;
      address: string;
    }

    const tempTokenA: TempTokenProps | undefined = supportedTokens.find(
      (p) => {
        return p.name === tokenIn.token.Name;
      }
    );
    const tempTokenB: TempTokenProps | undefined = supportedTokens.find(
      (p) => {
        return p.name === tokenIn.token.Name;
      }
    );

    if (!tempTokenA || !tempTokenB) {
      return 0;
    }

    // Call the getAmountIn function
    const tempQuote: Quote[] = await getAmountOut(
      tempTokenA.address,
      tempTokenB.address,
      address,
      parseUnits(tokenIn.amount.toFixed(tokenIn.token.Decimals).toString())
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
  tokenIn,
  tokenOut,
}: FeesCompProps) => {
  try {
    if (address === undefined) {
      return;
    }
    const isQuote = await handleGetQuote({ tokenIn, tokenOut, address });


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
