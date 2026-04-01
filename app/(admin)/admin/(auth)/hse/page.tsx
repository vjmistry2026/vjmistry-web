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

interface QhseFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            number: string;
            value: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    fourthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    };
    fifthSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    sixthSection: {
        title: string;
        description: string;
        items: {
            thumbnail: string;
            thumbnailAlt: string;
            title: string;
            images: {
                image: string;
                imageAlt: string;
            }[];
        }[];
    },
    seventhSection: {
        title: string;
    }
}

const ExpertisePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<QhseFormProps>();

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove, move } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });


    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });

    const { fields: sixthSectionItems, append: sixthSectionAppend, remove: sixthSectionRemove } = useFieldArray({
        control,
        name: "sixthSection.items"
    });


    const handleAddQhse = async (data: QhseFormProps) => {
        try {
            const response = await fetch(`/api/admin/hse`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding qhse", error);
        }
    }

    const fetchQhseData = async () => {
        try {
            const response = await fetch(`/api/admin/hse`);
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
                setValue("fourthSection", data.data.fourthSection);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("sixthSection", data.data.sixthSection);
                setValue("sixthSection.items", data.data.sixthSection.items);
                setValue("seventhSection", data.data.seventhSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching hse data", error);
        }
    }

    const handleAddImage = (index: number) => {
        const currentImages = watch(`sixthSection.items.${index}.images`) || [];
        setValue(`sixthSection.items.${index}.images`, [...currentImages, { image: "", imageAlt: "" }]);
    };


    const handleRemoveImage = (index: number, imageIndex: number) => {
        const currentImages = watch(`sixthSection.items.${index}.images`) || [];
        setValue(`sixthSection.items.${index}.images`, currentImages.filter((_, i) => i !== imageIndex));
    }


    useEffect(() => {
        fetchQhseData();
    }, []);



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddQhse)}>

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
                            <div className="flex justify-between gap-2">
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <Label className="text-sm font-bold">Image</Label>
                                        <Controller
                                            name="firstSection.image"
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader value={field.value} onChange={field.onChange} />
                                            )}
                                        />
                                    </div>
                                    <FormError error={errors.firstSection?.image?.message} />
                                    <Label className="font-bold">Image Alt Tag</Label>
                                    <Input type="text" placeholder="Image Alt Tag" {...register("firstSection.imageAlt")} />
                                    <FormError error={errors.firstSection?.imageAlt?.message} />
                                </div>
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

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`thirdSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("thirdSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.thirdSection?.description && <p className='text-red-500'>{errors.thirdSection?.description.message}</p>}
                            </div>

                        </div>

                        <Label>Items</Label>
                        <div className='border p-2 rounded-md'>
                            {thirdSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Image</Label>
                                            <Controller
                                                name={`thirdSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Logo is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            {errors.thirdSection?.items?.[index]?.image && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.image.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`)} />
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`thirdSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fourth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name="fourthSection.image"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.fourthSection?.image && (
                                        <p className="text-red-500">{errors.fourthSection?.image.message}</p>
                                    )}
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("fourthSection.imageAlt")} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("fourthSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.fourthSection?.description && <p className='text-red-500'>{errors.fourthSection?.description.message}</p>}
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`fifthSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("fifthSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.fifthSection?.description && <p className='text-red-500'>{errors.fifthSection?.description.message}</p>}
                            </div>

                        </div>

                        <Label>Items</Label>
                        <div className='border p-2 rounded-md'>
                            {fifthSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Image</Label>
                                            <Controller
                                                name={`fifthSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            {errors.fifthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.image.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.imageAlt`)} />
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => fifthSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Sixth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("sixthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="sixthSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {sixthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => sixthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Thumbnail</Label>
                                                    <Controller
                                                        name={`sixthSection.items.${index}.thumbnail`}
                                                        control={control}
                                                        rules={{ required: "Thumbnail is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.sixthSection?.items?.[index]?.thumbnail && (
                                                        <p className="text-red-500">{errors.sixthSection?.items?.[index]?.thumbnail.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`sixthSection.items.${index}.thumbnailAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.sixthSection?.items?.[index]?.thumbnailAlt && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.thumbnailAlt.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`sixthSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.sixthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <Button type='button' className="w-full cursor-pointer text-white bg-green-400 text-[16px]" onClick={() => { handleAddImage(index) }}>Add Image</Button>
                                        </div>

                                        <div className='grid grid-cols-2 gap-2 mt-5'>
                                            {watch(`sixthSection.items.${index}.images`).map((file, fileIndex) => (
                                                <div key={fileIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md'>
                                                    <div className='absolute top-2 right-2'>
                                                        <RiDeleteBinLine onClick={() => handleRemoveImage(index, fileIndex)} className='cursor-pointer text-red-600' />
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Image</Label>
                                                            <Controller
                                                                name={`sixthSection.items.${index}.images.${fileIndex}.image`}
                                                                control={control}
                                                                rules={{ required: "File is required" }}
                                                                render={({ field }) => (
                                                                    <ImageUploader
                                                                        value={field.value}
                                                                        onChange={(url: string) => {
                                                                            field.onChange(url); // update file URL // update size separately
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.sixthSection?.items?.[index]?.images?.[fileIndex]?.image && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.images?.[fileIndex]?.image.message}</p>}
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`sixthSection.items.${index}.images.${fileIndex}.imageAlt`, {
                                                                    required: "Value is required"
                                                                })} />
                                                                {errors.sixthSection?.items?.[index]?.images?.[fileIndex]?.imageAlt && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.images?.[fileIndex]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => sixthSectionAppend({ title: "", thumbnail: "", thumbnailAlt: "", images: [] })}>Add Item</Button>
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
                                <Textarea placeholder='Title' {...register("seventhSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.seventhSection?.title && <p className='text-red-500'>{errors.seventhSection?.title.message}</p>}
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

export default ExpertisePage