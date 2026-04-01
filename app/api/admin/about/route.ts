// app/api/admin/about/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { getAbout, updateAbout } from "@/lib/services/about.service";
import { revalidateTag } from "next/cache";
import About from "@/app/models/About";

export async function GET(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);

        if (isAdmin) {
            const about = await About.findOne({}).lean()
            return NextResponse.json(
                { data: about, message: "About fetched successfully" },
                { status: 200 }
            );
        }
        const about = await getAbout();

        return NextResponse.json(
            { data: about, message: "About fetched successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: error.message === "About not found" ? 404 : 500 }
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

        const about = await updateAbout(body);

        // 🔥 Revalidate page
        revalidateTag("about", "default");

        return NextResponse.json(
            { data: about, message: "About updated successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: error.message === "About not found" ? 404 : 500 }
        );
    }
}