import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import assetList from '@/public/supportedTokens.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenAddressFromName(name: string) {
  const token = assetList.find((asset) => asset.name === name)?.address;
  
    if (!token) {
        throw new Error('Token not found');
    }
    
  return token;
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}