'use server';

import assetList from '@/public/AssetList.json';
import { getAssetPriceMedian } from './findPrice';

type Price = {
<<<<<<< HEAD
  PairID: string;
  Decimals: number;
  Name: string;
  Ticker: string;
  priceInCrypto: number;
  priceInUSD: number;
};

let prices: Price[] = [];
let stale = true;
setTimeout(() => {
  stale = true;
}, 1000 * 60 * 5); // 5 minutes

async function getAllPricesFormatted(): Promise<Price[]> {
  if (stale) {
    console.log('Fetching prices');
    prices = await Promise.all(
      assetList.map(async (asset) => {
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
=======
    Name: string;
    Ticker: string;
    PairID: string;
    priceInCrypto: number;
    Decimals: number;
    priceInUSD: number;
}
let prices: Price[] = [];
let stale = true;
setTimeout(() => {
    stale = true;
}, 1000 * 60 * 5); // 5 minutes


async function getAllPricesFormatted() {
    
    if (stale) {
  prices = await Promise.all(
    assetList.map(async (asset) => {
      const price = await getAssetPriceMedian(asset.PairID, asset.Decimals);
      return {
        Name: asset.Name,
        Ticker: asset.Ticker,
        PairID: asset.PairID,
        Decimals: asset.Decimals,
        priceInCrypto: price.priceInCrypto,
        priceInUSD: price.priceInUSD,
      };
    }));
    stale = false;
    }
    return prices;
}
export { getAllPricesFormatted };
>>>>>>> c2f0953fca7adaba5346d162a2b21aad6ea18117
