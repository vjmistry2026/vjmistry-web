import { NextRequest, NextResponse } from "next/server";
import Equipments from "@/app/models/Equipment";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const formData = await req.formData()
        const equipments = formData.get("equipments") as string
        const actualEquipments = JSON.parse(equipments)
        const allEquipments = await Equipments.findOne({})
        allEquipments.equipments = actualEquipments
        await allEquipments.save()
        session.commitTransaction()
        return NextResponse.json({ message: "Equipments reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
    finally {
        session.endSession()
    }
}


