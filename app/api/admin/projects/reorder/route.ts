import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/models/Project";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const formData = await req.formData()
        const projects = formData.get("projects") as string
        const actualProjects = JSON.parse(projects)
        const allProjects = await Project.findOne({})
        allProjects.projects = actualProjects
        await allProjects.save()
        revalidateTag("all-project", "default")
        session.commitTransaction()
        return NextResponse.json({ message: "Projects reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
    finally {
        session.endSession()
    }
}


