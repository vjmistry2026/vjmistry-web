import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import ProjectType from "@/app/models/ProjectType";
import { revalidateTag } from "next/cache";

export async function GET() {
    try {
        await connectDB();
        const projectType = await ProjectType.find({});
        if (!projectType) {
            return NextResponse.json({ message: "Project Type not found" }, { status: 404 });
        }
        return NextResponse.json({ data: projectType, message: "Project Type fetched successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const projectType = await ProjectType.create({ name });
        if (!projectType) {
            return NextResponse.json({ message: "Project Type not found" }, { status: 404 });
        }
        revalidateTag("projectType", "default")
        return NextResponse.json({ data: projectType, message: "Project Type created successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { name } = await request.json();
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const projectType = await ProjectType.findByIdAndUpdate(id, { name }, { upsert: true, new: true });
        if (!projectType) {
            return NextResponse.json({ message: "Project Type not found" }, { status: 404 });
        }
        revalidateTag("projectType", "default")
        return NextResponse.json({ data: projectType, message: "Project Type updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const projectType = await ProjectType.findByIdAndDelete(id);
        if (!projectType) {
            return NextResponse.json({ message: "Project Type not found" }, { status: 404 });
        }
        revalidateTag("projectType", "default")
        return NextResponse.json({ data: projectType, message: "Project Type deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
