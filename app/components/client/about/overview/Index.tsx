import PageBanner from "../../common/PageBanner";
import { bannerData } from "./data";
import AboutHeroSection from "./sections/AboutVj";
import CompanyTimeline from "./sections/CompanyTimeline";
import MissionVision from "./sections/MissionVision";
import WhatSetsUsApart from "./sections/WhatsSets";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <AboutHeroSection />
            <CompanyTimeline />
            <MissionVision />
            <WhatSetsUsApart />
        </>
    );
};

export default Index;
