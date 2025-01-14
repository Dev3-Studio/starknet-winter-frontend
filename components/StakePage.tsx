"use client";

import { useState } from "react";


import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card"
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { StakeUnstakeToggle } from '@/components/StakeUnstakeButton';
import { DollarSection } from "@/components/DollarSection";


type CardProps = React.ComponentProps<typeof Card>

export default function StakeCard ({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>
                    <StakeUnstakeToggle/>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <DollarSection/>
                <div className="w-full">
                    {/*<ConnectWalletButton/>*/}
                    <button className="w-full bg-purple-500 px-8 py-2 rounded-[8px]">
                        Connect Wallet
                    </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-contrast-0">
                    <p className="text-sm text-contrast-5 font-bold">Transaction Fee</p>
                    <p className="text-sm text-contrast-5 font-bold">$0.00</p>
                </div>

            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
