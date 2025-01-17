'use client';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { StakeUnstakeToggle } from '@/components/StakeUnstakeButton';
import { DollarSection } from '@/components/DollarSection';

type CardProps = React.ComponentProps<typeof Card>;

export default function StakeCard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn('flex flex-col items-center h-auto', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>
          <StakeUnstakeToggle />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <DollarSection />
        <div className='w-full'>
          <ConnectWalletButton/>
        </div>

        <div className='flex items-center justify-between py-2 border-b border-contrast-0'>
          <p className='text-sm text-contrast-5 font-bold'>Transaction Fee</p>
          <p className='text-sm text-contrast-5 font-bold'>$0.00</p>
        </div>
      </CardContent>
    </Card>
  );
}
