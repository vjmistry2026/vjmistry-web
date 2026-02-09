"use client";

import Image from "next/image";
import { expertiseSectionData } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import CustomButton from "@/app/components/client/common/CustomButton";
import { useContainerPadding } from "@/app/hooks/useContainerPadding";

const ExpertiseSection = () => {
    const containerPadding = useContainerPadding();
    const { heading, description, slides } = expertiseSectionData;

    const swiperRef = useRef<any>(null);
    const [progress, setProgress] = useState(0);

    return (
        <section className="bg-[#1C1C1C] py-100 lg:py-130">
            <div>
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-end items-start justify-between mb-[40px] lg:mb-[60px] gap-[20px] container">
                    <div className="w-full">
                        <h2 className="text-75 font-condensed leading-[100%] mb-[20px] lg:mb-[30px] text-white">
                            {heading}
                        </h2>
                        <p className="text-20 max-w-[590px] font-nexa font-bold text-white/70 leading-[1.5]">
                            {description}
                        </p>
                    </div>

                    {/* STATIC BUTTONS */}
                    <div className="flex w-full items-center justify-between lg:justify-end">
                        <div>
                            <CustomButton label="View All Services" href="#" textColor="#FDFDFD" />
                        </div>
                        <div className="flex lg:hidden items-center justify-center gap-[10px]">
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
                        </div>
                    </div>
                </div>

                {/* SLIDER */}
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onProgress={(swiper) => setProgress(swiper.progress)}
                    spaceBetween={20}
                    slidesPerView={1.2} // default (mobile)
                    breakpoints={{
                        640: {
                            slidesPerView: 1.3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2.7,
                        },
                    }}
                    className="mb-[25px] lg:mb-[40px] !pr-[15px] !lg:pr-0"
                    style={{ paddingLeft: containerPadding }}
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            {/* <div className="group relative overflow-hidden cursor-pointer [clip-path:polygon(0_0,calc(100%-78px)_0,100%_65px,100%_100%,0_100%)] 2xl:min-h-[463px]"> */}
                            <div
                                className="
    group relative overflow-hidden cursor-pointer

    [clip-path:polygon(0_0,calc(100%-45px)_0,100%_45px,100%_100%,0_100%)]

    md:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_50px,100%_100%,0_100%)]

    lg:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_55px,100%_100%,0_100%)]

    xl:[clip-path:polygon(0_0,calc(100%-72px)_0,100%_60px,100%_100%,0_100%)]

    2xl:[clip-path:polygon(0_0,calc(100%-78px)_0,100%_65px,100%_100%,0_100%)]

    2xl:min-h-[463px]
  "
                            >
                                {/* Image */}
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    width={520}
                                    height={463}
                                    className="w-full h-[260px] md:h-[340px] lg:h-[420px] 2xl:h-full object-cover"
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
        absolute bottom-[20px] lg:bottom-[50px] left-[20px] lg:left-[50px] leading-[120%]
        text-32 font-condensed max-w-[300px] text-[#FDFDFD]
        transition-all duration-500 ease-out
        group-hover:translate-y-[20px]
        group-hover:opacity-0
      "
                                >
                                    {slide.title}
                                </h3>

                                {/* HOVER TITLE BOX */}
                                <div
                                    className="
        absolute bottom-[20px] lg:bottom-[50px] left-[20px] lg:left-[50px]
        flex items-center justify-between
        bg-white w-[calc(100%-50px)] lg:w-[calc(100%-100px)]
        px-[20px] py-[20px] lg:py-[30px]
        transition-all duration-500 ease-out
        translate-y-[60px] opacity-0
        group-hover:translate-y-0 group-hover:opacity-100
      "
                                >
                                    <span className="max-w-[300px] leading-[120%] font-condensed text-32 text-black">
                                        {slide.title}
                                    </span>

                                    <span className="flex h-[64px] w-[64px] items-center justify-center bg-primary">
                                        <Image
                                            src="/assets/icons/right-top-arrow-white.svg"
                                            alt="arrow"
                                            width={14}
                                            height={14}
                                        />
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* PAGINATION BAR */}
                <div className="flex justify-center lg:mb-[20px] container">
                    <div className="relative w-[265px] lg:w-[484px] h-[4px] bg-[#3A3A3A]">
                        <span
                            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </div>

                {/* NAVIGATION */}
                <div className="hidden lg:flex items-center justify-center gap-[20px]">
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
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
