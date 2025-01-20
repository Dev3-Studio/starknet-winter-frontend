import Image from 'next/image';
import { DropDownMenu } from './DropDownMenu';

export default function Header() {
  return (
    <header className='flex flex-row justify-between items-center p-4 bg-background'>
      <Image
        src={'./teleswap-w.svg'}
        alt={'Teleswap'}
        className='h-8 w-auto'
        width={300}
        height={62}
        priority={true}
      />
      <DropDownMenu />
    </header>
  );
}
