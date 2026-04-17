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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface AboutFormProps {

    metaTitle: string;
    metaDescription: string;
    ogType: string;
    ogImage: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        highlightText: string;
    };
    secondSection: {
        title: string;
        subTitle: string;
        items: {
            image: string;
            imageAlt: string;
            year: string;
            title: string;
            description: string;
        }[]
    };
    thirdSection: {
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }[];
    };
    fourthSection: {
        title: string;
        image: string;
        imageAlt: string;
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }[];
    };
    fifthSection: {
        items: {
            number: string;
            value: string;
        }[];
    };
}

const AboutPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AboutFormProps>();


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });


    const handleAddAbout = async (data: AboutFormProps) => {
        try {
            const response = await fetch(`/api/admin/about`, {
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
    }

    const fetchAboutData = async () => {
        try {
            const response = await fetch(`/api/admin/about`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("ogType", data.data.ogType);
                setValue("ogImage", data.data.ogImage);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection.items", data.data.fifthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchAboutData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddAbout)}>


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
                                                recommendedDimension="Recommended: 637 x 508 (px)"
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
                                <Input type='text' placeholder='Highlight Text' {...register("firstSection.highlightText", {
                                    required: "Highlight Text is required"
                                })} />
                                {errors.firstSection?.highlightText && <p className='text-red-500'>{errors.firstSection?.highlightText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="firstSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Section Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Title' {...register("secondSection.subTitle", {
                                    required: "Title is required"
                                })} />
                                {errors.secondSection?.subTitle && <p className='text-red-500'>{errors.secondSection?.subTitle.message}</p>}
                            </div>

                        </div>


                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {secondSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
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
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 742 x 439 (px)"
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

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Year</Label>
                                                    <Input type='text' placeholder='Year' {...register(`secondSection.items.${index}.year`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.year && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.year.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Textarea placeholder='Description' {...register(`secondSection.items.${index}.description`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.description && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.description.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => secondSectionAppend({ year: "", title: "", description: "", image: "", imageAlt: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Third Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>

                        <Label>Items</Label>
                        <div className='border p-2 rounded-md flex flex-col gap-2'>
                            {thirdSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-4 last:border-b-0'>
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
                                                    isLogo
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 60 x 50 (px)"
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

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`fourthSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

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
                                                recommendedDimension="Recommended: 1920 x 679 (px)"
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

                        </div>

                        <Label>Items</Label>
                        <div className='border p-2 rounded-md'>
                            {fourthSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Image</Label>
                                            <Controller
                                                name={`fourthSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Logo is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                    isLogo
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 30 x 35 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.fourthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.image.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.imageAlt`)} />
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => fourthSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5 mt-0.5'>


                                {fifthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Number</Label>
                                                <Input type='text' placeholder='Number' {...register(`fifthSection.items.${index}.number`)} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Value</Label>
                                                <Input type='text' placeholder='Value' {...register(`fifthSection.items.${index}.value`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.fifthSection?.items?.[index]?.value && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.value.message}</p>}
                                            </div>
                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => fifthSectionAppend({ number: "", value: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='' {...register("metaTitle")} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Description</Label>
                            <Input type='text' placeholder='' {...register("metaDescription")} />
                        </div>

                        <div className='flex flex-col gap-2 w-1/2'>
                            <Label className='font-bold'>Og Type</Label>
                            <Controller
                                name={`ogType`}
                                control={control}

                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue="website"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="website">
                                                website
                                            </SelectItem>
                                            <SelectItem value="article">
                                                article
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                        </div>


                        <div className='flex flex-col gap-2 w-1/2'>
                            <Label className='font-bold'>Og Image</Label>
                            <Controller
                                name={`ogImage`}
                                control={control}

                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        isLogo
                                    />
                                )}
                            />
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

export default AboutPage