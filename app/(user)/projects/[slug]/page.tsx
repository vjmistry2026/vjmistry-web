import Index from "@/app/components/client/project-details/Index";
import { getAllProjects, getIndiProjects } from "@/lib/services/project.service";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = false;

const page = async ({ params }: Props) => {
    const { slug } = await params;
    const project = await getIndiProjects(slug);
    const allProject = await getAllProjects()
    if (!project) {
        redirect("/404");
    }
    return <Index project={project} allProject={allProject} />;
};

export default page;
