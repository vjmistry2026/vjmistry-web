"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import AnimatedHeading from "../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
import ContainerAnchor from "../../Layout/ContainerAnchor";

const Qsr = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftInset = useContainerLeftInset(containerRef);
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const check = () => setScreenWidth(window.innerWidth);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section className="pb-[50px] pt-[20px] lg:pt-0 max-w-[1920px]">
            {/* Anchor used ONLY to measure container */}
            <ContainerAnchor ref={containerRef} />

            {/* HEIGHT CONTROLLER */}
            <div className="relative overflow-hidden sm:h-auto lg:h-[600px] xl:h-[600px] 2xl:h-[750px] 3xl:min-h-[930px]">
                {/* BG SVG — ONLY lg+ */}
                <div className="hidden xl:block absolute inset-0">
                    <Image
                        src="/assets/images/home/qsr/bg-qsr-svg.svg"
                        alt="QSR"
                        fill
                        className="object-contain 2xl:object-cover 3xl:object-[150%_center]"
                        priority
                    />
                </div>

                <div className="hidden 2xl:block absolute top-0 left-0 -translate-x-[28.5%] 3xl:-translate-x-[29.5%] bottom-0 z-[10] w-full h-full">
                    <Image src="/assets/images/home/qsr/line-svg.svg" alt="QSR" fill className="object-contain" priority />
                </div>

                {/* CONTENT WRAPPER */}
                <div
                    className="
                        w-full
                        static
                        lg:absolute lg:bottom-0
                        md:container
                        lg:px-0
                    "
                    style={{
                        paddingLeft:
                            screenWidth >= 1200 && screenWidth < 1500
                                ? leftInset + 15
                                : screenWidth >= 770 && screenWidth < 1024
                                    ? 0
                                    : leftInset,
                        paddingRight: screenWidth < 1024 ? leftInset : undefined,
}}

                >
                    <div className="flex flex-col md:flex-row md:items-end lg:items-center gap-[24px] lg:gap-[60px]">
                        {/* LEFT IMAGE */}
                        <motion.div
                            variants={moveUp(0.3)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex-none w-full md:w-1/2 xl:w-1/2"
                        >
                            <Image
                                src="/assets/images/home/qsr/qsr-main.png"
                                alt="QSR"
                                width={728}
                                height={894}
                                className="
                                    w-full
                                    max-w-[450px]
                                    md:max-w-none
                                    2xl:max-w-[640px]
                                    3xl:min-w-[726px]
                                    h-auto
                                "
                            />
                        </motion.div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 md:w-1/2 xl:w-full text-left lg:mt-24">
                            <AnimatedHeading
                                tag="h2"
                                text="Quality. Safety. Reliability."
                                className="text-60 lg:text-66 3xl:text-75 max-w-[488px] font-condensed leading-[120%] text-[#1C1C1C] mb-[24px]"
                            />

                            <motion.p
                                variants={moveUp(0.3)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="text-20 max-w-[684px] font-nexa font-bold text-paragraph leading-[1.5]"
                            >
                                At VJ Mistry, quality and safety are integral to every stage of our work. Our processes are
                                aligned with industry standards and best practices, ensuring consistent outcomes, safe work
                                environments, and dependable project delivery.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Qsr;
