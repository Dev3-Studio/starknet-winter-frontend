import { getAllPricesFormatted } from '@/actions/getAllPrices'; // Server action
import MarketClient from '@/components/MarketClient';

export default async function MarketPage() {
  // Fetch data on the server
  const prices = await getAllPricesFormatted();

  return <MarketClient prices={prices} />;
}
