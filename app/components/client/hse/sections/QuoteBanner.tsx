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
  const quoteY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const quoteX = useTransform(scrollYProgress, [0, 1], [-4, 6]);

  // Content animation
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-10 3xl:pt-0 pb-15 xl:pb-22 2xl:pb-[130.25px] 3xl:h-[694px] flex flex-col justify-end" >
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

          <motion.img
            src="/assets/icons/white-quote.svg"
            alt=""
            style={{ x: quoteX, y: quoteY }}
            className="mb-5 scale-[1.03] will-change-transform"
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
