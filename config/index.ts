'use client';

import { ArgentTMA } from '@argent/tma-wallet';

const appTelegramUrl = process.env.NEXT_PUBLIC_MINI_APP_LINK;

if (!appTelegramUrl) {
    throw new Error('Missing required environment variable: NEXT_PUBLIC_MINI_APP_LINK');
}

export const argentTMA = ArgentTMA.init({
    environment: 'mainnet', // "sepolia" | "mainnet" (Whitelisting required)
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