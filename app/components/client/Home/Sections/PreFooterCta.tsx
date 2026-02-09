"use client";

import Image from "next/image";
import { buildWithConfidenceData } from "../data";
import CustomButton from "@/app/components/client/common/CustomButton";

const PreFooterCta = () => {
    const { title, description, backgroundImage } = buildWithConfidenceData;

    return (
        <section className="relative py-100 lg:py-130 w-full overflow-hidden">
            {/* Background Image */}
            <Image src={backgroundImage} alt="Build with confidence" fill priority className="object-cover" />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center">
                <div className="px-4 flex flex-col items-center">
                    <h2 className="text-75 font-condensed leading-[100%] text-[#FDFDFD] mb-[20px] lg:mb-[30px] max-w-[12ch]">{title}</h2>

                    <p className="text-20 font-nexa font-bold leading-[1.5] text-white/70 mb-[30px] lg:mb-[60px] max-w-[54ch]">
                        {description}
                    </p>

                    {/* STATIC BUTTON */}
                    <div>
                        <CustomButton label="Contact Us" href="#" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreFooterCta;
