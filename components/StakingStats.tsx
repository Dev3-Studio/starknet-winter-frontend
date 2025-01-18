interface StakingStatsProps {
  stakingStats: Array<any> | null;
}

const StakingStats: React.FC<StakingStatsProps> = ({ stakingStats }) => {
  const stats = [
    { name: 'APY', number: 0 },
    { name: 'Fees', number: '0%' },
    { name: 'Delegated to AVNU', number: 0 },
    { name: 'Delay to withdrawal', number: '5 minutes' },
  ];
  return (
    <div>
      {stats.map((stat) => (
        <div className='flex justify-between text-muted-foreground'>
          <p>{stat.name}</p>
          <p>{stat.number}</p>
        </div>
      ))}
    </div>
  );
};

export { StakingStats };
