import { Price } from '@/objects/Price';

interface PriceItemProps {
  price: Price;
  typeAction: string;
  handleChooseCrypto: (arg: string, action: string) => void;
}

const PriceItem: React.FC<PriceItemProps> = ({
  price,
  typeAction,
  handleChooseCrypto,
}: PriceItemProps) => {
  console.log('Action', typeAction);
  return (
    <div
      className='flex flex-row justify-between pr-5'
      onClick={() => handleChooseCrypto(price.Name, typeAction)}
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
