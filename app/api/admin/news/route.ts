import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/app/models/News";
import { verifyAdmin } from "@/lib/verifyAdmin";
import "@/app/models/NewsCategory";
import { revalidateTag } from "next/cache";
// import Expertise from "@/app/models/Expertise";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");
    // const expertise = await Expertise.findOne({});
    if (id) {
      const news = await News.findOne({})
        .populate("news.firstSection.category", "name _id")
      const foundNews = news.news.find(
        (news: { _id: string }) => news._id.toString() === id
      );
      // const relatedService = expertise.secondSection.items.find(
      //   (item: { _id: string }) =>
      //     item._id.toString() === foundProject?.relatedService?.toString()
      // );
      if (!foundNews) {
        return NextResponse.json(
          { message: "News not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          data: {
            ...(foundNews.toObject?.() ?? foundNews),
            // relatedService,
          },
          message: "News fetched successfully",
        },
        { status: 200 }
      );
    } else if (slug) {
      const news = await News.findOne({})
        .populate("news.firstSection.category", "name _id")
      const foundNews = news.news.find(
        (news: { slug: string }) => news.slug === slug
      );
      // const relatedService = expertise.secondSection.items.find(
      //   (item: { _id: string }) =>
      //     item._id.toString() === foundProject?.relatedService
      // );
      if (!foundNews) {
        return NextResponse.json(
          { message: "News not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          data: {
            ...(foundNews.toObject?.() ?? foundNews),
            // relatedService,
          },
          message: "News fetched successfully",
        },
        { status: 200 }
      );
    } else {
      const news = await News.findOne({})
        .populate("news.firstSection.category", "name _id")
      if (!news) {
        return NextResponse.json(
          { message: "News not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: news, message: "News fetched successfully" },
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

    const news = await News.findOne({});
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
      const foundNews = news.news.find(
        (news: { _id: string }) => news._id.toString() === id
      );
      if (!foundNews) {
        return NextResponse.json(
          { message: "News not found" },
          { status: 404 }
        );
      }
      foundNews.firstSection = body.firstSection;
      foundNews.secondSection = body.secondSection;
      foundNews.thirdSection = body.thirdSection;
      foundNews.metaTitle = body.metaTitle;
      foundNews.metaDescription = body.metaDescription;
      await news.save();
      revalidateTag("indi-news", "default");
      return NextResponse.json(
        { message: "News updated successfully" },
        { status: 200 }
      );
    }
    if (!news) {
      await News.create({ ...body });
      return NextResponse.json(
        { message: "News created successfully" },
        { status: 200 }
      );
    } else {
      await News.findOneAndUpdate({}, body, { upsert: true, new: true });
      revalidateTag("all-news", "default");
      return NextResponse.json(
        { message: "News updated successfully" },
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
    const news = await News.findOne({});
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
    news.news.push(body);
    await news.save();
    return NextResponse.json(
      { message: "News created successfully" },
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
    const news = await News.findOne({});
    if (!news) {
      return NextResponse.json(
        { message: "News not found" },
        { status: 404 }
      );
    }
    news.news = news.news.filter(
      (news: { _id: string }) => news._id.toString() !== id
    );
    await news.save();
    return NextResponse.json(
      { message: "News deleted successfully" },
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
