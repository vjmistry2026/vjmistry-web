"use client";

import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { ImageUploader } from "@/components/ui/image-uploader";

interface Gallery {
    images: {
        image: string;
        imageAlt: string;
    }[];
}

// const IndiGallery = () => {
//     const router = useRouter();
//     const { id } = useParams();

//     const {
//         control,
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         getValues,
//     } = useForm<Gallery>();
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: "images",
//     });

//     const onSubmit = async () => {
//         try {
//             const response = await fetch(`/api/admin/gallery?id=${id}`, {
//                 method: "POST",
//                 body: JSON.stringify(getValues("images")),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 alert(data.message);
//                 router.push("/admin/gallery");
//             }
//         } catch (error) {
//             console.log("Error adding gallery", error);
//         }
//     };

//     const fetchResourceData = async () => {
//         try {
//             const response = await fetch(`/api/admin/gallery?id=${id}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setValue("images", data.data.images);
//             } else {
//                 const data = await response.json();
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.log("Error in fetching gallery data", error);
//         }
//     };

//     useEffect(() => {
//         fetchResourceData();
//     }, []);

//     return (
//         <div className="flex flex-col gap-5">
//             <h1 className="text-md font-semibold">Images</h1>
//             <div className="border-2 p-2 rounded-md grid grid-cols-2 gap-5">
//                 {fields.map((field, index) => (
//                     <div key={field.id} className="grid grid-cols-1 gap-2 relative border-r pr-5 even:border-r-0">
//                         <div className="absolute top-2 right-2">
//                             <RiDeleteBinLine onClick={() => remove(index)} className="cursor-pointer text-red-600" />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                             <div className="flex flex-col gap-2">
//                                 <Label className="pl-3 font-bold">Image</Label>
//                                 <Controller
//                                     name={`images.${index}.image`}
//                                     control={control}
//                                     rules={{ required: "Image is required" }}
//                                     render={({ field }) => (
//                                         <ImageUploader
//                                             value={field.value}
//                                             onChange={(url) => {
//                                                 field.onChange(url); // update file URL
//                                             }}
//                                         />
//                                     )}
//                                 />
//                                 {errors.images?.[index]?.image && (
//                                     <p className="text-red-500">{errors.images?.[index]?.image.message}</p>
//                                 )}
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <Label className="pl-3 font-bold">Image Alt</Label>
//                                 <Input type="text" placeholder="Image Alt" {...register(`images.${index}.imageAlt`)} />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="flex justify-end">
//                 <Button
//                     type="button"
//                     addItem
//                     className="cursor-pointer"
//                     onClick={() => append({ image: "", imageAlt: "" })}
//                 >
//                     Add Item
//                 </Button>
//             </div>

//             <Button type="submit" onClick={handleSubmit(onSubmit)} className="w-full mx-auto cursor-pointer">
//                 Submit
//             </Button>
//         </div>
//     );
// };

const IndiGallery = () => {
  const router = useRouter();
  const { id } = useParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<Gallery>({
    defaultValues: { images: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = async () => {
    await fetch(`/api/admin/gallery?id=${id}`, {
      method: "POST",
      body: JSON.stringify(getValues("images")),
    });
    router.push("/admin/gallery");
  };

  useEffect(() => {
    fetch(`/api/admin/gallery?id=${id}`)
      .then((res) => res.json())
      .then((data) => setValue("images", data.data.images));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-md font-semibold">Images</h1>

      {/* BULK UPLOAD */}
      <ImageUploader
        multiple
        onChange={(url) =>
          append({ image: url, imageAlt: "" })
        }
        recommendedDimension="Recommended: 1444 x 676 (px)"
      />

      {/* EXISTING IMAGES */}
      <div className="grid grid-cols-2 gap-5">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative border p-3 rounded-md"
          >
            <RiDeleteBinLine
              onClick={() => remove(index)}
              className="absolute top-2 right-2 cursor-pointer text-red-600"
            />

            {/* Preview */}
            <Controller
              name={`images.${index}.image`}
              control={control}
              render={({ field }) => (
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  recommendedDimension="Recommended: 1444 x 676 (px)"
                />
              )}
            />

            {/* ALT */}
            <div className="mt-4">
                <Input
                  placeholder="Image Alt"
                  {...register(`images.${index}.imageAlt`)}
                />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </div>
  );
};


export default IndiGallery;
