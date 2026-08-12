"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { ImageUploader } from '@/components/ui/image-uploader';
import { FormError } from '@/app/components/common/FormError';
import { RiDeleteBinLine } from "react-icons/ri";

interface ContactFormProps {
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
            title: string;
            address: string;
            phoneOne: string;
            phoneTwo: string;
            email: string;
            map: string;
        }[]
    };
}

const ContactPage = () => {

    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<ContactFormProps>();

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove, move } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const handleAddContact = async (data: ContactFormProps) => {
        try {
            const response = await fetch(`/api/admin/contact`, {
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

    const fetchContactData = async () => {
        try {
            const response = await fetch(`/api/admin/contact`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchContactData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddContact)}>


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
                        <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-2'>
                            {secondSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r border-black/20 pr-2 last:border-r-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Address</Label>
                                            <Textarea placeholder='Address' {...register(`secondSection.items.${index}.address`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Phone One</Label>
                                            <Input type='text' placeholder='Phone One' {...register(`secondSection.items.${index}.phoneOne`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Phone Two</Label>
                                            <Input type='text' placeholder='Phone Two' {...register(`secondSection.items.${index}.phoneTwo`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Email</Label>
                                            <Input type='text' placeholder='Email' {...register(`secondSection.items.${index}.email`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Map</Label>
                                            <Input type='text' placeholder='Map' {...register(`secondSection.items.${index}.map`)} />
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => secondSectionAppend({ title: "", address: "", phoneOne: "", phoneTwo: "", email: "", map: "" })}>Add Item</Button>
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

export default ContactPage