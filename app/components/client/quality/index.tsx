import DecImg from "../common/DecImg";
import PageBanner from "../common/PageBanner";
import { qualityData } from "./data";
import Certifications from "./sections/Certifications";
import QualityShield from "./sections/QualityShield";

const Index = () => {
  return ( 
    <>
    <PageBanner title={qualityData.bannerData.title} image={qualityData.bannerData.image}/>
      <DecImg sectionClassName="py-130 md:py-150" title={qualityData.mainData.title} desc={qualityData.mainData.desc} image={qualityData.mainData.img} alt={qualityData.mainData.title} shape={true} className="lg:gap-[73px]" titleClass="mb-2 xl:mb-30 leading-[1.2]" />
      <QualityShield/>
      <Certifications/>
    </>
   );
}
 
export default Index;