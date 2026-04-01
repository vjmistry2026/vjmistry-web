import Index from "@/app/components/client/hse/Index";
import { getHse } from "@/lib/services/hse.service";

export const revalidate = false;

const Page = async () => {
    const hse = await getHse()
    return <Index data={hse} />
}
export default Page;