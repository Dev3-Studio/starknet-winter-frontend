"use client";

import React from "react";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import {
  ChartCandlestick,
  ArrowDownUp,
  BrainCircuit,
  Wallet,
  Info,
  Scale,
} from "lucide-react";

export const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={cn(
        "flex justify-evenly w-screen bottom-0 h-16 items-center bg-accent",
        className
      )}
    >
      {[Wallet, ArrowDownUp, BrainCircuit, ChartCandlestick, Info].map(
        (Icon, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={cn(
              "h-12 w-12 rounded-full text-white shadow-none font-bold bg-accent",
              activeIndex === index ? "active:bg-accent" : "bg-accent"
            )}
            style={{
              transform:
                activeIndex === index ? "translateY(-22px)" : "translateY(0)", // Slight upward shift
              backgroundColor:
                activeIndex === index ? "#272729" : "transparent",
              transition: "transform 0.5s ease", // Smooth transition
            }}
          >
            <Icon />
          </Button>
        )
      )}
    </div>
  );
};
