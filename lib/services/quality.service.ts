import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Quality from "@/app/models/Quality";

export const getQuality = unstable_cache(
    async (): Promise<QualityType> => {
        await connectDB();

        const quality = await Quality.findOne({}).lean();

        if (!quality) {
            throw new Error("Quality not found");
        }

        return JSON.parse(JSON.stringify(quality));
    },
    ["quality"], // cache key
    {
        tags: ["quality"], // for revalidation
    }
);