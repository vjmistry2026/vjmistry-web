"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { HERO_SLIDES } from "../data";
import CustomButton from "@/app/components/client/common/CustomButton";
import HeroAnimatedHeading from "../../common/HeroAnimation";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { moveLeft, moveUp } from "@/app/components/motionVariants";

const animateOutgoingCollapse = (prevImage: string | null, container: HTMLElement, isMobile: boolean) => {
    if (!prevImage) return;

    // Overlay
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.zIndex = "20";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.overflow = "hidden";
    overlay.style.opacity = "0";

    container.appendChild(overlay);

    // Image wrapper (this is what collapses)
    const imageWrap = document.createElement("div");
    imageWrap.style.width = "100%";
    imageWrap.style.height = "100%";
    imageWrap.style.overflow = "hidden";
    imageWrap.style.transformOrigin = "center center";
    imageWrap.style.willChange = "transform, width";

    imageWrap.innerHTML = `
        <img src="${prevImage}"
            style="width:100%; height:100%; object-fit:cover;" />
        <div style="position:absolute; inset:0; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20.98%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));"></div>
    `;

    overlay.appendChild(imageWrap);

    // Ensure first paint
    requestAnimationFrame(() => {
        gsap.timeline({
            onComplete: () => overlay.remove(),
        })
            // fade overlay in (kills jump)
            .to(overlay, {
                opacity: 1,
                duration: 0.12,
                ease: "power1.out",
            })
            // scale down

            .to(imageWrap, {
                scaleX: 0.85,
                scaleY: isMobile ? 0.5 : 0.75,
                duration: 1.2,
                ease: "power3.out",
            })
            // collapse from both sides to center
            .to(imageWrap, {
                width: 0,
                duration: 1,
                ease: "power4.out",
            });
    });
};

export default function HeroSection() {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const prevImageRef = useRef<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section className="relative h-[100dvh] md:h-[90dvh] lg:h-[100dvh] w-full overflow-hidden">
            {/* Background Slider */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    prevImageRef.current = HERO_SLIDES[swiper.realIndex].image;
                }}
                onBeforeTransitionStart={(swiper) => {
                    animateOutgoingCollapse(prevImageRef.current, swiper.el, isMobile);
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                onSlideChangeTransitionEnd={(swiper) => {
                    prevImageRef.current = HERO_SLIDES[swiper.realIndex].image;
                }}
                className="absolute inset-0 z-0"
            >
                {HERO_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-screen w-full hero-slide">
                            <Image src={slide.image} alt={slide.title} fill priority className="object-cover pointer-events-none" />
                            <div style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 20.98%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))"}} className="absolute inset-0" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="container h-full flex items-end pb-100 pointer-events-auto">
                    <div className="w-full">
                        <HeroAnimatedHeading
                            tag="h1"
                            text="Engineering Excellence Built on Trust & Legacy"
                            className="text-75 3xl:text-85 font-condensed font-medium text-white leading-[120%] max-w-[23ch]"
                        />
                        <div className="w-full flex lg:flex-row flex-col gap-10 lg:gap-0 2xl:gap-10 justify-between lg:items-end">
                            {/* LEFT STATIC CONTENT */}
                            <div>
                                <motion.p
                                    variants={moveLeft(0.8)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="mt-[15px] lg:mt-[30px] font-nexa text-20 text-white/70 max-w-[51ch]"
                                >
                                    Delivering reliable engineering, construction and industrial solutions with decades of
                                    expertise, precision and commitment to quality.
                                </motion.p>
                                <motion.div
                                    variants={moveUp(1.2)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="mt-[30px] lg:mt-[60px] flex flex-col xl:flex-row xl:items-center gap-[15px] xl:gap-[30px]"
                                >
                                    <motion.div
                                        variants={moveUp(1.4)}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                    >
                                        <CustomButton label="Explore Our Services" href="#" textColor="white" />
                                    </motion.div>
                                    <motion.div
                                        variants={moveUp(1.6)}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                    >
                                        <CustomButton label="Get in Touch" href="#" textColor="white" />
                                    </motion.div>
                                </motion.div>
                            </div>
                            {/* RIGHT SLIDER CONTROLLER */}
                            <motion.div
                                variants={moveUp(1.8)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="bg-[#FDFDFD21] w-full xl:w-fit max-w-[454px] h-fit"
                            >
                                {/* Progress Loader */}
                                <div className="h-[2px] bg-[#D9D9D9] overflow-hidden">
                                    <div
                                        key={activeIndex}
                                        className="h-full bg-primary animate-[hero-progress-bar_5.2s_linear]"
                                    />
                                </div>
                                <div className="flex items-center justify-between xl:gap-10 2xl:gap-[81px] p-[10px] 3xl:min-w-[454px]">
                                    <div className="flex items-center gap-[10px]">
                                        <div className="w-[50px] h-[40px] md:w-[60px] md:h-[50px] lg:w-[81px] lg:h-[75px] relative overflow-hidden">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={HERO_SLIDES[activeIndex].image}
                                                    initial={{ opacity: 0.2 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0.4 }}
                                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                                    className="absolute inset-0"
                                                >
                                                    <Image
                                                        src={HERO_SLIDES[activeIndex].image}
                                                        alt="thumb"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                        <div className="flex-1">
                                            <div className="overflow-hidden">
                                                <AnimatePresence mode="wait">
                                                    <motion.p
                                                        key={activeIndex}
                                                        variants={moveUp(0.1)}
                                                        initial="hidden"
                                                        animate="show"
                                                        exit={{ opacity: 0, y: -8 }}
                                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                                        className="text-20 font-nexa leading-[100%] text-paragraph-2 min-w-[220px] lg:mb-[11px]"
                                                    >
                                                        {HERO_SLIDES[activeIndex].title}
                                                    </motion.p>
                                                </AnimatePresence>
                                            </div>
                                            <p className="text-15 font-nexa font-bold leading-[1.66] text-[#D9D9D9]/30">
                                                {activeIndex + 1}/{HERO_SLIDES.length}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mr-[6px] flex-shrink-0">
                                        <button onClick={() => swiperRef.current.slidePrev()} className="">
                                            <Image
                                                src="/assets/icons/right-top-arrow-primary.svg"
                                                alt="arrow-up-right"
                                                width={12.5}
                                                height={12.5}
                                                className="-rotate-135 w-[10px] h-[10px] lg:w-[12.5px] lg:h-[12.5px] invert brightness-0 hover:brightness-100 hover:invert-0 transition-all duration-400"
                                            />
                                        </button>
                                        <button onClick={() => swiperRef.current.slideNext()} className="">
                                            <Image
                                                src="/assets/icons/right-top-arrow-primary.svg"
                                                alt="arrow-up-right"
                                                width={12.5}
                                                height={12.5}
                                                className="rotate-45 w-[10px] h-[10px] lg:w-[12.5px] lg:h-[12.5px] invert brightness-0 hover:brightness-100 hover:invert-0 transition-all duration-400"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
