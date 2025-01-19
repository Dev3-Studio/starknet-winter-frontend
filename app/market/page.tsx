import { getAllPricesFormatted } from '@/actions/getAllPrices'; // Server action
import assetList from '@/public/pragmaTokens.json';
import MarketClient from '@/components/MarketClient';

export default async function MarketPage() {
  // Fetch data on the server
  const prices = await getAllPricesFormatted(assetList);

  return <MarketClient prices={prices} />;
}
