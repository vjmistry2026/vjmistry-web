"use client";

import Image from "next/image";
import { HSEData } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const QuoteBanner = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // VERY subtle background movement (professional feel)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Content animation
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-10 pb-8 xl:pt-25 xl:pb-22 2xl:pt-[236px] 2xl:pb-[130.25px]"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="relative w-full h-[120%]">
          <Image
            src={HSEData.sustainability.img}
            alt={HSEData.sustainability.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="container">
        <motion.div
          style={{ opacity, y: contentY }}
          className="relative z-20"
        >
          <AnimatedHeading
            text={HSEData.sustainability.title}
            className="mb-30 leading-[1.2] max-w-3xl"
            color="white"
          />

          <img
            src="/assets/icons/white-quote.svg"
            alt=""
            className="mb-5"
          />

          <p className="cmn-p !text-paragraph-2 opacity-70 max-w-4xl">
            {HSEData.sustainability.desc}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteBanner;