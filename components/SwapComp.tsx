import { ArrowDownUpIcon } from 'lucide-react';

interface SwapCompProps {
  isSwapped: boolean;
  handleSwap: () => void;
}

const SwapComp: React.FC<SwapCompProps> = ({
  isSwapped,
  handleSwap,
}: SwapCompProps) => {
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
