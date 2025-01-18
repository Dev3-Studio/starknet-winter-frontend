interface StakingStatsProps {
  stakingStats: Array<any> | null;
}

const StakingStats: React.FC<StakingStatsProps> = ({ stakingStats }) => {
  const stats = [
    { name: 'APY', item: '16.31%' },
    { name: 'Fees', item: '0%' },
    { name: 'Total STRK staked', item: 0 },
    { name: 'Delegated to TELESWAP', item: 0 },
    { name: 'Delay to withdrawal', item: '21 Days' },
  ];
  return (
    <div>
      {stats.map((stat) => (
        <div className='flex justify-between text-muted-foreground'>
          <p>{stat.name}</p>
          <p>{stat.item}</p>
        </div>
      ))}
    </div>
  );
};

export { StakingStats };
