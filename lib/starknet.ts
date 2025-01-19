import { AllowArray, Call, Contract, RPC, uint256 } from 'starknet';
import { SessionAccountInterface } from '@argent/tma-wallet';
import starkAbi from './abi/starkToken';

export async function sendTransaction(account: SessionAccountInterface, calls: AllowArray<Call>): Promise<string> {
    const { resourceBounds } = await account.estimateInvokeFee(calls); // todo Catch uninitiated error here too.
    
    try {
        const { transaction_hash } = await account.execute(calls, {
            version: 3,
            feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
            resourceBounds,
        });
        
        return transaction_hash;
    } catch (e) {
        if (e instanceof Error && e.message === 'Method not implemented.') {
            throw new Error('Please initiate your Argent wallet. Please see our FAQ for more information.');
        }
        throw e;
    }
}

export async function getStarkBalance(account: SessionAccountInterface) {
    const tokenAddress = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
    const tokenContract = new Contract(starkAbi, tokenAddress, account).typedv2(starkAbi);
    const res = await tokenContract.balance_of(account.address);
    if (typeof res === 'number') {
        return BigInt(res);
    } else if (typeof res === 'bigint') {
        return res;
    } else {
        return uint256.uint256ToBN(res);
    }
}