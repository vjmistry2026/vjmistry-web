"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useRef, useState } from "react";
import { HERO_SLIDES } from "../data";
import CustomButton from "@/app/components/client/common/CustomButton";
import AnimatedHeading from "../../common/AnimateHeading";
import HeroAnimatedHeading from "../../common/HeroAnimation";

export default function HeroSection() {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden">
            {/* Background Slider */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="absolute inset-0 z-0"
            >
                {HERO_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-screen w-full">
                            <Image src={slide.image} alt={slide.title} fill priority className="object-cover" />
                            <div className="absolute inset-0 bg-[#00000033]" />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)]" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="container h-full flex items-end pb-100 pointer-events-auto">
                    <div className="flex w-full flex-col lg:flex-row gap-[40px] lg:gap-0  lg:items-end justify-between">
                        {/* LEFT STATIC CONTENT */}
                        <div>
                            <HeroAnimatedHeading
                                tag="h1"
                                text="Engineering Excellence Built on Trust & Legacy"
                                className="text-75 3xl:text-85 font-condensed font-medium text-white leading-[120%] xl:max-w-[23ch]"
                            />

                            <p className="mt-[15px] lg:mt-[30px] font-nexa text-20 text-white/70 max-w-[51ch]">
                                Delivering reliable engineering, construction and industrial solutions with decades of
                                expertise, precision and commitment to quality.
                            </p>

                            <div className="mt-[30px] lg:mt-[60px] flex flex-col md:flex-row md:items-center gap-[15px] md:gap-[30px]">
                                <div>
                                    <CustomButton label="Explore Our Services" href="#" />
                                </div>

                                <div>
                                    <CustomButton label="Get in Touch" href="#" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SLIDER CONTROLLER */}
                        <div className="bg-[#FDFDFD21] w-full md:w-fit">
                            {/* Progress Loader */}
                            <div className="h-[2px] bg-[#D9D9D9] overflow-hidden">
                                <div
                                    key={activeIndex}
                                    className="h-full bg-primary animate-[hero-progress-bar_5.2s_linear]"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-[20px] lg:gap-[81px] p-[10px] 2xl:min-w-[454px]">
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-[50px] h-[40px] lg:w-[81px] lg:h-[75px] relative">
                                        <Image
                                            src={HERO_SLIDES[activeIndex].image}
                                            alt="thumb"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-20 font-nexa leading-[100%] text-white">
                                            {HERO_SLIDES[activeIndex].title}
                                        </p>
                                        <p className="text-15 font-nexa font-bold leading-[1.66] text-[#D9D9D9]/30">
                                            {activeIndex + 1}/{HERO_SLIDES.length}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mr-[6px]">
                                    <button onClick={() => swiperRef.current.slidePrev()} className="">
                                        <Image
                                            src="/assets/icons/right-top-arrow-primary.svg"
                                            alt="arrow-up-right"
                                            width={12.5}
                                            height={12.5}
                                            className="-rotate-135 invert brightness-0 hover:brightness-100 hover:invert-0 transition-colors duration-300"
                                        />
                                    </button>
                                    <button onClick={() => swiperRef.current.slideNext()} className="">
                                        <Image
                                            src="/assets/icons/right-top-arrow-primary.svg"
                                            alt="arrow-up-right"
                                            width={12.5}
                                            height={12.5}
                                            className="rotate-45 invert brightness-0 hover:brightness-100 hover:invert-0 transition-colors duration-300"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
