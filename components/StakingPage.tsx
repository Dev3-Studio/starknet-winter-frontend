'use client';

import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import React, { useState } from 'react';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/shadcn/input';
import { Form, FormControl, FormField, FormItem } from '@/components/shadcn/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import strkIcon from '@/public/STRK.webp';
import { PriceLabel } from '@/components/PriceLabel';
import { formatUnits, parseUnits } from 'ethers';
import { getAssetPriceMedian } from '@/actions/findPrice';
import { Button } from '@/components/shadcn/button';
import { claimRewards, stake, unstakeAction, unstakeIntent } from '@/lib/stake';
import { useStarkBalance } from '@/hooks/useStarkBalance';
import { toast } from '@/hooks/use-toast';
import { useStakeInfo } from '@/hooks/useStakeInfo';
import { Card, CardContent } from '@/components/shadcn/card';
import { TokenAmountText } from '@/components/TokenAmountText';
import { TimerLabel } from '@/components/TimerLabel';

const stakeFormSchema = z.object({
    amount: z.string().regex(/^\d*\.?\d*$/),
});

const StakingInfoLabel = ({ label, starkAmount }: { label: string, starkAmount: bigint | number }) => {
    return <div>
        <p className="text-muted-foreground text-xs">{label}</p>
        <TokenAmountText
            className="text-xs"
            amount={starkAmount}
            symbol="STRK"
            decimals={18}
        />
    </div>;
};

interface StakingStatsProps {
    balance: bigint;
    totalStaked?: bigint;
    unclaimedRewards?: bigint;
}

const StakingStats: React.FC<StakingStatsProps> = ({ balance, totalStaked, unclaimedRewards }) => {
    const { account } = useArgentTelegram();
    const claimMutation = useMutation({
        mutationFn: async () => {
            if (!account) throw new Error('Please connect your wallet');
            toast({
                title: 'Pending',
                description: 'Claiming Rewards...',
            });
            await claimRewards(account);
        },
        onError: (e) => {
            if (e instanceof Error) {
                toast({
                    title: 'Error',
                    description: e.message,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: 'Error',
                description: 'An error occurred',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Success!',
                description: 'Claimed your rewards successfully!',
            });
        },
    });
    
    return (
        <Card className="rounded-md pt-4 w-full">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <StakingInfoLabel label="STRK Balance" starkAmount={balance}/>
                    {totalStaked && <StakingInfoLabel label="Staked Amount" starkAmount={totalStaked}/>}
                    {unclaimedRewards && <div className="flex w-full justify-between items-center">
                        <StakingInfoLabel
                            label="Unclaimed Rewards"
                            starkAmount={unclaimedRewards}/>
                        <Button
                            disabled={!unclaimedRewards}
                            onClick={() => {
                                claimMutation.reset();
                                claimMutation.mutate();
                            }}
                        >
                            Claim
                        </Button>
                    </div>}
                </div>
            </CardContent>
        </Card>
    );
};

export { StakingStats };

interface StakingFormTemplateProps {
    maxAmount: bigint;
    children?: React.ReactNode;
    onSubmit?: (data: { amount: bigint }) => void;
    onUpdate?: (data: { amount: bigint }) => void;
}

function StakingFormTemplate({ maxAmount, children, onSubmit, onUpdate }: StakingFormTemplateProps) {
    const { account } = useArgentTelegram();
    const [price, setPrice] = useState(0);
    const { data: starkPrice } = useQuery({
        queryKey: ['getAssetPriceMedian', '6004514686061859652', 8],
        initialData: () => 0,
        queryFn: async () => {
            const { priceInUSD } = await getAssetPriceMedian('6004514686061859652', 8);
            return priceInUSD;
        },
    });
    
    const form = useForm<z.infer<typeof stakeFormSchema>>({
        resolver: zodResolver(stakeFormSchema),
    });
    
    const parseInput = (input: string) => {
        try {
            return parseUnits(Number(input).toFixed(18), 18);
        } catch {
            return 0n;
        }
    };
    
    const handleSubmit = (data: z.infer<typeof stakeFormSchema>) => {
        if (onSubmit) onSubmit({ amount: parseInput(data.amount) });
    };
    
    const onTokenAmountChange = async (amount: string) => {
        const parsedAmount = parseInput(amount);
        setPrice(Number(formatUnits(parsedAmount, 18)) * starkPrice);
        if (onUpdate) onUpdate({ amount: parsedAmount });
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-2">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex p-2 gap-2 border rounded-md w-full bg-background">
                                    <div className="flex flex-col gap-1 min-w-10 items-center justify-between">
                                        <Image
                                            src={strkIcon}
                                            alt="STRK"
                                            width={250}
                                            height={250}
                                            className="w-10 h-10"
                                        />
                                        <p className="text-xs font-bold">STRK</p>
                                        <Button
                                            className="h-fit p-1 text-[0.6rem] font-bold uppercase text-primary border-primary"
                                            variant="outline"
                                            type="button"
                                            onClick={() => {
                                                field.onChange({ target: { value: formatUnits(maxAmount, 18) } });
                                                void onTokenAmountChange(formatUnits(maxAmount, 18));
                                            }}
                                        >
                                            Max
                                        </Button>
                                    </div>
                                    <div className="flex flex-col w-full items-end justify-between">
                                        <Input
                                            className="border-none focus-visible:ring-0 text-right pr-0 text-xl"
                                            placeholder="0"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                void onTokenAmountChange(e.target.value);
                                            }}
                                        />
                                        <PriceLabel className="text-sm text-muted-foreground" price={price}/>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {!account && <ConnectWalletButton type="button" className="w-full"/>}
                {account && children}
            </form>
        </Form>
    );
}

function StakeForm() {
    const { account } = useArgentTelegram();
    const [disabled, setDisabled] = useState(true);
    const balance = useStarkBalance();
    const stakeMutation = useMutation({
        mutationFn: async (amount: bigint) => {
            if (!account) throw new Error('Please connect your wallet');
            toast({
                title: 'Pending',
                description: 'Staking STRK...',
            });
            setDisabled(true);
            await stake(amount, account);
        },
        onError: (e) => {
            setDisabled(false);
            if (e instanceof Error) {
                toast({
                    title: 'Error',
                    description: e.message,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: 'Error',
                description: 'An error occurred',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            setDisabled(false);
            toast({
                title: 'Success!',
                description: 'Staked your tokens successfully!',
            });
        },
    });
    
    const handleSubmit = async ({ amount }: { amount: bigint }) => {
        stakeMutation.reset();
        await stakeMutation.mutateAsync(amount);
    };
    
    const handleUpdate = ({ amount }: { amount: bigint }) => {
        stakeMutation.reset();
        if (amount > balance || amount <= 0n) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };
    
    return (
        <StakingFormTemplate maxAmount={balance} onSubmit={handleSubmit} onUpdate={handleUpdate}>
            <Button type="submit" className="w-full" disabled={disabled}>
                {disabled ? 'Invalid Amount' : 'Stake'}
            </Button>
        </StakingFormTemplate>
    );
}

function ClaimPendingWithdrawalCard({ amount, unlockDate }: { amount: bigint, unlockDate: Date }) {
    const { account } = useArgentTelegram();
    const [disabled, setDisabled] = useState(unlockDate.getTime() > Date.now());
    const claimMutation = useMutation({
        mutationFn: async () => {
            if (!account) throw new Error('Please connect your wallet');
            toast({
                title: 'Pending',
                description: 'Claiming Pending Withdrawal...',
            });
            setDisabled(true);
            await unstakeAction(account);
        },
        onError: (e) => {
            setDisabled(false);
            if (e instanceof Error) {
                toast({
                    title: 'Error',
                    description: e.message,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: 'Error',
                description: 'An error occurred',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            setDisabled(false);
            toast({
                title: 'Success!',
                description: 'Claimed your pending withdrawal successfully!',
            });
        },
    });
    
    return (
        <Card className="rounded-md p-4 w-full">
            <CardContent className="flex p-0 w-full justify-between items-center">
                <div>
                    <p className="text-muted-foreground text-xs">Pending Withdrawal</p>
                    <TokenAmountText
                        className="text-xs"
                        amount={amount}
                        symbol="STRK"
                        decimals={18}
                    />
                </div>
                {disabled && unlockDate.getTime() > Date.now() && <TimerLabel date={unlockDate}/>}
                {!disabled && <Button
                    type="button"
                    onClick={() => {
                        claimMutation.reset();
                        claimMutation.mutate();
                    }}
                >
                    Claim
                </Button>}
            </CardContent>
        </Card>
    );
}

function UnstakeForm() {
    const { account } = useArgentTelegram();
    const [disabled, setDisabled] = useState(true);
    const stakeInfo = useStakeInfo();
    const unstakeMutation = useMutation({
        mutationFn: async (amount: bigint) => {
            if (!account) throw new Error('Please connect your wallet');
            toast({
                title: 'Pending',
                description: 'Initiating Unstake...',
            });
            setDisabled(true);
            await unstakeIntent(amount, account);
        },
        onError: (e) => {
            setDisabled(false);
            if (e instanceof Error) {
                toast({
                    title: 'Error',
                    description: e.message,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: 'Error',
                description: 'An error occurred',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            setDisabled(false);
            toast({
                title: 'Success!',
                description: 'Initiated unstake successfully. Please wait for the cooldown period to end before claiming your tokens.',
            });
        },
    });
    
    
    const handleSubmit = async ({ amount }: { amount: bigint }) => {
        unstakeMutation.reset();
        await unstakeMutation.mutateAsync(amount);
    };
    
    const handleUpdate = ({ amount }: { amount: bigint }) => {
        unstakeMutation.reset();
        if (amount <= 0n) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };
    
    return (
        <StakingFormTemplate
            maxAmount={stakeInfo?.totalStake ?? 0n}
            onSubmit={handleSubmit}
            onUpdate={handleUpdate}
        >
            {stakeInfo?.pendingUnstake && (
                <ClaimPendingWithdrawalCard
                    amount={stakeInfo.pendingUnstake.amount}
                    unlockDate={stakeInfo.pendingUnstake.unlockDate}
                />
            )}
            <Button type="submit" className="w-full" disabled={disabled}>
                Initiate Unstake
            </Button>
        </StakingFormTemplate>
    );
}

export default function StakingPage() {
    const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
    const balance = useStarkBalance();
    const stakeInfo = useStakeInfo();
    
    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex w-fit p-1 gap-1 border rounded-md">
                <Button variant={activeTab === 'stake' ? 'default' : 'ghost'} onClick={() => setActiveTab('stake')}>
                    Stake
                </Button>
                <Button variant={activeTab === 'unstake' ? 'default' : 'ghost'} onClick={() => setActiveTab('unstake')}>
                    Unstake
                </Button>
            </div>
            <StakingStats
                balance={balance}
                totalStaked={stakeInfo?.totalStake}
                unclaimedRewards={stakeInfo?.pendingRewards}
            />
            {activeTab === 'stake' && <StakeForm/>}
            {activeTab === 'unstake' && <UnstakeForm/>}
        </div>
    );
}
