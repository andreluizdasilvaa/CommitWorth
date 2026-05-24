import { LucideIcon } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface CardInfoUserSmallProps {
    title: string;
    Icon: LucideIcon;
    value?: number;
    className?: string;
    about?: string;
}

export function CardInfoUserSmall({ title, Icon, value, className, about }: CardInfoUserSmallProps) {
    return (
        <div className={`flex flex-col gap-5 w-full rounded-2xl bg-primaryblue p-5 pb-10 shadow-2xl ${className || ""}`}>
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

                <Icon size={30} color='#613DC1' />
            </div>

            <p className='text-center truncate text-6xl font-inter font-black text-primarybege'>{value}</p>
        </div>
    )
}