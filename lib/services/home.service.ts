import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Home from '@/app/models/Home'

export const getHome = unstable_cache(
    async (): Promise<HomeType> => {
        await connectDB();

        const home = await Home.findOne({}).lean();

        if (!home) {
            throw new Error("Home not found");
        }

        return JSON.parse(JSON.stringify(home));
    },
    ["home"], // cache key
    {
        tags: ["home"], // for revalidation
    }
);