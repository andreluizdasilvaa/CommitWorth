"use client"

import { LucideIcon } from 'lucide-react'

interface CardInfoUserSmallProps {
    title: string;
    Icon: LucideIcon;
    value: string;
}

export function CardInfoUserSmall({ title, Icon, value }: CardInfoUserSmallProps) {
    return (
        <div className="flex flex-col gap-5 w-sm rounded-xl bg-primaryblue p-5 pb-10">
            <div className='flex items-center justify-between'>
                <p className='text-xl text-primarybege font-inter font-bold'>{title}</p>

                <Icon size={30} color='#613DC1' />
            </div>

            <p className='text-center text-5xl font-inter font-bold text-primarybege'>{value}</p>
        </div>
    )
}