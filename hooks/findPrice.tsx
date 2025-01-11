import { RpcProvider } from 'starknet';
import abi from '../public/abi.json';
import { ContractAddress } from '@starknet-io/types-js';
import { cairo, CairoCustomEnum, Contract, CairoOption } from 'starknet';

// const provider = new RpcProvider({
//   nodeUrl: 'https://free-rpc.nethermind.io/mainnet-juno/v0_7',
// });

type GetDataMedianResponse = {
  price: bigint;
  decimals: bigint;
  last_updated_timestamp: bigint;
  num_sources_aggregated: bigint;
  expiration_timestamp: CairoOption<bigint>;
};

const assetList = [
  { Ticker: 'BTC/USD', PairID: '18669995996566340', Decimals: 8 },
  { Ticker: 'ETH/USD', PairID: '19514442401534788', Decimals: 8 },
  { Ticker: 'WBTC/USD', PairID: '6287680677296296772', Decimals: 8 },
  { Ticker: 'WBTC/BTC', PairID: '6287680677295051843', Decimals: 8 },
  { Ticker: 'BTC/EUR', PairID: '18669995995518290', Decimals: 8 },
  { Ticker: 'WSTETH/USD', PairID: '412383036120118613857092', Decimals: 8 },
  { Ticker: 'LORDS/USD', PairID: '1407668255603079598916', Decimals: 8 },
  { Ticker: 'UNI/USD', PairID: '24011449254105924', Decimals: 8 },
  { Ticker: 'STRK/USD', PairID: '6004514686061859652', Decimals: 8 },
  { Ticker: 'ZEND/USD', PairID: '6504691291565413188', Decimals: 8 },
  { Ticker: 'NSTR/USD', PairID: '5643947469983535940', Decimals: 8 },
  { Ticker: 'EKUBO/USD', PairID: '1278253658919688033092', Decimals: 8 },
  { Ticker: 'XSTRK/USD', PairID: '1629317993172502401860', Decimals: 8 },
  { Ticker: 'KSTRK/USD', PairID: '1389510320214278230852', Decimals: 8 },
  { Ticker: 'SSTRK/USD', PairID: '1537084272803954643780', Decimals: 8 },
  {
    Ticker: 'BROTHER/USDPLUS',
    PairID: '344361035359747530676741291142567251',
    Decimals: 18,
  },
];

// gets median price of an asset
// async function get_asset_price_median(pairId: string, decimals: number) {
//   const contractAddress: ContractAddress =
//     '0x02a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b';

//   const contract = new Contract(abi, contractAddress, provider);
//   const enumData = new CairoCustomEnum({ SpotEntry: cairo.felt(pairId) });
//   const res = (await contract.call('get_data_median', [
//     enumData,
//   ])) as GetDataMedianResponse;
//   const resNum = Number(res.price);
//   const priceInCrypto = resNum / Math.pow(10, decimals);
//   const priceInUSD = 1 / priceInCrypto; // Invert the price to get 1 BTC in USD
//   console.log('(1 USD to Coin):', priceInCrypto);
//   console.log('(1 Coin in USD):', priceInUSD);
//   return { priceInCrypto, priceInUSD };
// }

// // pair id from https://docs.pragma.build/v1/Resources/data-feeds/supported-assets

export { assetList };
