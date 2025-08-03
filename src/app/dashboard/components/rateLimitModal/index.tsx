"use client"

import { X } from "lucide-react";
import { useState } from "react";

export interface RateLimitProps {
    totalLimit: string;
    remainder: string;
    reset: string;
}

export function RateLimitModal({
    totalLimit,
    remainder,
    reset
}: RateLimitProps) {
    const [visible, setVisible] = useState(true)

    return (
        <div style={visible ? { display: 'flex'} : { display: 'none'} } className="fixed bottom-12 left-4 flex flex-col text-sm/5 bg-primarymediumblue/20 text-primarybege p-2 w-fit rounded shadow-xl z-90">
            <div className="flex items-center justify-between">
                <p className="font-inter">Total de buscas: {totalLimit}</p>
                <X className="w-6 h-6 text-red-500/50 cursor-pointer" onClick={() => setVisible(false)} />
            </div>
            <p className="font-inter">Restantes: {remainder}</p>
            <p className="font-inter font-medium">{reset}</p>
        </div>
    )
}