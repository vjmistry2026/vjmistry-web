"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import AnimatedHeading from "../../common/AnimateHeading";
import InteractiveInfoCard from "../../common/InteractiveInfoCard";
import { HSEData } from "../data";
import { HSeType } from "@/app/types/hse";

const ZeroHarm = ({ data }: { data: HSeType['thirdSection'] }) => {
  // const { title,desc, items } = HSEData.zeroHarm;
  const [activeTitle, setActiveTitle] = useState(
    data.items.find((item) => item)?.title ?? data.items[0]?.title ?? "",
  );

  return (
    <section className="bg-white pt-40 pb-50 sm:pt-130 sm:pb-150">
      <div className="container">
        <AnimatedHeading text={data.title} className="mb-30" />
        <p className="cmn-p max-w-3xl font-bold">{data.description}</p>
        <div className="mt-5 md:mt-10 xl:mt-15 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8 3xl:gap-10">
          {data.items.map((item, index) => {
            const isActive = activeTitle === item.title;

            return (
              <motion.div
                key={item.title}
                variants={moveUp(index * 0.12)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                tabIndex={0}
                onMouseEnter={() => setActiveTitle(item.title)}
                onFocus={() => setActiveTitle(item.title)}
                onClick={() => setActiveTitle(item.title)}
                className="outline-none"
              >
                <InteractiveInfoCard icon={item.image ?? "/assets/icons/tin-tax.svg"} title={item.title} description={item.description} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ZeroHarm;
