import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import assetList from '@/public/supportedTokens.json';
import pragmaTokens from '@/public/pragmaTokens.json';

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