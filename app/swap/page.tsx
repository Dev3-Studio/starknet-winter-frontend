import { Button } from "@/components/shadcn/button";
import { ArrowDownUpIcon, ChevronDown } from "lucide-react";

const SellComp = () => {
  return (
    <div className="bg-gray-700 shadow-md rounded-[10px] p-2 flex flex-col gap-2">
      <div className="">
        <span className="opacity-70 text-sm">Sell</span>
      </div>
      <div className="flex justify-between text-xl text-left">
        <input
          className="w-2/3 bg-transparent text-white placeholder-white placeholder-opacity-70"
          placeholder="0.0"
        />

        <Button className="bg-transparent rounded-full bg-gray-600 flex items-center gap-3 p-2 text-white">
          <img src="/ethereum.webp" className="py-2" />
          <p>ETH</p>
          <ChevronDown />
        </Button>
      </div>
      <div className="text-sm">
        <span className="flex opacity-70 items-baseline">
          <p className="text-lg">$ 0</p>
          <p className="text-sm">.00</p>
        </span>
      </div>
    </div>
  );
};

const BuyComp = () => {
  return (
    <div className="bg-purple-500 shadow-md rounded-[10px] p-2 flex flex-col gap-2">
      <div className="">
        <span className="opacity-80 text-sm">Buy</span>
      </div>
      <div className="flex justify-around text-xl text-left">
        <input
          className="w-2/3 bg-transparent text-white placeholder-white placeholder-opacity-80"
          placeholder="0.0"
        />
        <div>
          <Button className="bg-transparent rounded-full bg-purple-600 flex items-center gap-3 p-2 text-white">
            <img src="/ethereum.webp" className="py-2" />
            <p>ETH</p>
            <ChevronDown />
          </Button>
        </div>
      </div>
      <div className="text-sm text-white">
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
      <Button className="bg-gray-600 rounded-full size-12 border-2 shadow-md border-gray-500 active:bg-gray-600">
        <ArrowDownUpIcon color="white" />
      </Button>
    </div>
  );
};

export default function SwapPage() {
  return (
    <div className="flex flex-col items-center h-screen bg-transparent p-12">
      <div className="flex flex-col gap-2 w-full">
        {/* Sell Comp */}
        <SellComp />

        {/* Swap Feature */}
        <SwapComp />

        {/* Buy Comp */}
        <BuyComp />
      </div>
    </div>
  );
}
