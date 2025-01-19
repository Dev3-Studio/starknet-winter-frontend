'use sever';
import { Contract, RpcProvider } from 'starknet';
import abi from '../abi/accountAbi.json'

const provider = new RpcProvider({
    nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
});

// check if a starknet smart wallet is deployed at the given address
export default async function checkAddressDeployed(address: string){
    const contract = new Contract(abi, address, provider);
    try {
        await contract.call('get_owner')
        return true;
    } catch {
        return false;
    }
    
}