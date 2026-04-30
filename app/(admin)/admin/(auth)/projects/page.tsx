"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProjectCard from "./ProjectCard";
import { FaEye } from "react-icons/fa6";
import Link from "next/link";


interface CurrentOpeningsPageProps {
  metaTitle: string;
  metaDescription: string;
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  firstSection: {
    title: string;
  },
}



export default function CurrentOpenings() {

  const [projectType, setProjectType] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [projectsList, setProjectsList] = useState<{ _id: string, title: string, status:string, slug:string }[]>([]);
  const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
  const [projectTypeList, setProjectTypeList] = useState<{ _id: string, name: string }[]>([]);
  const [sectorList, setSectorList] = useState<{ _id: string, name: string }[]>([]);
  const [reorderMode, setReorderMode] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<CurrentOpeningsPageProps>();



  const handleAddProjectType = async () => {
    try {
      const response = await fetch("/api/admin/projects/project-type", {
        method: "POST",
        body: JSON.stringify({ name: projectType }),
      });
      if (response.ok) {
        const data = await response.json();
        setProjectType("");
        alert(data.message);
        handleFetchProjectType();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding project type", error);
    }
  }

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
  }

  const handleEditProjectType = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/project-type?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: projectType }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchProjectType();
        setProjectType("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing sector", error);
    }
  }

  const handleDeleteProjectType = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/project-type?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchProjectType();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting sector", error);
    }
  }

  const handleAddSector = async () => {
    try {
      const response = await fetch("/api/admin/projects/sector", {
        method: "POST",
        body: JSON.stringify({ name: sector }),
      });
      if (response.ok) {
        const data = await response.json();
        setSector("");
        alert(data.message);
        handleFetchSector();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding sector", error);
    }
  }

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
  }

  const handleEditSector = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/sector?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: sector }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchSector();
        setSector("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing sector", error);
    }
  }

  const handleDeleteSector = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/sector?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchSector();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting sector", error);
    }
  }


  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/projects/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  }

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/admin/projects/location", {
        method: "POST",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        setLocation("");
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding location", error);
    }
  }

  const handleEditLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/location?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing location", error);
    }
  }

  const handleDeleteLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/location?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting location", error);
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchProjects();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting project", error);
    }
  }

  const onSubmit = async (data: CurrentOpeningsPageProps) => {
    try {
      const response = await fetch(`/api/admin/projects`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in submitting details", error);
    }
  }

  const handleFetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("pageTitle", data.data.pageTitle);
        setValue("firstSection", data.data.firstSection);
        setProjectsList(data.data.projects);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching project details", error);
    }
  }


  const getTaskPos = (id: number | string) => projectsList.findIndex((item: { _id: string }) => (item._id == id))
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setProjectsList((projectsList: { _id: string; title: string, status:string, slug:string }[]) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(projectsList, originalPos, newPos);
    });
  };


  const confirmPosition = async () => {
    setReorderMode(!reorderMode);

    const updatedProjects = projectsList.map((project) => ({
      ...project,
    }));

    setProjectsList(updatedProjects);

    const formData = new FormData()
    formData.append('projects', JSON.stringify(updatedProjects))
    const response = await fetch(`/api/admin/projects/reorder`, {
      method: "POST",
      body: formData
    })
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        alert(data.message)
      }
    }
  };


  useEffect(() => {
    handleFetchProjectType();
    handleFetchSector();
    handleFetchLocation();
    handleFetchProjects();
  }, [])

  return (
    <div className="flex flex-col gap-5">

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>


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

        <div className='flex justify-center mt-5'>
          <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
        </div>

      </form>


      <div className="h-screen grid grid-cols-2 gap-5">

        <div className="flex flex-col gap-2 h-screen">
          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Project Type</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setProjectType("")}>Add Project Type</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Project Type</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Project Type" value={projectType} onChange={(e) => setProjectType(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddProjectType}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {projectTypeList.map((item) => (
                <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                  <div className="text-[16px]">
                    {item.name}
                  </div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger onClick={() => { setProjectType(item.name) }}><MdEdit /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Project Type</DialogTitle>
                          <DialogDescription>
                            <Input type="text" placeholder="Project Type" value={projectType} onChange={(e) => setProjectType(e.target.value)} />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditProjectType(item._id)}>Save</DialogClose>
                      </DialogContent>

                    </Dialog>



                    <Dialog>
                      <DialogTrigger><MdDelete /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteProjectType(item._id)}>Yes</DialogClose>
                        </div>

                      </DialogContent>

                    </Dialog>

                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Sector</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setSector("")}>Add Sector</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Sector</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Sector" value={sector} onChange={(e) => setSector(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddSector}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {sectorList.map((item) => (
                <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                  <div className="text-[16px]">
                    {item.name}
                  </div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger onClick={() => { setSector(item.name) }}><MdEdit /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Sector</DialogTitle>
                          <DialogDescription>
                            <Input type="text" placeholder="Sector" value={sector} onChange={(e) => setSector(e.target.value)} />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditSector(item._id)}>Save</DialogClose>
                      </DialogContent>

                    </Dialog>



                    <Dialog>
                      <DialogTrigger><MdDelete /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteSector(item._id)}>Yes</DialogClose>
                        </div>

                      </DialogContent>

                    </Dialog>

                  </div>
                </div>
              ))}

            </div>
          </div>


          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Location</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setLocation("")}>Add Location</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddLocation}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="h-full">

              <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
                {locationList.map((item) => (
                  <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                    <div className="text-[16px]">
                      {item.name}
                    </div>
                    <div className="flex gap-5">
                      <Dialog>
                        <DialogTrigger onClick={() => { setLocation(item.name) }}><MdEdit /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Location</DialogTitle>
                            <DialogDescription>
                              <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </DialogDescription>
                          </DialogHeader>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditLocation(item._id)}>Save</DialogClose>
                        </DialogContent>

                      </Dialog>



                      <Dialog>
                        <DialogTrigger><MdDelete /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteLocation(item._id)}>Yes</DialogClose>
                          </div>

                        </DialogContent>

                      </Dialog>

                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

        <div className="h-screen w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Projects</Label>
            <div className="flex gap-2">
              <Button className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
              <Button onClick={() => router.push("/admin/projects/add")}>Add Project</Button>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
            {reorderMode &&

              <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={projectsList.map((project) => project._id)} strategy={verticalListSortingStrategy}>
                  {projectsList?.map((project, index) => (
                    <ProjectCard key={index} project={project} id={project._id} />
                  ))}
                </SortableContext>
              </DndContext>

            }

            {!reorderMode && projectsList.map((item) => (
              <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                <div className="text-[16px]">
                  {item.title}
                </div>
                <div className="flex gap-5 items-center">
                  {item.status == "draft" ? (<Link href={`/projects/${item.slug}`} target="_blank"><div className="text-[16px] rounded-xl bg-yellow-300 p-1 flex items-center gap-1">
                    <FaEye />
                  </div></Link>) : (<div className="text-[16px] rounded-xl bg-green-300 p-1 flex items-center gap-1">
                    <FaEye />
                  </div>)}
                  <MdEdit onClick={() => router.push(`/admin/projects/edit/${item._id}`)} />

                  <Dialog>
                    <DialogTrigger><MdDelete /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteProject(item._id)}>Yes</DialogClose>
                      </div>

                    </DialogContent>

                  </Dialog>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
  );
}
