import Equipment from "@/app/models/Equipment";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        // const expertise = await Expertise.findOne({});
        const equipment = await Equipment.findOne({})
            .populate("equipments.category", "name _id")
        if (!equipment) {
            return NextResponse.json(
                { message: "Equipment not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { data: equipment, message: "Equipment fetched successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        const id = request.nextUrl.searchParams.get("id");
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();

        const equipment = await Equipment.findOne({});
        if (id) {
            // const expertise = await Expertise.findOne({});
            // expertise.secondSection.items.forEach((item: { projects: string[] }) => {
            //   const index = item.projects.findIndex(
            //     (projId: string) => projId.toString() === id
            //   );
            //   if (index !== -1) {
            //     item.projects.splice(index, 1);
            //   }
            // });

            // 2️⃣ Add project ID only to the correct service
            // const targetService = expertise.secondSection.items.find(
            //   (item: { _id: string }) => item._id.toString() === body.relatedService
            // );

            // if (targetService) {
            //   if (
            //     !targetService.projects.some(
            //       (projId: string) => projId.toString() === id
            //     )
            //   ) {
            //     targetService.projects.push(id);
            //   }
            // }

            // 3️⃣ Save the updated expertise document
            // await expertise.save();
            const foundEquipment = equipment.equipments.find(
                (equipment: { _id: string }) => equipment._id.toString() === id
            );
            if (!foundEquipment) {
                return NextResponse.json(
                    { message: "Equipment not found" },
                    { status: 404 }
                );
            }
            console.log(body);

            foundEquipment.title = body.title;
            foundEquipment.description = body.description;
            foundEquipment.image = body.image;
            foundEquipment.imageAlt = body.imageAlt;
            foundEquipment.category = body.category;
            await equipment.save();
            revalidateTag("equipment", "default")
            return NextResponse.json(
                { message: "Equipment updated successfully" },
                { status: 200 }
            );
        }
        if (!equipment) {
            await Equipment.create({ ...body });
            revalidateTag("equipment", "default")
            return NextResponse.json(
                { message: "Equipment created successfully" },
                { status: 200 }
            );
        } else {
            await Equipment.findOneAndUpdate({}, body, { upsert: true, new: true });
            revalidateTag("equipment", "default")
            return NextResponse.json(
                { message: "Equipment updated successfully" },
                { status: 200 }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const equipment = await Equipment.findOne({});
        // const expertise = await Expertise.findOne({});
        // const toUpdate = expertise.secondSection.items.find(
        //   (item: { _id: string }) => item._id.toString() === body.relatedService
        // );
        // if (toUpdate) {
        //   if (!toUpdate.projects.includes(project._id.toString())) {
        //     toUpdate.projects.push(project._id.toString());
        //   }
        // }
        // await expertise.save();
        equipment.equipments.push(body);
        revalidateTag("equipment", "default")
        await equipment.save();
        return NextResponse.json(
            { message: "Project created successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
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
        const equipment = await Equipment.findOne({});
        // const expertise = await Expertise.findOne({});
        // const toUpdate = expertise.secondSection.items.find(
        //   (item: { _id: string }) => item._id.toString() === body.relatedService
        // );
        // if (toUpdate) {
        //   if (!toUpdate.projects.includes(project._id.toString())) {
        //     toUpdate.projects.push(project._id.toString());
        //   }
        // }
        // await expertise.save();
        equipment.equipments = equipment.equipments.filter(
            (item: { _id: string }) => item._id.toString() !== id
        );
        revalidateTag("equipment", "default")
        await equipment.save();
        return NextResponse.json(
            { message: "Equipment deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}