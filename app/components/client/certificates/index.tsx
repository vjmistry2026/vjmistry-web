import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import DownloadCenter from "./sections/DownloadCenter";
import Main from "./sections/Main";
import SectionTwo from "./sections/SectionTwo";
const Index = ({ certificate }: { certificate: CertificateType }) => {
  return (
    <>
      <PageBanner title={certificate.pageTitle} image={certificate.banner} imageAlt={certificate.bannerAlt} />
      <Main data={certificate.firstSection} />
      <SectionTwo data={certificate.secondSection} />
      <DownloadCenter data={certificate.thirdSection} />
    </>
  );
}

export default Index;
