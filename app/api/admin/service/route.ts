import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { getServices, updateServices } from "@/lib/services/services.service";
import { revalidateTag } from "next/cache";


export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const isAdmin = await verifyAdmin(request);

        if (isAdmin) {
            const service = await Service.findOne({}).lean()
            return NextResponse.json(
                { data: service, message: "Service fetched successfully" },
                { status: 200 }
            );
        }

        const service = await getServices();
        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }
        return NextResponse.json({ data: service, message: "Service fetched successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const service = await updateServices(body);
        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }
        revalidateTag("service", "default");
        return NextResponse.json({ data: service, message: "Service updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}