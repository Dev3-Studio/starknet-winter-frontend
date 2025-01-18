'use server';

import { cairo, CairoCustomEnum, CairoOption, Contract, RpcProvider } from 'starknet';
import abi from '@/public/pragma_abi.json';
import { ContractAddress } from '@starknet-io/types-js';
import { formatUnits } from 'ethers';

const provider = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
});

type GetDataMedianResponse = {
  price: bigint;
  decimals: bigint;
  last_updated_timestamp: bigint;
  num_sources_aggregated: bigint;
  expiration_timestamp: CairoOption<bigint>;
};

// gets median price of an asset
async function getAssetPriceMedian(pairId: string, decimals: number) {
  const contractAddress: ContractAddress =
    '0x02a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b';

  const contract = new Contract(abi, contractAddress, provider);
  const enumData = new CairoCustomEnum({ SpotEntry: cairo.felt(pairId) });
  const res = (await contract.call('get_data_median', [
    enumData,
  ])) as GetDataMedianResponse;
  const priceInUSD = Number(formatUnits(res.price, decimals));
  const priceInCrypto = 1 / priceInUSD; // Invert the price to get 1 BTC in USD
  return { priceInCrypto, priceInUSD };
}

// // pair id from https://docs.pragma.build/v1/Resources/data-feeds/supported-assets

export { getAssetPriceMedian };
