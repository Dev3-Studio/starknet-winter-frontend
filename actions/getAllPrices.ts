'use server';
import assetList from '@/public/AssetList.json';
import { getAssetPriceMedian } from './findPrice';

async function getAllPricesFormatted() {
  return await Promise.all(
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
    })
  );
}
export { getAllPricesFormatted };
