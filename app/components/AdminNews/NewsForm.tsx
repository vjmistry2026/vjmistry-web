"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { RiAiGenerateText } from "react-icons/ri";
import TinyEditor from "../TinyMce/TinyEditor";


interface ProjectFormProps {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        title: string;
        slug: string;
        date: string;
        category: string;
        coverImage: string;
        coverImageAlt: string;
        thumbnail: string;
        thumbnailAlt: string;
    };
    secondSection: {
        items: {
            title: string;
            idToMap: string;
        }[]
    };
    thirdSection: {
        content: string;
    };
    status:string;
}

const NewsForm = ({ editMode }: { editMode?: boolean }) => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<ProjectFormProps>();

    const { id } = useParams();
    const router = useRouter();

    const {
        fields: secondSectionItems,
        append: secondSectionAppend,
        remove: secondSectionRemove,
    } = useFieldArray({
        control,
        name: "secondSection.items",
    });



    const [categoryList, setCategoryList] = useState<
        { _id: string; name: string }[]
    >([]);

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/news/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    };


    const handleAddNews = async (data: ProjectFormProps) => {
        try {
            const response = await fetch(
                editMode ? `/api/admin/news?id=${id}` : `/api/admin/news`,
                {
                    method: editMode ? "PATCH" : "POST",
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/news");
            }
        } catch (error) {
            console.log("Error in adding news", error);
        }
    };

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`/api/admin/news?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("status", data.data.status);
                setValue("firstSection", {
                    ...data.data.firstSection,
                    category: data.data.firstSection.category?._id || "",
                });
                const isoDate = new Date(data.data.firstSection.date).toISOString().split("T")[0];
                setValue("firstSection.date", isoDate);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching news data", error);
        }
    };


    useEffect(() => {
        if (watch("firstSection.slug") === undefined) return;
        const slug = watch("firstSection.slug").replace(/\s+/g, "-");
        setValue("firstSection.slug", slug);
    }, [watch("firstSection.slug")]);

    const handleAutoGenerate = () => {
        const name = watch("firstSection.title");
        if (!name) return;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
        setValue("firstSection.slug", slug);
    };


    useEffect(() => {
        if (editMode) {
            handleFetchCategory()
                .then(() => fetchNewsData());
        } else {
            handleFetchCategory()
        }
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleAddNews)}
            >

                <input type="hidden" {...register("status")} />

                <div className="flex items-center gap-2 justify-end">
                    <Label className="">Status</Label>
                    <Controller
                        name={`status`}
                        control={control}
                        // rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-fit">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>

                                    <SelectItem value={"draft"}>
                                        Draft
                                    </SelectItem>

                                    <SelectItem value={"published"}>
                                        Published
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <Button
                        type="button"
                        onClick={() => handleSubmit((data) => handleAddNews({ ...data, status: watch("status") }))()}
                        className="bg-green-700 text-white"
                    >
                        Save
                    </Button>
                </div>

                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("firstSection.title")}
                                />
                                {errors.firstSection?.title && (
                                    <p className="text-red-500">
                                        {errors.firstSection?.title.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="flex gap-2 items-center mb-1">
                                    Slug
                                    <div
                                        className="flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit"
                                        onClick={handleAutoGenerate}
                                    >
                                        <p>Auto Generate</p>
                                        <RiAiGenerateText />
                                    </div>
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Slug"
                                    {...register("firstSection.slug", {
                                        required: "Slug is required",
                                        pattern: {
                                            value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                                            message:
                                                "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                                        },
                                    })}
                                />
                                {errors.firstSection?.slug && <p className="text-red-500">{errors.firstSection.slug.message}</p>}
                            </div>
                            <div>
                                <Label className="">Date</Label>
                                <Input
                                    type="date"
                                    placeholder="Date"
                                    max={new Date().toISOString().split("T")[0]}
                                    {...register("firstSection.date", { required: "Date is required" })}
                                />
                                {errors.firstSection?.date && <p className="text-red-500">{errors.firstSection?.date.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="">Category</Label>
                                <Controller
                                    name={`firstSection.category`}
                                    control={control}
                                    rules={{ required: "Category is required" }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                    )}
                                />
                                {errors?.firstSection?.category && (
                                    <p className="text-red-500">
                                        {errors.firstSection.category.message}
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="flex gap-5 flex-col">
                            <div>
                                <Label className="">Cover Image</Label>
                                <Controller
                                    name="firstSection.coverImage"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            recommendedDimension="Recommended: 1620 x 610 (px)"
                                        />
                                    )}
                                />
                                {errors?.firstSection?.coverImage && (
                                    <p className="text-red-500">{errors.firstSection.coverImage.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Cover Image Alt</Label>
                                <Input
                                    type="text"
                                    placeholder="Cover Image Alt Tag"
                                    {...register("firstSection.coverImageAlt")}
                                />
                            </div>
                        </div>


                        <div className="flex gap-5 flex-col">
                            <div>
                                <Label className="">Thumbnail</Label>
                                <Controller
                                    name="firstSection.thumbnail"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            recommendedDimension="Recommended: 800 x 600 (px)"
                                        />
                                    )}
                                />
                                {errors.firstSection?.thumbnail && (
                                    <p className="text-red-500">{errors.firstSection.thumbnail.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Thumbnail Alt</Label>
                                <Input
                                    type="text"
                                    placeholder="Cover Image Alt Tag"
                                    {...register("firstSection.thumbnailAlt")}
                                />
                            </div>
                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Second Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-3">
                        <Label>Items</Label>
                        <div className="border border-black/20 p-2 rounded-md">
                            {secondSectionItems.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0"
                                >
                                    <div className="absolute top-2 right-2">
                                        <RiDeleteBinLine
                                            onClick={() => secondSectionRemove(index)}
                                            className="cursor-pointer text-red-600"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <Label className="font-bold">Title</Label>
                                            <Input
                                                type="text"
                                                placeholder="Title"
                                                {...register(`secondSection.items.${index}.title`)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <Label className="font-bold">Id To Map</Label>
                                            <Input
                                                type="text"
                                                placeholder="Id To Map"
                                                {...register(`secondSection.items.${index}.idToMap`)}
                                            />
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
                                    secondSectionAppend({ title: "", idToMap: "" })
                                }
                            >
                                Add Item
                            </Button>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div>
                            <Label className="">Content</Label>
                            <Controller
                                name="thirdSection.content"
                                control={control}
                                rules={{ required: "Content is required" }}
                                render={({ field }) => {
                                    return (
                                        <TinyEditor
                                            setNewsContent={field.onChange} newsContent={field.value}
                                        />
                                    );
                                }}
                            />
                            {errors.thirdSection?.content && (
                                <p className="text-red-500">{errors.thirdSection.content.message}</p>
                            )}
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                                type="text"
                                placeholder=""
                                {...register("metaTitle")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Description</Label>
                            <Input
                                type="text"
                                placeholder=""
                                {...register("metaDescription")}
                            />
                        </div>
                    </div>
                </AdminItemContainer>

                <div className="flex">
                    <Button
                        type="submit"
                        className="cursor-pointer text-white text-[16px] w-full"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm;
