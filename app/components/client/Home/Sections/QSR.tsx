"use client";

import Image from "next/image";
import { useContainerPadding } from "@/app/hooks/useContainerPadding";

const Qsr = () => {
    const paddingLeft = useContainerPadding();

    return (
        <section className="pb-[50px] pt-[20px] lg:pt-0">
            {/* HEIGHT CONTROLLER */}
            <div
                className="
                    relative
                    overflow-hidden
                    sm:h-auto
                    lg:h-[720px]
                    xl:h-[720px]
                    2xl:h-[750px]
                    3xl:min-h-[930px]
                "
            >
                {/* BG SVG — ONLY lg+ */}
                <div className="hidden lg:block absolute inset-0">
                    <Image
                        src="/assets/images/home/qsr/bg-qsr-svg.svg"
                        alt="QSR"
                        fill
                        className="object-contain 2xl:object-cover 3xl:object-[150%_center]"
                        priority
                    />
                </div>

                {/* CONTENT */}
                <div
                    style={{ paddingLeft, paddingRight: paddingLeft }}
                    className="
                        w-full
                        static
                        lg:absolute
                        lg:bottom-0
                    "
                >
                    <div>
                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                gap-[24px]
                                lg:gap-[60px]
                            "
                        >
                            {/* LEFT IMAGE */}
                            <div className="flex-none w-full md:w-auto">
                                <Image
                                    src="/assets/images/home/qsr/qsr-main.png"
                                    alt="QSR"
                                    width={728}
                                    height={894}
                                    className="
            w-full
            max-w-full
            md:max-w-[480px]
            2xl:max-w-[640px]
            3xl:max-w-[726px]
            h-[330px]
            md:h-auto
        "
                                />
                            </div>

                            {/* RIGHT CONTENT */}
                            <div className="flex-1 text-left lg:mt-24">
                                <h2 className="text-60 lg:text-66 3xl:text-75 max-w-[448px] font-condensed leading-[120%] text-[#1C1C1C] mb-[24px]">
                                    Quality. Safety. Reliability.
                                </h2>

                                <p className="text-20 max-w-[684px] font-nexa font-bold text-paragraph leading-[1.5]">
                                    At VJ Mistry, quality and safety are integral to every stage of our work. Our processes
                                    are aligned with industry standards and best practices, ensuring consistent outcomes,
                                    safe work environments, and dependable project delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Qsr;
