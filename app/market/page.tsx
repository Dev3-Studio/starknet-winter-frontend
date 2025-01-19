import { getAllPricesFormatted } from '@/actions/getAllPrices'; // Server action
import MarketClient from '@/components/MarketClient';
import checkAddressDeployed from '@/actions/checkAddressDeployed';

export default async function MarketPage() {
    
    checkAddressDeployed('0x000368A95Fbf986cE07bE56736cFa34aC9FddDdD03E1a9e7186269D490D062CB');
    // Fetch data on the server
    const prices = await getAllPricesFormatted();
    
    return <MarketClient prices={prices}/>;
}
