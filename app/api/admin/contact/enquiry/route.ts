import connectDB from "@/lib/mongodb"
import Enquiry from "@/app/models/Enquiry"
import { NextRequest, NextResponse } from "next/server"
import { verifyAdmin } from "@/lib/verifyAdmin"

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const { first, second, phone, email, message } = await req.json()
        const enquiry = await Enquiry.create({ first, second, phone, email, message })
        if (!enquiry) {
            return NextResponse.json({ message: "Error sending message", success: false }, { status: 500 })
        }
        return NextResponse.json({ message: "Thank you, we will get back to you soon", success: true }, { status: 200 })
    } catch (error) {
        console.log("Error sending message", error)
        return NextResponse.json({ message: "Error sending message", success: false }, { status: 500 })
    }
}

export async function GET(req: Request) {
    await connectDB()

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const enquiries = await Enquiry.find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

    const total = await Enquiry.countDocuments();

    return Response.json({
        data: enquiries,
        totalPages: Math.ceil(total / limit),
    });
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB()
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await req.json()
        const enquiry = await Enquiry.findByIdAndDelete(id)
        if (!enquiry) {
            return NextResponse.json({ message: "Enquiry not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Enquiry deleted successfully" }, { status: 200 })
    } catch (error) {
        console.log("Error deleting enquiry", error)
        return NextResponse.json({ message: "Error deleting enquiry" }, { status: 500 })
    }
}




