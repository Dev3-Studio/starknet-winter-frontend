import React, { useState } from 'react';

interface StakeUnstakeToggleProps {
  activeTab: boolean;
  callback: () => void;
}

export const StakeUnstakeToggle: React.FC<StakeUnstakeToggleProps> = ({
  activeTab,
  callback,
}) => {
  return (
    <div
      role='tablist'
      aria-orientation='horizontal'
      className='inline-flex items-center border border-muted rounded-md px-1 py-1'
      style={{ outline: 'none' }}
    >
      {/* Stake Button */}
      <button
        type='button'
        role='tab'
        aria-selected={activeTab === true}
        className={`flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all ${
          activeTab === true
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-primary'
        }`}
        onClick={() => callback()}
      >
        Stake
      </button>

      {/* Divider Between Buttons */}
      <div className='h-full w-px bg-muted' />

      {/* Unstake Button */}
      <button
        type='button'
        role='tab'
        aria-selected={activeTab === false}
        className={`flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all ${
          activeTab === false
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-primary'
        }`}
        onClick={() => callback()}
      >
        Unstake
      </button>
    </div>
  );
};
