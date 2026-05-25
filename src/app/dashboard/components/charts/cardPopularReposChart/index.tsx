"use client"

import { useEffect, useState } from "react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

import { Bar, BarChart, XAxis } from "recharts"

const chartConfig = {
    stars: {
        label: "stars",
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
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const updateViewport = () => {
            setIsMobile(window.innerWidth < 640)
        }

        updateViewport()
        window.addEventListener("resize", updateViewport)

        return () => {
            window.removeEventListener("resize", updateViewport)
        }
    }, [])

    return (
        <div className="flex flex-col gap-4 w-full max-h-none sm:max-h-[350px] shadow-2xl rounded-2xl bg-primaryblue p-4 sm:p-5 pb-6 sm:pb-10">
            <div className="flex items-center justify-between">
                <p className="text-lg sm:text-xl text-primarybege font-inter font-bold">{title}</p>
            </div>

            <ChartContainer config={chartConfig} className="min-h-[180px] sm:min-h-[200px] w-full">
                <BarChart accessibilityLayer data={value}>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        interval={0}
                        height={48}
                        tickFormatter={(label) => {
                            const text = String(label)
                            const maxChars = isMobile ? 4 : 12

                            return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text
                        }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="stars" fill="var(--color-stars)" radius={12} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
