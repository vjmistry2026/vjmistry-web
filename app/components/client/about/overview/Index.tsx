import { AboutType } from "@/app/types/about";
import PageBanner from "../../common/PageBanner";
import { bannerData } from "./data";
import AboutVj from "./sections/AboutVj";
import CompanyTimeline from "./sections/CompanyTimeline";
import MissionVision from "./sections/MissionVision";
import WhatSetsUsApart from "./sections/WhatsSets";

const Index = ({ data }: { data: AboutType }) => {
    return (
        <>
            <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
            <AboutVj data={data.firstSection} />
            <CompanyTimeline data={data.secondSection} />
            <MissionVision data={data.thirdSection} />
            <WhatSetsUsApart firstData={data.fourthSection} secondData={data.fifthSection} />
        </>
    );
};

export default Index;
