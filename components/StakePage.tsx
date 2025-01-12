"use client";

import { BellRing, Check } from "lucide-react"
import { useState } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card"
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
//import { Switch } from "@/components/ui/switch";




const notifications = [
    {
        title: "Your call has been confirmed.",
    },
    {
        title: "You have a new message!",
    },
    {
        title: "Your subscription is expiring soon!",
    },
]



type CardProps = React.ComponentProps<typeof Card>

export default function StakeCard ({ className, ...props }: CardProps) {
    const conversionRate = 10;
    const [starkcoinAmount, setStarkcoinAmount] = useState<string>("");

    const dollarAmount = setStarkcoinAmount
        ? (parseFloat(starkcoinAmount) * conversionRate).toFixed(2)
        : "0.00";

    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>Stake</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <BellRing />
                    {/* Input Section */}
                    <div className="flex flex-col items-end space-y-2">
                        <input
                            type="number"
                            placeholder="Enter StarkCoin amount"
                            value={starkcoinAmount}
                            onChange={(e) => setStarkcoinAmount(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-sm text-gray-500">
                            ≈ ${dollarAmount}
                        </p>
                    </div>
                    {/*<Switch />*/}
                </div>

                <div className="w-full">
                    {/*<ConnectWalletButton/>*/}
                    <button className="w-full bg-purple-500 px-8 py-2 rounded-[8px]">
                        Connect Wallet
                    </button>
                </div>

                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pt-4 pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
