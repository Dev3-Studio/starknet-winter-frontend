import StakeCard from '@/components/StakePage';
import { ToasterPrompt } from '@/components/ToasterPrompt';

export default function StakePage() {
  return (
    <div className='flex fle-col place-content-center'>
      <StakeCard className='' />
      <ToasterPrompt />
    </div>
  );
}
