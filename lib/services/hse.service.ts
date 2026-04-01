import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Qhse from "@/app/models/Qhse";
import { HSeType } from "@/app/types/hse";

export const getHse = unstable_cache(
    async (): Promise<HSeType> => {
        await connectDB();

        const hse = await Qhse.findOne({}).lean();

        if (!hse) {
            throw new Error("Hse not found");
        }

        return JSON.parse(JSON.stringify(hse));
    },
    ["hse"], // cache key
    {
        tags: ["hse"], // for revalidation
    }
);