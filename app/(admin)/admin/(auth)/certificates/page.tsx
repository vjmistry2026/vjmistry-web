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
import { FormError } from '@/app/components/common/FormError';
import { FileUploader } from '@/components/ui/file-uploader';

interface CertificateFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
        items: {
            title: string;
            file: string;
        }[];
    };
}

const CertificatePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<CertificateFormProps>();

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove, move } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });


    const handleAddCertificate = async (data: CertificateFormProps) => {
        try {
            const response = await fetch(`/api/admin/certificates`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding certificate", error);
        }
    }

    const fetchCertificateData = async () => {
        try {
            const response = await fetch(`/api/admin/certificates`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching certificate data", error);
        }
    }


    useEffect(() => {
        fetchCertificateData();
    }, []);



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddCertificate)}>

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
                    <Label main>Second Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`secondSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("secondSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>}
                            </div>

                        </div>

                        <Label>Items</Label>
                        <div className='border p-2 rounded-md'>
                            {secondSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Image</Label>
                                            <Controller
                                                name={`secondSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Logo is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                    isLogo
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 35 x 35 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.secondSection?.items?.[index]?.image && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.image.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`)} />
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`secondSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => secondSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-1 gap-2">
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
                                <div className="flex flex-col gap-1">
                                    <Label className="font-bold">Description</Label>
                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        {...register("thirdSection.description", {
                                            required: "Description is required",
                                        })}
                                    />
                                    <FormError error={errors.thirdSection?.description?.message} />
                                </div>
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border border-black/20 p-2 rounded-md grid grid-cols-2 gap-5 mt-0.5">
                                        {thirdSectionItems.map((field, index) => (
                                            <div key={field.id} className="grid grid-cols-1 gap-2 relative border-r border-black/20 pr-5 last:border-0">
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => thirdSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Title</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Title"
                                                            {...register(`thirdSection.items.${index}.title`)}
                                                        />
                                                        <FormError
                                                            error={errors.thirdSection?.items?.[index]?.title?.message}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className='font-bold'>File</Label>
                                                        <Controller
                                                            name={`thirdSection.items.${index}.file`}
                                                            control={control}
                                                            rules={{ required: "File is required" }}
                                                            render={({ field }) => (
                                                                <FileUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}


                                    </div>
                                    <div className="flex justify-end mt-5">
                                        <Button
                                            type="button"
                                            className=""
                                            addItem
                                            onClick={() =>
                                                thirdSectionAppend({
                                                    title: "",
                                                    file: "",
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

export default CertificatePage