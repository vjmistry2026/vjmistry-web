import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import ContactForm from "./sections/ContactForm"; 
import ReachOutUs from "./sections/ReachOutUs";

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <ContactForm /> 
            <ReachOutUs/>
        </>
    );
};

export default Index;
