import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "./shadcn/button";

interface TokenListModalProps {
  handleToggleModal: () => void;
  typeAction: string;
}

export default function TokenListModal({
  handleToggleModal,
  typeAction,
}: TokenListModalProps) {
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
    "BNB",
    "LTC",
    "DOT",
    "SHIB",
    "AVAX",
  ];

  const CryptoList = () => {
    return (
      <ul className="list-none pl-5 flex flex-col gap-4 pb-3">
        {cryptos.map((crypto, index) => (
          <li key={index}>{crypto}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Background Blur */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

      {/* Modal */}
      <div className="absolute bg-blue-950 self-center top-[28%] h-2/3 flex flex-col gap-4 p-3 pb-4 w-full rounded-t-3xl z-20">
        {/* Close Button */}
        <div className="flex justify-end">
          <Button
            className="bg-transparent shadow-none rounded-full size-12 focus:bg-transparent active:bg-transparent"
            onClick={handleToggleModal}
          >
            <XIcon />
          </Button>
        </div>

        {/* Instructions and Search */}
        <div className="flex flex-col gap-4">
          <p className="opacity-75">
            Select a token from our default list or search for a token by symbol
            or address to {typeAction}
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
        <div className="max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4">
          <CryptoList />
        </div>
      </div>
    </div>
  );
}
