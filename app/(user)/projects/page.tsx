import Index from "@/app/components/client/projects/Index";
import { getAllLocation, getAllProjects, getAllProjectType, getAllSectors } from "@/lib/services/project.service";

export const revalidate = false;

const page = async () => {
    const project = await getAllProjects();
    const location = await getAllLocation();
    const projectType = await getAllProjectType();
    const sector = await getAllSectors();
    return <Index data={project} location={location} projectType={projectType} sector={sector} />;
};

export default page;
