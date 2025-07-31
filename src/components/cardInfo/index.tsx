import { LucideIcon } from "lucide-react";

interface CardInfo {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function CardInfo({ icon: Icon, title, description }: CardInfo) {
    return (
        <div className="flex flex-col gap-2 p-3 rounded-2xl border-1 border-primaryblue bg-transparent max-w-sm min-h-40">
            <div className="flex items-center gap-2 text-xl font-bold text-primarybege">
                <Icon size={26} color="#fff" />
                <p>{title}</p>
            </div>
            <p className="text-primarylightblue">{description}</p>
        </div>
    )
}