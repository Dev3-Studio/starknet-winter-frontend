'use server';
import { fetchBuildExecuteTransaction, fetchQuotes } from '@avnu/avnu-sdk';
import { SessionAccountInterface } from '@argent/tma-wallet';
import { num, RPC } from 'starknet';

// Mainnet: https://starknet.api.avnu.fi
// Testnet: https://sepolia.api.avnu.fi
const QUOTE_URL = 'https://starknet.api.avnu.fi';
export async function getAmountOut(
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
    { baseUrl: QUOTE_URL }
  );
}

export async function getAmountIn(
    tokenIn: string,
    tokenOut: string,
    wallet: string,
    amountOut: bigint
) {
    return await fetchQuotes(
        {
            sellTokenAddress: tokenOut,
            buyTokenAddress: tokenIn,
            buyAmount: amountOut,
            takerAddress: wallet,
        },
        { baseUrl: QUOTE_URL }
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

  const transactionHashes = [];

  for (const call of txBuild.calls) {
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
  }

  return transactionHashes;
}
