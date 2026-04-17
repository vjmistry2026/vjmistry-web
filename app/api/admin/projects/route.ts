import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import { verifyAdmin } from "@/lib/verifyAdmin";
import "@/app/models/Sector";
import "@/app/models/Location";
import "@/app/models/ProjectType";
import { getAllProjects, getIndiProjects } from "@/lib/services/project.service";
import { revalidateTag } from "next/cache";
// import Expertise from "@/app/models/Expertise";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");
    // const expertise = await Expertise.findOne({});
    if (id) {
      const project = await Project.findOne({})
        .populate("projects.firstSection.sector", "name _id")
        .populate("projects.firstSection.location", "name _id")
        .populate("projects.firstSection.projectType", "name _id");
      const foundProject = project.projects.find(
        (project: { _id: string }) => project._id.toString() === id
      );
      // const relatedService = expertise.secondSection.items.find(
      //   (item: { _id: string }) =>
      //     item._id.toString() === foundProject?.relatedService?.toString()
      // );
      if (!foundProject) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          data: {
            ...(foundProject.toObject?.() ?? foundProject),
            // relatedService,
          },
          message: "Project fetched successfully",
        },
        { status: 200 }
      );
    } else if (slug) {
      // const project = await Project.findOne({})
      //   .populate("projects.firstSection.sector", "name _id")
      //   .populate("projects.firstSection.location", "name _id")
      //   .populate("projects.firstSection.projectType", "name _id");
      // const foundProject = project.projects.find(
      //   (project: { slug: string }) => project.slug === slug
      // );
      // const relatedService = expertise.secondSection.items.find(
      //   (item: { _id: string }) =>
      //     item._id.toString() === foundProject?.relatedService
      // );
      const foundProject = await getIndiProjects(slug)
      if (!foundProject) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          data: {
            ...foundProject,
            // relatedService,
          },
          message: "Project fetched successfully",
        },
        { status: 200 }
      );
    } else {
      // const project = await Project.findOne({})
      //   .populate("projects.firstSection.sector", "name _id")
      //   .populate("projects.firstSection.location", "name _id")
      //   .populate("projects.firstSection.projectType", "name _id");
      const isAdmin = await verifyAdmin(request);
      if (isAdmin) {
        const project = await Project.findOne({})
          .populate("projects.firstSection.sector", "name _id")
          .populate("projects.firstSection.location", "name _id")
          .populate("projects.firstSection.projectType", "name _id");

        return NextResponse.json(
          { data: project, message: "Project fetched successfully" },
          { status: 200 }
        );
      }

      const project = await getAllProjects()

      console.log(project);

      if (!project) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: project, message: "Project fetched successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const isAdmin = await verifyAdmin(request);
    const id = request.nextUrl.searchParams.get("id");
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const project = await Project.findOne({});
    if (id) {
      // const expertise = await Expertise.findOne({});
      // expertise.secondSection.items.forEach((item: { projects: string[] }) => {
      //   const index = item.projects.findIndex(
      //     (projId: string) => projId.toString() === id
      //   );
      //   if (index !== -1) {
      //     item.projects.splice(index, 1);
      //   }
      // });

      // 2️⃣ Add project ID only to the correct service
      // const targetService = expertise.secondSection.items.find(
      //   (item: { _id: string }) => item._id.toString() === body.relatedService
      // );

      // if (targetService) {
      //   if (
      //     !targetService.projects.some(
      //       (projId: string) => projId.toString() === id
      //     )
      //   ) {
      //     targetService.projects.push(id);
      //   }
      // }

      // 3️⃣ Save the updated expertise document
      // await expertise.save();
      const foundProject = project.projects.find(
        (project: { _id: string }) => project._id.toString() === id
      );
      if (!foundProject) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }
      foundProject.firstSection = body.firstSection;
      foundProject.secondSection = body.secondSection;
      foundProject.thirdSection = body.thirdSection;
      foundProject.banner = body.banner;
      foundProject.bannerAlt = body.bannerAlt;
      foundProject.thumbnail = body.thumbnail;
      foundProject.thumbnailAlt = body.thumbnailAlt;
      foundProject.title = body.title;
      foundProject.slug = body.slug;
      foundProject.metaTitle = body.metaTitle;
      foundProject.metaDescription = body.metaDescription;
      foundProject.status = body.status;

      await project.save();
      revalidateTag("indi-project", "default");
      return NextResponse.json(
        { data: project, message: "Project updated successfully" },
        { status: 200 }
      );
    }
    if (!project) {
      await Project.create({ ...body });
      return NextResponse.json(
        { data: project, message: "Project created successfully" },
        { status: 200 }
      );
    } else {
      await Project.findOneAndUpdate({}, body, { upsert: true, new: true });
      revalidateTag("all-project", "default");
      return NextResponse.json(
        { data: project, message: "Project updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const project = await Project.findOne({});
    // const expertise = await Expertise.findOne({});
    // const toUpdate = expertise.secondSection.items.find(
    //   (item: { _id: string }) => item._id.toString() === body.relatedService
    // );
    // if (toUpdate) {
    //   if (!toUpdate.projects.includes(project._id.toString())) {
    //     toUpdate.projects.push(project._id.toString());
    //   }
    // }
    // await expertise.save();
    project.projects.push(body);
    await project.save();
    return NextResponse.json(
      { data: project, message: "Project created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const project = await Project.findOne({});
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    project.projects = project.projects.filter(
      (project: { _id: string }) => project._id.toString() !== id
    );
    await project.save();
    return NextResponse.json(
      { data: project, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
