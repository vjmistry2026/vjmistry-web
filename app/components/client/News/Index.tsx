
import { Suspense } from "react";
import PageBanner from "../common/PageBanner";
import Main from "./sections/Main";
import { NewsType } from "@/app/types/news";
import { Filters } from "@/app/types/projectfilters";

const Index = ({ data, category }: { data: NewsType, category: Filters[] }) => {
  return (
    <>
      <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
      <Suspense>
        <Main news={data.news.filter((item)=>item.status == "published")} category={category} />
      </Suspense>
    </>
  );
}

export default Index;