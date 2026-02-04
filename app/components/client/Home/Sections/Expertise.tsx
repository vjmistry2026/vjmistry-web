"use client";

import Image from "next/image";
import { expertiseSectionData } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import CustomButton from "@/app/components/common/CustomButton";
import { useContainerPadding } from "@/app/hooks/useContainerPadding";

const ExpertiseSection = () => {
    const containerPadding = useContainerPadding();
    const { heading, description, slides } = expertiseSectionData;

    const swiperRef = useRef<any>(null);
    const [progress, setProgress] = useState(0);

    return (
        <section className="bg-[#1C1C1C] py-[130px]">
            <div>
                {/* HEADER */}
                <div className="flex items-end justify-between mb-[60px] container">
                    <div>
                        <h2 className="text-75 font-condensed leading-[100%] mb-[30px] text-white">{heading}</h2>
                        <p className="text-20 max-w-[590px] font-nexa font-bold text-white/70 leading-[1.5]">{description}</p>
                    </div>

                    {/* STATIC BUTTONS */}
                    <div>
                        <CustomButton label="View All Services" href="#" textColor="#FDFDFD" />
                    </div>
                </div>

                {/* SLIDER */}
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onProgress={(swiper) => setProgress(swiper.progress)}
                    spaceBetween={40}
                    slidesPerView={2.7}
                    className="mb-[40px]"
                    style={{ paddingLeft: containerPadding }}
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="group relative overflow-hidden [clip-path:polygon(0_0,calc(100%-60px)_0,100%_55px,100%_100%,0_100%)]">
                                {/* Image */}
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    width={520}
                                    height={420}
                                    className="w-full h-[420px] object-cover"
                                />

                                {/* Dark overlay */}
                                <div style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 15.01%, rgba(0, 0, 0, 0.5) 100%)" }} className="absolute inset-0" />

                                {/* DEFAULT TITLE */}
                                <h3
                                    className="
        absolute bottom-[50px] left-[50px]
        text-32 font-condensed max-w-[270px] text-[#FDFDFD]
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
        absolute bottom-[50px] left-[50px]
        flex items-center justify-between
        bg-white w-[calc(100%-100px)]
        px-[20px] py-[30px]
        transition-all duration-500 ease-out
        translate-y-[60px] opacity-0
        group-hover:translate-y-0 group-hover:opacity-100
      "
                                >
                                    <span className="max-w-[270px] leading-[100%] font-condensed text-32 text-black">{slide.title}</span>

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
                <div className="flex justify-center mb-[20px]">
                    <div className="relative w-[484px] h-[4px] bg-[#3A3A3A]">
                        <span
                            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </div>

                {/* NAVIGATION */}
                <div className="flex items-center justify-center gap-[20px]">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="border group border-border h-[64px] w-[64px] flex items-center justify-center hover:bg-primary transition-all duration-300"
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
                        className="border group border-border h-[64px] w-[64px] flex items-center justify-center hover:bg-primary transition-all duration-300"
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
