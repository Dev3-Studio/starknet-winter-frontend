import { useQuery } from '@tanstack/react-query';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { getStakeInfo } from '@/lib/stake';

export const useStakeInfo = () => {
    const { account } = useArgentTelegram();
    const { data: stakeInfo } = useQuery({
        queryKey: ['getStakeInfo', account?.address],
        initialData: null,
        queryFn: async () => {
            if (!account) return null;
            return await getStakeInfo(account);
        },
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchInterval: 3000,
    });
    return stakeInfo;
};