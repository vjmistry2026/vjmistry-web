"use client";

import Image from "next/image";
import { legacySectionData } from "../data";
import { useEffect, useRef, useState } from "react";
import Counter from "@/app/components/client/common/Counter";
import CustomButton from "@/app/components/client/common/CustomButton";

const LegacySection = () => {
    const { hero, stats } = legacySectionData;

    const [activeId, setActiveId] = useState<number | null>(null);
    const cardsWrapperRef = useRef<HTMLDivElement | null>(null);

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isActiveTitle, setIsActiveTitle] = useState(false);
    const titleRef = useRef<HTMLHeadingElement | null>(null);

useEffect(() => {
    const isAbove720 = window.innerWidth >= 720;

    // CLEANUP helper
    let observer: IntersectionObserver | null = null;

    if (isAbove720 && cardsWrapperRef.current) {
        // ✅ DESKTOP / TABLET (keep same behavior)
        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveId(2); // same as before
                    observer?.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(cardsWrapperRef.current);
    } else {
        // ✅ MOBILE (<720px) — per-card activation
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = Number(entry.target.getAttribute("data-id"));
                        setActiveId(id);
                    }
                });
            },
            {
                threshold: 0.5, // good balance for mobile
            }
        );

        cardRefs.current.forEach((el) => el && observer!.observe(el));
    }

    return () => {
        observer?.disconnect();
    };
}, []);


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
                rootMargin: "-20% 0px -20% 0px",
            },
        );

        observer.observe(titleRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-white pt-100 pb-100 lg:pb-150">
            <div className="container">
                {/* TOP SECTION */}
                {/* <div className="flex flex-col md:flex-row items-stretch lg:items-center gap-6 lg:gap-10 2xl:gap-[86px]"> */}
                <div className="flex flex-col md:flex-row items-stretch lg:items-center gap-6 lg:gap-[45px] xl:gap-[60px] 2xl:gap-18">

                    {/* LEFT – 48% */}
                    {/* <div className="w-full md:w-[50%] lg:w-[47%] xl:w-[46%] 2xl:w-[44%] overflow-hidden"> */}
                    <div className="w-fit md:max-w-[50%] overflow-hidden">

                        <h2
                            ref={titleRef}
                            className="text-60 lg:text-66 3xl:text-75 font-condensed flex flex-col leading-[100%] text-black"
                        >
                            {hero.title.normal}
                            <span className="relative mt-[8px] lg:mt-[14px] w-fit inline-block overflow-hidden">
                                {/* animated background */}
                                <span
                                    className={`absolute inset-0 bg-primary transform origin-left transition-transform duration-1200 ease-out ${
                                        isActiveTitle ? "scale-x-100" : "scale-x-0"
                                    }`}
                                />

                                {/* text */}
                                <span className="relative z-10 text-white px-[10px] py-[5px] inline-block tracking-[-0.7px] lg:tracking-[-0.5px]">
                                    {hero.title.highlight}
                                </span>
                            </span>
                        </h2>

                        <p className="text-paragraph mt-[20px] lg:mt-[30px] font-nexa font-bold text-20 leading-[1.5] xl:max-w-[670px] tracking-[-0.4px]">
                            {hero.description}
                        </p>
                        <div className="mt-[20px] lg:mt-[30px] xl:mt-[40px] 2xl:mt-15">
                            <CustomButton
                                label={hero.primaryButton.label}
                                href={hero.primaryButton.href}
                                textColor="black"
                            />
                        </div>
                    </div>

                    {/* RIGHT – 53% */}
                    {/* <div className="w-full md:w-[50%] lg:w-[53%] xl:w-[54%] 2xl:w-[56%] relative"> */}
                    <div className="flex-1 relative flex">

                        <div
                            className="
    relative overflow-hidden
    [clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,0_100%)]
    sm:[clip-path:polygon(0_0,calc(100%-50px)_0,100%_50px,100%_100%,0_100%)]
    md:[clip-path:polygon(0_0,calc(100%-60px)_0,100%_60px,100%_100%,0_100%)]
    lg:[clip-path:polygon(0_0,calc(100%-75px)_0,100%_75px,100%_100%,0_100%)]
    xl:[clip-path:polygon(0_0,calc(100%-85px)_0,100%_85px,100%_100%,0_100%)]
    2xl:[clip-path:polygon(0_0,calc(100%-90px)_0,100%_90px,100%_100%,0_100%)]
  "
                        >
                            <Image
                                src={hero.image.src}
                                alt={hero.image.alt}
                                width={836}
                                height={707}
                                className="w-full h-full object-cover"
                                priority
                            />
                            <div
                                style={{
                                    background:
                                        "linear-gradient(181.25deg, rgba(0, 0, 0, 0) 1.03%, rgba(0, 0, 0, 0.245203) 49.04%, rgba(0, 0, 0, 0.5) 98.94%)",
                                }}
                                className="absolute inset-0"
                            />
                            <Image
                                src="/assets/icons/vj-legacy-svg.svg"
                                alt="vj-legacy-svg"
                                width={673}
                                height={318}
                                className="absolute bottom-0 left-0"
                            />
                        </div>
                    </div>
                </div>

                {/* STATS CARDS */}
                <div ref={cardsWrapperRef} className="mt-100 lg:mt-150 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 2xl:gap-[51px]">
                    {stats.map((item, index) => {
                        const isActive = activeId === item.id;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                data-id={item.id}
                                onMouseEnter={() => setActiveId(item.id)}
                                className="relative overflow-hidden p-6  2xl:p-10 sm:max-w-[367px] 2xl:min-h-[385px]
  transition-all duration-500
  [clip-path:polygon(0_0,calc(100%-45px)_0,100%_50px,100%_100%,0_100%)]
  bg-[#F9F9F9]"
                            >
                                <div
                                    className={`absolute inset-0
  bg-[linear-gradient(180deg,#ED1C24_0%,#A71E22_100%)]
  transition-transform duration-500 ease-out
  ${isActive ? "translate-y-0" : "translate-y-full"}`}
                                />

                                {/* Top-right decorative SVG */}
                                <Image
                                    src="/assets/images/home/legacy/card-icons/legacy-card-svg.svg"
                                    alt="legacy"
                                    width={367}
                                    height={162}
                                    className={`absolute left-0 top-0 transition-all duration-300
                    ${isActive ? "opacity-100" : "opacity-0"}`}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        width={38}
                                        height={46}
                                        className={`transition ${isActive ? "invert brightness-0" : ""}`}
                                    />

                                    <h3
                                        className={`mt-[92px] xl:mt-[65px] 2xl:mt-[92px] text-75 md:text-60 xl:text-75 font-condensed leading-[100%] mb-[18px] ${isActive ? "text-white" : "text-black"}`}
                                    >
                                        <Counter to={item.value} duration={2} suffix="+" />
                                    </h3>

                                    <p
                                        className={`text-20 max-w-[230px] font-nexa font-bold leading-[1.5] ${isActive ? "text-[#D9D9D9]" : "text-[#7D7D7D]"}`}
                                    >
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LegacySection;
