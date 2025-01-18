'use client';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { StakeUnstakeToggle } from '@/components/StakeUnstakeToggle';
import { StakeInput } from './StakeInput';
import { useEffect, useState } from 'react';
import { useArgent } from '@/hooks/useArgent';
import { StakeButton } from './StakeButton';
import { UnstakeButton } from './UnstakeButton';
import { StakingStats } from './StakingStats';
import { STRKSection } from './STRKSection';
import { FetchStrkBalance } from './FetchStrkBalance';
import { useToast } from '@/hooks/use-toast';

type CardProps = React.ComponentProps<typeof Card>;

export default function StakeCard({ className, ...props }: CardProps) {
  const argent = useArgent();
  const [activeTab, setActiveTab] = useState(true);
  const [starkcoinAmount, setStarkcoinAmount] = useState<number | undefined>();
  const [balance, setBalance] = useState<any>(null); // Start with null to handle async state
  const { toast } = useToast();

  useEffect(() => {
    if (argent.account?.address) {
      // Make sure the account address is available before fetching balance
      const fetchBalance = async () => {
        const fetchedBalance = await FetchStrkBalance(
          argent.account.address || null
        );
        setBalance(fetchedBalance); // Ensure the fetched balance is valid
      };

      fetchBalance();
    }

    if (starkcoinAmount ? starkcoinAmount : 0 > balance) {
      toast({ title: 'Error', description: 'You dont have anything staked.' });
    }
  }, [argent.account?.address, starkcoinAmount]); // Re-run effect if the account address changes

  function toggleStake() {
    setActiveTab(!activeTab);
  }

  return (
    <Card
      className={cn('flex flex-col items-center h-auto border-none', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>
          <StakeUnstakeToggle activeTab={activeTab} callback={toggleStake} />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex flex-col gap-2'>
          <STRKSection balance={balance} />
          <StakeInput
            starkcoinAmount={starkcoinAmount}
            callback={setStarkcoinAmount}
          />
        </div>
        <div className='w-full'>
          {!argent.isConnected ? (
            <ConnectWalletButton />
          ) : (
            <>
              {activeTab ? (
                <StakeButton
                  className={''}
                  amountInput={starkcoinAmount}
                  balance={balance}
                  active={activeTab}
                />
              ) : (
                <UnstakeButton />
              )}
            </>
          )}
        </div>

        <StakingStats stakingStats={null} />
      </CardContent>
    </Card>
  );
}
