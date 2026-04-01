"use client";

import Image from "next/image";
import { aboutHeroSectionData } from "../data";
import { useEffect, useRef, useState } from "react";
import { moveUp } from "@/app/components/motionVariants";
import { motion, useScroll, useTransform } from "framer-motion";
import { AboutType } from "@/app/types/about";

const AboutVj = ({ data }: { data: AboutType['firstSection'] }) => {
    // const { title, description, primaryButton, image } = aboutHeroSectionData;

    const [isActiveTitle, setIsActiveTitle] = useState(false);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: imageWrapperRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "11vh"]);

    useEffect(() => {
        if (!titleRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsActiveTitle(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0,
                rootMargin: "0% 0px 0% 0px",
            },
        );

        observer.observe(titleRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-white relative overflow-hidden">
            {/* BG SVG — top right */}
            <div className="absolute top-[0%] max-w-[90%] md:-top-[15%] lg:-top-[22%] 2xl:-top-[15%] 3xl:-top-[14.2%] -right-3 w-auto h-full md:max-w-[900px] xl:max-w-[1180px] 2xl:max-w-[1220px] 3xl:max-w-[1500px]">
                <Image
                    src="/assets/images/about/overview/vj-svg-top-right.svg"
                    alt=""
                    width={1500}
                    height={800}
                    className="pointer-events-none object-contain"
                />
            </div>

            <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="container relative z-10"
            >
                {/* Mobile: flex-col (heading → image) | lg+: flex-row unchanged */}
                <div className="flex flex-col md:flex-row md:items-stretch gap-8 lg:gap-10 xl:gap-[60px] 2xl:gap-20 3xl:gap-[105px] pt-100 pb-130 3xl:pb-150 3xl:pt-[105px]">

                    {/* LEFT — full width mobile, 58% on lg+ */}
                    <div className="w-full md:w-[50%] lg:w-[58%] flex flex-col justify-center md:py-120">
                        <h2 ref={titleRef} className="section-heading flex items-center gap-3 text-secondary" >
                            {data.title}
                            <span className="relative w-fit inline-block overflow-hidden">
                                <span
                                    className={`absolute inset-0 bg-primary transform origin-left delay-200 transition-transform duration-1200 ease-out ${isActiveTitle ? "scale-x-100" : "scale-x-0"
                                        }`}
                                />
                                <span className="relative z-10 text-paragraph-2 px-[8px] py-[5px] inline-block">
                                    {data.highlightText}
                                </span>
                            </span>
                        </h2>

                        <motion.p
                            variants={moveUp(0.2)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="mt-[20px] lg:mt-[30px] section-description xl:max-w-[670px] 2xl:max-w-[877px] md:-tracking-[0.3px] lg:-tracking-normal"
                        >
                            {data.description}
                        </motion.p>
                    </div>

                    {/* RIGHT — full width mobile, 42% on lg+ */}
                    <div className="w-full md:w-[50%] lg:w-[42%] md:flex md:items-center">
                        <div className="w-full md:h-full lg:max-h-[508px]">
                            <div
                                ref={imageWrapperRef}
                                className="
                                    relative overflow-hidden w-full
                                    h-[280px] sm:h-[360px] lg:h-full 3xl:min-h-[508px]
                                    [clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
                                    sm:[clip-path:polygon(0_0,calc(100%-70px)_0,100%_70px,100%_100%,0_100%)]
                                    md:[clip-path:polygon(0_0,calc(100%-100px)_0,100%_100px,100%_100%,0_100%)]
                                    lg:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
                                    xl:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_65px,100%_100%,0_100%)]
                                    2xl:[clip-path:polygon(0_0,calc(100%-70px)_0,100%_70px,100%_100%,0_100%)]
                                "
                            >
                                <motion.div style={{ y }} className="w-full h-full">
                                    <Image
                                        src={data.image}
                                        alt={data.imageAlt ?? data.title}
                                        fill
                                        className="pointer-events-none md:object-contain lg:object-cover scale-[1.25]"
                                        priority
                                    />
                                </motion.div>

                                {/* Overlay */}
                                <div
                                    style={{
                                        background:
                                            "linear-gradient(179.84deg, rgba(0, 0, 0, 0) 55.5%, rgba(0, 0, 0, 0.245203) 77.26%, rgba(0, 0, 0, 0.5) 99.87%)",
                                    }}
                                    className="absolute inset-0"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
};

export default AboutVj;