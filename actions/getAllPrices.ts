'use server';
import { getAssetPriceMedian } from './findPrice';

type Price = {
  Name: string;
  Ticker: string;
  PairID: string;
  priceInCrypto: number;
  Decimals: number;
  priceInUSD: number;
};

// price caching
let prices: Price[] = [];
let stale = true;
setTimeout(() => {
    stale = true;
}, 1000); // 1 second

async function getAllPricesFormatted(list: any[]): Promise<Price[]> {
  if (stale) {
    prices = await Promise.all(
      list.map(async (asset) => {
        const price = await getAssetPriceMedian(asset.PairID, asset.Decimals);
        return {
          PairID: asset.PairID,
          Decimals: asset.Decimals,
          Name: asset.Name,
          Ticker: asset.Ticker,
          priceInCrypto: price.priceInCrypto,
          priceInUSD: price.priceInUSD,
        };
      })
    );
    stale = false;
  }
  return prices;
}

export { getAllPricesFormatted };