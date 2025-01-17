import { fetchBuildExecuteTransaction, fetchQuotes } from '@avnu/avnu-sdk';
import { SessionAccountInterface } from '@argent/tma-wallet';
import { sendTransaction } from '@/lib/transaction';

// Mainnet: https://starknet.api.avnu.fi
// Testnet: https://sepolia.api.avnu.fi
const QUOTE_URL = 'https://starknet.api.avnu.fi';

export async function getAmountOut(
    tokenIn: string,
    tokenOut: string,
    wallet: string,
    amountIn: bigint,
) {
    return await fetchQuotes(
        {
            sellTokenAddress: tokenIn,
            buyTokenAddress: tokenOut,
            sellAmount: amountIn,
            takerAddress: wallet,
        },
        { baseUrl: QUOTE_URL },
    );
}

export async function getAmountIn(
    tokenIn: string,
    tokenOut: string,
    wallet: string,
    amountOut: bigint,
) {
    return await fetchQuotes(
        {
            sellTokenAddress: tokenOut,
            buyTokenAddress: tokenIn,
            buyAmount: amountOut,
            takerAddress: wallet,
        },
        { baseUrl: QUOTE_URL },
    );
}

export async function swap(account: SessionAccountInterface, quoteId: string) {
    const txBuild = await fetchBuildExecuteTransaction(
        quoteId,
        account.address,
        0.05,
        true,
    );
    
    return await sendTransaction(account, txBuild.calls);
}
