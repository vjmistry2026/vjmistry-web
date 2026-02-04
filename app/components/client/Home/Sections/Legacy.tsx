"use client";

import Image from "next/image";
import Link from "next/link";
import { legacySectionData } from "../data";
import { useEffect, useRef, useState } from "react";
import Counter from "@/app/components/common/Counter";
import CustomButton from "@/app/components/common/CustomButton";

const LegacySection = () => {
    const { hero, stats } = legacySectionData;

    const [activeId, setActiveId] = useState<number | null>(null);
    const cardsWrapperRef = useRef<HTMLDivElement | null>(null);

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop && cardsWrapperRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveId(2);
                        observer.disconnect();
                    }
                },
                { threshold: 0.3 },
            );

            observer.observe(cardsWrapperRef.current);
            return () => observer.disconnect();
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = Number(entry.target.getAttribute("data-id"));
                        setActiveId(id);
                    }
                });
            },
            { threshold: 0.6 },
        );

        cardRefs.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-white pt-[100px] pb-[150px]">
            <div className="container">
                {/* TOP SECTION */}
                <div className="flex items-center gap-10">
                    {/* LEFT – 48% */}
                    <div className="w-[47%]">
                        <h2 className="text-75 font-condensed flex flex-col leading-[100%] text-black">
                            {hero.title.normal}
                            <span className="text-white bg-primary px-[10px] py-[5px] mt-[14px] w-fit inline-block">
                                {hero.title.highlight}
                            </span>
                        </h2>

                        <p className="text-paragraph mt-[30px] font-nexa font-bold text-20 leading-[1.5] max-w-[700px]">
                            {hero.description}
                        </p>
                        <div className="mt-15">
                            <CustomButton
                                label={hero.primaryButton.label}
                                href={hero.primaryButton.href}
                                textColor="black"
                            />
                        </div>
                    </div>

                    {/* RIGHT – 53% */}
                    <div className="w-[53%] relative">
                        <div className="relative overflow-hidden [clip-path:polygon(0_0,calc(100%-90px)_0,100%_90px,100%_100%,0_100%)]">
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
                <div ref={cardsWrapperRef} className="mt-[150px] grid grid-cols-1 md:grid-cols-4 gap-[51px]">
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
                                className="relative overflow-hidden p-10 max-w-[367px]
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
                                        className={`mt-[92px] text-75 font-condensed leading-[100%] mb-[18px] ${isActive ? "text-white" : "text-black"}`}
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
