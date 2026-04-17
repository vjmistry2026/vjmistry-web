"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';

interface HomeFormProps {
    metaTitle: string;
    metaDescription: string;
    bannerSection: {
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[]
    }
    firstSection: {
        image: string;
        imageAlt: string;
        title: string;
        highlightText: string;
        description: string;
        buttonText: string;
    },
    secondSection: {
        items: {
            number: string;
            value: string;
            image: string;
            imageAlt: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
    },
    fourthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
    fifthSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
    sixthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    },
    seventhSection: {
        title: string;
        description: string;
        items: {
            logo: string;
            logoAlt: string;
        }[]
    },
    eighthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        buttonText: string;
    },
}

const HomePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<HomeFormProps>();


    const { fields: bannerSectionItems, append: bannerSectionAppend, remove: bannerSectionRemove } = useFieldArray({
        control,
        name: "bannerSection.items"
    });

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    // const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
    //     control,
    //     name: "thirdSection.items"
    // });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });

    const { fields: seventhSectionItems, append: seventhSectionAppend, remove: seventhSectionRemove } = useFieldArray({
        control,
        name: "seventhSection.items"
    });



    const handleAddHome = async (data: HomeFormProps) => {
        try {
            const response = await fetch(`/api/admin/home`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding home", error);
        }
    }

    const fetchHomeData = async () => {
        try {
            const response = await fetch(`/api/admin/home`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("bannerSection.items", data.data.bannerSection.items);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("sixthSection", data.data.sixthSection);
                setValue("seventhSection", data.data.seventhSection);
                setValue("seventhSection.items", data.data.seventhSection.items);
                setValue("eighthSection", data.data.eighthSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching home data", error);
        }
    }



    useEffect(() => {
        fetchHomeData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddHome)}>


                <AdminItemContainer>
                    <Label className='font-bold' main>Banner Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <Label className='font-bold'>Items</Label>
                        <div className='border p-2 rounded-md flex flex-col gap-5'>


                            {bannerSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => bannerSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Image</Label>
                                            <Controller
                                                name={`bannerSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 1920 x 949 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.bannerSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.bannerSection?.items?.[index]?.image.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`bannerSection.items.${index}.imageAlt`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.bannerSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.imageAlt.message}</p>}
                                            </div>
                                        </div>


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`bannerSection.items.${index}.title`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.bannerSection?.items?.[index]?.title && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.title.message}</p>}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Description</Label>
                                                <Input type='text' placeholder='Description' {...register(`bannerSection.items.${index}.description`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.bannerSection?.items?.[index]?.description && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.description.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => bannerSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name="firstSection.image"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                recommendedDimension="Recommended: 836 x 707 (px)"
                                            />
                                        )}
                                    />
                                    {errors.firstSection?.image && (
                                        <p className="text-red-500">{errors.firstSection?.image.message}</p>
                                    )}
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("firstSection.imageAlt")} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Highlight Text</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.highlightText", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.highlightText && <p className='text-red-500'>{errors.firstSection?.highlightText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="firstSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("firstSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.firstSection?.buttonText && <p className='text-red-500'>{errors.firstSection?.buttonText.message}</p>}
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label className='font-bold' main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <Label className='font-bold'>Items</Label>
                        <div className='border p-2 rounded-md flex flex-col gap-5'>


                            {secondSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Number</Label>
                                                <Input type='text' placeholder='Number' {...register(`secondSection.items.${index}.number`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.secondSection?.items?.[index]?.number && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.number.message}</p>}
                                            </div>
                                        </div>


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Value</Label>
                                                <Input type='text' placeholder='Value' {...register(`secondSection.items.${index}.value`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.secondSection?.items?.[index]?.value && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.value.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Image</Label>
                                            <Controller
                                                name={`secondSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                    isLogo
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 40 x 40 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.secondSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.secondSection?.items?.[index]?.image.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.secondSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.imageAlt.message}</p>}
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => secondSectionAppend({ number: "", value: "", image: "", imageAlt: "" })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="thirdSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Fourth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>


                            <div>
                                <div className='flex items-center justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>

                                    {fourthSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='grid grid-cols-2 gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Image</Label>
                                                        <Controller
                                                            name={`fourthSection.items.${index}.image`}
                                                            control={control}
                                                            rules={{ required: "Image is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 529 x 356 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.fourthSection?.items?.[index]?.image && (
                                                            <p className="text-red-500">{errors.fourthSection?.items?.[index]?.image.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.imageAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.fourthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.imageAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Logo</Label>
                                                        <Controller
                                                            name={`fourthSection.items.${index}.logo`}
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
                                                        {errors.fourthSection?.items?.[index]?.logo && (
                                                            <p className="text-red-500">{errors.fourthSection?.items?.[index]?.logo.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.logoAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.fourthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.logoAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div className='flex flex-col gap-2 mt-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.fourthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.title.message}</p>}
                                                    </div>


                                                    <div>
                                                        <Label className="text-sm font-bold">Description</Label>
                                                        <Controller name={`fourthSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                            return <Textarea value={field.value} onChange={field.onChange} />
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                {<div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => fourthSectionAppend({ title: "", image: "", imageAlt: "", logo: "", logoAlt: "", description: "" })}>Add Item</Button>
                                </div>}
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fifthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                            </div>

                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name={`fifthSection.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.fifthSection?.description && <p className='text-red-500'>{errors.fifthSection?.description.message}</p>}
                            </div>


                            <div>
                                <div className='flex items-center justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>

                                    {fifthSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='grid grid-cols-2 gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Image</Label>
                                                        <Controller
                                                            name={`fifthSection.items.${index}.image`}
                                                            control={control}
                                                            rules={{ required: "Image is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 350 x 350 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.fifthSection?.items?.[index]?.image && (
                                                            <p className="text-red-500">{errors.fifthSection?.items?.[index]?.image.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.imageAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.fifthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.imageAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Logo</Label>
                                                        <Controller
                                                            name={`fifthSection.items.${index}.logo`}
                                                            control={control}
                                                            rules={{ required: "Logo is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    isLogo
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 50 x 50 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.fifthSection?.items?.[index]?.logo && (
                                                            <p className="text-red-500">{errors.fifthSection?.items?.[index]?.logo.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.logoAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.fifthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.logoAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div className='flex flex-col gap-2 mt-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.fifthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.title.message}</p>}
                                                    </div>


                                                    <div>
                                                        <Label className="text-sm font-bold">Description</Label>
                                                        <Controller name={`fifthSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                            return <Textarea value={field.value} onChange={field.onChange} />
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                {<div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => fifthSectionAppend({ title: "", image: "", imageAlt: "", logo: "", logoAlt: "", description: "" })}>Add Item</Button>
                                </div>}
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Sixth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name="sixthSection.image"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                recommendedDimension="Recommended: 1350 x 900 (px)"
                                            />
                                        )}
                                    />
                                    {errors.sixthSection?.image && (
                                        <p className="text-red-500">{errors.sixthSection?.image.message}</p>
                                    )}
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("sixthSection.imageAlt")} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("sixthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="sixthSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Seventh Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("seventhSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.seventhSection?.title && <p className='text-red-500'>{errors.seventhSection?.title.message}</p>}
                            </div>

                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name={`seventhSection.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.seventhSection?.description && <p className='text-red-500'>{errors.seventhSection?.description.message}</p>}
                            </div>


                            <div>
                                <div className='flex items-center justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>

                                    {seventhSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => seventhSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='grid grid-cols-2 gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Logo</Label>
                                                        <Controller
                                                            name={`seventhSection.items.${index}.logo`}
                                                            control={control}
                                                            rules={{ required: "Logo is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    isLogo
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 200 x 60 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.seventhSection?.items?.[index]?.logo && (
                                                            <p className="text-red-500">{errors.seventhSection?.items?.[index]?.logo.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`seventhSection.items.${index}.logoAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.seventhSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.logoAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                {<div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => seventhSectionAppend({ logo: "", logoAlt: "" })}>Add Item</Button>
                                </div>}
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Eighth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name="eighthSection.image"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                recommendedDimension="Recommended: 1920 x 643 (px)"
                                            />
                                        )}
                                    />
                                    {errors.eighthSection?.image && (
                                        <p className="text-red-500">{errors.eighthSection?.image.message}</p>
                                    )}
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("eighthSection.imageAlt")} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("eighthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.eighthSection?.title && <p className='text-red-500'>{errors.eighthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="eighthSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("eighthSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.eighthSection?.buttonText && <p className='text-red-500'>{errors.eighthSection?.buttonText.message}</p>}
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

export default HomePage