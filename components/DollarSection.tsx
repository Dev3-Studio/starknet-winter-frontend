"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import StarknetIcon from '../public/StarknetIcon.svg';

export const DollarSection = () => {
    const conversionRate = 10;
    const [starkcoinAmount, setStarkcoinAmount] = useState<string>("");

    const dollarAmount = starkcoinAmount
        ? (parseFloat(starkcoinAmount) * conversionRate).toFixed(2)
        : "0.00";

    return (
        <div
            className="flex flex-row items-center justify-between bg-contrast-0a p-2 rounded-lg mb-2 border border-solid border-contrast-0 focus-within:border-contrast-4 hover:bg-contrast-0">
            {/* Icon Section */}
            <div className="flex flex-col">
                <div className="flex flex-row items-center gap-x-3">
                    <Image
                        src={StarknetIcon}
                        alt="Starknet Icon"
                        width={24}
                        height={24}
                        className="w-10 h-10"
                    />
                    <p className="text-sm font-bold text-contrast-5">STRK</p>
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
    );
};
