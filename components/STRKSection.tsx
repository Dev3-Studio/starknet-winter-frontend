export default function STRKSection() {
  return (
    <div className='flex flex-col min-h-20 gap-8 border-t border-x border-solid rounded-t-md px-2 py-8 text-sm'>
      <div>
        <span className='text-muted-foreground'>Available STRK to stake</span>
        <div>0</div>
      </div>
      <div className='grid grid-cols-3'>
        <div className=''>
          <span className='text-muted-foreground'>Staked Amount</span>
          <div>0.00 STRK</div>
        </div>
        <div>
          <span className='text-muted-foreground'>Staked Rewards</span>
          <div>0.00 STRK</div>
        </div>
        <button className='border border-solid rounded-md w-min px-2 justify-self-end'>
          Claim
        </button>
      </div>
    </div>
  );
}
