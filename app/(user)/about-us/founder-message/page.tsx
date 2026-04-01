import Index from "@/app/components/client/about/founder-message/Index";
import { getMessage } from "@/lib/services/foundersMessage.service";

export const revalidate = false;

const page = async () => {
    const message = await getMessage();
    return <Index data={message} />;
};

export default page;
