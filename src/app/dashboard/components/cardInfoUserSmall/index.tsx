import { LucideIcon } from 'lucide-react'

interface CardInfoUserSmallProps {
    title: string;
    Icon: LucideIcon;
    value?: number;
    className?: string;
}

export function CardInfoUserSmall({ title, Icon, value, className }: CardInfoUserSmallProps) {
    return (
        <div className={`flex flex-col gap-5 w-full rounded-2xl bg-primaryblue p-5 pb-10 shadow-2xl ${className || ""}`}>
            <div className='flex items-center justify-between'>
                <p className='text-xl text-primarybege font-inter font-bold'>{title}</p>

                <Icon size={30} color='#613DC1' />
            </div>

            <p className='text-center text-6xl font-inter font-black text-primarybege'>{value}</p>
        </div>
    )
}