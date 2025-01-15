import { useState } from 'react';
import { ArrowDownUpIcon } from 'lucide-react';
import { PriceProps } from '@/types/Price';

interface SwapCompProps {
  TokenA: PriceProps | undefined;
  TokenB: PriceProps | undefined;
  setTokenB: (asset: PriceProps) => void;
  setTokenA: (asset: PriceProps) => void;
}

const SwapComp: React.FC<SwapCompProps> = ({
  TokenA,
  TokenB,
  setTokenB,
  setTokenA,
}: SwapCompProps) => {
  const [isSwapped, setSwapped] = useState(false);

  function handleSwap() {
    if (TokenA && TokenB) {
      console.log('Swapping..:', TokenA, TokenB);
      if (!isSwapped) {
        setTokenB(TokenA);
        setTokenA(TokenB);
      } else {
        setTokenB(TokenA);
        setTokenA(TokenB);
      }
      setSwapped(!isSwapped);
    } else {
      console.error('Cannot swap: one of the assets is undefined');
    }

    setTimeout(() => {
      setSwapped(false);
    }, 80);
  }

  return (
    <ArrowDownUpIcon
      color={isSwapped ? '#FFA600' : 'white'}
      size={50}
      onClick={handleSwap}
      className='self-center bg-secondary rounded-full p-2 cursor-pointer'
    />
  );
};

export { SwapComp };
