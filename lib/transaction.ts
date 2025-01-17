import { AllowArray, Call, num, RPC } from 'starknet';
import { SessionAccountInterface } from '@argent/tma-wallet';

export async function sendTransaction(account: SessionAccountInterface, calls: AllowArray<Call>): Promise<string> {
    const maxQtyGasAuthorized = 1800n; // max quantity of gas authorized
    const maxPriceAuthorizeForOneGas = 20n * 10n ** 12n; // max FRI authorized to pay 1 gas (1 FRI=10**-18 STRK)
    
    const { transaction_hash } = await account.execute(calls, {
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
    
    return transaction_hash;
}