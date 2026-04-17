import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ProjectsGrid from "./sections/ProjectsGrid";
import { Suspense } from "react";
import { ProjectType } from "@/app/types/project";
import { Filters } from "@/app/types/projectfilters";

const Index = ({ data, location, projectType, sector }: { data: ProjectType, location: Filters[], projectType: Filters[], sector: Filters[] }) => {
    return (
        <>
            <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
            <Suspense fallback={<div className="py-100 text-center">Loading...</div>}>
                <ProjectsGrid projects={data.projects.filter((item)=>item.status == "published")} location={location} projectType={projectType} sector={sector} />
            </Suspense>
        </>
    );
};

export default Index;
