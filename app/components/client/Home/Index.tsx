import ExpertiseSection from "./Sections/Expertise";
import HeroSection from "./Sections/HeroSection";
import LegacySection from "./Sections/Legacy";
import WhatSetsUsApart from "./Sections/WhatSetsUsApart";
import IndustriesWeServe from "./Sections/IndustriesServe";
import Qsr from "./Sections/QSR";
import TrustedClients from "./Sections/TrustedClients";
import PreFooterCta from "./Sections/PreFooterCta";
import { ServiceType } from "@/app/types/service";

const Index = ({ data, service }: { data: HomeType, service: ServiceType }) => {
    return (
        <>
            <HeroSection data={data.bannerSection} />
            <LegacySection data={data.firstSection} secondSection={data.secondSection} />
            <ExpertiseSection data={data.thirdSection} service={service} />
            <WhatSetsUsApart data={data.fourthSection} />
            <IndustriesWeServe data={data.fifthSection} />
            <Qsr data={data.sixthSection} />
            <TrustedClients data={data.seventhSection} />
            <PreFooterCta data={data.eighthSection} />
        </>
    );
};

export default Index;
