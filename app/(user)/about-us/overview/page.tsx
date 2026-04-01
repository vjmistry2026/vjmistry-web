import Index from "@/app/components/client/about/overview/Index";
import { getAbout } from "@/lib/services/about.service";

export const revalidate = false;

const page = async () => {
    const about = await getAbout();
    return <Index data={about} />;
};

export default page;
