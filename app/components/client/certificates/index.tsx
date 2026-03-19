import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import DownloadCenter from "./sections/DownloadCenter";
import Main from "./sections/Main";
import SectionTwo from "./sections/SectionTwo";
const Index = () => {
  return ( 
    <>
    <PageBanner title={bannerData.title} image={bannerData.image} />
    <Main/>
    <SectionTwo />
    <DownloadCenter/>
    </>
   );
}
 
export default Index;
