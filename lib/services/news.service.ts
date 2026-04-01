import connectDB from "@/lib/mongodb";
import "@/app/models/NewsCategory";

import { unstable_cache } from "next/cache";
import News from "@/app/models/News";
import { NewsType } from "@/app/types/news";
import NewsCategory from "@/app/models/NewsCategory";


interface Filters {
    name: string;
    _id: string;
}

export const getAllNews = unstable_cache(
    async (): Promise<NewsType> => {
        await connectDB();
        console.log("calledddd");


        const news = await News.findOne({})
            .populate("news.firstSection.category", "name _id").lean()

        if (!news) {
            throw new Error("News not found");
        }

        return JSON.parse(JSON.stringify(news));
    },
    ["all-news"], // cache key
    {
        tags: ["all-news"], // for revalidation
    }
);

export const getIndiNews = unstable_cache(
    async (slug: string): Promise<NewsType['news'][number]> => {
        await connectDB();

        const news = await News.findOne({})
            .populate("news.firstSection.category", "name _id")
        const foundNews = news.news.find(
            (news: { firstSection: { slug: string } }) => news.firstSection.slug === slug
        );

        if (!foundNews) {
            throw new Error("News not found");
        }

        return JSON.parse(JSON.stringify(foundNews));
    },
    ["indi-news"], // cache key
    {
        tags: ["indi-news"], // for revalidation
    }
);


export const getAllCategory = unstable_cache(
    async (): Promise<Filters[]> => {
        await connectDB();

        const category = await NewsCategory.find({}).lean()

        if (!category) {
            throw new Error("Categories not found");
        }

        return JSON.parse(JSON.stringify(category));
    },
    ["news-category"], // cache key
    {
        tags: ["news-category"], // for revalidation
    }
);