"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

import { Bar, BarChart, XAxis } from "recharts"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const chartConfig = {
    score: {
        label: "+pontos",
        color: "#748CAB",
    },
} satisfies ChartConfig

interface CardProps {
    about?: string;
    title: string;
    value: {
        name: string;
        score: number;
    }[];
}

export function WellStructuredRepoScoresChart({ title, value, about }: CardProps) {
    return (
        <div className="flex flex-col gap-5 w-full max-h-[350px] shadow-2xl rounded-2xl bg-primaryblue p-5 pb-10">
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
                                <p className="max-w-50 text-center">{about}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={value}>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 11)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-score)" radius={12} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
