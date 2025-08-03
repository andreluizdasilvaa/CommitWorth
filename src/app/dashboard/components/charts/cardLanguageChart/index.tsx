"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const chartConfig = {
    count: {
        label: "Repositórios",
        color: "#613DC1",
    },
} satisfies ChartConfig

interface CardProps {
    about?: string;
    title: string;
    value: {
        language: string;
        count: number;
    }[]
}

export function CardLanguageChart({ title, value, about }: CardProps) {
    return (
        <div className="flex flex-col gap-5 w-full max-h-[450px] shadow-2xl rounded-2xl bg-primaryblue p-5 pb-10">
            <div className="flex items-center justify-between">
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
                                <p>{about}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <BarChart layout="vertical" data={value}>
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                    <YAxis
                        type="category"
                        dataKey="language"
                        tickLine={false}
                        axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[0, 12, 12, 0]} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
