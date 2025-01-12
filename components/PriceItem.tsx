import { Price } from '@/objects/Price';

export function PriceItem({ Name, Ticker, priceInCrypto, priceInUSD }: Price) {
  return (
    <div className='flex flex-row justify-between pr-5'>
      <div>{Name}</div>
      {priceInCrypto ? (
        <div>
          <div> {priceInCrypto}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
