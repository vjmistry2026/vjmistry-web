"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { trustedClientsData } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
import ContainerAnchor from "../../Layout/ContainerAnchor";

const TrustedClients = () => {
    const { title, description, logos } = trustedClientsData;
        const containerRef = useRef<HTMLDivElement>(null);
    const leftInset = useContainerLeftInset(containerRef);

    const isDesktopRef = useRef(false);

    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;

        // ✅ SAFE: client-only
        isDesktopRef.current = window.innerWidth >= 1024;
        const duration = isDesktopRef.current ? 50 : 10;

        // cleanup old clones
        track.querySelectorAll("[data-clone='true']").forEach((n) => n.remove());

        const originalItems = Array.from(track.children) as HTMLElement[];
        let contentWidth = originalItems.reduce((acc, el) => acc + el.offsetWidth, 0);

        while (contentWidth < viewport.offsetWidth * 2.5) {
            originalItems.forEach((item) => {
                const clone = item.cloneNode(true) as HTMLElement;
                clone.dataset.clone = "true";
                track.appendChild(clone);
                contentWidth += item.offsetWidth;
            });
        }

        const wrapX = gsap.utils.wrap(-contentWidth / 2, 0);
        gsap.set(track, { x: 0 });

        const tween = gsap.to(track, {
            x: `-=${contentWidth / 2}`,
            duration,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: (x) => `${wrapX(parseFloat(x))}px`,
            },
        });

        tweenRef.current = tween;

        return () => {
            tween.kill();
            tweenRef.current = null;
        };
    }, []);

    return (
        <section className="bg-[#F9F9F9] py-100 lg:py-130 overflow-hidden">
            <ContainerAnchor ref={containerRef} />
            <div style={{ paddingLeft: leftInset }}>
                <AnimatedHeading
                    tag="h2"
                    text={title}
                    className="text-60 lg:text-66 3xl:text-75 leading-[100%] font-condensed mb-[20px] lg:mb-[30px] text-[#1C1C1C]"
                />

                <motion.p 
                variants={moveUp(0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-20 leading-[1.5] font-nexa font-bold text-paragraph max-w-[750px] mb-[30px] lg:mb-[60px]">
                    {description}
                </motion.p>

                {/* MARQUEE */}
                <div
                    ref={viewportRef}
                    className="relative w-full overflow-hidden"
                    onMouseEnter={() => {
                        if (isDesktopRef.current) tweenRef.current?.pause();
                    }}
                    onMouseLeave={() => {
                        if (isDesktopRef.current) tweenRef.current?.resume();
                    }}
                >
                    <div ref={trackRef} className="flex w-max items-center gap-[20px]">
                        {logos.map((logo) => (
                            <div key={logo.id} className="group relative shrink-0 max-w-[306px]">
                                <div
                                    className="absolute -inset-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(237, 28, 36, 0.2) 0%, #ED1C24 50.3%, rgba(237, 28, 36, 0.2) 100%)",
                                    }}
                                />
                                <div className="relative z-10 h-[134px] 2xl:w-[306px] flex items-center justify-center group-hover:border-primary/50 border border-border bg-[#F9F9F9]">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={194}
                                        height={60}
                                        className="object-contain h-[100px] grayscale transition px-4"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedClients;
