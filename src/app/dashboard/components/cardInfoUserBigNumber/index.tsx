import PointsIcon from '@/assets/Points_icon.svg'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip"

// Não me orgulho desse componente :)
interface CardInfoUserSmallProps {
    title: string;
    Icon?: LucideIcon;
    value?: number;
    className?: string;
    isPoints?: boolean;
    isFork?: boolean;
    about?: string;
}

export function CardInfoUserBigNumber({ title, about, Icon, isPoints, value, isFork, className }: CardInfoUserSmallProps) {
    return (
        <div className={`flex flex-col gap-5 w-full min-h-64 rounded-2xl shadow-2xl bg-primaryblue p-5 pb-10 ${className || ""}`}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='text-xl text-primarybege font-inter font-bold'>{title}</p>
                    {about && (
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='flex items-center justify-center border-primarylightblue rounded-full text-primarylightblue border-1 w-5 h-5'>
                                    !
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-70 text-center">{about}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>

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
                } className='text-center text-6xl lg:text-7xl font-inter font-black truncate max-w-full px-2'>
                    {!isPoints && !isFork && (
                        <span>R$</span>
                    )}
                    {value && value.toLocaleString('pt-BR')}
                </p>
            </div>
        </div>
    )
}
