import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import ContactForm from "./sections/ContactForm"; 

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <ContactForm /> 
        </>
    );
};

export default Index;
