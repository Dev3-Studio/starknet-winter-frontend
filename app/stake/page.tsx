import StakeCard from "@/components/StakePage";
import {ToasterPrompt} from "@/components/ToasterPrompt";


export default function StakePage () {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <StakeCard/>
            <ToasterPrompt />
        </div>
    );
}
