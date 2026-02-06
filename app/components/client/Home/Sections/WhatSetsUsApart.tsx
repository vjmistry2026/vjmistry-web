"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { useRef, useState, useEffect } from "react";
import { whatSetsUsApartData } from "../data";
import { useContainerPadding } from "@/app/hooks/useContainerPadding";

import "swiper/css";

const WhatSetsUsApart = () => {
    const { heading, slides } = whatSetsUsApartData;
    const padding = useContainerPadding();

    const swiperRef = useRef<SwiperClass | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const SLIDES_PER_VIEW_DESKTOP = 3.3;

    const AUTOPLAY_DELAY = 4000;

    const getGroupStart = (index: number) => {
        const swiper = swiperRef.current;
        if (!swiper) return index;

        const slidesPerView = typeof swiper.params.slidesPerView === "number" ? swiper.params.slidesPerView : 1;

        return Math.floor(index / slidesPerView) * slidesPerView;
    };

    const isIndexVisible = (index: number) => {
        const swiper = swiperRef.current;
        if (!swiper) return true;

        const slidesPerView = typeof swiper.params.slidesPerView === "number" ? swiper.params.slidesPerView : 1;

        const start = swiper.activeIndex;
        const end = start + slidesPerView - 1;

        return index >= start && index <= end;
    };

    const startAutoplay = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setActiveIndex((prev) => {
                let next = prev + 1;

                if (next >= slides.length) {
                    swiperRef.current?.slideTo(0);
                    return 0;
                }

                if (!isIndexVisible(next)) {
                    swiperRef.current?.slideTo(getGroupStart(next + 1));
                }

                return next;
            });
        }, AUTOPLAY_DELAY);
    };

    useEffect(() => {
        startAutoplay();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [activeIndex]);

    return (
        <section className="bg-white py-[150px] overflow-hidden">
            <div>
                {/* HEADER */}
                <div className="container flex items-center justify-between mb-[60px]">
                    <h2 className="text-82 font-condensed leading-[100%] text-black">{heading}</h2>

                    {/* NAVIGATION */}
                    <div className="flex items-center gap-[20px]">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="border group border-border h-[64px] w-[64px] flex items-center justify-center hover:bg-primary transition-all duration-300"
                        >
                            <Image
                                src="/assets/icons/right-top-arrow-primary.svg"
                                alt="prev"
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
                                alt="next"
                                width={14}
                                height={14}
                                className="rotate-45 group-hover:invert group-hover:brightness-0 transition-all duration-300"
                            />
                        </button>
                    </div>
                </div>

                {/* SLIDER */}
                <Swiper
                    spaceBetween={0}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                        requestAnimationFrame(() => {
                            setActiveIndex(swiper.activeIndex);
                        });
                    }}
                    style={{ marginLeft: padding }}
                    className="!overflow-hidden !pr-[15px] !lg:pr-0"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2.2,
                        },
                        1024: {
                            slidesPerView: SLIDES_PER_VIEW_DESKTOP,
                        },
                    }}
                >
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <SwiperSlide key={slide.id}>
                                <div
                                    onMouseEnter={() => {
                                        requestAnimationFrame(() => {
                                            setActiveIndex(index);

                                            if (!isIndexVisible(index)) {
                                                swiperRef.current?.slideTo(getGroupStart(index));
                                            }

                                            startAutoplay();
                                        });
                                    }}
                                    className={`relative border-l border-y border-border overflow-hidden cursor-pointer ${index === slides.length - 1 ? "border-r" : ""}`}
                                >
                                    {/* BACKGROUND IMAGE */}
                                    <Image
                                        src={slide.bgImage}
                                        alt=""
                                        fill
                                        className={`object-cover transition-opacity duration-700 ${
                                            isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />

                                    {/* OVERLAY */}
                                    {isActive && <div className="absolute inset-0 bg-black/70" />}

                                    {/* CONTENT */}
                                    <div className="relative z-10 h-full p-[40px] flex flex-col gap-[60px]">
                                        {/* ICON */}
                                        <div className="relative h-[60px] w-[60px] overflow-hidden bg-black">
                                            {/* animated background */}
                                            <span
                                                className={`absolute inset-0 bg-primary origin-bottom transform transition-transform duration-500 ease-out ${
                                                    isActive ? "scale-y-100" : "scale-y-0"
                                                }`}
                                            />

                                            {/* icon */}
                                            <div className="relative z-10 h-full w-full flex items-center justify-center">
                                                <Image
                                                    src={slide.icon}
                                                    alt=""
                                                    width={34}
                                                    height={34}
                                                    className="object-contain w-[34px] h-[34px]"
                                                />
                                            </div>
                                        </div>

                                        {/* LINE + PROGRESS */}
                                        <div className="relative h-[2px] bg-black/30 overflow-hidden">
                                            {isActive && (
                                                <span
                                                    key={activeIndex}
                                                    className="absolute left-0 top-0 h-full w-full bg-primary animate-progress-bar-sets-apart"
                                                />
                                            )}
                                        </div>

                                        {/* TITLE */}
                                        <h3
                                            className={`text-32 font-condensed leading-[100%] ${isActive ? "text-white" : "text-black"}`}
                                        >
                                            {slide.title}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default WhatSetsUsApart;
