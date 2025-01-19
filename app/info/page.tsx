import { Faq } from '@/components/Faq';

export default function InfoPage() {
    return (
        <div className="">
            <h1 className="text-2xl mt-1 text-center">FAQ</h1>
            
            <Faq
                question="Why do I get an error telling me to initiate my account?"
                answer={`This is due to an unimplemented function in the Argent Telegram Wallet. On new accounts,
                you need to first perform a transaction to deploy your account before you can interact with our app.\n\n
                You can do this easily by sending a small amount of STRK to yourself`}/>
            
            <Faq
                question="How do I get started?" answer="Simple. Connect your wallet through the argent wallet and then
             head to the page corresponding to the action you would like to perform. If you prefer not to get technical
             just chat to our AI and it can perform your action for you!
             "/>
            
            <Faq
                question="How do I use the AI page?"
                answer={`Once you\'ve connected your wallet, send a message explaining what you would like to do e.g.
                "Stake 10 Stark", "Buy 1 ETH", "Swap 3 Stark for USDC"`}/>
            
            <Faq
                question="What happens if the AI hallucinates or misunderstands me?" answer="Fear not. Our AI can not
            perform any actions without first prompting for your confirmation on what it intends to do, ensuring there
            are no unfortunate mishaps."/>
            
            <Faq
                question="What is the Stark token?" answer="The Stark token is the native token of the Starknet network.
             It is used for staking, governance and fees."/>
            
            <Faq
                question="Which token are available to swap?" answer="Since this is a proof of concept running on
            Sepolia, we only support swaps with USDC, ETH and STRK. This is due to the limited token liquidity avaliable
            on Sepolia and a mainnet deployment would support more tokens."/>
        </div>
    
    );
}