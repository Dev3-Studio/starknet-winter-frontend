'use server';
import assetList from '@/public/pragmaTokens.json';
import { getAssetPriceMedian } from './findPrice';

type Price = {
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


async function getAllPricesFormatted(): Promise<Price[]> {
    if (stale) {
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
            }),
        );
        stale = false;
    }
    return prices;
}

export { getAllPricesFormatted };