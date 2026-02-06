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

        const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;

        const ctx = gsap.context(() => {
            gsap.to(scrollEl, {
                scrollTop: scrollHeight,
                ease: "power1.out", // 🔥 smooth easing
                scrollTrigger: {
                    trigger: section,
                    start: `top-=${navbarHeight} top`,
                    end: `+=${scrollHeight}`,
                    pin: true,
                    scrub: 0.6, // 🔥 smooth inertia (key part)
                    anticipatePin: 1.5,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen bg-[#1C1C1C] overflow-hidden">
            <div
                style={{
                    paddingLeft: containerPadding,
                }}
                className="h-full flex px-[15px] lg:px-0"
            >
                {/* LEFT */}
                <div className="w-[47%] flex flex-col justify-start pt-[191px] pr-[66px]">
                    <h2 className="text-75 text-[#FDFDFD] font-condensed leading-[100%] mb-[30px]">{heading}</h2>
                    <p className="text-20 font-nexa font-bold leading-[1.5] text-[#FDFDFD]/70 max-w-[710px]">
                        {description}
                    </p>
                </div>

                {/* RIGHT */}
                <div className="w-[53%] relative">
                    {/* Vertical faded line */}
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />

                    {/* Scrollable column */}
                    <div ref={scrollRef} className="h-full py-10 overflow-hidden">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-[40px] first:pt-[0px] last:pb-[0px] py-[40px] last:border-b-0 border-b border-white/20"
                            >
                                <div
                                    style={{ paddingRight: containerPadding }}
                                    className="flex items-center gap-[40px] pl-[40px]"
                                >
                                    {/* Image */}
                                    <div className="w-[350px] h-[350px] relative shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    {/* Content */}
                                    <div className="flex flex-col gap-[30px]">
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            width={38}
                                            height={47}
                                            priority
                                            className="w-[38px] h-[47px]"
                                        />
                                        <h3 className="text-32 text-[#FDFDFD] leading-[100%] font-condensed">
                                            {item.title}
                                        </h3>
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
