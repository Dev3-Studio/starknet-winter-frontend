'use client';
export default function WalletPage() {
    function handleClick() {
        // Redirect to the Argent wallet app
        window.location.href = 'https://t.me/argenttestbot/wallet';
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl mt-1 text-center">Note:</h1>
            
            <p className="">Your wallet is not deployed yet. You can deploy it by accessing your wallet from the
                <span onClick={handleClick} className="text-primary cursor-pointer"> Argent Telegram Wallet</span> and
                performing any transaction.
                E.g send a small amount of stark to yourself.</p>
        </div>
    
    );
}