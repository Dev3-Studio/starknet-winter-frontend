import { useState } from 'react';
import { ArrowDownUpIcon } from 'lucide-react';
import { AssetProps } from '@/objects/Asset';

interface SwapCompProps {
  isBuy: AssetProps | undefined;
  isSell: AssetProps | undefined;
  setBuy: (asset: AssetProps) => void;
  setSell: (asset: AssetProps) => void;
}

const SwapComp: React.FC<SwapCompProps> = ({
  isBuy,
  isSell,
  setBuy,
  setSell,
}: SwapCompProps) => {
  const [isSwapped, setSwapped] = useState(false);

  function handleSwap() {
    console.log('Swapping');

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
