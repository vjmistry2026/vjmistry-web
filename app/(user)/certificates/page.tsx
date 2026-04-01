import Index from "@/app/components/client/certificates";
import { getCertificate } from "@/lib/services/certificate.service";

export const revalidate = false;

const Page = async () => {
    const certificate = await getCertificate()
    return <Index certificate={certificate} />
}
export default Page;