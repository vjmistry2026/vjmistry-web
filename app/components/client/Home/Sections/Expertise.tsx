"use client";

import Image from "next/image";
import { expertiseSectionData } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import CustomButton from "@/app/components/client/common/CustomButton";
import AnimatedHeading from "../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";

const ExpertiseSection = () => {
    const { heading, description, slides } = expertiseSectionData;
    const containerRef = useRef<HTMLDivElement>(null);
    const leftInset = useContainerLeftInset(containerRef);

    const swiperRef = useRef<any>(null);
    const [progress, setProgress] = useState(0);

    return (
        <section className="bg-[#1C1C1C] py-100 lg:py-130">
            <div>
                {/* HEADER */}
                <div
                    ref={containerRef}
                    className="container flex flex-col lg:flex-row lg:items-end items-start justify-between mb-[40px] lg:mb-[60px] gap-[20px]"
                >
                    <div className="w-full">
                        <AnimatedHeading
                            tag="h2"
                            text={heading}
                            className="text-60 lg:text-66 3xl:text-75 font-condensed leading-[100%] mb-[20px] lg:mb-[30px] text-white"
                        />

                        <motion.p
                            variants={moveUp(0.35)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-20 max-w-[590px] font-nexa font-bold text-white/70 leading-[1.5]"
                        >
                            {description}
                        </motion.p>
                    </div>

                    {/* STATIC BUTTONS */}
                    <div className="flex w-full items-center justify-between lg:justify-end">
                        <motion.div variants={moveUp(0.35)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <CustomButton label="View All Services" href="#" textColor="#FDFDFD" />
                        </motion.div>
                        <motion.div
                            variants={moveUp(0.35)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex lg:hidden items-center justify-center gap-[10px]"
                        >
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="border group border-border h-[44px] sm:h-[52px] lg:h-[64px] w-[44px] sm:w-[52px] lg:w-[64px] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                            >
                                <Image
                                    src="/assets/icons/right-top-arrow-primary.svg"
                                    alt="arrow"
                                    width={14}
                                    height={14}
                                    className="-rotate-135 group-hover:invert group-hover:brightness-0 transition-all duration-300 w-[10px] h-[10px] object-contain lg:w-[14px] lg:h-[14px]"
                                />
                            </button>
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className="border group border-border h-[44px] sm:h-[52px] lg:h-[64px] w-[44px] sm:w-[52px] lg:w-[64px] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                            >
                                <Image
                                    src="/assets/icons/right-top-arrow-primary.svg"
                                    alt="arrow"
                                    width={14}
                                    height={14}
                                    className="rotate-45 group-hover:invert group-hover:brightness-0 transition-all duration-300 w-[10px] h-[10px] object-contain lg:w-[14px] lg:h-[14px]"
                                />
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* SLIDER */}
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onProgress={(swiper) => setProgress(swiper.progress)}
                    spaceBetween={20}
                    slidesPerView={1.04}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.1,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 2.3,
                            spaceBetween: 25,
                        },
                        1480: {
                            slidesPerView: 2.7,
                            spaceBetween: 30,
                        },
                        1620: {
                            slidesPerView: 2.7,
                            spaceBetween: 40,
                        },
                    }}
                    className="mb-[25px] lg:mb-[40px] !pr-[15px] !lg:pr-0"
                    style={{ marginLeft: leftInset }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                            <motion.div
                                variants={moveUp(index * 0.3)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="
      group relative overflow-hidden cursor-pointer
      [clip-path:polygon(0_0,calc(100%-45px)_0,100%_45px,100%_100%,0_100%)]
      md:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_50px,100%_100%,0_100%)]
      lg:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_55px,100%_100%,0_100%)]
      xl:[clip-path:polygon(0_0,calc(100%-72px)_0,100%_60px,100%_100%,0_100%)]
      2xl:[clip-path:polygon(0_0,calc(100%-78px)_0,100%_65px,100%_100%,0_100%)]
      3xl:min-h-[463px] 3xl:min-w-[633px]
    "
                            >
                                {/* Image */}
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    width={520}
                                    height={463}
                                    className="w-full h-[260px] md:h-[340px] lg:h-[420px] 2xl:h-full 3xl:min-h-[463px] 3xl:min-w-[633px] object-cover"
                                />

                                {/* Dark overlay */}
                                <div
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(0, 0, 0, 0) 15.01%, rgba(0, 0, 0, 0.5) 100%)",
                                    }}
                                    className="absolute inset-0"
                                />

                                {/* DEFAULT TITLE */}
                                <h3
                                    className="
        absolute bottom-[25px] lg:bottom-[50px] left-[25px] lg:left-[50px]
        text-30 md:text-32 font-condensed leading-[120%]
        max-w-[300px] text-[#FDFDFD]
        transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]
        translate-y-0
        group-hover:translate-y-[200%]
      "
                                >
                                    {slide.title}
                                </h3>

                                {/* WHITE BOX (SAME LEFT & BOTTOM) */}
                                <div
                                    className="
        absolute bottom-[25px] lg:bottom-[50px] left-[25px] lg:left-[50px]
        w-[calc(100%-50px)] lg:w-[calc(100%-100px)]
        flex items-center justify-between
        bg-white
        px-[20px] py-[10px] lg:py-[20px]
        transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]
        translate-y-[200%]
        group-hover:translate-y-0
      "
                                >
                                    <span className="max-w-[300px] leading-[120%] font-condensed text-30 md:text-32 text-black">
                                        {slide.title}
                                    </span>

                                    <span className="flex h-[40px] w-[40px] md:h-[64px] md:w-[64px] items-center justify-center bg-primary flex-shrink-0">
                                        <Image
                                            src="/assets/icons/right-top-arrow-white.svg"
                                            alt="arrow"
                                            width={14}
                                            height={14}
                                        />
                                    </span>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* PAGINATION BAR */}
                <motion.div
                    variants={moveUp(0.45)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex justify-center lg:mb-[20px] container"
                >
                    <div className="relative w-[265px] lg:w-[484px] h-[4px] bg-[#3A3A3A]">
                        <span
                            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </motion.div>

                {/* NAVIGATION */}
                <motion.div
                    variants={moveUp(0.5)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="hidden lg:flex items-center justify-center gap-[20px]"
                >
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="cursor-pointer border group border-border h-[50px] w-[50px] lg:h-[64px] lg:w-[64px] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                        <Image
                            src="/assets/icons/right-top-arrow-primary.svg"
                            alt="arrow"
                            width={14}
                            height={14}
                            className="-rotate-135 group-hover:invert group-hover:brightness-0 transition-all duration-300"
                        />
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="cursor-pointer border group border-border h-[50px] w-[50px] lg:h-[64px] lg:w-[64px] flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                        <Image
                            src="/assets/icons/right-top-arrow-primary.svg"
                            alt="arrow"
                            width={14}
                            height={14}
                            className="rotate-45 group-hover:invert group-hover:brightness-0 transition-all duration-300"
                        />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
