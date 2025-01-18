import { SessionAccountInterface } from '@argent/tma-wallet';
import stakeAbi from '@/public/stake_abi.json';
import strkAbi from '@/public/strk_abi.json';
import { Contract } from 'starknet';
import { sendTransaction } from '@/lib/transaction';

const delegationPoolAddress = '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b';
const starkAddress = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

function getStakingContract(account: SessionAccountInterface) {
    return new Contract(stakeAbi, delegationPoolAddress, account);
}

function getStarkContract(account: SessionAccountInterface) {
    return new Contract(strkAbi, starkAddress, account);
}

export async function stake(amount: bigint, account: SessionAccountInterface) {
    const strkContract = getStarkContract(account);
    const allowanceCall = strkContract.populate('approve', [delegationPoolAddress, amount]);
    
    
    const delegationPoolContract = getStakingContract(account);
    const enterDelegationPoolCall = delegationPoolContract.populate('enter_delegation_pool', [account.address, amount]);
    
    const calls = [allowanceCall, enterDelegationPoolCall];
    return await sendTransaction(account, calls);
}

export async function claimRewards(account: SessionAccountInterface) {
    const delegationPoolContract = getStakingContract(account);
    const claimRewardsCall = delegationPoolContract.populate('claim_rewards', [account.address]);
    
    return await sendTransaction(account, claimRewardsCall);
}

export async function unstakeIntent(amount: bigint, account: SessionAccountInterface) {
    const delegationPoolContract = getStakingContract(account);
    const exitDelegationPoolCall = delegationPoolContract.populate('exit_delegation_pool_intent', [amount]);
    
    return await sendTransaction(account, exitDelegationPoolCall);
}

export async function unstakeAction(account: SessionAccountInterface) {
    const delegationPoolContract = getStakingContract(account);
    const exitDelegationPoolCall = delegationPoolContract.populate('exit_delegation_pool_action', [account.address]);
    
    return await sendTransaction(account, exitDelegationPoolCall);
}

export async function getStakeInfo(account: SessionAccountInterface) {
    const delegationPoolContract = getStakingContract(account);
    return await delegationPoolContract.get_pool_member_info(account.address);
}