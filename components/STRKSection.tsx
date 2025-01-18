'use client';

import { useEffect, useState } from 'react';
import { useArgent } from '@/hooks/useArgent';
import { FetchStrkBalance } from './FetchStrkBalance';
import { FetchPoolMemberInfo } from './FetchPoolMemberInfo';
import { Button } from './shadcn/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ClaimProps {
  className: string;
}

const Claim = ({ className }: ClaimProps) => {
  const { toast } = useToast();
  function handleClaim() {
    toast({
      title: 'Transaction Confirmed!✔️',
      description: 'Claimed Staking Rewards',
    });
  }

  return (
    <div className={cn(className)}>
      <Button onClick={handleClaim}>Claim</Button>
    </div>
  );
};

export default function STRKSection() {
  const [balance, setBalance] = useState<any>();
  const [poolmemberinfo, setPoolMemberInfo] = useState<any>();
  const argent = useArgent();

  useEffect(() => {
    const fetchSTRKInfo = async () => {
      if (!argent.isConnected) return;
      const fetchedBalance = await FetchStrkBalance(argent.account?.address);
      const fetchedPoolMemberInfo = await FetchPoolMemberInfo(
        argent.account?.address
      );
      setBalance(fetchedBalance);
      setPoolMemberInfo(fetchedPoolMemberInfo);
    };

    fetchSTRKInfo();
  }, [argent]);
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
        <Claim className={'justify-self-end'} />
      </div>
    </div>
  );
}
