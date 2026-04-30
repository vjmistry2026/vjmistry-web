"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RiDeleteBinLine } from "react-icons/ri";
import { ImageUploader } from '@/components/ui/image-uploader';
import { Textarea } from '@/components/ui/textarea';
import AdminItemContainer from '@/app/components/common/AdminItemContainer';



interface MessageFormData {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        items: {
            title: string;
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
            message?: string;
        }[]
    },
    secondSection: {
        title: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[]
    },
    thirdSection: {
        image: string;
        imageAlt: string;
        title: string;
        buttonText: string;
        buttonLink: string;
    }
}

const AdminHome = () => {

    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { errors },
    } = useForm<MessageFormData>();


    const onSubmit = async (data: MessageFormData) => {
        try {

            const response = await fetch(`/api/admin/founders-message`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/founders-message')
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setValue("metaTitle", data.data.metaTitle)
                    setValue("metaDescription", data.data.metaDescription)
                    setValue("firstSection.items", data.data.firstSection.items)
                    setValue("secondSection", data.data.secondSection)
                    setValue("secondSection.items", data.data.secondSection.items)
                    setValue("thirdSection", data.data.thirdSection)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])



    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });


    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <AdminItemContainer>
                <Label main>First Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div>
                        <Label className='font-bold'>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                            {firstSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>

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
                                                        recommendedDimension="Recommended: 722 x 538 (px)"
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
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.firstSection?.items?.[index]?.title && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.title.message}</p>}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Name</Label>
                                                <Input type='text' placeholder='Name' {...register(`firstSection.items.${index}.name`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.firstSection?.items?.[index]?.name && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.name.message}</p>}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Designation</Label>
                                                <Input type='text' placeholder='Designation' {...register(`firstSection.items.${index}.designation`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.firstSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.designation.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2 col-span-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Message</Label>
                                            <Textarea placeholder='Message' {...register(`firstSection.items.${index}.message`, {
                                                required: "Value is required"
                                            })} />
                                            {errors.firstSection?.items?.[index]?.message && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.message.message}</p>}
                                        </div>
                                    </div>

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => firstSectionAppend({ title: "", image: "", imageAlt: "", name: "", designation: "", message: "" })}>Add Item</Button>
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
                    </div>

                    <Label>Items</Label>
                    <div className='border border-black/20 p-2 rounded-md'>
                        {secondSectionItems.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
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
                                                    recommendedDimension="Recommended: 40 x 40 (px)"
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
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='grid grid-cols-1 gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Image</Label>
                                <Controller
                                    name="thirdSection.image"
                                    control={control}
                                    rules={{ required: "Image is required" }}
                                    render={({ field }) => (
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            recommendedDimension="Recommended: 1920 x 560 (px)"
                                        />
                                    )}
                                />
                                {errors.thirdSection?.image && (
                                    <p className="text-red-500">{errors.thirdSection?.image.message}</p>
                                )}
                                <Label className='font-bold'>Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register("thirdSection.imageAlt")} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Button Text</Label>
                            <Input type='text' placeholder='Button Text' {...register("thirdSection.buttonText", {
                                required: "Button Text is required"
                            })} />
                            {errors.thirdSection?.buttonText && <p className='text-red-500'>{errors.thirdSection?.buttonText.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Button Link</Label>
                            <Input type='text' placeholder='Button Link' {...register("thirdSection.buttonLink", {
                                required: "Button Link is required"
                            })} />
                            {errors.thirdSection?.buttonLink && <p className='text-red-500'>{errors.thirdSection?.buttonLink.message}</p>}
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
                    <div className='flex flex-col gap-2 mt-3'>
                        <Label className='font-bold'>Description</Label>
                        <Input type='text' placeholder='' {...register("metaDescription")} />
                    </div>
                </div>
            </AdminItemContainer>

            <div className='flex mt-5'>
                <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
            </div>

        </form>
    )
}

export default AdminHome