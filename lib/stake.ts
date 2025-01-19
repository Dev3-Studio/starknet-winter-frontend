import { SessionAccountInterface } from '@argent/tma-wallet';
import stakeAbi from './abi/staking';
import starkAbi from './abi/starkToken';
import { AllowArray, Call, Contract } from 'starknet';
import { getStarkBalance, sendTransaction } from '@/lib/starknet';

const delegationPoolAddress = '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b';
const starkAddress = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

function getStakingContract(account: SessionAccountInterface) {
    return new Contract(stakeAbi, delegationPoolAddress, account).typedv2(stakeAbi);
}

function getStarkContract(account: SessionAccountInterface) {
    return new Contract(starkAbi, starkAddress, account).typedv2(starkAbi);
}

export async function stake(amount: bigint, account: SessionAccountInterface) {
    const strkContract = getStarkContract(account);
    const allowanceCall = strkContract.populate('approve', [delegationPoolAddress, amount]);
    
    if (await getStarkBalance(account) < amount) {
        throw new Error('INSUFFICIENT_BALANCE');
    }
    
    const delegationPoolContract = getStakingContract(account);
    
    const existingStake = await getStakeInfo(account);
    
    let calls: AllowArray<Call>;
    if (!existingStake) {
        const enterDelegationPoolCall = delegationPoolContract.populate('enter_delegation_pool', [account.address, amount]);
        calls = [allowanceCall, enterDelegationPoolCall];
    } else {
        const addToDelegationPoolCall = delegationPoolContract.populate('add_to_delegation_pool', [account.address, amount]);
        calls = [allowanceCall, addToDelegationPoolCall];
    }
    
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
    const res = await delegationPoolContract.get_pool_member_info(account.address);
    const unwrappedRes = res.unwrap();
    if (!unwrappedRes) return null;
    
    const rewardAddress = unwrappedRes.reward_address;
    const stake = BigInt(unwrappedRes.amount);
    const pendingUnstakeAmount = BigInt(unwrappedRes.unpool_amount);
    const totalStake = stake + pendingUnstakeAmount;
    const pendingRewards = BigInt(unwrappedRes.unclaimed_rewards);
    const { seconds: unwrappedUnpoolTimestamp } = unwrappedRes.unpool_time.unwrap() ?? {};
    const unlockDate = unwrappedUnpoolTimestamp ? new Date(Number(unwrappedUnpoolTimestamp) * 1000) : undefined;
    let pendingUnstake: { amount: bigint; unlockDate: Date, unlocked: boolean } | undefined;
    if (pendingUnstakeAmount > 0 && unlockDate) {
        pendingUnstake = {
            amount: pendingUnstakeAmount,
            unlockDate,
            unlocked: Date.now() >= unlockDate.getTime(),
        };
    }
    
    return {
        rewardAddress,
        stake,
        totalStake,
        pendingRewards,
        pendingUnstake,
    };
}