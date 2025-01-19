import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import assetList from '@/public/supportedTokens.json';
import pragmaTokens from '@/public/pragmaTokens.json';
import crypto from 'crypto';
import { toast } from '@/hooks/use-toast';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getTokenAddressFromName(name: string) {
    const token = assetList.find((asset) => asset.name === name)?.address;
    
    if (!token) {
        throw new Error('Token not found');
    }
    return token;
}

export function getTokenFromSymbol(symbol: string) {
    const token = assetList.find((asset) => asset.symbol === symbol);
    
    if (!token) {
        throw new Error('Token not found');
    }
    return token;
}

export function getPragmaTokenFromName(name: string) {
    const token = pragmaTokens.find((asset) => asset.Name === name);
    if (!token) {
        throw new Error('Token not found');
    }
    
    return token;
}

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function getUuidV4() {
    return crypto.randomUUID();
}

interface CustomToastProps {
    title?: string;
    description?: string;
    variant?: 'default' | 'error' | 'success';
}

export function customToast({ title, description, variant }: CustomToastProps) {
    switch (variant) {
        case 'error':
            toast({
                title: `❌ ${title || 'Error'}`,
                description: description || 'An error occurred',
                variant: 'destructive',
            });
            break;
        case 'success':
            toast({
                title: `✅ ${title || 'Success'}`,
                description,
            });
            break;
        default:
            toast({
                title: `🔔 ${title || 'Notification'}`,
                description,
            });
            break;
    }
}