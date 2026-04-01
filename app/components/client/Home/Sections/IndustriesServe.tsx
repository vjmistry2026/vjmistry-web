// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { industriesData } from "../data";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import AnimatedHeading from "../../common/AnimateHeading";
// import { motion } from "framer-motion";
// import { moveUp } from "@/app/components/motionVariants";
// import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
// import ContainerAnchor from "../../Layout/ContainerAnchor";

// gsap.registerPlugin(ScrollTrigger);

// const IndustriesWeServe = () => {
//     const { heading, description, items } = industriesData;
//     const containerRef = useRef<HTMLDivElement>(null);
//     const leftInset = useContainerLeftInset(containerRef);

//     const sectionRef = useRef<HTMLElement | null>(null);
//     const scrollRef = useRef<HTMLDivElement | null>(null);
//     const [isLg, setIsLg] = useState(false);

//     useEffect(() => {
//         const check = () => setIsLg(window.innerWidth >= 1024);
//         check();
//         window.addEventListener("resize", check);
//         return () => window.removeEventListener("resize", check);
//     }, []);

//     useEffect(() => {
//         const section = sectionRef.current;
//         const scrollEl = scrollRef.current;
//         if (!section || !scrollEl) return;

//         const mm = gsap.matchMedia();

//         mm.add("(min-width: 1024px)", () => {
//             const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;

//             const ctx = gsap.context(() => {
//                 gsap.to(scrollEl, {
//                     scrollTop: scrollHeight,
//                     ease: "power1.out",
//                     scrollTrigger: {
//                         trigger: section,
//                         start: "top top",
//                         end: `+=${scrollHeight}`,
//                         pin: true,
//                         pinType: "fixed",
//                         scrub: 0.6,
//                         anticipatePin: 1,
//                         invalidateOnRefresh: true,
//                     },
//                 });
//             }, section);

//             return () => ctx.revert();
//         });

//         return () => mm.revert();
//     }, []);

//     return (
//         <section ref={sectionRef} className="bg-secondary overflow-visible lg:h-[100vh] lg:overflow-hidden">
//             <ContainerAnchor ref={containerRef} />
//             <div
//                 className={`h-full flex lg:flex-row flex-col justify-start ${
//                     isLg ? "" : "container"
//                 }`}
//                 style={isLg ? { paddingLeft: leftInset } : undefined}
//             >

//                 {/* LEFT */}
//                 <div className="w-full lg:w-[45%] flex flex-col justify-start pt-100 lg:pt-150 2xl:pt-[191px] lg:pr-[66px] mb-[32px] lg:mb-[0px]">
//                     <AnimatedHeading
//                         color="white"
//                         text={heading}
//                         className="mb-[30px]"
//                     />

//                     <motion.p
//                         variants={moveUp(0.35)}
//                         initial="hidden"
//                         whileInView="show"
//                         viewport={{ once: true }}
//                         className="section-description text-paragraph-2/70 max-w-[730px]"
//                     >
//                         {description}
//                     </motion.p>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="w-full lg:w-[55%] relative">
//                     {/* Vertical faded line */}
//                     <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/70 to-transparent lg:left-0 lg:top-0 lg:h-full lg:w-px lg:bg-gradient-to-b" />

//                     {/* Scrollable column */}
//                     <div
//                         ref={scrollRef}
//                         className="h-full lg:py-10 overflow-y-auto lg:overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 md:gap-x-[30px] lg:gap-0"
//                     >
//                         {items.map((item, index) => (
//                             <motion.div
//                                 variants={moveUp(index * 0.3)}
//                                 initial="hidden"
//                                 whileInView="show"
//                                 viewport={{ once: true }}
//                                 key={item.id}
//                                 className="flex items-center py-[30px] lg:py-[30px] 2xl:py-[40px] lg:first:pt-[0px] lg:last:pb-[0px] lg:last:border-b-0 border-b border-white/20"
//                             >
//                                 <div
//                                     style={isLg ? { paddingRight: leftInset } : undefined}
//                                     className="flex lg:flex-row flex-col items-start gap-[30px] xl:gap-[40px] lg:pl-[30px] xl:pl-[40px]"
//                                 >
//                                     {/* Image */}
//                                     <div className="w-full h-[250px] md:h-[300px] lg:w-[220px] lg:h-[220px] xl:w-[250px] xl:h-[250px] 2xl:w-[350px] 2xl:h-[350px] relative shrink-0">
//                                         <Image src={item.image} alt={item.title} fill className="object-cover pointer-events-none" />
//                                     </div>
//                                     {/* Content */}
//                                     <div className="flex flex-col gap-[20px] xl:gap-[30px]">
//                                         <motion.div
//                                             variants={moveUp(index * 0.2)}
//                                             initial="hidden"
//                                             whileInView="show"
//                                             viewport={{ once: true }}
//                                             className="flex flex-row lg:flex-col gap-[20px] items-center lg:items-start xl:gap-[30px]"
//                                         >
//                                             <Image
//                                                 src={item.icon}
//                                                 alt=""
//                                                 width={38}
//                                                 height={47}
//                                                 priority
//                                                 className="pointer-events-none w-[30px] h-[35px] xl:w-[38px] xl:h-[47px]"
//                                             />
//                                             <h3 className="text-32 text-paragraph-2 leading-[110%] font-condensed">
//                                                 {item.title}
//                                             </h3>
//                                         </motion.div>
//                                         <motion.p
//                                             variants={moveUp(index * 0.25)}
//                                             initial="hidden"
//                                             whileInView="show"
//                                             viewport={{ once: true }}
//                                             className="section-description text-paragraph-2/70 max-w-[530px] lg:max-w-full"
//                                         >
//                                             {item.description}
//                                         </motion.p>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default IndustriesWeServe;




// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { industriesData } from "../data";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import AnimatedHeading from "../../common/AnimateHeading";
// import { motion } from "framer-motion";
// import { moveUp } from "@/app/components/motionVariants";
// import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
// import ContainerAnchor from "../../Layout/ContainerAnchor";

// gsap.registerPlugin(ScrollTrigger);

// const IndustriesWeServe = () => {
//     const { heading, description, items } = industriesData;
//     const containerRef = useRef<HTMLDivElement>(null);
//     const leftInset = useContainerLeftInset(containerRef);
//     const sectionRef = useRef<HTMLElement | null>(null);
//     const scrollRef = useRef<HTMLDivElement | null>(null);
//     const [isLg, setIsLg] = useState(false);

//     useEffect(() => {
//         const check = () => setIsLg(window.innerWidth >= 1024);
//         check();
//         window.addEventListener("resize", check);
//         return () => window.removeEventListener("resize", check);
//     }, []);

//     const getNavbarHeight = () => {
//         const nav = document.querySelector(".site-navbar") as HTMLElement | null;
//         return nav?.offsetHeight ?? 0;
//     };

//     useEffect(() => {
//         const section = sectionRef.current;
//         const scrollEl = scrollRef.current;
//         if (!section || !scrollEl) return;

//         // Keep mm and ScrollTrigger separate — nesting inside gsap.context
//         // causes circular cleanup (ctx→mm→ctx→...) and stack overflow.
//         // Instead: track the ST instance manually and kill it first, then revert mm.
//         let st: ScrollTrigger | undefined;

//         const mm = gsap.matchMedia();
//         mm.add("(min-width: 1024px)", () => {
//             const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
//             gsap.to(scrollEl, {
//                 scrollTop: scrollHeight,
//                 ease: "power1.out",
//                 scrollTrigger: {
//                     trigger: section,
//                     start: () => `top ${getNavbarHeight()}px`,
//                     end: `+=${scrollHeight}`,
//                     pin: true,
//                     scrub: 0.6,
//                     anticipatePin: 1,
//                     invalidateOnRefresh: true,
//                     onRefresh(self) { st = self; },
//                 },
//             });
//         });

//         return () => {
//             st?.kill();
//             mm.revert();
//         };
//     }, []);

//     return (
//         <section ref={sectionRef} className="bg-secondary overflow-visible lg:h-[100dvh] lg:overflow-hidden">
//             <ContainerAnchor ref={containerRef} />
//             <div
//                 className={`h-full flex lg:flex-row flex-col justify-start ${isLg ? "" : "container"}`}
//                 style={isLg ? { paddingLeft: leftInset } : undefined}
//             >
//                 {/* LEFT */}
//                 <div className="w-full lg:w-[45%] flex flex-col justify-start pt-100 lg:pt-150 2xl:pt-[191px] lg:pr-[66px] mb-[32px] lg:mb-[0px]">
//                     <AnimatedHeading color="white" text={heading} className="mb-[30px]" />
//                     <motion.p
//                         variants={moveUp(0.35)}
//                         initial="hidden"
//                         whileInView="show"
//                         viewport={{ once: true }}
//                         className="section-description text-paragraph-2/70 max-w-[730px]"
//                     >
//                         {description}
//                     </motion.p>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="w-full lg:w-[55%] relative">
//                     <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/70 to-transparent lg:left-0 lg:top-0 lg:h-full lg:w-px lg:bg-gradient-to-b" />
//                     <div
//                         ref={scrollRef}
//                         className="h-full lg:py-10 overflow-y-auto lg:overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 md:gap-x-[30px] lg:gap-0"
//                     >
//                         {items.map((item, index) => (
//                             <motion.div
//                                 variants={moveUp(index * 0.3)}
//                                 initial="hidden"
//                                 whileInView="show"
//                                 viewport={{ once: true }}
//                                 key={item.id}
//                                 className="flex items-center py-[30px] lg:py-[30px] 2xl:py-[40px] lg:first:pt-[0px] lg:last:pb-[0px] lg:last:border-b-0 border-b border-white/20"
//                             >
//                                 <div
//                                     style={isLg ? { paddingRight: leftInset } : undefined}
//                                     className="flex lg:flex-row flex-col items-start gap-[30px] xl:gap-[40px] lg:pl-[30px] xl:pl-[40px]"
//                                 >
//                                     <div className="w-full h-[250px] md:h-[300px] lg:w-[220px] lg:h-[220px] xl:w-[250px] xl:h-[250px] 2xl:w-[350px] 2xl:h-[350px] relative shrink-0">
//                                         <Image src={item.image} alt={item.title} fill className="object-cover pointer-events-none" />
//                                     </div>
//                                     <div className="flex flex-col gap-[20px] xl:gap-[30px]">
//                                         <motion.div
//                                             variants={moveUp(index * 0.2)}
//                                             initial="hidden"
//                                             whileInView="show"
//                                             viewport={{ once: true }}
//                                             className="flex flex-row lg:flex-col gap-[20px] items-center lg:items-start xl:gap-[30px]"
//                                         >
//                                             <Image
//                                                 src={item.icon}
//                                                 alt=""
//                                                 width={38}
//                                                 height={47}
//                                                 priority
//                                                 className="pointer-events-none w-[30px] h-[35px] xl:w-[38px] xl:h-[47px]"
//                                             />
//                                             <h3 className="text-32 text-paragraph-2 leading-[110%] font-condensed">
//                                                 {item.title}
//                                             </h3>
//                                         </motion.div>
//                                         <motion.p
//                                             variants={moveUp(index * 0.25)}
//                                             initial="hidden"
//                                             whileInView="show"
//                                             viewport={{ once: true }}
//                                             className="section-description text-paragraph-2/70 max-w-[530px] lg:max-w-full"
//                                         >
//                                             {item.description}
//                                         </motion.p>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default IndustriesWeServe;





"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { industriesData } from "../data";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedHeading from "../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
import ContainerAnchor from "../../Layout/ContainerAnchor";

gsap.registerPlugin(ScrollTrigger);

const IndustriesWeServe = ({ data }: { data: HomeType['fifthSection'] }) => {
    // const { heading, description, items } = industriesData;
    const heading = data.title
    const description = data.description
    const items = data.items
    const containerRef = useRef<HTMLDivElement>(null);
    const leftInset = useContainerLeftInset(containerRef);
    const sectionRef = useRef<HTMLElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isLg, setIsLg] = useState(false);

    useEffect(() => {
        const check = () => setIsLg(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const getNavbarHeight = () => {
        const nav = document.querySelector(".site-navbar") as HTMLElement | null;
        return nav?.offsetHeight ?? 0;
    };

    useEffect(() => {
        const section = sectionRef.current;
        const scrollEl = scrollRef.current;
        if (!section || !scrollEl) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;

                gsap.to(scrollEl, {
                    scrollTop: scrollHeight,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: section,
                        pin: section,
                        start: () => `top ${getNavbarHeight()}px`,
                        end: `+=${scrollHeight}`,
                        scrub: 0.6,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            });

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    // Sync cleanup — runs before React removes DOM nodes
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const scrollEl = scrollRef.current;

        return () => {
            // Kill and REVERT pin — moves the node back before React unmounts
            ScrollTrigger.getAll()
                .filter(st => st.vars.trigger === section || st.vars.pin === section)
                .forEach(st => {
                    st.kill(true); // true = revert inline styles set by GSAP
                });

            gsap.killTweensOf(scrollEl);

            // Force ScrollTrigger to release the pin spacer it injected
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-secondary overflow-visible lg:h-[100dvh] lg:overflow-hidden"
        >
            <ContainerAnchor ref={containerRef} />
            <div
                className={`h-full flex lg:flex-row flex-col justify-start ${isLg ? "" : "container"}`}
                style={isLg ? { paddingLeft: leftInset } : undefined}
            >
                {/* LEFT */}
                <div className="w-full lg:w-[45%] flex flex-col justify-start pt-100 lg:pt-150 2xl:pt-[191px] lg:pr-[66px] mb-[32px] lg:mb-[0px]">
                    <AnimatedHeading color="white" text={heading} className="mb-[30px]" />
                    <motion.p
                        variants={moveUp(0.35)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="section-description text-paragraph-2/70 max-w-[730px]"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-[55%] relative">
                    <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/70 to-transparent lg:left-0 lg:top-0 lg:h-full lg:w-px lg:bg-gradient-to-b" />
                    <div
                        ref={scrollRef}
                        className="h-full lg:py-10 overflow-y-auto lg:overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 md:gap-x-[30px] lg:gap-0"
                    >
                        {items.map((item, index) => (
                            <motion.div
                                variants={moveUp(index * 0.3)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                key={index}
                                className="flex items-center py-[30px] lg:py-[30px] 2xl:py-[40px] lg:first:pt-[0px] lg:last:pb-[0px] lg:last:border-b-0 border-b border-white/20"
                            >
                                <div
                                    style={isLg ? { paddingRight: leftInset } : undefined}
                                    className="flex lg:flex-row flex-col items-start gap-[30px] xl:gap-[40px] lg:pl-[30px] xl:pl-[40px]"
                                >
                                    <div className="w-full h-[250px] md:h-[300px] lg:w-[220px] lg:h-[220px] xl:w-[250px] xl:h-[250px] 2xl:w-[350px] 2xl:h-[350px] relative shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.imageAlt}
                                            fill
                                            className="object-cover pointer-events-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[20px] xl:gap-[30px]">
                                        <motion.div
                                            variants={moveUp(index * 0.2)}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true }}
                                            className="flex flex-row lg:flex-col gap-[20px] items-center lg:items-start xl:gap-[30px]"
                                        >
                                            <Image
                                                src={item.logo}
                                                alt={item.logoAlt}
                                                width={38}
                                                height={47}
                                                priority
                                                className="pointer-events-none w-[30px] h-[35px] xl:w-[38px] xl:h-[47px]"
                                            />
                                            <h3 className="text-32 text-paragraph-2 leading-[110%] font-condensed">
                                                {item.title}
                                            </h3>
                                        </motion.div>
                                        <motion.p
                                            variants={moveUp(index * 0.25)}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true }}
                                            className="section-description text-paragraph-2/70 max-w-[530px] lg:max-w-full"
                                        >
                                            {item.description}
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustriesWeServe;