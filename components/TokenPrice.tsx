import Image from 'next/image'
import { formatUnits } from 'ethers';
export default function TokenPrice(props: {token: string, image: string, price: number}) {
    
    // convert token/usd to usd/token
  
    return (
        <div className="rounded-2xl bg-primary">
            <div className="flex items-center flex-col">
                <div className="flex items-center">
                    <img src={props.image} alt={props.token} className="w-8 h-8" />
                    <p className="ml-2 font-bold">{props.token}</p>
                </div>
                <p className="font-bold">{`$${props.price}`}</p>
            </div>
            
        </div>
    )
}