import { FoundersMessageType } from "@/app/types/foundersMessage";
import CorePhilosophy from "./sections/CorePhilosophy";
// import FoundersMessage from "./sections/FounderMessage";
import PageBanner from "../../common/PageBanner";
import Main from "./sections/Main";



const Index = ({ data }: { data: FoundersMessageType }) => {
    return (
        <>
            <PageBanner title={"Founder’s Message"} image={"/assets/images/founder-message/banner.jpg"} imageAlt={"founder's message"} />
            <Main data={data.firstSection} />
            {/* <FoundersMessage data={data.firstSection} /> */}
            <CorePhilosophy data={data.secondSection} />
        </>
    );
};

export default Index;
