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
                    contract: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d', // contract address
                    selector: 'approve', //function selector
                },
                {
                    contract: '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b',
                    selector: 'enter_delegation_pool',
                },
            ],
            validityDays: 90, // session validity (in days) - default: 90
        },
    });
    
    const disconnect = async () => {
        await argentTMA.clearSession();
        setAccount(null);
        setIsConnected(false);
    };
    
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
    
    return { argentTMA, account, disconnect, isConnected };
};