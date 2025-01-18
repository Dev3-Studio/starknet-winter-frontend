'use client';

import { useEffect, useState } from 'react';
import { useArgent } from '@/hooks/useArgent';
import { FetchStrkBalance } from './FetchStrkBalance';
import { FetchPoolMemberInfo } from './FetchPoolMemberInfo';
import { Button } from './shadcn/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { set } from 'zod';

interface ClaimProps {
  className: string;
  active: boolean | undefined;
}

const Claim = ({ className, active }: ClaimProps) => {
  const { toast } = useToast();
  function handleClaim() {
    toast({
      title: 'Transaction Confirmed!✔️',
      description: 'Claimed Staking Rewards',
    });
  }

  return (
    <div className={cn(className)}>
      <Button onClick={handleClaim} disabled={!active}>
        Claim
      </Button>
    </div>
  );
};

interface STRKSectionProps {
  balance: number;
}

const STRKSection: React.FC<STRKSectionProps> = ({ balance }) => {
  const [poolmemberinfo, setPoolMemberInfo] = useState<any>();
  const [active, setActive] = useState<boolean>();
  const argent = useArgent();

  useEffect(() => {
    const fetchSTRKInfo = async () => {
      if (!argent.isConnected) return;

      const fetchedPoolMemberInfo = await FetchPoolMemberInfo(
        argent.account?.address
      );

      setPoolMemberInfo(fetchedPoolMemberInfo);

      if (fetchedPoolMemberInfo === null) {
        setActive(false);
      }
    };

    fetchSTRKInfo();
  }, []);
  return (
    <div className='flex flex-col min-h-20 gap-8 border-t border-x border-solid rounded-t-md px-2 py-8 text-sm'>
      <div>
        <span className='text-muted-foreground'>Available STRK to stake</span>
        <div>{balance} STRK</div>
      </div>
      <div className='grid grid-cols-3'>
        <div className=''>
          <span className='text-muted-foreground'>Staked Amount</span>
          <div>{poolmemberinfo || '0.00'} STRK</div>
        </div>
        <div>
          <span className='text-muted-foreground'>Staked Rewards</span>
          <div>{poolmemberinfo || '0.00'} STRK</div>
        </div>
        <Claim className={'justify-self-end'} active={active} />
      </div>
    </div>
  );
};

export { STRKSection };
