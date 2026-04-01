import PageBanner from "../common/PageBanner";
import { bannerData } from "./data";
import PowerBehind from "./sections/PowerBehind";
import EquipmentType from "./sections/EquipmentType";
import { EquipmentType as Equipment } from "@/app/types/equipment";

const Index = ({ data }: { data: Equipment }) => {
    return (
        <>
            <PageBanner title={data.pageTitle} image={data.banner} imageAlt={data.bannerAlt} />
            <PowerBehind data={data.secondSection} />
            <EquipmentType data={data.equipments} thirdSection={data.thirdSection} />
        </>
    );
};

export default Index;
