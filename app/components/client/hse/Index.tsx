import DecImg from "../common/DecImg";
import PageBanner from "../common/PageBanner";
import { HSEData } from "./data";
import ComHealth from "./sections/ComHealth";
import QuoteBanner from "./sections/QuoteBanner";
import SpotlightSlider from "./sections/SpotlightSlider";
import ZeroHarm from "./sections/ZeroHarm";
import CSR from "./sections/CSR";
import BottomTagline from "./sections/BottomTagline";
const Index = () => {
  return ( 
    <>
    <PageBanner title={HSEData.bannerData.title} image={HSEData.bannerData.image} />
    <DecImg sectionClassName="py-150" title={HSEData.hero.title} desc={HSEData.hero.desc} image={HSEData.hero.img} alt={HSEData.hero.title} className="lg:gap-[73px]" titleClass="mb-2 xl:mb-30 leading-[1.2]" />
    <ComHealth/>
    <ZeroHarm />
    <QuoteBanner/>
    <SpotlightSlider/>
    <CSR/>
    <BottomTagline/>
    </>
   );
}
 
export default Index;
