import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ProjectsGrid from "./sections/ProjectsGrid";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <ProjectsGrid />
        </>
    );
};

export default Index;
