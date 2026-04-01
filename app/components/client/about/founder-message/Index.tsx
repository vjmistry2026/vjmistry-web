import { FoundersMessageType } from "@/app/types/foundersMessage";
import CorePhilosophy from "./sections/CorePhilosophy";
import FoundersMessage from "./sections/FounderMessage";

const Index = ({ data }: { data: FoundersMessageType }) => {
    return (
        <>
            <FoundersMessage data={data.firstSection} />
            <CorePhilosophy />
        </>
    );
};

export default Index;
