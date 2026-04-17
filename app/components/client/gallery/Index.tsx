import PageBanner from "../common/PageBanner";
import Main from "./section/Main";
import { GalleryData } from "./data";
import { GalleryType } from "@/app/types/gallery";

const Index = ({ gallery }: { gallery: GalleryType }) => {
  return (
    <>
      <PageBanner title={gallery.pageTitle} image={gallery.banner} imageAlt={gallery.bannerAlt} />
      <Main firstSection={gallery.firstSection} items={gallery.items.filter((item)=>item.status == "published")} />
    </>
  );
}

export default Index;
