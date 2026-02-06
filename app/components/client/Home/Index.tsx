import ExpertiseSection from "./Sections/Expertise";
import HeroSection from "./Sections/HeroSection";
import LegacySection from "./Sections/Legacy";
import WhatSetsUsApart from "./Sections/WhatSetsUsApart";
import IndustriesWeServe from "./Sections/IndustriesServe";
import Qsr from "./Sections/QSR";
import TrustedClients from "./Sections/TrustedClients";
import PreFooterCta from "./Sections/PreFooterCta";

const Index = () => {
    return (
        <>
            <HeroSection />
            <LegacySection />
            <ExpertiseSection />
            <WhatSetsUsApart />
            <IndustriesWeServe />
            <Qsr />
            <TrustedClients />
            <PreFooterCta />
        </>
    );
};

export default Index;
