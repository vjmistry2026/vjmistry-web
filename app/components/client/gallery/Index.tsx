import PageBanner from "../common/PageBanner";
import Main from "./section/Main";
import { GalleryData } from "./data";

const Index = () => {
  return ( 
    <>
      <PageBanner title={GalleryData.bannerData.title} image={GalleryData.bannerData.image}/>
      <Main />
    </>
   );
}
 
export default Index;
