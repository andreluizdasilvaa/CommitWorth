"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const chartConfig = {
    stars: {
        label: "name",
        color: "#E3B341",
    },
} satisfies ChartConfig

interface CardProps {
    title: string;
    value: {
        name: string;
        stars: number;
    }[];
}

export function CardPopularReposChart({ title, value }: CardProps) {
    return (
        <div className="flex flex-col gap-5 w-full max-h-[350px] shadow-2xl rounded-2xl bg-primaryblue p-5 pb-10">
            <div className="flex items-center justify-between">
                <p className="text-xl text-primarybege font-inter font-bold">{title}</p>
            </div>

            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={value}>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 12)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="stars" fill="var(--color-stars)" radius={12} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
