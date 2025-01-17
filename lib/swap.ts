'use server';

import { fetchBuildExecuteTransaction, fetchQuotes } from '@avnu/avnu-sdk';
import { SessionAccountInterface } from '@argent/tma-wallet';
import { num, RPC } from 'starknet';

export async function getQuote(
  tokenIn: string,
  tokenOut: string,
  wallet: string,
  amountIn: bigint
) {
  return await fetchQuotes(
    {
      sellTokenAddress: tokenIn,
      buyTokenAddress: tokenOut,
      sellAmount: amountIn,
      takerAddress: wallet,
    },
    { baseUrl: 'https://api.avnu.fi' }
  );
}

export async function swap(account: SessionAccountInterface, quoteId: string) {
  const maxQtyGasAuthorized = 1800n; // max quantity of gas authorized
  const maxPriceAuthorizeForOneGas = 20n * 10n ** 12n; // max FRI authorized to pay 1 gas (1 FRI=10**-18 STRK)

  const txBuild = await fetchBuildExecuteTransaction(
    quoteId,
    account.address,
    0.05,
    true
  );

  const transactionHashes: string[] = [];

  Promise.all(
    txBuild.calls.map(async (call) => {
      const { transaction_hash } = await account.execute(call, {
        version: 3,
        maxFee: 10 ** 15,
        feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
        resourceBounds: {
          l1_gas: {
            max_amount: num.toHex(maxQtyGasAuthorized),
            max_price_per_unit: num.toHex(maxPriceAuthorizeForOneGas),
          },
          l2_gas: {
            max_amount: num.toHex(0),
            max_price_per_unit: num.toHex(0),
          },
        },
      });
      transactionHashes.push(transaction_hash);
    })
  );

  return transactionHashes;
}
