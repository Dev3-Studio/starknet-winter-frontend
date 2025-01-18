'use server';

import { Contract, RpcProvider } from 'starknet';
import abi from '@/public/strk_abi.json';

export const FetchStrkBalance = async (
  address: string
): Promise<string | null> => {
  try {
    const provider = new RpcProvider({
      nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
    });

    const contractAddress =
      '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

    const contract = new Contract(abi, contractAddress, provider);

    const result = await contract.call('balance_of', [address]);

    const balance = result;
    return balance.toString();
  } catch (error) {
    console.error('Error fetching balance:', error);
    return null;
  }
};
