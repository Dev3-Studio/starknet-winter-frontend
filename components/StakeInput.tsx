'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import StarknetIcon from '@/public/StarknetIcon.svg';
import { getAssetPriceMedian } from '@/actions/findPrice';

interface StakeInputProps {
  starkcoinAmount: number | undefined;
  callback: (arg: number) => void;
}

const StakeInput: React.FC<StakeInputProps> = ({
  starkcoinAmount,
  callback,
}: StakeInputProps) => {
  useEffect(() => {
    const fetchConversionRate = async () => {
      const amountSTRK = await getAssetPriceMedian('6004514686061859652', 8);
      setConversionRate(amountSTRK);
    };
    fetchConversionRate();
  }, []);

  const [conversionRate, setConversionRate] = useState({
    priceInCrypto: 0,
    priceInUSD: 0,
  });

  const dollarAmount = starkcoinAmount
    ? (starkcoinAmount * conversionRate?.priceInCrypto).toFixed(2)
    : '0.00';

  return (
    <div className='flex flex-row items-center justify-between p-2 rounded-lg mb-2 border border-solid focus-within:border-contrast-4 hover:bg-contrast-0'>
      {/* Icon Section */}
      <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-x-3'>
          <Image
            src={StarknetIcon}
            alt='Starknet Icon'
            width={24}
            height={24}
            className='w-10 h-10'
          />
          <p className='text-sm font-bold text-contrast-5'>STRK</p>
        </div>
      </div>
      {/* Input Section */}
      <div className='flex flex-col items-end'>
        <div>
          <input
            className='focus:outline-none focus:ring-0 bg-transparent text-right'
            placeholder='0'
            value={
              starkcoinAmount !== undefined ? starkcoinAmount.toString() : ''
            }
            type='number'
            onChange={(e) =>
              callback(
                isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value)
              )
            }
          />
        </div>
        <div className='flex justify-end'>
          <p className='text-sm font-normal text-right text-contrast-3'>
            ${starkcoinAmount ? dollarAmount : '0.00'}
          </p>
        </div>
      </div>
    </div>
  );
};

export { StakeInput };
