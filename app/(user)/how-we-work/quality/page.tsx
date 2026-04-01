import Index from "@/app/components/client/quality";
import { getQuality } from "@/lib/services/quality.service";

export const revalidate = false;

const Page = async () => {
    const quality = await getQuality()
    return <Index data={quality} />
}

export default Page;