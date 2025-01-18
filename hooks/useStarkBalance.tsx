import { useQuery } from '@tanstack/react-query';
import { getStarkBalance } from '@/lib/starknet';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';

export const useStarkBalance = () => {
    const { account } = useArgentTelegram();
    const { data: balance } = useQuery({
        queryKey: ['getStarkBalance', account?.address],
        initialData: () => 0n,
        queryFn: async () => {
            if (!account) return 0n;
            return await getStarkBalance(account);
        },
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchInterval: 3000,
    });
    return balance;
};