"use client"

import Image from "next/image";
import Link from "next/link";
import ImageLogo from '@/assets/logo.svg'

export function Logo({ isImg, className }: { isImg?:boolean, className?: string  }) {
    let linkHref = isImg ? '#' : '/'

    return (
        <Link href={linkHref} className={`flex items-center gap-2 cursor-cell ${className}`}>
            <Image 
                src={ImageLogo}
                alt='Logo CommitWorth'
                width={30}
                height={30}
            />
            <p className='text-secondarypurple text-xl font-bold'>CommitWorth</p>
        </Link>
    )
}