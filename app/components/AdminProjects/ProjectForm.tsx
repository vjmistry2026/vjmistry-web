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
import { projectStatus } from "./projectStatus";
import { VideoUploader } from "@/components/ui/video-uploader";

interface ProjectStatus {
  name: string;
  value: string;
}

interface ProjectFormProps {
  metaTitle: string;
  metaDescription: string;
  banner: string;
  bannerAlt: string;
  thumbnail: string;
  thumbnailAlt: string;
  title: string;
  slug: string;
  firstSection: {
    yearOfCompletion: string;
    expertise: string;
    location: string;
    client: string;
    status: string;
    projectType: string;
    sector: string;
  };
  secondSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: {
      title: string;
    }[]
  };
  thirdSection: {
    items: {
      image: string;
      imageAlt: string;
      video: string;
    }[];
  };
}

const ProjectForm = ({ editMode }: { editMode?: boolean }) => {
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

  const {
    fields: thirdSectionItems,
    append: thirdSectionAppend,
    remove: thirdSectionRemove,
  } = useFieldArray({
    control,
    name: "thirdSection.items",
  });


  const [locationList, setLocationList] = useState<
    { _id: string; name: string }[]
  >([]);
  const [projectTypeList, setProjectTypeList] = useState<
    { _id: string; name: string }[]
  >([]);
  const [sectorList, setSectorList] = useState<{ _id: string; name: string }[]>(
    []
  );

  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/projects/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  };

  const handleFetchProjectType = async () => {
    try {
      const response = await fetch("/api/admin/projects/project-type");
      if (response.ok) {
        const data = await response.json();
        setProjectTypeList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  };

  const handleFetchSector = async () => {
    try {
      const response = await fetch("/api/admin/projects/sector");
      if (response.ok) {
        const data = await response.json();
        setSectorList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  };

  const handleAddProject = async (data: ProjectFormProps) => {
    try {
      const response = await fetch(
        editMode ? `/api/admin/projects?id=${id}` : `/api/admin/projects`,
        {
          method: editMode ? "PATCH" : "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        router.push("/admin/projects");
      }
    } catch (error) {
      console.log("Error in adding project", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("thumbnail", data.data.thumbnail);
        setValue("thumbnailAlt", data.data.thumbnailAlt);
        setValue("title", data.data.title);
        setValue("slug", data.data.slug);
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("firstSection", {
          ...data.data.firstSection,
          sector: data.data.firstSection.sector?._id || "",
          location: data.data.firstSection.location?._id || "",
          projectType: data.data.firstSection.projectType?._id || "",
        });
        setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
        setValue("thirdSection.items", data.data.thirdSection.items);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching project data", error);
    }
  };


  useEffect(() => {
    if (watch("slug") === undefined) return;
    const slug = watch("slug").replace(/\s+/g, "-");
    setValue("slug", slug);
  }, [watch("slug")]);

  const handleAutoGenerate = () => {
    const name = watch("title");
    if (!name) return;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
    setValue("slug", slug);
  };


  useEffect(() => {
    if (editMode) {
      handleFetchLocation()
        .then(() => handleFetchSector())
        .then(() => handleFetchProjectType())
        .then(() => fetchProjectData());
    } else {
      handleFetchLocation()
        .then(() => handleFetchSector())
        .then(() => handleFetchProjectType());
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddProject)}
      >
        <AdminItemContainer>
          <Label className="" main>
            Banner
          </Label>
          <div className="p-5 rounded-md grid grid-cols-2 gap-5">
            <div className="flex gap-5 flex-col">
              <div>
                <Label className="">Banner</Label>
                <Controller
                  name="banner"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.banner && (
                  <p className="text-red-500">{errors.banner.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Banner Alt</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("bannerAlt")}
                />
              </div>

              <div>
                <Label className="">Thumbnail</Label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.thumbnail && (
                  <p className="text-red-500">{errors.thumbnail.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Thumbnail Alt</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("thumbnailAlt")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input type="text" placeholder="Title" {...register("title")} />
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
                  {...register("slug", {
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                      message:
                        "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                    },
                  })}
                />
                {errors.slug && (
                  <p className="text-red-500">{errors.slug.message}</p>
                )}
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>First Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Year Of Completion</Label>
                <Input
                  type="text"
                  placeholder="Year Of Completion"
                  {...register("firstSection.yearOfCompletion")}
                />
                {errors.firstSection?.yearOfCompletion && (
                  <p className="text-red-500">
                    {errors.firstSection?.yearOfCompletion.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Expertise</Label>
                <Input
                  type="text"
                  placeholder="Expertise"
                  {...register("firstSection.expertise")}
                />
                {errors.firstSection?.expertise && (
                  <p className="text-red-500">
                    {errors.firstSection?.expertise.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">Location</Label>
                <Controller
                  name={`firstSection.location`}
                  control={control}
                  // rules={{ required: "Location is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationList.map((item, index) => (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.location && (
                  <p className="text-red-500">
                    {errors.firstSection?.location.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Client</Label>
                <Input
                  type="text"
                  placeholder="Client"
                  {...register("firstSection.client", {
                    required: "Client is required",
                  })}
                />
                {errors.firstSection?.client && (
                  <p className="text-red-500">
                    {errors.firstSection?.client.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">Status</Label>
                <Controller
                  name={`firstSection.status`}
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem> */}
                        {projectStatus.map(
                          (status: ProjectStatus, index: number) => (
                            <SelectItem key={index} value={status.value}>
                              {status.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.status && (
                  <p className="text-red-500">
                    {errors.firstSection?.status.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="">Project Type</Label>
                <Controller
                  name={`firstSection.projectType`}
                  control={control}
                  rules={{ required: "Project Type is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypeList.map((item, index) => (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.projectType && (
                  <p className="text-red-500">
                    {errors.firstSection?.projectType.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="">Sector</Label>
                <Controller
                  name={`firstSection.sector`}
                  control={control}
                  rules={{ required: "Sector is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectorList.map((item, index) => (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.sector && (
                  <p className="text-red-500">
                    {errors.firstSection?.sector.message}
                  </p>
                )}
              </div>
            </div>

          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`secondSection.title`)}
                />
                {errors.secondSection?.title && (
                  <p className="text-red-500">
                    {errors.secondSection?.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    placeholder="Description"
                    {...register(`secondSection.description`)}
                  />
                </div>
                {errors.secondSection?.description && (
                  <p className="text-red-500">
                    {errors.secondSection?.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="">Image</Label>
                <Controller
                  name="secondSection.image"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.secondSection?.image && (
                  <p className="text-red-500">{errors.secondSection.image.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image Alt</Label>
                <Input
                  type="text"
                  placeholder="Image Alt"
                  {...register("secondSection.imageAlt")}
                />
              </div>

            </div>

            <Label>Items</Label>
            <div className="border p-2 rounded-md">
              {secondSectionItems.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0"
                >
                  <div className="absolute top-2 right-2">
                    <RiDeleteBinLine
                      onClick={() => secondSectionRemove(index)}
                      className="cursor-pointer text-red-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="pl-3 font-bold">Title</Label>
                      <Input
                        type="text"
                        placeholder="Title"
                        {...register(`secondSection.items.${index}.title`)}
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
                  secondSectionAppend({ title: "" })
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
            <div className="flex flex-col gap-2">
              <div>
                <Label className="font-bold">Items</Label>
                <div className="border p-2 rounded-md flex flex-col gap-5">
                  {thirdSectionItems.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
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
                            render={({ field }) => (
                              <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.thirdSection?.items?.[index]?.image && (
                            <p className="text-red-500">
                              {
                                errors.thirdSection?.items?.[index]?.image
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Alt Tag</Label>
                            <Input
                              type="text"
                              placeholder="Alt Tag"
                              {...register(
                                `thirdSection.items.${index}.imageAlt`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.imageAlt && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.imageAlt
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Video</Label>
                          <Controller
                            name={`thirdSection.items.${index}.video`}
                            control={control}
                            render={({ field }) => (
                              <VideoUploader
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.thirdSection?.items?.[index]?.video && (
                            <p className="text-red-500">
                              {
                                errors.thirdSection?.items?.[index]?.video
                                  .message
                              }
                            </p>
                          )}
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
                        video: "",
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

export default ProjectForm;
