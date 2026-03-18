import PageBanner from "../../common/PageBanner";
import { bannerData } from "./data";
import AboutVj from "./sections/AboutVj";
import CompanyTimeline from "./sections/CompanyTimeline";
import MissionVision from "./sections/MissionVision";
import WhatSetsUsApart from "./sections/WhatsSets";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <AboutVj />
            <CompanyTimeline />
            <MissionVision />
            <WhatSetsUsApart />
        </>
    );
};

export default Index;
