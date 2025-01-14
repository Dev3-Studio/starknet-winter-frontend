import { PriceProps } from '@/objects/Price';

interface PriceItemProps {
  price: PriceProps;
  typeAction: string;
  onClick: () => void;
}

const PriceItem: React.FC<PriceItemProps> = ({
  price,
  typeAction,
  onClick,
}: PriceItemProps) => {
  console.log('Action', typeAction);
  return (
    <div
      className='flex flex-row justify-between pr-5'
      onClick={() => onClick()}
    >
      <div className='flex gap-2'>
        {price ? (
          <img src={`./${price.Name}.webp`} className='w-6 h-6 rounded-full' />
        ) : undefined}

        <div>{price.Name}</div>
      </div>
      {price.priceInCrypto ? (
        <div>
          <div> {price.priceInCrypto}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export { PriceItem };
