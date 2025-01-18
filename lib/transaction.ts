import { AllowArray, Call, RPC } from 'starknet';
import { SessionAccountInterface } from '@argent/tma-wallet';

export async function sendTransaction(account: SessionAccountInterface, calls: AllowArray<Call>): Promise<string> {
    const { resourceBounds } = await account.estimateInvokeFee(calls);
    
    const { transaction_hash } = await account.execute(calls, {
        version: 3,
        feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
        resourceBounds,
    });
    
    return transaction_hash;
}