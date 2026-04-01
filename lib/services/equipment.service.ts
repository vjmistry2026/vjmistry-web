import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Equipment from "@/app/models/Equipment";
import { EquipmentType } from "@/app/types/equipment";
import "@/app/models/EquipmentCategory";

export const getEquipment = unstable_cache(
    async (): Promise<EquipmentType> => {
        await connectDB();

        const equipment = await Equipment.findOne({})
            .populate("equipments.category", "name _id").lean()

        if (!equipment) {
            throw new Error("Equipment not found");
        }

        return JSON.parse(JSON.stringify(equipment));
    },
    ["equipment"], // cache key
    {
        tags: ["equipment"], // for revalidation
    }
);