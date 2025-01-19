'use client';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { Button } from '@/components/shadcn/button';
import { useToast } from '@/hooks/use-toast';
import { useStarkBalance } from '@/hooks/useStarkBalance';
import { formatUnits } from 'ethers';

export default function WalletStats() {
    const { account, isConnected } = useArgentTelegram();
    const { toast } = useToast();
    const balance = useStarkBalance();
    
    if (!isConnected || !account) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Connect Wallet to get started</p>
            </div>
        );
    }
    
    function handleAddressClick() {
        if (!account || !account.address) return;
        navigator.clipboard.writeText(account.address).catch();
        toast({
            title: 'Copied Address',
            description: 'Your address has been copied to the clipboard',
        });
        
    }
    
    return (
        <div className="flex flex-col items-center h-full bg-transparent text-center pt-10 ">
            <p className="font-bold">Your Address:</p>
            <Button onClick={handleAddressClick} className="break-all whitespace-normal max-w-full bg-transparent h-auto hover:bg-gray-600 text-primary font-light m-1">
                {account.address}
            </Button>
            
            <p className="">Balance: <span className="font-bold">{Number(formatUnits(balance)).toPrecision(4)} STRK</span></p>
        </div>
    
    );
    
}