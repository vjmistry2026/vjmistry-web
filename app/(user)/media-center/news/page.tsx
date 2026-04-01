import Index from "@/app/components/client/News/Index";
import { getAllCategory, getAllNews } from "@/lib/services/news.service";

export const revalidate = false;

const Page = async () => {
    const news = await getAllNews()
    const category = await getAllCategory()
    return <Index data={news} category={category} />
};

export default Page;