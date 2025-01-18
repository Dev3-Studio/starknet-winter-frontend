'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StarknetIcon from '@/public/StarknetIcon.svg';
import { getAssetPriceMedian } from '@/actions/findPrice';

const DollarSection: React.FC = ({}) => {
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
  const [starkcoinAmount, setStarkcoinAmount] = useState<string>('');

  const dollarAmount = starkcoinAmount
    ? (parseFloat(starkcoinAmount) * conversionRate?.priceInCrypto).toFixed(2)
    : '0.00';

  return (
    <div className='flex flex-row items-center justify-between p-2 rounded-lg mb-2 border border-solid border-contrast-0 focus-within:border-contrast-4 hover:bg-contrast-0'>
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
        <div className='tooltip_inputWrap___XCbD'>
          <input
            className='!bg-transparent !p-0 !h-fit !m-0 !text-right !text-xl !text-contrast-5 !font-bold focus:outline-none focus:ring-0'
            tabIndex={1}
            placeholder='0.00'
            value={starkcoinAmount}
            onChange={(e) => setStarkcoinAmount(e.target.value)}
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

export { DollarSection };
