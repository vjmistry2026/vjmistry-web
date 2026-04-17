"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ServiceCard from './ServiceCard';

interface ServiceFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            description: string;
            homeImage: string;
            homeImageAlt: string;
        }[]
    };
}

const ServicePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ServiceFormProps>();


    const [reorderMode, setReorderMode] = useState(false);


    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove, move } = useFieldArray({
        control,
        name: "firstSection.items"
    });


    const handleAddService = async (data: ServiceFormProps) => {
        try {
            const response = await fetch(`/api/admin/service`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding service", error);
        }
    }

    const fetchServiceData = async () => {
        try {
            const response = await fetch(`/api/admin/service`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection.items", data.data.firstSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching service data", error);
        }
    }


    const getTaskPos = (id: number | string) => firstSectionItems.findIndex((item: { id: string }) => (item.id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        if (originalPos !== -1 && newPos !== -1) {
            move(originalPos, newPos);
        }
    };



    useEffect(() => {
        fetchServiceData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddService)}>


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
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>


                            <div>
                                <div className='flex items-center justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                    <Button disabled={firstSectionItems.length < 2} type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>

                                    {reorderMode &&

                                        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                            <SortableContext items={firstSectionItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                                {firstSectionItems?.map((item, index) => (
                                                    <ServiceCard key={index} item={item} id={item.id} />
                                                ))}
                                            </SortableContext>
                                        </DndContext>

                                    }

                                    {!reorderMode && firstSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='grid grid-cols-2 gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Image</Label>
                                                        <Controller
                                                            name={`firstSection.items.${index}.image`}
                                                            control={control}
                                                            rules={{ required: "Image is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 552 x 400 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.firstSection?.items?.[index]?.image && (
                                                            <p className="text-red-500">{errors.firstSection?.items?.[index]?.image.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.imageAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.firstSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.imageAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Logo</Label>
                                                        <Controller
                                                            name={`firstSection.items.${index}.logo`}
                                                            control={control}
                                                            rules={{ required: "Logo is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    isLogo
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 62 x 62 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.firstSection?.items?.[index]?.logo && (
                                                            <p className="text-red-500">{errors.firstSection?.items?.[index]?.logo.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.logoAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.firstSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.logoAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div className='flex flex-col gap-2 mt-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.firstSection?.items?.[index]?.title && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.title.message}</p>}
                                                    </div>


                                                    <div>
                                                        <Label className="text-sm font-bold">Description</Label>
                                                        <Controller name={`firstSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                            return <Textarea value={field.value} onChange={field.onChange} />
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Home Image</Label>
                                                <Controller
                                                    name={`firstSection.items.${index}.homeImage`}
                                                    control={control}
                                                    rules={{ required: "Image is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                {errors.firstSection?.items?.[index]?.homeImage && (
                                                    <p className="text-red-500">{errors.firstSection?.items?.[index]?.homeImage.message}</p>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.homeImageAlt`)} />
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                {!reorderMode && <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => firstSectionAppend({ title: "", image: "", imageAlt: "", logo: "", logoAlt: "", description: "", homeImage: "", homeImageAlt: "" })}>Add Item</Button>
                                </div>}
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

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ServicePage