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
        <section className="max-w-[1920px]">
            <ContainerAnchor ref={containerRef} />

            {/* DESKTOP LAYOUT (lg+) */}
            <div className="hidden lg:block relative">
                <div className="relative w-full">
                    {/* BG SVG — defines height of the section */}
                    <div className="relative -left-[2%]">
                        <Image
                            src="/assets/images/home/qsr/bg-qsr-svg.svg"
                            alt=""
                            width={1920}
                            height={757}
                            className="w-full h-auto object-cover pointer-events-none"
                            priority
                            aria-hidden="true"
                        />
                    </div>

                    {/* LINE SVG — starts from where the photo ends (~right 55% of the section) */}
                    <div className="absolute -left-[2%] top-0 bottom-0 right-0 h-full z-50 pointer-events-none">
                        <Image
                            src="/assets/images/home/qsr/line-svg.svg"
                            alt=""
                            fill
                            className="pointer-events-none object-contain object-left"
                            priority
                            aria-hidden="true"
                        />
                    </div>

                    {/* CONTENT: image bottom-left, text right */}
                    <div
                        className="absolute bottom-0 left-0 right-0 z-[10]"
                        style={{ paddingLeft: leftInset}}
                    >
                        <div className="flex items-end gap-[60px] xl:gap-[80px]">
                            {/* LEFT IMAGE — bottom-aligned with bg svg */}
    <motion.div
      variants={moveUp(0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex-none">
                                <Image
                                    src="/assets/images/home/qsr/qsr-main.png"
                                    alt="QSR"
                                    width={728}
                                    height={894}
                                    className="
                                        w-auto
                                        h-[520px]
                                        xl:h-[550px]
                                        2xl:h-[660px]
                                        3xl:h-[780px]
                                        pointer-events-none
                                        object-contain object-bottom
                                    "
                                    priority
                                />
                            </motion.div>

                            {/* RIGHT TEXT */}
                            <div className="flex-1 pb-[60px] xl:pb-[80px] 2xl:pb-[100px]" style={{ paddingRight: leftInset }}>
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
                                    className="text-20 max-w-[550px] font-nexa font-bold text-paragraph leading-[1.5]"
                                >
                                    At VJ Mistry, quality and safety are integral to every stage of our work. Our processes are
                                    aligned with industry standards and best practices, ensuring consistent outcomes, safe work
                                    environments, and dependable project delivery.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 50px space BELOW the bg svg */}
                <div className="h-[50px]" />
            </div>

            {/* MOBILE / TABLET LAYOUT */}
            <div className="lg:hidden pb-[50px] pt-[20px]">
                <div
                    className="container"
                >
                    <div className="flex flex-col md:flex-row md:items-end gap-[24px]">
                        <motion.div
                            variants={moveUp(0.3)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex-none w-full md:w-1/2"
                        >
                            <Image
                                src="/assets/images/home/qsr/qsr-main.png"
                                alt="QSR"
                                width={728}
                                height={894}
                                className="pointer-events-none w-full max-w-[450px] md:max-w-none h-auto"
                            />
                        </motion.div>

                        <div className="flex-1 md:w-1/2 text-left">
                            <AnimatedHeading
                                tag="h2"
                                text="Quality. Safety. Reliability."
                                className="text-60 font-condensed leading-[120%] text-[#1C1C1C] mb-[24px]"
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