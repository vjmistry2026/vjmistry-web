import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/models/Project";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
    await connectDB()
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const formData = await req.formData()
        const projects = formData.get("projects") as string
        const actualProjects = JSON.parse(projects)

        const allProjects = await Project.findOne({}).session(session)
        if (!allProjects) {
            await session.abortTransaction()
            return NextResponse.json({ message: "No project document found", success: false }, { status: 404 })
        }

        allProjects.projects = actualProjects
        await allProjects.save({ session })

        await session.commitTransaction()
        revalidateTag("all-project","default")

        return NextResponse.json({ message: "Projects reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    } finally {
        session.endSession()
    }
}


