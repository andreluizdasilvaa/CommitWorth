import Image from "next/image";
import ImageGithub from '@/assets/github-logo.svg'

export function Logo() {
    return (
        <div className='flex items-center gap-2 cursor-cell'>
            <Image 
                src={ImageGithub}
                alt='Logo CommitWorth'
                width={30}
                height={30}
            />
            <p className='text-secondarypurple text-xl font-bold'>CommitWorth</p>
        </div>
    )
}