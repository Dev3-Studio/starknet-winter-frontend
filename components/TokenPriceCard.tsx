import { cn } from '@/lib/utils';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'; // Make sure to import the icons

export default function TokenPriceCard(props: {
  token: string;
  image: string;
  price: number;
  className: string;
}) {
  const lastDigit = parseInt(props.price.toString().slice(-1), 10);

  return (
    <div className='rounded-2xl p-4 bg-secondary'>
      <div
        className={cn(
          'flex flex-col justify-items-start gap-1',
          props.className
        )}
      >
        <div className='flex items-center place-content-center'>
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
        <div className='flex justify-center h-full'>
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
