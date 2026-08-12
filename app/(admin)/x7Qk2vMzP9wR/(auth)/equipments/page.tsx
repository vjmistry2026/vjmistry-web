"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FormError } from "@/app/components/common/FormError";
import { Textarea } from "@/components/ui/textarea";
import { RiDeleteBinLine } from "react-icons/ri";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import EquipmentCard from "./EquipmentCard";


interface EquipmentPageProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    secondSection: {
        title: string;
        description: string;
        items: {
            number: string;
            value: string;
        }[]
    },
    thirdSection: {
        title: string;
        description: string;
    }
}



export default function EquipmentPage() {

    const [category, setCategory] = useState<string>("");
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);
    const [equipmentList, setEquipmentList] = useState<{ _id: string, title: string, description: string, image: string; imageAlt: string; category: { name: string; _id: string } }[]>([]);
    const [reorderMode, setReorderMode] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imageAlt, setImageAlt] = useState<string>("");
    const [equipmentCategory, setEquipmentCategory] = useState<string>("");

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<EquipmentPageProps>();

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/equipments/category", {
                method: "POST",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                setCategory("");
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    }

    const handleAddEquipment = async () => {
        try {
            const response = await fetch("/api/admin/equipments", {
                method: "POST",
                body: JSON.stringify({ title, description, image, imageAlt, category: equipmentCategory }),
            });
            if (response.ok) {
                const data = await response.json();
                setTitle("");
                setDescription("");
                setImage("");
                setImageAlt("");
                alert(data.message);
                handleFetchEquipment();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    }

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/equipments/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    }

    const handleFetchEquipment = async () => {
        try {
            const response = await fetch("/api/admin/equipments");
            if (response.ok) {
                const data = await response.json();
                setEquipmentList(data.data.equipments);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching equipment", error);
        }
    }

    const handleEditCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/equipments/category?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
                setCategory("");
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    }

    const handleEditEquipment = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/equipments?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ title, description, image, imageAlt, category: equipmentCategory }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchEquipment();
                setCategory("");
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing equipment", error);
        }
    }

    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/equipments/category?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting category", error);
        }
    }

    const handleDeleteEquipment = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/equipments?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchEquipment();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting equipment", error);
        }
    }


    const onSubmit = async (data: EquipmentPageProps) => {
        try {
            const response = await fetch(`/api/admin/equipments`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in submitting details", error);
        }
    }

    const handleFetchEquipmentPage = async () => {
        try {
            const response = await fetch("/api/admin/equipments");
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setEquipmentList(data.data.equipments);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching project details", error);
        }
    }


    const getTaskPos = (id: number | string) => equipmentList.findIndex((item: { _id: string }) => (item._id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setEquipmentList((equipmentList: { _id: string; title: string, description: string, image: string, imageAlt: string, category: { name: string, _id: string } }[]) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            return arrayMove(equipmentList, originalPos, newPos);
        });
    };


    const confirmPosition = async () => {
        setReorderMode(!reorderMode);

        const updatedEquipment = equipmentList.map((equipment) => ({
            ...equipment,
        }));

        setEquipmentList(updatedEquipment);

        const formData = new FormData()
        formData.append('equipments', JSON.stringify(updatedEquipment))
        const response = await fetch(`/api/admin/equipments/reorder`, {
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
        handleFetchCategory();
        handleFetchEquipmentPage();
    }, [])

    return (
        <div className="flex flex-col gap-5">

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>


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
                            {errors.banner && (
                                <p className="text-red-500">{errors.banner.message}</p>
                            )}
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
                    <Label main>Second Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <Label className="font-bold">Title</Label>
                                        <Input
                                            type="text"
                                            placeholder="Title"
                                            {...register("secondSection.title", {
                                                required: "Title is required",
                                            })}
                                        />
                                        <FormError error={errors.secondSection?.title?.message} />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-bold">Description</Label>
                                    <Controller
                                        name="secondSection.description"
                                        control={control}
                                        rules={{ required: "Description is required" }}
                                        render={({ field }) => {
                                            return <Textarea value={field.value} onChange={field.onChange} />;
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5">
                                        {secondSectionItems.map((field, index) => (
                                            <div key={field.id} className="grid grid-cols-1 gap-2 relative border-b border-black/20 pb-5">
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => secondSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Number</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Number"
                                                            {...register(`secondSection.items.${index}.number`)}
                                                        />
                                                        <FormError
                                                            error={
                                                                errors.secondSection?.items?.[index]?.number
                                                                    ?.message
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Value</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Value"
                                                            {...register(`secondSection.items.${index}.value`)}
                                                        />
                                                        <FormError
                                                            error={
                                                                errors.secondSection?.items?.[index]?.value
                                                                    ?.message
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                className=""
                                                addItem
                                                onClick={() =>
                                                    secondSectionAppend({
                                                        number: "",
                                                        value: ""
                                                    })
                                                }
                                            >
                                                Add Item
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <Label className="font-bold">Title</Label>
                                        <Input
                                            type="text"
                                            placeholder="Title"
                                            {...register("thirdSection.title", {
                                                required: "Title is required",
                                            })}
                                        />
                                        <FormError error={errors.thirdSection?.title?.message} />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-bold">Description</Label>
                                    <Controller
                                        name="thirdSection.description"
                                        control={control}
                                        rules={{ required: "Description is required" }}
                                        render={({ field }) => {
                                            return <Textarea value={field.value} onChange={field.onChange} />;
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="p-5 flex flex-col gap-2">
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='' {...register("metaTitle")} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Description</Label>
                            <Input type='text' placeholder='' {...register("metaDescription")} />
                        </div>
                    </div>
                </AdminItemContainer>

                <div className='flex justify-center mt-5'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>


            <div className="h-screen grid grid-cols-2 gap-5">

                <div className="flex flex-col gap-2 h-screen">
                    <div className="h-full w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
                        <div className="flex justify-between border-b-2 pb-2">
                            <Label className="text-sm font-bold">Category</Label>
                            <Dialog>
                                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setCategory("")}>Add Category</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Category</DialogTitle>
                                        <DialogDescription>
                                            <Input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                                </DialogContent>

                            </Dialog>
                        </div>
                        <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
                            {categoryList.map((item) => (
                                <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                                    <div className="text-[16px]">
                                        {item.name}
                                    </div>
                                    <div className="flex gap-5">
                                        <Dialog>
                                            <DialogTrigger onClick={() => { setCategory(item.name) }}><MdEdit /></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Category</DialogTitle>
                                                    <DialogDescription>
                                                        <Input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCategory(item._id)}>Save</DialogClose>
                                            </DialogContent>

                                        </Dialog>



                                        <Dialog>
                                            <DialogTrigger><MdDelete /></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex gap-2">
                                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteCategory(item._id)}>Yes</DialogClose>
                                                </div>

                                            </DialogContent>

                                        </Dialog>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="h-full w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
                    <div className="flex justify-between border-b-2 pb-2">
                        <Label className="text-sm font-bold">Equipments</Label>
                        <div className="flex gap-3">
                            <Button className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>

                            <Dialog>
                                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" disabled={reorderMode} onClick={() => { setTitle(""); setDescription(""); setImage(""); setImageAlt(""); setEquipmentCategory("") }}>Add Equipment</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Equipment</DialogTitle>
                                        <div>
                                            <div>
                                                <Label>Title</Label>
                                                <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>

                                            <div>
                                                <Label>Description</Label>
                                                <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="">Category</Label>

                                                <Select
                                                    onValueChange={setEquipmentCategory}
                                                    value={equipmentCategory}
                                                    defaultValue=""
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categoryList.map((item, index) => (
                                                            <SelectItem key={index} value={item._id}>
                                                                {item.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label>Image</Label>

                                                <ImageUploader
                                                    value={image}
                                                    onChange={setImage}
                                                    recommendedDimension="Recommended: 375 x 400 (px)"
                                                />
                                            </div>

                                            <div>
                                                <Label>Alt Tag</Label>
                                                <Input type="text" placeholder="Image Alt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                                            </div>

                                        </div>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddEquipment}>Save</DialogClose>
                                </DialogContent>

                            </Dialog>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">

                        {reorderMode &&

                            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                <SortableContext items={equipmentList.map((equipment) => equipment._id)} strategy={verticalListSortingStrategy}>
                                    {equipmentList?.map((equipment, index) => (
                                        <EquipmentCard key={index} equipment={equipment} id={equipment._id} />
                                    ))}
                                </SortableContext>
                            </DndContext>

                        }


                        {!reorderMode && equipmentList.map((item) => (
                            <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                                <div className="text-[16px]">
                                    {item.title}
                                </div>
                                {item._id}
                                <div className="flex gap-5">
                                    <Dialog>
                                        <DialogTrigger onClick={() => { setTitle(item.title); setDescription(item.description); setImage(item.image); setImageAlt(item.imageAlt); setEquipmentCategory(item.category._id) }}><MdEdit /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Equipment</DialogTitle>
                                                <div>
                                                    <div>
                                                        <Label>Title</Label>
                                                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                    </div>

                                                    <div>
                                                        <Label>Description</Label>
                                                        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="">Category</Label>

                                                        <Select
                                                            onValueChange={setEquipmentCategory}
                                                            value={equipmentCategory}
                                                            defaultValue=""
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {categoryList.map((item, index) => (
                                                                    <SelectItem key={index} value={item._id}>
                                                                        {item.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label>Image</Label>

                                                        <ImageUploader
                                                            value={image}
                                                            onChange={setImage}
                                                            recommendedDimension="Recommended: 375 x 400 (px)"
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label>Alt Tag</Label>
                                                        <Input type="text" placeholder="Image Alt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditEquipment(item._id)}>Save</DialogClose>
                                        </DialogContent>

                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger><MdDelete /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteEquipment(item._id)}>Yes</DialogClose>
                                            </div>

                                        </DialogContent>

                                    </Dialog>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
