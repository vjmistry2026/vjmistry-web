import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Certificate from "@/app/models/Certificate";
import { revalidateTag } from "next/cache";


export async function GET() {
    try {
        await connectDB();
        const certificate = await Certificate.findOne({});
        if (!certificate) {
            return NextResponse.json({ message: "Certificate not found" }, { status: 404 });
        }
        return NextResponse.json({ data: certificate, message: "Certificate fetched successfully" }, { status: 200 });
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
        const certificate = await Certificate.findOneAndUpdate({}, body, { upsert: true, new: true });
        if (!certificate) {
            return NextResponse.json({ message: "Certificate not found" }, { status: 404 });
        }
        revalidateTag("certificate", "default")
        return NextResponse.json({ data: certificate, message: "Certificate updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
} 