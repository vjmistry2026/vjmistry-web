import Index from "@/app/components/client/services/Index";
import { getServices } from "@/lib/services/services.service";

export const revalidate = false;

const page = async () => {
    const service = await getServices();
    return <Index data={service} />;
};

export default page;
