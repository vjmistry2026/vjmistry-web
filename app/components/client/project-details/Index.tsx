import PageBanner from "@/app/components/client/common/PageBanner";
import { bannerData } from "./data";
import ProjectDescription from "./sections/ProjectDetails";
import VideoSection from "./sections/VideoSection";
import RelatedProjects from "./sections/RelatedProjects";
import { ProjectType } from "@/app/types/project";

const Index = ({ project, allProject }: { project: ProjectType['projects'][number], allProject: ProjectType }) => {
    return (
        <>
            <PageBanner title={project.title} image={project.banner} imageAlt={project.bannerAlt} />
            <ProjectDescription firstSection={project.firstSection} secondSection={project.secondSection} />
            <VideoSection data={project.thirdSection} />
            <RelatedProjects data={allProject} />
        </>
    );
};

export default Index;
