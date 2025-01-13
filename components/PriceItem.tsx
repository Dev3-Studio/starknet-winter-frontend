import { Price } from '@/objects/Price';

interface PriceItemProps {
  price: Price;
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
      <div>{price.Name}</div>
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
