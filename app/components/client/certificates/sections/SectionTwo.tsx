"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedHeading from "../../common/AnimateHeading";
import InteractiveInfoCard from "../../common/InteractiveInfoCard";
import { certificatesData } from "../data";
import { moveUp } from "@/app/components/motionVariants";

const SectionTwo = ({ data }: { data: CertificateType['secondSection'] }) => {
  // const { transparency } = certificatesData;
  const [activeId, setActiveId] = useState(data.items[0]?._id ?? 0);

  return (
    <section className="py-100 lg:py-130 3xl:py-130 bg-light">
      <div className="container">
<<<<<<< HEAD
        <AnimatedHeading text={data.title} className="mb-30" />

=======
        <AnimatedHeading text={transparency.title} className="mb-4 md:mb-30" />
>>>>>>> 519e1581e605101f3ae7af8e8dbf568be9779d2e
        <motion.p
          variants={moveUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="cmn-p font-bold mb-5 xl:mb-10 2xl:mb-15 max-w-3xl"
        >
          {data.description}
        </motion.p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8 3xl:gap-10">
          {data.items.map((item, index) => {
            const isActive = activeId === item._id;

            return (
              <motion.article
                key={item._id}
                variants={moveUp(index * 0.12)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                tabIndex={0}
                onMouseEnter={() => setActiveId(item._id)}
                onFocus={() => setActiveId(item._id)}
                onClick={() => setActiveId(item._id)}
                className="outline-none"
              >
                <InteractiveInfoCard
                  icon={item.image}
                  title={item.title}
                  description={item.description}
                  isActive={isActive}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
