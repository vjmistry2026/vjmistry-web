"use client";

import Image from "next/image";
import { buildWithConfidenceData } from "../data";
import CustomButton from "@/app/components/client/common/CustomButton";
import AnimatedHeading from "../../common/AnimateHeading";
import { moveUp } from "@/app/components/motionVariants";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PreFooterCta = () => {
    const { title, description, backgroundImage } = buildWithConfidenceData;

    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll progress of this section relative to the viewport
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Map scroll progress to a vertical translation of 25vh
    const y = useTransform(scrollYProgress, [0, 1], ["-25vh", "25vh"]);

    return (
        <section ref={sectionRef} className="relative py-100 lg:py-130 w-full overflow-hidden max-h-[643px]">

            {/* Background Image — scale(1.25) gives room to move without showing edges */}
            <motion.div className="absolute inset-0" style={{ y }}>
                <Image
                    src={backgroundImage}
                    alt="Build with confidence"
                    fill
                    priority
                    className="object-cover pointer-events-none scale-[1.18]"
                />
            </motion.div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center">
                <div className="px-4 flex flex-col items-center">
                    <AnimatedHeading
                        color="white"
                        text={title}
                        className="leading-[120%] mb-[20px] lg:mb-[30px] max-w-[13ch]"
                    />

                    <motion.p
                        variants={moveUp(0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="section-description text-paragraph-2/70 mb-[30px] lg:mb-[60px] max-w-[54ch]"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        variants={moveUp(0.5)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <CustomButton label="Contact Us" href="#" textColor="white" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PreFooterCta;