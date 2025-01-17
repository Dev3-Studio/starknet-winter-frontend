import React, { useEffect, useState } from 'react';

const FeesComp = () => {
  const [feesData, setFeesData] = useState({
    priceImpact: '',
    estReceived: '',
    minReceived: '',
    fee: '',
    networkFee: '',
    routingSource: '',
  });

  return (
    <div className='h-[140px] overflow-hidden w-full will-change-[height]'>
      <div className='w-full px-2 flex flex-col gap-1'>
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm text-gray-700 dark:text-slate-400'>
            Price impact
          </span>
          <span className='text-sm font-semibold text-gray-700 text-right dark:text-slate-400'>
            {feesData.priceImpact}
          </span>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm text-gray-700 dark:text-slate-400'>
            Est. received
          </span>
          <span className='text-sm font-semibold text-gray-700 text-right dark:text-slate-400'>
            {feesData.estReceived}
          </span>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm text-gray-700 dark:text-slate-400'>
            Min. received
          </span>
          <span className='text-sm font-semibold text-gray-700 text-right dark:text-slate-400'>
            {feesData.minReceived}
          </span>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm text-gray-700 dark:text-slate-400'>
            Fee (0.25%)
          </span>
          <span className='text-sm font-semibold text-gray-700 text-right dark:text-slate-400'>
            {feesData.fee}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-700 dark:text-slate-400'>
            Network fee
          </span>
          <span className='text-sm font-semibold text-gray-700 text-right dark:text-slate-400'>
            {feesData.networkFee}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-700 dark:text-slate-400'>
            Routing source
          </span>
          <span className='text-sm font-semibold text-gray-700 text-right dark:text-slate-400'>
            {feesData.routingSource}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeesComp;
