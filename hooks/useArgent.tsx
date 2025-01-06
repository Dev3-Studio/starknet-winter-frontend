'use client';

import { useEffect, useState } from 'react';
import { ArgentTMA, SessionAccountInterface } from '@argent/tma-wallet';

export const useArgent = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [account, setAccount] = useState<SessionAccountInterface | null>(null);
    
    const appTelegramUrl = process.env.NEXT_PUBLIC_MINI_APP_LINK;
    
    if (!appTelegramUrl) {
        throw new Error('Missing required environment variable: NEXT_PUBLIC_MINI_APP_LINK');
    }
    
    const argentTMA = ArgentTMA.init({
        environment: 'sepolia', // "sepolia" | "mainnet" (Whitelisting required)
        appName: 'Starknet DEX', // todo Change the app name
        appTelegramUrl,
        sessionParams: {
            allowedMethods: [
                // todo Placeholder list of contracts/methods allowed to be called by the session key
                {
                    contract:
                        '0x036133c88c1954413150db74c26243e2af77170a4032934b275708d84ec5452f', // contract address
                    selector: 'increment', //function selector
                },
            ],
            validityDays: 90, // session validity (in days) - default: 90
        },
    });
    
    useEffect(() => {
        // Call connect() as soon as the app is loaded
        argentTMA
            .connect()
            .then((res) => {
                if (!res) {
                    // Not connected
                    setIsConnected(false);
                    return;
                }
                
                const { account, callbackData } = res;
                
                if (account.getSessionStatus() !== 'VALID') {
                    // Session has expired or scope (allowed methods) has changed
                    // A new connection request should be triggered
                    
                    // The account object is still available to get access to user's address
                    // but transactions can't be executed
                    const { account } = res;
                    
                    setAccount(account);
                    setIsConnected(false);
                    return;
                }
                
                // The session account is returned and can be used to submit transactions
                setAccount(account);
                setIsConnected(true);
                // Custom data passed to the requestConnection() method is available here
                console.log('callback data:', callbackData);
            })
            .catch((err) => {
                console.error('Failed to connect', err);
            });
    }, []);
    
    return { argentTMA, account, isConnected };
};