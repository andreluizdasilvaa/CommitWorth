
import PointsIcon from '@/assets/Points_icon.svg'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image';
// Não me orgulho desse componente
interface CardInfoUserSmallProps {
    title: string;
    Icon?: LucideIcon;
    value?: number;
    className?: string;
    isPoints?: boolean;
    isFork?: boolean;
}

export function CardInfoUserBigNumber({ title, Icon, isPoints, value, isFork, className }: CardInfoUserSmallProps) {
    return (
        <div className={`flex flex-col gap-5 w-full min-h-64 rounded-2xl bg-primaryblue p-5 pb-10 ${className || ""}`}>
            <div className='flex items-center justify-between'>
                <p className='text-xl text-primarybege font-inter font-bold'>{title}</p>

                {Icon && !isPoints ? (
                    <Icon size={40} color='#613DC1' />
                ) : (
                    <Image
                        src={PointsIcon}
                        className='w-7 h-7'
                        alt='asd'
                    />
                )}
            </div>

            <div className='w-full h-full flex justify-center items-center'>
                <p style={
                    isFork ? { color: '#F0EBD8' } : { color: '#32E875' }
                } className='text-center text-6xl lg:text-7xl font-inter font-black'>
                    {!isPoints && !isFork && (
                        <span>$</span>
                    )}
                    {value}
                </p>
            </div>
        </div>
    )
}