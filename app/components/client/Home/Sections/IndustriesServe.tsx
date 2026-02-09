"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { industriesData } from "../data";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useContainerPadding } from "@/app/hooks/useContainerPadding";

gsap.registerPlugin(ScrollTrigger);

const IndustriesWeServe = () => {
    const { heading, description, items } = industriesData;
    const containerPadding = useContainerPadding();
    const sectionRef = useRef<HTMLElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const getNavbarHeight = () => {
        const nav = document.querySelector(".site-navbar") as HTMLElement | null;
        return nav?.offsetHeight ?? 0;
    };

    useEffect(() => {
        const section = sectionRef.current;
        const scrollEl = scrollRef.current;
        if (!section || !scrollEl) return;

        const navbarHeight = getNavbarHeight();

        const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
    const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;

    const ctx = gsap.context(() => {
        gsap.to(scrollEl, {
            scrollTop: scrollHeight,
            ease: "power1.out",
            scrollTrigger: {
                trigger: section,
                start: () => `top ${getNavbarHeight()}px`,
                end: `+=${scrollHeight}`,
                pin: true,
                pinType: "fixed", // ✅ THIS FIXES THE JERK
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    }, section);

    return () => ctx.revert();
});



        return () => mm.revert();
    }, []);

    return (
        // <section ref={sectionRef} className="h-screen bg-[#1C1C1C] overflow-hidden">
        <section ref={sectionRef} className="bg-[#1C1C1C] overflow-visible lg:h-screen lg:overflow-hidden">
            <div
                style={{
                    paddingLeft: containerPadding,
                }}
                className="h-full flex lg:flex-row flex-col justify-start"
            >
                {/* LEFT */}
                <div className="w-full lg:w-[45%] flex flex-col justify-start pt-100 lg:pt-150 2xl:pt-[191px] lg:pr-[66px] mb-[32px] lg:mb-[0px]">
                    <h2 className="text-60 lg:text-66 3xl:text-75 text-[#FDFDFD] font-condensed leading-[100%] mb-[30px]">{heading}</h2>
                    <p className="text-20 font-nexa font-bold leading-[1.5] text-[#FDFDFD]/70 max-w-[730px]">
                        {description}
                    </p>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-[55%] relative">
                    {/* Vertical faded line */}
                    {/* <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" /> */}
                    <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/70 to-transparent lg:left-0 lg:top-0 lg:h-full lg:w-px lg:bg-gradient-to-b" />

                    {/* Scrollable column */}
                    {/* <div ref={scrollRef} className="h-full py-8 lg:py-10 overflow-hidden"> */}
                    <div ref={scrollRef} className="h-full py-8 lg:py-10 overflow-y-auto lg:overflow-hidden">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-[20px] lg:gap-[30px] xl:gap-[40px] first:pt-[0px] last:pb-[0px] py-[30px] xl:py-[40px] last:border-b-0 border-b border-white/20"
                            >
                                <div
                                    style={{ paddingRight: containerPadding }}
                                    className="flex lg:flex-row flex-col items-center gap-[30px] xl:gap-[40px] lg:pl-[30px] xl:pl-[40px]"
                                >
                                    {/* Image */}
                                    <div className="w-full h-[250px] lg:h-[220px] lg:w-[220px] xl:w-[250px] xl:h-[250px] 2xl:w-[350px] 2xl:h-[350px] relative shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    {/* Content */}
                                    <div className="flex flex-col gap-[20px] xl:gap-[30px]">
                                        <div className="flex flex-row lg:flex-col gap-[20px] items-center lg:items-start xl:gap-[30px]">
                                            <Image
                                                src={item.icon}
                                                alt=""
                                                width={38}
                                                height={47}
                                                priority
                                                className="w-[30px] h-[35px] xl:w-[38px] xl:h-[47px]"
                                            />
                                            <h3 className="text-32 text-[#FDFDFD] leading-[110%] font-condensed">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-20 font-nexa font-bold text-[#FDFDFD]/70 leading-[1.5]">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustriesWeServe;
