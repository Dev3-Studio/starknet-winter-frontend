import TokenPrice from '@/components/TokenPrice';
import { getAllPricesFormatted } from '@/actions/getAllPrices';

export default async function MarketPage() {
    const prices = await getAllPricesFormatted();
    
    function getTokenImage(token: string) {
        return `./${token}.webp`;
    }
    
    return (
        <div className="grid grid-cols-2 gap-4">
            {prices.map((asset, index) => (
                <TokenPrice key={index} token={asset.Name} image={getTokenImage(asset.Name)} price={asset.priceInUSD}/>
            ))}
        </div>
    )
}