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
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import Link from "next/link";


interface CurrentOpeningsPageProps {
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
}



export default function CurrentOpenings() {

    const [category, setCategory] = useState<string>("");
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);
    const [newsList, setNewsList] = useState<{ _id: string, status:string, firstSection: { title: string, slug:string } }[]>([]);

    const router = useRouter();

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<CurrentOpeningsPageProps>();

    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/news/category", {
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


    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/news/category");
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

    const handleFetchNews = async () => {
        try {
            const response = await fetch("/api/admin/news");
            if (response.ok) {
                const data = await response.json();
                setNewsList(data.data.news);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching news", error);
        }
    }

    const handleEditCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/news/category?id=${id}`, {
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


    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/news/category?id=${id}`, {
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

    const handleDeleteNews = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/news?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchNews();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting news", error);
        }
    }


    const onSubmit = async (data: CurrentOpeningsPageProps) => {
        try {
            const response = await fetch(`/api/admin/news`, {
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

    const handleFetchNewsPage = async () => {
        try {
            const response = await fetch("/api/admin/news");
            if (response.ok) {
                const data = await response.json();
                console.log(data);

                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setNewsList(data.data.news);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching news data", error);
        }
    }


    useEffect(() => {
        handleFetchCategory();
        handleFetchNewsPage();
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
                                <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
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

                <div className="h-screen w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
                    <div className="flex justify-between border-b-2 pb-2">
                        <Label className="text-sm font-bold">News</Label>
                        <div className="flex gap-2">
                            <Button onClick={() => router.push("/admin/news/add")} className="text-white">Add News</Button>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">

                        {newsList.map((item) => (
                            <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                                <div className="text-[16px]">
                                    {item.firstSection.title}
                                </div>
                                <div className="flex gap-5 items-center">

                                    {item.status == "draft" ? (<Link href={`/media-center/news/${item.firstSection.slug}`} target="_blank"><div className="text-[16px] rounded-xl bg-yellow-300 p-1 flex items-center gap-1">
                                        <FaEye />
                                    </div></Link>) : (<div className="text-[16px] rounded-xl bg-green-300 p-1 flex items-center gap-1">
                                        <FaEye />
                                    </div>)}

                                    <MdEdit onClick={() => router.push(`/admin/news/edit/${item._id}`)} />

                                    <Dialog>
                                        <DialogTrigger><MdDelete /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteNews(item._id)}>Yes</DialogClose>
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
