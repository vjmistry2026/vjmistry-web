import Index from "@/app/components/client/project-details/Index";
import { getAllProjects, getIndiProjects } from "@/lib/services/project.service";

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = false;

const page = async ({ params }: Props) => {
    const { slug } = await params;
    const project = await getIndiProjects(slug);
    const allProject = await getAllProjects()
    return <Index project={project} allProject={allProject} />;
};

export default page;
