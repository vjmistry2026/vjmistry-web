// lib/services/message.service.ts

import connectDB from "@/lib/mongodb";
import MessageModel from "@/app/models/Message";
import { FoundersMessageType } from "@/app/types/foundersMessage";

// ✅ GET
import { unstable_cache } from "next/cache";

export const getMessage = unstable_cache(
    async (): Promise<FoundersMessageType> => {
        await connectDB();
        console.log("🔥 DB HIT: getMessage called");

        const message = await MessageModel.findOne({}).lean<FoundersMessageType>();

        if (!message) {
            throw new Error("Message not found");
        }

        return JSON.parse(JSON.stringify(message));
    },
    ["founder-message"], // cache key
    {
        tags: ["founder-message"], // for revalidation
    }
);

// ✅ PATCH
export async function updateMessage(
    data: Partial<FoundersMessageType>
): Promise<FoundersMessageType> {
    await connectDB();

    const message = await MessageModel.findOneAndUpdate({}, data, {
        upsert: true,
        new: true,
    }).lean<FoundersMessageType>();

    if (!message) {
        throw new Error("Message not found");
    }

    return message;
}