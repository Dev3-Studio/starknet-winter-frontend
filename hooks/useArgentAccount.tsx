import { useEffect, useState } from 'react';
import { SessionAccountInterface } from '@argent/tma-wallet';
import { argentTMA } from '@/config';

export const useArgentAccount = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<SessionAccountInterface | null>(null);
    
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
    
    return { account, isConnected };
};