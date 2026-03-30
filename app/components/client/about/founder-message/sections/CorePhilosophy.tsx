"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { containerStagger, moveUp } from "@/app/components/motionVariants";
import AnimatedHeading from "../../../common/AnimateHeading";
import { foundersMessageData } from "../data";

const CorePhilosophy = () => {
  const { title, items } = foundersMessageData.corePhilosophy;
  const [activeTitle, setActiveTitle] = useState(
    items.find((item) => item.highlight)?.title ?? items[0]?.title ?? "",
  );

  return (
    <section className="bg-light py-130">
      <div className="container">
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatedHeading text={title} className="mb-2 md:mb-30 leading-[1.2]" />
        </motion.div>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 border border-border/50  xl:grid-cols-3"
        >
          {items.map((item,index) => {
            const isActive = activeTitle === item.title;

            return (
              <motion.article
                key={item.title}
                variants={moveUp(0.2*index)}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActiveTitle(item.title)}
                onFocus={() => setActiveTitle(item.title)}
                onClick={() => setActiveTitle(item.title)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveTitle(item.title);
                  }
                }}
                className="group relative cursor-pointer overflow-hidden p-6 outline-none min-h-[250px] sm:min-h-[280px] xl:max-h-[285px] p-30" >
                <div className={`absolute inset-0 shadow-[inset_0_0_0_1px_#E4E4E4] transition-opacity duration-500 ${ isActive ? "opacity-0" : "opacity-100" }`} />

                <div className={`absolute inset-0 bg-[linear-gradient(180deg,#ED1C24_0%,#A71E22_100%)] transition-transform duration-500 ease-out ${
                    isActive ? "translate-y-0" : "translate-y-full"
                  }`}
                />

                <Image src="/assets/images/about/founder-message/shape.svg" alt="" width={300} height={300}
                  className={`pointer-events-none absolute left-0 top-0 h-[190px] w-full xl:h-[calc(100%-44.84px)] 2xl:w-auto 2xl:h-auto  object-contain object-top-left transition-opacity duration-500 
                    ${ isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col ">
                  <div className="flex h-[42px] w-[42px] items-center justify-center bg-secondary md:h-[64px] md:w-[64px]">
                    <Image src={item.icon} alt={item.title} width={34} height={34} className="h-auto w-auto max-h-[34px]" />
                  </div>

                  <div className="mt-5">
                    <div className="relative min-h-[148px] sm:min-h-[156px] md:min-h-[138px]">
                      <h3
                        className={`absolute inset-x-0 bottom-0 max-w-[92%] transform-gpu font-condensed text-32 leading-[100%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "-translate-y-[64px] sm:-translate-y-[72px] md:-translate-y-[68px] text-paragraph-2"
                            : "translate-y-0 text-secondary"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`absolute bottom-0  transform-gpu text-20 font-nexa leading-1p5 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "delay-75 translate-y-0 opacity-100 text-[#FDFDFDB2]"
                            : "pointer-events-none translate-y-5 opacity-0 text-[#D9D9D9]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CorePhilosophy;
