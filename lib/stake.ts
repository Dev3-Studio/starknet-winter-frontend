import { SessionAccountInterface } from '@argent/tma-wallet';
import stakeAbi from '@/public/stake_abi.json';
import strkAbi from '@/public/strk_abi.json';
import { Contract } from 'starknet';
import { sendTransaction } from '@/lib/transaction';

export async function stake(amount: bigint, account: SessionAccountInterface) {
    const delegationPoolAddress = '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b';
    const starkAddress = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
    
    
    const strkContract = new Contract(strkAbi, starkAddress, account);
    const allowanceCall = strkContract.populate('approve', [delegationPoolAddress, amount]);
    
    
    const delegationPoolContract = new Contract(stakeAbi, delegationPoolAddress, account);
    const enterDelegationPoolCall = delegationPoolContract.populate('enter_delegation_pool', [account.address, amount]);
    
    const calls = [allowanceCall, enterDelegationPoolCall];
    console.log(calls);
    return await sendTransaction(account, allowanceCall);
}