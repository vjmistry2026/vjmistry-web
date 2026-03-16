import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ServiceList from "./sections/ServiceList";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} /> 
            <ServiceList />
        </>
    );
};

export default Index;
