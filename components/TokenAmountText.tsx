import React from 'react';
import { formatUnits } from 'ethers';

export const TokenAmountText: React.FC<React.HTMLAttributes<HTMLParagraphElement> & {
    amount: number | bigint,
    symbol: string,
    decimals: number | bigint
}> = ({ amount, symbol, decimals, ...props }) => {
    const formattedAmount = formatUnits(BigInt(amount), decimals);
    const numberAmount = Number(formattedAmount);
    const fixedDecimalAmount = numberAmount.toFixed(6);
    return <p {...props}>{fixedDecimalAmount} {symbol}</p>;
};