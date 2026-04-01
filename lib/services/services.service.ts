// lib/services/about.service.ts

import connectDB from "@/lib/mongodb";
import { ServiceType } from "@/app/types/service";
import Service from "@/app/models/Service";
import { unstable_cache } from "next/cache";

export const getServices = unstable_cache(
    async (): Promise<ServiceType> => {
        await connectDB();
        const services = await Service.findOne({}).lean<ServiceType>();

        if (!services) {
            throw new Error("Service not found");
        }

        return JSON.parse(JSON.stringify(services));
    },
    ["service"], // cache key
    {
        tags: ["service"], // for revalidation
    }
);


// ✅ PATCH
export async function updateServices(data: Partial<ServiceType>): Promise<ServiceType> {
    await connectDB();

    const services = await Service.findOneAndUpdate({}, data, {
        upsert: true,
        new: true,
    }).lean<ServiceType>();

    if (!services) {
        throw new Error("Service not found");
    }

    return services;
}