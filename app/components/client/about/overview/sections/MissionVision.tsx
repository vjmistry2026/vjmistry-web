"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { missionVisionData } from "../data";
import { moveLeft, moveUp } from "@/app/components/motionVariants";

const MissionVision = () => {
  return (
    <section className="pb-100 lg:pb-130 3xl:pb-150">
      <div className="container overflow-hidden">
        <div className="flex flex-col md:flex-row overflow-hidden">
          {/* Card 1 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.2)}
            className="w-full md:w-1/2 md:mb-[34px] 2xl:mb-[46px]"
          >
            <Card item={missionVisionData[0]} iconWidth={36} iconHeight={42} />
          </motion.div>

          {/* Horizontal divider on mobile, vertical on md+ */}
          <div className="md:hidden w-full h-px bg-border" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveLeft(0.25)}
            className="hidden md:block w-px bg-border shrink-0"
          />

          {/* Card 2 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.32)}
            className="w-full md:w-1/2 md:mt-[34px] 2xl:mt-[46px]"
          >
            <Card item={missionVisionData[1]} iconWidth={58} iconHeight={36} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type CardItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const Card = ({
  item,
  iconWidth,
  iconHeight,
}: {
  item: CardItem;
  iconWidth: number;
  iconHeight: number;
}) => {
  return (
    <div className="bg-[#F9F9F9] h-full px-6 sm:px-10 md:px-100 3xl:px-[107px] py-70 3xl:py-[66px]">
      <div className="mb-6 lg:mb-[30px]">
        <Image
          src={item.icon}
          alt={item.title}
          width={iconWidth}
          height={iconHeight}
          className="pointer-events-none"
          style={{ width: iconWidth, height: iconHeight }}
        />
      </div>
      <motion.h3
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={moveUp(0.2)}
        className="text-32 font-condensed text-secondary leading-[100%] mb-5 lg:mb-[30px]"
      >
        {item.title}
      </motion.h3>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={moveUp(0.35)}
        className="w-full h-px bg-primary mb-5 lg:mb-[30px]"
      />
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={moveUp(0.45)}
        className="section-description"
      >
        {item.description}
      </motion.p>
    </div>
  );
};

export default MissionVision;
