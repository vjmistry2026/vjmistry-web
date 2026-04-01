import { ContactType } from "@/app/types/contact";
import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import ContactForm from "./sections/ContactForm";
import ReachOutUs from "./sections/ReachOutUs";

const Index = ({ data }: { data: ContactType }) => {
    return (
        <>
            <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
            <ContactForm data={data.firstSection} />
            <ReachOutUs data={data.secondSection} />
        </>
    );
};

export default Index;
