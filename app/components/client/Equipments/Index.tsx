import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import PowerBehind from "./sections/PowerBehind";
import EquipmentType from "./sections/EquipmentType"; 

const Index = () => {
    return (
        <>
            <PageBanner title={bannerData.title} image={bannerData.image} />
            <PowerBehind />
            <EquipmentType /> 
        </>
    );
};

export default Index;
