import Index from "@/app/components/client/ContactUs/Index";
import { getContact } from "@/lib/services/contact.service";

export const revalidate = false;

const page = async () => {
    const contact = await getContact()
    return <Index data={contact} />;
};

export default page;
