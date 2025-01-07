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
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);
  const router = useRouter();

  const handleButtonClick = (index: number, route: string) => {
    setActiveIndex(index);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        router.push(route);
      }
    }, 400);
  };

  return (
    <div
      className={cn(
        "flex justify-evenly w-screen bottom-0 h-16 items-center bg-accent",
        className
      )}
    >
      {[
        { icon: Wallet, route: "/" },
        { icon: ArrowDownUp, route: "/swap" },
        { icon: BrainCircuit, route: "/circuit" },
        { icon: ChartCandlestick, route: "/candlestick" },
        { icon: Info, route: "/info" },
      ].map((obj, index) => (
        <Button
          key={index}
          onClick={() => handleButtonClick(index, obj.route)}
          className={cn(
            "h-12 w-12 rounded-full text-white shadow-none font-bold bg-accent",
            activeIndex === index ? "active:bg-accent" : "bg-accent"
          )}
          style={{
            transform:
              activeIndex === index ? "translateY(-22px)" : "translateY(0)", // Slight upward shift
            backgroundColor: activeIndex === index ? "#272729" : "transparent",
            transition: "transform 0.4s ease", // Smooth transition
          }}
        >
          <obj.icon />
        </Button>
      ))}
    </div>
  );
};
