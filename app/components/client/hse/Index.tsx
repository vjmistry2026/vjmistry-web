import DecImg from "../common/DecImg";
import PageBanner from "../common/PageBanner";
import { HSEData } from "./data";
import ComHealth from "./sections/ComHealth";
import QuoteBanner from "./sections/QuoteBanner";
import SpotlightSlider from "./sections/SpotlightSlider";
import ZeroHarm from "./sections/ZeroHarm";
import CSR from "./sections/CSR";
import BottomTagline from "./sections/BottomTagline";
import { HSeType } from "@/app/types/hse";
const Index = ({ data }: { data: HSeType }) => {
  return (
    <>
      <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
      <DecImg sectionClassName="py-150" title={data.firstSection.title} desc={data.firstSection.description} image={data.firstSection.image} alt={data.firstSection.imageAlt} className="lg:gap-[73px]" titleClass="mb-2 xl:mb-30 leading-[1.2]" />
      <ComHealth data={data.secondSection} />
      <ZeroHarm data={data.thirdSection} />
      <QuoteBanner data={data.fourthSection} />
      <SpotlightSlider data={data.fifthSection} />
      <CSR data={data.sixthSection} />
      <BottomTagline data={data.seventhSection} />
    </>
  );
}

export default Index;
