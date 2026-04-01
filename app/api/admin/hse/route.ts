import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Hse from "@/app/models/Qhse";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";


export async function GET() {
    try {
        await connectDB();
        const qhse = await Hse.findOne({});
        if (!qhse) {
            return NextResponse.json({ message: "Hse not found" }, { status: 404 });
        }
        return NextResponse.json({ data: qhse, message: "Hse fetched successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const qhse = await Hse.findOneAndUpdate({}, body, { upsert: true, new: true });
        if (!qhse) {
            return NextResponse.json({ message: "Hse not found" }, { status: 404 });
        }
        revalidateTag("hse", "default")
        return NextResponse.json({ data: qhse, message: "Hse updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}