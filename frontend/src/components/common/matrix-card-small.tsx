"use client"

import { type LucideIcon, ArrowUp, ArrowDown, Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MatrixCardSmallProps {
    cardSx?: string;
    icon: LucideIcon;
    title: string;
    value: string | number;
    status: 'gain' | 'loss' | 'connected' | 'disconnected';
    metric?: {
        value: string | number;
        type?: 'percentage' | 'points' | 'integration';
        comparison?: string;
    };
}

export function MatrixCardSmall({ 
    cardSx,
    icon: Icon,
    title,
    value,
    status,
    metric
}: MatrixCardSmallProps) {
    const statusConfig = {
        gain: {
            color: "text-green-500",
            bgColor: "bg-green-100 dark:bg-green-900/20",
            icon: ArrowUp
        },
        loss: {
            color: "text-red-500",
            bgColor: "bg-red-100 dark:bg-red-900/20",
            icon: ArrowDown
        },
        connected: {
            color: "text-green-500",
            bgColor: "bg-green-100 dark:bg-green-900/20",
            icon: Check
        },
        disconnected: {
            color: "text-red-500",
            bgColor: "bg-red-100 dark:bg-red-900/20",
            icon: X
        }
    };

    const StatusIcon = statusConfig[status].icon;

    return (
        <Card className={cn("w-full font-publicSans p-4", cardSx)}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="text-muted-foreground text-xl font-bold">
                        {title}
                    </div>
                    <div className="text-3xl font-bold">
                        {value}
                    </div>
                </div>
                <div className={cn(
                    "size-[48px] rounded-full flex items-center justify-center",
                    statusConfig[status].bgColor
                )}>
                    <Icon className={cn("h-6 w-6", statusConfig[status].color)} />
                </div>
            </div>
            {metric && (
                <div className="flex items-center gap-2 mt-4">
                    {metric && (
                        <div className={cn(
                            "flex items-center gap-1",
                            statusConfig[status].color
                        )}>
                            <StatusIcon className="h-4 w-4" />
                            {metric.value}{metric.type && (metric.type === 'percentage' ? '%' : ' pts')}
                            <div className="text-muted-foreground">
                                {metric.comparison}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Card>
    )
}
