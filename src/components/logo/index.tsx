"use client"

import Image from "next/image";
import Link from "next/link";
import ImageGithub from '@/assets/github-logo.svg'

export function Logo({ isImg, className }: { isImg?:boolean, className?: string  }) {
    let linkHref = isImg ? '#' : '/'

    return (
        <Link href={linkHref} className={`flex items-center gap-2 cursor-cell ${className}`}>
            <Image 
                src={ImageGithub}
                alt='Logo CommitWorth'
                width={30}
                height={30}
            />
            <p className='text-secondarypurple text-xl font-bold'>CommitWorth</p>
        </Link>
    )
}