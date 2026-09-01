import Index from "@/app/components/client/NewsDetails/Index";
import { getIndiNews } from "@/lib/services/news.service";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = false;

const Page = async ({ params }: Props) => {
    const { slug } = await params;
    const news = await getIndiNews(slug);
console.log(news)
    if(!news) {
        redirect('/404');
    }
    return <Index news={news} />
};
export default Page;
