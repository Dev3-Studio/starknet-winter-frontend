"use client";

import React from "react";
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
    router.push(route);
  };

  return (
    <div
      className={cn(
        "flex justify-evenly w-screen bottom-0 h-20 bg-accent",
        className
      )}
    >
      {[
        { name: "Staking", icon: Wallet, route: "/" },
        { name: "Swap", icon: ArrowDownUp, route: "/swap" },
        { name: "AI", icon: BrainCircuit, route: "/ai" },
        { name: "Market", icon: ChartCandlestick, route: "/market" },
        { name: "Help", icon: Info, route: "/info" },
      ].map((obj, index) => (
        <div
          className={cn(
            `w-full h-full flex flex-col text-center text-sm pb-4`,
            activeIndex === index ? "border-t-2 border-primary" : ""
          )}
          key={index}
        >
          <obj.icon
            key={index}
            onClick={() => handleButtonClick(index, obj.route)}
            className={cn(
              "size-5 text-primary-foreground m-auto shadow-none font-bold bg-accent rounded-none ",
              activeIndex === index ? "active:bg-accent" : "bg-accent"
            )}
          />
          <p className="text-muted-foreground">{obj.name}</p>
        </div>
      ))}
    </div>
  );
};
