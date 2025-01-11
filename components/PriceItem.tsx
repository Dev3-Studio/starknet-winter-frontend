import { useEffect, useState } from 'react';
import { get_asset_price_median } from '../hooks/findPrice';
import { PriceItemProps } from '@/objects/PriceItem';

interface Price {
  priceInCrypto: number;
  priceInUSD: number;
}

export function PriceItem({ Ticker, PairID, Decimals }: PriceItemProps) {
  const [price, setPrice] = useState<Price | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      const fetchedPrice = await get_asset_price_median(PairID, Decimals);
      setPrice(fetchedPrice);
    }
    fetchPrice();
  }, [PairID, Decimals]);
  return (
    <div>
      <div>{Ticker}</div>
      {price ? (
        <div>
          <div> {price.priceInCrypto}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
