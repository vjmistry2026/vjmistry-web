"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { useRef, useState, useEffect } from "react";
import { whatSetsUsApartData } from "../data";

import "swiper/css";
import AnimatedHeading from "../../common/AnimateHeading";
import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
import SliderNavButton from "../../common/NavigationButton";

const WhatSetsUsApart = ({ data }: { data: HomeType['fourthSection'] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftInset = useContainerLeftInset(containerRef);
    // const { heading, slides } = whatSetsUsApartData;
    const heading = data.title
    const slides = data.items

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
                const next = prev + 1 >= slides.length ? 0 : prev + 1;

                requestAnimationFrame(() => {
                    if (next === 0) {
                        swiperRef.current?.slideTo(0);
                    } else if (!isIndexVisible(next)) {
                        swiperRef.current?.slideTo(getGroupStart(next + 1));
                    }
                });

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
        <section className="bg-white py-100 lg:py-130 3xl:py-150 overflow-hidden">
            <div>
                {/* HEADER */}
                <div ref={containerRef} className="container flex items-center justify-between mb-[20px] lg:mb-[60px]">
                    <AnimatedHeading
                        color="black"
                        text={heading}
                    />

                    {/* NAVIGATION */}
                    <motion.div variants={moveUp(0.35)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-[10px] lg:gap-[20px]">
                        <SliderNavButton direction="left" onClick={() => swiperRef.current?.slidePrev()} />
                        <SliderNavButton direction="right" onClick={() => swiperRef.current?.slideNext()} />
                    </motion.div>
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
                    style={{ marginLeft: leftInset }}
                    className="!overflow-hidden !pr-[15px] !lg:pr-0"
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 1.3 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: SLIDES_PER_VIEW_DESKTOP },
                    }}
                >
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <SwiperSlide key={index}>
                                <motion.div
                                    variants={moveUp(index * 0.4)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    onMouseEnter={() => {
                                        requestAnimationFrame(() => {
                                            setActiveIndex(index);
                                            if (!isIndexVisible(index)) {
                                                swiperRef.current?.slideTo(getGroupStart(index));
                                            }
                                            startAutoplay();
                                        });
                                    }}
                                    className={`relative border-l border-y border-border overflow-hidden cursor-pointer 3xl:min-h-[356px] ${index === slides.length - 1 ? "border-r" : ""}`}
                                >
                                    {/* BACKGROUND IMAGE
                                        When active: fades in + slowly drifts (scale + translate)
                                        giving a subtle Ken Burns feel over the autoplay duration */}
                                    <Image
                                        key={isActive ? "active" : "inactive"}
                                        src={slide.image}
                                        alt={slide.imageAlt}
                                        fill
                                        className={`object-cover transition-opacity duration-800 ${isActive ? "opacity-100" : "opacity-0"}`}
                                        style={isActive ? { animation: "kenBurns 4000ms linear forwards" } : undefined}
                                    />

                                    {/* OVERLAY */}
                                    <div className={`absolute inset-0 bg-black/70 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`} />

                                    {/* CONTENT */}
                                    <div className="relative z-10 h-full p-[25px] md:p-[30px] xl:p-[40px] flex flex-col gap-[60px]">
                                        {/* ICON */}
                                        <div className="relative h-[60px] w-[60px] overflow-hidden bg-secondary">
                                            <span
                                                className={`absolute inset-0 bg-primary origin-bottom transform transition-transform duration-500 ease-out ${isActive ? "scale-y-100" : "scale-y-0"
                                                    }`}
                                            />
                                            <div className="relative z-10 h-full w-full flex items-center justify-center">
                                                <Image
                                                    src={slide.logo}
                                                    alt={slide.logoAlt}
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
                                        <h3 className={`text-32 font-condensed leading-[100%] ${isActive ? "text-paragraph-2" : "text-secondary"}`}>
                                            {slide.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default WhatSetsUsApart;