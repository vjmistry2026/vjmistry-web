"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { moveUp } from "@/app/components/motionVariants";

const BottomTagline = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const shapeY = useTransform(scrollYProgress, [0, 1], [-2, -10]);
  const shapeX = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <section ref={ref} className="bg-light  relative overflow-hidden 2xl:min-h-[392px]" >
      <div className="container relative">
        <motion.img src="/assets/images/hse/shapes/shape-2.svg" alt="" style={{ x: shapeX, y: shapeY }} className="absolute top-0 -right-6 max-w-none scale-[1.03] origin-top-right will-change-transform" />
        <motion.h2
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-60 md:text-75 font-condensed font-bold md:max-w-[70vw] leading-[1] bg-[linear-gradient(90deg,#2B2020_0%,#4A2022_34%,#ED1C24_68%,#2B2020_100%)] bg-clip-text text-transparent py-10 xl:py-15 2xl:py-25 3xl:py-[108px]"
        >
          Safe Sites. Sustainable Futures.
          <br />
          Solid structures
        </motion.h2>
      </div>
    </section>
  );
};

export default BottomTagline;
