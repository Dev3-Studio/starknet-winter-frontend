"use client";

import { Button } from "@/components/shadcn/button";
import { ArrowDownUpIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import DrawerModal from "@/components/DrawerModal";

interface SellCompProps {
  handleToggleModal: (sell: string) => void;
}

const SellComp = ({ handleToggleModal }: SellCompProps) => {
  return (
    <div className="bg-gray-500 shadow-md rounded-[10px] p-2 flex flex-col gap-2">
      <div className="">
        <span className="opacity-80 text-sm">Sell</span>
      </div>
      <div className="flex justify-around text-xl text-left">
        <input
          className="w-2/3 bg-transparent text-primary-foreground placeholder-white placeholder-opacity-80"
          placeholder="0.0"
        />
        <Button
          className="rounded-full bg-accent flex text-primary-foreground gap-4 w-32"
          onClick={() => handleToggleModal("Sell")}
        >
          <img src="/ethereum.webp" className="w-6 h-6 rounded-full" />
          <p>ETH</p>
          <ChevronDown />
        </Button>
      </div>
      <div className="text-sm text-primary-foreground">
        <span className="flex opacity-80 items-baseline">
          <p className="text-lg">$ 0</p>
          <p className="text-sm">.00</p>
        </span>
      </div>
    </div>
  );
};

interface BuyCompProps {
  handleToggleModal: (buy: string) => void;
}

const BuyComp = ({ handleToggleModal }: BuyCompProps) => {
  return (
    <div className="bg-primary shadow-md rounded-[10px] p-2 flex flex-col gap-2">
      <div className="">
        <span className="opacity-80 text-sm">Buy</span>
      </div>
      <div className="flex justify-around text-xl text-left">
        <input
          className="w-2/3 bg-transparent text-primary-foreground placeholder-white placeholder-opacity-80"
          placeholder="0.0"
        />
        <Button
          className="rounded-full bg-accent flex text-primary-foreground gap-4 w-32"
          onClick={() => handleToggleModal("Buy")}
        >
          <img src="/Sushi.webp" className="w-6 h-6 rounded-full" />
          <p>Sushi</p>
          <ChevronDown />
        </Button>
      </div>
      <div className="text-sm text-primary-foreground">
        <span className="flex opacity-80 items-baseline">
          <p className="text-lg">$ 0</p>
          <p className="text-sm">.00</p>
        </span>
      </div>
    </div>
  );
};

const SwapComp = () => {
  return (
    <div className="flex justify-center">
      <Button className="bg-accent rounded-full size-12">
        <ArrowDownUpIcon color="white" />
      </Button>
    </div>
  );
};

const SwapPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [typeAction, setAction] = useState("");

  const handleToggleModal = (action: string) => {
    setAction(action);
    setOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-transparent p-12">
      <div className="flex flex-col gap-2 w-full">
        {/* Sell Comp */}
        <SellComp handleToggleModal={handleToggleModal} />

        {/* Swap Feature */}
        <SwapComp />

        {/* Buy Comp */}
        <BuyComp handleToggleModal={handleToggleModal} />

        <DrawerModal
          handleToggleModal={handleToggleModal}
          typeAction={typeAction}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default SwapPage;
