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
import {StakeUnstakeToggle} from '@/components/StakeUnstakeButton';


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
                <CardTitle>
                    <StakeUnstakeToggle/>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">

                {/* to do add to components.*/}

                <div
                    className="flex flex-row items-center justify-between bg-contrast-0a p-2 rounded-lg mb-2 border border-solid border-contrast-0 focus-within:border-contrast-4 hover:bg-contrast-0">
                    {/* Icon Section */}
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-x-3">
                            <p className="text-sm font-bold text-contrast-5">StarkCoin</p>
                        </div>
                    </div>
                    {/* Input Section */}
                    <div className="flex flex-col items-end">
                        <div className="tooltip_inputWrap___XCbD">
                            <input
                                className="numericInput_input__Wo6Z3 !bg-transparent !p-0 !h-fit !m-0 !text-right !text-xl !text-contrast-5 !font-bold focus:outline-none focus:ring-0"
                                tabIndex="1"
                                type="text"
                                inputMode="decimal"
                                pattern="[0-9]*"
                                step="any"
                                title=""
                                min="0"
                                max="1000000"
                                placeholder="0.00"
                                value={starkcoinAmount}
                                onChange={(e) => setStarkcoinAmount(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm font-normal text-right text-contrast-3">
                                ${starkcoinAmount ? dollarAmount : "0.00"}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="w-full">
                    {/*<ConnectWalletButton/>*/}
                    <button className="w-full bg-purple-500 px-8 py-2 rounded-[8px]">
                        Connect Wallet
                    </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-contrast-0">
                    <p className="text-sm text-contrast-5 font-bold">Transaction Fee</p>
                    <p className="text-sm text-contrast-5 font-bold">0.00</p>
                </div>

            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
