import { useQuery } from '@tanstack/react-query';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import pragmaTokens from '@/public/pragmaTokens.json';
import { getAssetPriceMedian } from '@/actions/findPrice';

export const useTokenPrice = ({ pragmaFeedId }: { pragmaFeedId: string }) => {
    const { account } = useArgentTelegram();
    const { data: price } = useQuery({
        queryKey: ['getAssetMedianPrice', pragmaFeedId],
        initialData: () => 0,
        queryFn: async () => {
            if (!account) return 0;
            const asset = pragmaTokens.find((p) => p.PairID === pragmaFeedId);
            if (!asset) return 0;
            const { priceInUSD } = await getAssetPriceMedian(pragmaFeedId, asset.Decimals);
            return priceInUSD;
        },
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchInterval: 3000,
    });
    return price;
};