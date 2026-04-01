import Index from "@/app/components/client/NewsDetails/Index";
import { getIndiNews } from "@/lib/services/news.service";

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = false;

const Page = async ({ params }: Props) => {
    const { slug } = await params;
    const news = await getIndiNews(slug);
    return <Index news={news} />
};
export default Page;
