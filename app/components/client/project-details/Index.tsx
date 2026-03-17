import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ProjectDescription from "./sections/ProjectDetails";
import VideoSection from "./sections/VideoSection";
import RelatedProjects from "./sections/RelatedProjects";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <ProjectDescription />
            <VideoSection />
            <RelatedProjects />
        </>
    );
};

export default Index;
