import StakeCard from "@/components/StakePage";
import {Toaster} from "@/components/Toaster";


export default function StakePage () {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <StakeCard/>
            <Toaster />
        </div>
    );
}
