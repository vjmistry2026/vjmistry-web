import Index from "@/app/components/client/gallery/Index";
import { getGallery } from "@/lib/services/gallery.service";

export const revalidate = false;

const Page = async () => {
    const gallery = await getGallery()
    return <Index gallery={gallery} />

}
export default Page;