import Image from 'next/image';

export default function Header() {
    return <header className="flex flex-row justify-start items-center p-4 bg-background">
        {/* todo: update to use correct logo */}
        <Image
            src={'https://cdn.dev3.studio/logo.svg'}
            alt={'Dev3 Studio'}
            width={257}
            height={34}
            className="h-4 w-auto"
        />
    </header>;
}