import Index from "@/app/components/client/Home/Index";
import { getHome } from "@/lib/services/home.service";
import { getServices } from "@/lib/services/services.service";

export const revalidate = false;

const page = async () => {
  const home = await getHome()
  const service = await getServices();
  return <Index data={home} service={service} />;
};

export default page;
