import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        if (id) {
            const gallery = await Gallery.findOne({});
            if (!gallery) {
                return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
            }
            const toUpdateItem = gallery.items.find((item: { _id: string; }) => item._id.toString() === id);
            if (!toUpdateItem) {
                return NextResponse.json({ message: "Item not found" }, { status: 404 });
            }
            return NextResponse.json({ data: toUpdateItem, message: "Item fetched successfully" }, { status: 200 });
        }
        const gallery = await Gallery.findOne({});
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        return NextResponse.json({ data: gallery, message: "Gallery fetched successfully" }, { status: 200 });
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
        const id = request.nextUrl.searchParams.get("id");
        if (id) {
            const gallery = await Gallery.findOne({});
            if (!gallery) {
                return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
            }
            const toUpdateItem = gallery.items.find((item: { _id: string; }) => item._id.toString() === id);
            if (!toUpdateItem) {
                return NextResponse.json({ message: "Item not found" }, { status: 404 });
            }
            toUpdateItem.item = body.name;
            toUpdateItem.thumbnail = body.image;
            toUpdateItem.thumbnailAlt = body.imageAlt;
            await gallery.save();
            revalidateTag("gallery", "default")
            return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
        }
        const gallery = await Gallery.findOneAndUpdate({}, body, { upsert: true, new: true });
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        revalidateTag("gallery", "default")
        return NextResponse.json({ data: gallery, message: "Gallery updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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
        const id = request.nextUrl.searchParams.get("id");
        if (id) {
            const gallery = await Gallery.findOne({});
            if (!gallery) {
                return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
            }
            const toUpdateItem = gallery.items.find((item: { _id: string; }) => item._id.toString() === id);
            if (!toUpdateItem) {
                return NextResponse.json({ message: "Item not found" }, { status: 404 });
            }
            console.log(toUpdateItem.images, body);
            toUpdateItem.images = body;
            revalidateTag("gallery", "default")
            await gallery.save();
            return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
        }
        const gallery = await Gallery.findOne({});
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        revalidateTag("gallery", "default")
        gallery.items.push({ item: body.name, thumbnail: body.image, thumbnailAlt: body.imageAlt, images: [] });
        await gallery.save();
        return NextResponse.json({ message: "Gallery created successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        if (id) {
            const gallery = await Gallery.findOne({});
            if (!gallery) {
                return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
            }
            gallery.items = gallery.items.filter((item: { _id: string; }) => item._id.toString() !== id);
            await gallery.save();
            revalidateTag("gallery", "default")
            return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


