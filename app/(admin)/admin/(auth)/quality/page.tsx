"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import { FormError } from "@/app/components/common/FormError";

interface QualityFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt?: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image?: string;
        imageAlt?: string;
    };
    secondSection: {
        title: string;
        subTitle: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };

    thirdSection: {
        title: string;
        subTitle: string;
        items: {
            image: string;
            imageAlt: string;
        }[];
    }
}

const QualityPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<QualityFormProps>();

    const {
        fields: secondSectionItems,
        append: secondSectionAppend,
        remove: secondSectionRemove,
    } = useFieldArray({
        control,
        name: "secondSection.items",
    });

    const {
        fields: thirdSectionItems,
        append: thirdSectionAppend,
        remove: thirdSectionRemove,
    } = useFieldArray({
        control,
        name: "thirdSection.items",
    });


    const handleAddQuality = async (data: QualityFormProps) => {
        try {
            const response = await fetch(`/api/admin/quality`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
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

    const fetchQualityData = async () => {
        try {
            const response = await fetch(`/api/admin/quality`);
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
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching quality data", error);
        }
    };

    useEffect(() => {
        fetchQualityData();
    }, []);


    return (
        <form className="grid grid-cols-1" onSubmit={handleSubmit(handleAddQuality)}>
            {/*English Version */}
            <div className="flex flex-col gap-5">
                <AdminItemContainer>
                    <Label className="" main>
                        Banner
                    </Label>
                    <div className="p-5 rounded-md grid grid-cols-2 gap-5">
                        <div>
                            <Controller
                                name="banner"
                                rules={{ required: "Banner is required" }}
                                control={control}
                                render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} recommendedDimension="Recommended: 1920 x 743 (px)"/>}
                            />
                            <FormError error={errors.banner?.message} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Alt Tag</Label>
                                <Input type="text" placeholder="Alt Tag" {...register("bannerAlt")} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Page Title</Label>
                                <Input type="text" placeholder="Page Title" {...register("pageTitle")} />
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
                                                <ImageUploader value={field.value} onChange={field.onChange} recommendedDimension="Recommended: 790 x 574 (px)"/>
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
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <Label className="font-bold">Sub Title</Label>
                                        <Input
                                            type="text"
                                            placeholder="Sub Title"
                                            {...register("secondSection.subTitle", {
                                                required: "Sub Title is required",
                                            })}
                                        />
                                        <FormError error={errors.secondSection?.subTitle?.message} />
                                    </div>
                                </div>
                                <div>
                                    <Label className="font-bold">Items</Label>
                                    <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5">
                                        {secondSectionItems.map((field, index) => (
                                            <div key={field.id} className="grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5">
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => secondSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Image</Label>
                                                    <Controller
                                                        name={`secondSection.items.${index}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader  value={field.value} onChange={field.onChange} recommendedDimension="Recommended: 588 x 306 (px)"/>
                                                        )}
                                                    />
                                                    {errors.secondSection?.items?.[index]?.image && (
                                                        <FormError
                                                            error={
                                                                errors.secondSection?.items?.[index]?.image?.message
                                                            }
                                                        />
                                                    )}

                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Image Alt</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Image Alt"
                                                            {...register(`secondSection.items.${index}.imageAlt`)}
                                                        />
                                                        <FormError
                                                            error={
                                                                errors.secondSection?.items?.[index]?.imageAlt
                                                                    ?.message
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Title</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Title"
                                                            {...register(`secondSection.items.${index}.title`)}
                                                        />
                                                        <FormError
                                                            error={
                                                                errors.secondSection?.items?.[index]?.title
                                                                    ?.message
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Description</Label>
                                                        <Textarea
                                                            placeholder="Description"
                                                            {...register(
                                                                `secondSection.items.${index}.description`,
                                                            )}
                                                        />
                                                        <FormError
                                                            error={
                                                                errors.secondSection?.items?.[index]?.description
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
                                                        image: "",
                                                        imageAlt: "",
                                                        title: "",
                                                        description: "",
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
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Sub Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Sub Title"
                                    {...register("thirdSection.subTitle", {
                                        required: "Sub Title is required",
                                    })}
                                />
                                <FormError error={errors.thirdSection?.subTitle?.message} />
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5">
                                {thirdSectionItems.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => thirdSectionRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Image</Label>
                                                <Controller
                                                    name={`thirdSection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Image is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader value={field.value} onChange={field.onChange} recommendedDimension="Recommended: 337 x 440 (px)"/>
                                                    )}
                                                />
                                                <FormError error={errors.thirdSection?.items?.[index]?.image?.message} />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Image Alt Tag</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Alt Tag"
                                                        {...register(`thirdSection.items.${index}.imageAlt`, {
                                                            required: "Value is required",
                                                        })}
                                                    />
                                                    <FormError
                                                        error={errors.thirdSection?.items?.[index]?.imageAlt?.message}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="button"
                                    addItem
                                    onClick={() =>
                                        thirdSectionAppend({
                                            image: "",
                                            imageAlt: "",
                                        })
                                    }
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="flex flex-col gap-2 p-5">
                        <div className="flex flex-col gap-2 mb-4">
                            <Label className="font-bold">Title</Label>
                            <Input type="text" placeholder="" {...register("metaTitle")} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Description</Label>
                            <Input type="text" placeholder="" {...register("metaDescription")} />
                        </div>
                    </div>
                </AdminItemContainer>
            </div>

            <div className="flex col-span-2">
                <Button type="submit" className="cursor-pointer text-white text-[16px] w-full text-center">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default QualityPage;
