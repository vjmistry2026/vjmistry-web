import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Certificate from "@/app/models/Certificate";

export const getCertificate = unstable_cache(
    async (): Promise<CertificateType> => {
        await connectDB();

        const certificate = await Certificate.findOne({}).lean<CertificateType>();

        if (!certificate) {
            throw new Error("Certificate not found");
        }

        return JSON.parse(JSON.stringify(certificate));
    },
    ["certificate"], // cache key
    {
        tags: ["certificate"], // for revalidation
    }
);