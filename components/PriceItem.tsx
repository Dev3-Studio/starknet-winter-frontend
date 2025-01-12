import { Price } from '@/objects/Price';

export function PriceItem({ Ticker, priceInCrypto, priceInUSD }: Price) {
  return (
    <div className='flex flex-row justify-between'>
      <div>{Ticker}</div>
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
