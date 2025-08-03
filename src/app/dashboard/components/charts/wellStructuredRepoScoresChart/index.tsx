"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const chartConfig = {
    score: {
        label: "name",
        color: "#748CAB",
    },
} satisfies ChartConfig

interface CardProps {
    title: string;
    value: {
        name: string;
        score: number;
    }[];
}

export function WellStructuredRepoScoresChart({ title, value }: CardProps) {
    return (
        <div className="flex flex-col gap-5 w-full max-h-[350px] rounded-2xl bg-primaryblue p-5 pb-10">
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
                    <Bar dataKey="score" fill="var(--color-score)" radius={12} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
