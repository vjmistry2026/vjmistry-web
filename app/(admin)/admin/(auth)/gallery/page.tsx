"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FilesIcon } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/ui/image-uploader";
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import GalleryCard from "./ProjectCard";
import { FormError } from "@/app/components/common/FormError";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaEye } from "react-icons/fa6";

interface GalleryFormProps {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    banner: string;
    bannerAlt: string;
    firstSection: {
        title: string;
        description: string;
    }
}

const GalleryPage = () => {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<GalleryFormProps>();

    const [item, setItem] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imageAlt, setImageAlt] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [reorderMode, setReorderMode] = useState(false);

    const [itemList, setItemList] = useState<{ _id: string; item: string; thumbnail: string; thumbnailAlt: string, status: string }[]>([]);

    const handleFetchItem = async () => {
        try {
            const response = await fetch("/api/admin/gallery");
            if (response.ok) {
                const data = await response.json();
                setItemList(data.data.items);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    };

    useEffect(() => {
        handleFetchItem();
    }, []);

    const handleAddGallery = async (data: GalleryFormProps) => {
        try {
            const response = await fetch(`/api/admin/gallery`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding about", error);
        }
    };

    const handleAddItem = async () => {
        try {
            const response = await fetch("/api/admin/gallery", {
                method: "POST",
                body: JSON.stringify({ name: item, image: image, imageAlt: imageAlt, status }),
            });
            if (response.ok) {
                const data = await response.json();
                setItem("");
                setImage("");
                setImageAlt("");
                setStatus("");
                alert(data.message);
                handleFetchItem();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    };

    const handleEditItem = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: item, image: image, imageAlt: imageAlt, status }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setItem("");
                setImage("");
                setImageAlt("");
                setStatus("")
                handleFetchItem();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    };

    const handleDeleteItem = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchItem();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    };

    const fetchGalleryData = async () => {
        try {
            const response = await fetch(`/api/admin/gallery`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("banner", data.data.banner)
                setValue("bannerAlt", data.data.bannerAlt)
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching gallery data", error);
        }
    };


    const getTaskPos = (id: number | string) => itemList.findIndex((item: { _id: string }) => (item._id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setItemList((itemList: { _id: string; item: string; thumbnail: string; thumbnailAlt: string, status: string }[]) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            return arrayMove(itemList, originalPos, newPos);
        });
    };


    const confirmPosition = async () => {
        setReorderMode(!reorderMode);

        const updatedItems = itemList.map((item) => ({
            ...item,
        }));

        setItemList(updatedItems);

        const formData = new FormData()
        formData.append('items', JSON.stringify(updatedItems))
        const response = await fetch(`/api/admin/gallery/reorder`, {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                alert(data.message)
            }
        }
    };

    useEffect(() => {
        fetchGalleryData();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleAddGallery)}>
                <AdminItemContainer>
                    <Label className="" main>Banner</Label>
                    <div className='p-5 rounded-md grid grid-cols-2 gap-5'>
                        <div>
                            <Controller
                                name="banner"
                                control={control}
                                rules={{ required: "Banner is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        recommendedDimension="Recommended: 1920 x 743 (px)"
                                    />
                                )}
                            />
                            <FormError error={errors.banner?.message} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Page Title</Label>
                                <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("firstSection.title", {
                                        required: "Title is required",
                                    })}
                                />
                                <FormError error={errors.firstSection?.title?.message} />
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller
                                    name="firstSection.description"
                                    control={control}
                                    rules={{ required: "Description is required" }}
                                    render={({ field }) => {
                                        return <Textarea value={field.value} onChange={field.onChange} />;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="p-5 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input type="text" placeholder="" {...register("metaTitle")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Description</Label>
                            <Input type="text" placeholder="" {...register("metaDescription")} />
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <div className="flex justify-between items-center p-5">
                        <h1 className="text-md font-semibold">Gallery</h1>
                        <div className="flex items-center gap-2">
                            <Button type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
                            {!reorderMode && <Dialog>
                                <DialogTrigger
                                    className="bg-primary text-white px-3 py-1 rounded-md font-semibold"
                                    onClick={() => setItem("")}
                                >
                                    Add Item
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Item</DialogTitle>
                                        <div className="flex flex-col gap-2">
                                            <Label className="font-bold">Title</Label>
                                            <Input
                                                type="text"
                                                placeholder="Title"
                                                value={item}
                                                onChange={(e) => setItem(e.target.value)}
                                            />
                                            <Label className="font-bold">Thumbnail</Label>
                                            <ImageUploader value={image} onChange={(url) => setImage(url)} recommendedDimension="Recommended: 513 x 426 (px)"/>
                                            <Label className="font-bold">Thumbnail Alt</Label>
                                            <Input
                                                type="text"
                                                placeholder="Thumbnail Alt"
                                                value={imageAlt}
                                                onChange={(e) => setImageAlt(e.target.value)}
                                            />
                                            <div className="flex items-center gap-2 justify-end">
                                                <Label className="">Status</Label>
                                                <Select
                                                    onValueChange={setStatus}
                                                    value={status}
                                                    defaultValue=""
                                                >
                                                    <SelectTrigger className="w-fit">
                                                        <SelectValue placeholder="Select Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>

                                                        <SelectItem value={"draft"}>
                                                            Draft
                                                        </SelectItem>

                                                        <SelectItem value={"published"}>
                                                            Published
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItem}>
                                        Save
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>}
                        </div>
                    </div>
                    <div className="px-5 flex flex-col gap-4 py-3">

                        {reorderMode &&

                            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                <SortableContext items={itemList.map((item) => item._id)} strategy={verticalListSortingStrategy}>
                                    {itemList?.map((item, index) => (
                                        <GalleryCard key={index} item={item} id={item._id} />
                                    ))}
                                </SortableContext>
                            </DndContext>

                        }


                        {!reorderMode && itemList?.map((item) => (
                            <div
                                className="flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all"
                                key={item._id}
                            >
                                <div>
                                    <p>{item.item}</p>
                                </div>
                                <div className="flex gap-8 items-center">
                                    {item.status == "draft" ? (<div className="text-[16px] rounded-xl bg-yellow-300 p-1 flex items-center gap-1">
                                        <FaEye />
                                    </div>) : (<div className="text-[16px] rounded-xl bg-green-300 p-1 flex items-center gap-1">
                                        <FaEye />
                                    </div>)}
                                    <Dialog>
                                        <DialogTrigger
                                            onClick={() => {
                                                setItem(item.item);
                                                setImage(item.thumbnail);
                                                setImageAlt(item.thumbnailAlt);
                                                setStatus(item.status)
                                            }}
                                        >
                                            <FaEdit className="text-lg cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Item</DialogTitle>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        defaultValue={item.item}
                                                        onChange={(e) => setItem(e.target.value)}
                                                    />
                                                    <Label className="font-bold">Thumbnail</Label>
                                                    <ImageUploader value={image} onChange={(url) => setImage(url)} recommendedDimension="Recommended: 513 x 426 (px)"/>
                                                    <Label className="font-bold">Thumbnail Alt</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Thumbnail Alt"
                                                        value={imageAlt}
                                                        onChange={(e) => setImageAlt(e.target.value)}
                                                    />
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <Label className="">Status</Label>
                                                        <Select
                                                            onValueChange={setStatus}
                                                            value={status}
                                                            defaultValue=""
                                                        >
                                                            <SelectTrigger className="w-fit">
                                                                <SelectValue placeholder="Select Status" />
                                                            </SelectTrigger>
                                                            <SelectContent>

                                                                <SelectItem value={"draft"}>
                                                                    Draft
                                                                </SelectItem>

                                                                <SelectItem value={"published"}>
                                                                    Published
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                            <DialogClose
                                                className="bg-black text-white px-2 py-1 rounded-md"
                                                onClick={() => handleEditItem(item._id)}
                                            >
                                                Save
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>

                                    <Link href={`/admin/gallery/${item._id}`}>
                                        <FilesIcon className="text-lg cursor-pointer" />
                                    </Link>

                                    <Dialog>
                                        <DialogTrigger>
                                            <MdDelete className="text-lg cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                                                    No
                                                </DialogClose>
                                                <DialogClose
                                                    className="bg-black text-white px-2 py-1 rounded-md"
                                                    onClick={() => handleDeleteItem(item._id)}
                                                >
                                                    Yes
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </AdminItemContainer>

                <div className="flex">
                    <Button type="submit" className="cursor-pointer text-white text-[16px] w-full">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default GalleryPage;
