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

  const list = [
    { name: 'Price impact', item: feesData.priceImpact },
    { name: 'Est. received', item: feesData.estReceived },
    { name: 'Min. received', item: feesData.minReceived },
    { name: 'Fee (0.25%)', item: feesData.fee },
    { name: 'Network fee', item: feesData.networkFee },
    { name: 'Routing source', item: feesData.routingSource },
  ];

  return (
    <div className='h-[140px] overflow-hidden w-full will-change-[height]'>
      <div className='w-full px-2 flex flex-col gap-1'>
        {list.map((item) => (
          <div className='flex justify-between items-center gap-2 text-muted-foreground'>
            <span className='text-sm '>{item.name}</span>
            <span className='text-sm font-semibold   text-right da  '>
              {item.item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeesComp;
