'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArgentTMA, SessionAccountInterface } from '@argent/tma-wallet';
import { RpcProvider } from 'starknet';
import supportedTokens from '@/public/supportedTokens.json';

export const useArgentTelegram = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<SessionAccountInterface | null>(null);

  const appTelegramUrl = process.env.NEXT_PUBLIC_MINI_APP_LINK;

  if (!appTelegramUrl) {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_MINI_APP_LINK'
    );
  }

  const argent = useMemo(() => {
    return ArgentTMA.init({
      environment: 'sepolia', // "sepolia" | "mainnet" (Whitelisting required)
      appName: 'TeleSwap',
      appTelegramUrl,
      provider: new RpcProvider({
        nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
      }),
      sessionParams: {
        allowedMethods: [
          // todo Placeholder list of contracts/methods allowed to be called by the session key
          ...supportedTokens.map((t) => ({
            contract: t.address,
            selector: 'approve',
          })),
          {
            contract:
              '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b',
            selector: 'enter_delegation_pool',
          },
          {
            contract:
              '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b',
            selector: 'add_to_delegation_pool',
          },
          {
            contract:
              '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b',
            selector: 'claim_rewards',
          },
          {
            contract:
              '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b',
            selector: 'exit_delegation_pool_intent',
          },
          {
            contract:
              '0x07134aad6969880f11b2d50e57c6e8d38ceef3a6b02bd9ea44837bd257023f6b',
            selector: 'exit_delegation_pool_action',
          },
          {
            contract:
              '0x02c56e8b00dbe2a71e57472685378fc8988bba947e9a99b26a00fade2b4fe7c2',
            selector: '"multi_route_swap"',
          },
        ],
        validityDays: 90, // session validity (in days) - default: 90
      },
    });
  }, []);

  useEffect(() => {
    // Call connect() as soon as the app is loaded
    argent
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

  const disconnect = async () => {
    await argent.clearSession();
    setAccount(null);
    setIsConnected(false);
  };

  return { argent, account, disconnect, isConnected };
};
