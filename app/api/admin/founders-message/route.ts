// app/api/admin/message/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { getMessage, updateMessage } from "@/lib/services/foundersMessage.service";
import { revalidateTag } from "next/cache";
import Message from "@/app/models/Message";

export async function GET(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);

        if (isAdmin) {
            const message = await Message.findOne({}).lean()
            return NextResponse.json(
                { data: message, message: "Message fetched successfully" },
                { status: 200 }
            );
        }

        const message = await getMessage();

        return NextResponse.json(
            { data: message, message: "Message fetched successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: error.message === "Message not found" ? 404 : 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);

        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const message = await updateMessage(body);

        // 🔥 revalidate page where this is used
        revalidateTag("founder-message", "default"); // change if used elsewhere

        return NextResponse.json(
            { data: message, message: "Message updated successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: error.message === "Message not found" ? 404 : 500 }
        );
    }
}