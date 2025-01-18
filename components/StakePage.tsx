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
import { DollarSection } from '@/components/DollarSection';
import { useState } from 'react';
import { useArgent } from '@/hooks/useArgent';
import { StakeButton } from './StakeButton';
import { UnstakeButton } from './UnstakeButton';
import { StakingStats } from './StakingStats';
import STRKSection from './STRKSection';

type CardProps = React.ComponentProps<typeof Card>;

export default function StakeCard({ className, ...props }: CardProps) {
  const argent = useArgent();
  const [activeTab, setActiveTab] = useState(true);

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
          <STRKSection />
          <DollarSection />
        </div>
        <div className='w-full'>
          {!argent.isConnected ? (
            // <ConnectWalletButton />
            <div></div>
          ) : (
            <>{activeTab ? <StakeButton /> : <UnstakeButton />}</>
          )}
        </div>

        <StakingStats stakingStats={null} />
      </CardContent>
    </Card>
  );
}
