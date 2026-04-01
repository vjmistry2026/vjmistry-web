// lib/services/about.service.ts

import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import Location from "@/app/models/Location";
import ProjectTypeModel from "@/app/models/ProjectType";
import { unstable_cache } from "next/cache";
import { ProjectType } from "@/app/types/project";
import Sector from "@/app/models/Sector";
import "@/app/models/Sector";
import "@/app/models/Location";
import "@/app/models/ProjectType";

interface Filters {
    name: string;
    _id: string;
}

export const getAllProjects = unstable_cache(
    async (): Promise<ProjectType> => {
        await connectDB();

        const project = await Project.findOne({})
            .populate("projects.firstSection.sector", "name _id")
            .populate("projects.firstSection.location", "name _id")
            .populate("projects.firstSection.projectType", "name _id").lean()

        if (!project) {
            throw new Error("Project not found");
        }

        return JSON.parse(JSON.stringify(project));
    },
    ["all-project"], // cache key
    {
        tags: ["all-project"], // for revalidation
    }
);

export const getIndiProjects = unstable_cache(
    async (slug: string): Promise<ProjectType['projects'][number]> => {
        await connectDB();

        const project = await Project.findOne({})
            .populate("projects.firstSection.sector", "name _id")
            .populate("projects.firstSection.location", "name _id")
            .populate("projects.firstSection.projectType", "name _id");
        const foundProject = project.projects.find(
            (project: { slug: string }) => project.slug === slug
        );

        if (!project) {
            throw new Error("Project not found");
        }

        return JSON.parse(JSON.stringify(foundProject));
    },
    ["indi-project"], // cache key
    {
        tags: ["indi-project"], // for revalidation
    }
);

export const getAllLocation = unstable_cache(
    async (): Promise<Filters[]> => {
        await connectDB();

        const location = await Location.find({}).lean()

        if (!location) {
            throw new Error("Locations not found");
        }

        return JSON.parse(JSON.stringify(location));
    },
    ["location"], // cache key
    {
        tags: ["location"], // for revalidation
    }
);

export const getAllProjectType = unstable_cache(
    async (): Promise<Filters[]> => {
        await connectDB();

        const projectType = await ProjectTypeModel.find({}).lean();

        if (!projectType) {
            throw new Error("Project Types not found");
        }

        return JSON.parse(JSON.stringify(projectType));
    },
    ["projectType"], // cache key
    {
        tags: ["projectType"], // for revalidation
    }
);

export const getAllSectors = unstable_cache(
    async (): Promise<Filters[]> => {
        await connectDB();

        const sectors = await Sector.find({}).lean();

        if (!sectors) {
            throw new Error("Sectors not found");
        }

        return JSON.parse(JSON.stringify(sectors));
    },
    ["sector"], // cache key
    {
        tags: ["sector"], // for revalidation
    }
);
