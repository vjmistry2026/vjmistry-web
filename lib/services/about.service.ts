// lib/services/about.service.ts

import connectDB from "@/lib/mongodb";
import AboutModel from "@/app/models/About";
import { AboutType } from "@/app/types/about";


import { unstable_cache } from "next/cache";

export const getAbout = unstable_cache(
    async (): Promise<AboutType> => {
        await connectDB();
        console.log("🔥 DB HIT: getAbout called");

        const about = await AboutModel.findOne({}).lean<AboutType>();

        if (!about) {
            throw new Error("About not found");
        }

        return JSON.parse(JSON.stringify(about));
    },
    ["about"], // cache key
    {
        tags: ["about"], // for revalidation
    }
);


// ✅ PATCH
export async function updateAbout(data: Partial<AboutType>): Promise<AboutType> {
    await connectDB();

    const about = await AboutModel.findOneAndUpdate({}, data, {
        upsert: true,
        new: true,
    }).lean<AboutType>();

    if (!about) {
        throw new Error("About not found");
    }

    return about;
}