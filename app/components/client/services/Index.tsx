import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ServiceList from "./sections/ServiceList";
import { ServiceType } from "@/app/types/service";

const Index = ({ data }: { data: ServiceType }) => {
    return (
        <>
            <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
            <ServiceList data={data.firstSection} />
        </>
    );
};

export default Index;
