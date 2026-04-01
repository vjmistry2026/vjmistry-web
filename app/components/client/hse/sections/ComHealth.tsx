"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import AnimatedHeading from "../../common/AnimateHeading";
import { HSEData } from "../data";
import { HSeType } from "@/app/types/hse";

const ComHealth = ({ data }: { data: HSeType['secondSection'] }) => {
  // const { title, desc, stats } = HSEData.commitment;

  return (
    <section className="py-130 bg-light relative overflow-hidden">
      <div className="absolute top-0 right-0">
        <Image src="/assets/images/hse/shapes/shape-1.svg" width={1705} height={592} alt="" />
      </div>
      <div className="container">
        <AnimatedHeading text={data.title} className="mb-2 md:mb-30 2xl:mb-[53px] max-w-xl leading-[1.2]" />
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_3fr] 2xl:grid-cols-[666px_877px] gap-5 xl:gap-10 2xl:gap-17 3xl:gap-[75px]">
          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="cmn-p font-bold ">{data.description}</p>
          </motion.div>
          <div className="relative z-10 flex items-end">
            <div className="grid w-full grid-cols-1 gap-y-4 xl:gap-x-0 xl:py-0 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-center sm:gap-x-0 sm:gap-y-0 xl:py-0 3xl:grid-cols-[266px_1px_349px_1px_258px]">
              {data.items.map((item, index) => (
                <Fragment key={`${item.value}-${item.number}`}>
                  <motion.div
                    variants={moveUp(index * 0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className={`flex flex-col justify-center ${index === 0
                      ? "xl:pr-14 2xl:pr-20 3xl:pr-0 3xl:w-full 3xl:items-start"
                      : index === data.items.length - 1
                        ? "xl:pl-14 2xl:pl-20 3xl:pl-0 3xl:w-full "
                        : "xl:px-14 2xl:px-20 3xl:px-0 3xl:w-full 3xl:items-center "
                      }`}
                  >
                    <div
                      className={`flex flex-col ${index === data.items.length - 1
                        ? "sm:items-end"
                        : index === 1
                          ? "sm:items-center"
                          : "sm:items-start text-left"
                        }`}
                    >
                      <div className="w-fit">
                        <h3 className="font-condensed leading-none text-primary text-75 w-fit">
                          {item.number}
                        </h3>
                        <p className="mt-1 xl:mt-3 font-nexa text-20 leading-1p5 text-paragraph font-bold w-fit ">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  {index !== data.items.length - 1 ? (
                    <span
                      className="hidden h-[110px] w-px self-center sm:block xl:h-[138px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(237, 28, 36, 0) 0%, #ED1C24 100%)",
                      }}
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComHealth;
