'use server';

import { Contract, RpcProvider } from 'starknet';
import abi from '@/public/stake_abi.json'; // Your contract ABI

export const FetchPoolMemberInfo = async (
  rewardAddress: string
): Promise<string | null> => {
  try {
    const provider = new RpcProvider({
      nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
    });

    const contractAddress =
      '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b';

    const contract = new Contract(abi, contractAddress, provider);

    const result = await contract.call('get_pool_member_info', [rewardAddress]);

    if (
      result &&
      (typeof result === 'string' ||
        typeof result === 'number' ||
        typeof result === 'bigint')
    ) {
      const poolmemberinfo = BigInt(result);

      return poolmemberinfo.toString();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching staked amount and unclaimed rewards:', error);
    return null;
  }
};
