import { useState } from 'react';
import { ArrowDownUpIcon } from 'lucide-react';
import { PriceProps } from '@/types/Price';

interface SwapCompProps {
  isBuy: PriceProps | undefined;
  isSell: PriceProps | undefined;
  setBuy: (asset: PriceProps) => void;
  setSell: (asset: PriceProps) => void;
}

const SwapComp: React.FC<SwapCompProps> = ({
  isBuy,
  isSell,
  setBuy,
  setSell,
}: SwapCompProps) => {
  const [isSwapped, setSwapped] = useState(false);

  function handleSwap() {
    if (isBuy && isSell) {
      console.log('Swapping..:', isBuy, isSell);
      if (!isSwapped) {
        setSell(isBuy);
        setBuy(isSell);
      } else {
        setBuy(isBuy);
        setSell(isSell);
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
