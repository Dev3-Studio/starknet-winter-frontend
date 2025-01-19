import { cn } from '@/lib/utils';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'; // Make sure to import the icons

export default function TokenPriceList(props: {
  token: string;
  image: string;
  price: number;
  className: string;
}) {
  const lastDigit = parseInt(props.price.toString().slice(-1), 10);

  return (
    <div className='p-4 bg-transparent w-full'>
      <div className={cn('grid grid-cols-3', props.className)}>
        <div className='flex items-center '>
          <img
            src={props.image}
            alt={props.token}
            className='w-8 h-8 rounded-full'
          />
          <p className='ml-2 font-bold text-xs'>{props.token}</p>
        </div>
        <p className='font-bold place-self-center'>
          {`$${props.price.toFixed(2)}`}
        </p>
        <div className='flex justify-end h-full '>
          {lastDigit % 2 === 0 ? (
            <TrendingUpIcon color={'#00ff00'} size={40} />
          ) : (
            <TrendingDownIcon color={'#ff0000'} size={40} />
          )}
        </div>
      </div>
    </div>
  );
}
