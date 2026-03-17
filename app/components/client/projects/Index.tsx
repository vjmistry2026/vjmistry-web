import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ProjectsGrid from "./sections/ProjectsGrid";
import { Suspense } from "react";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <Suspense fallback={<div className="py-100 text-center">Loading...</div>}>
                <ProjectsGrid />
            </Suspense>
        </>
    );
};

export default Index;
