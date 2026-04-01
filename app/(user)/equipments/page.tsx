import Index from "@/app/components/client/Equipments/Index";
import { getEquipment } from "@/lib/services/equipment.service";

export const revalidate = false;

const page = async () => {
    const equipment = await getEquipment()
    return <Index data={equipment} />;
};

export default page;
