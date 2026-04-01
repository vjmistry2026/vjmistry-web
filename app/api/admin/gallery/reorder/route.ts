import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/app/models/Gallery";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const formData = await req.formData()
        const items = formData.get("items") as string
        const actualItems = JSON.parse(items)
        const allItems = await Gallery.findOne({})
        allItems.items = actualItems
        await allItems.save()
        revalidateTag("gallery", "default")
        session.commitTransaction()
        return NextResponse.json({ message: "Items reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
    finally {
        session.endSession()
    }
}


