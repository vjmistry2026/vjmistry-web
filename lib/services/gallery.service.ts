import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Gallery from "@/app/models/Gallery";
import { GalleryType } from "@/app/types/gallery";

export const getGallery = unstable_cache(
    async (): Promise<GalleryType> => {
        await connectDB();

        const gallery = await Gallery.findOne({}).lean<GalleryType>();

        if (!gallery) {
            throw new Error("Gallery not found");
        }

        return JSON.parse(JSON.stringify(gallery));
    },
    ["gallery"], // cache key
    {
        tags: ["gallery"], // for revalidation
    }
);