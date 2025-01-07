import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "./shadcn/button";

const cryptos = [
  "ETH",
  "BTC",
  "ADA",
  "SOL",
  "XRP",
  "DOGE",
  "BNB",
  "LTC",
  "DOT",
  "SHIB",
  "AVAX",
];

const CryptoList = () => {
  return (
    <ul className="list-none pl-5 flex flex-col gap-4">
      {cryptos.map((crypto, index) => (
        <li key={index}>{crypto}</li>
      ))}
    </ul>
  );
};

export default function TokenListModal() {
  return (
    <div className="absolute bg-blue-950 self-center top-1/4 flex flex-col gap-4 p-3 w-full rounded-t-3xl">
      {/* Close Button */}
      <div className="flex justify-end">
        <Button className="bg-transparent shadow-none rounded-full size-12 focus:bg-transparent active:bg-transparent">
          <XIcon />
        </Button>
      </div>

      {/* Instructions and Search */}
      <div className="flex flex-col gap-4">
        <p className="opacity-75">
          Select a token from our default list or search for a token by symbol
          or address.
        </p>
        <div className="flex gap-2 border-b-2 border-gray-200 pb-2">
          <SearchIcon />
          <input
            placeholder="Search Tokens"
            className="bg-transparent outline-none placeholder-white"
          ></input>
        </div>
      </div>

      {/* Scrollable Crypto List */}
      <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4">
        <CryptoList />
      </div>
    </div>
  );
}
