import DecImg from "../common/DecImg";
import PageBanner from "../common/PageBanner";
import { qualityData } from "./data";
import Certifications from "./sections/Certifications";
import QualityShield from "./sections/QualityShield";

const Index = ({ data }: { data: QualityType }) => {
  return (
    <>
      <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
      <DecImg sectionClassName="py-130 md:py-150" title={data.firstSection.title} desc={data.firstSection.description} image={data.firstSection.image} alt={data.firstSection.imageAlt} shape={true} className="lg:gap-[73px]" titleClass="mb-2 xl:mb-30 leading-[1.2]" />
      <QualityShield data={data.secondSection} />
      <Certifications data={data.thirdSection} />
    </>
  );
}

export default Index;