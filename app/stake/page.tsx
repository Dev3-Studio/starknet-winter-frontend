import StakeCard from '@/components/StakePage';
import { ToasterPrompt } from '@/components/ToasterPrompt';

export default function StakePage() {
  return (
    <div className='flex fle-col justify-center h-max'>
      <StakeCard className='' />
      <ToasterPrompt />
    </div>
  );
}
