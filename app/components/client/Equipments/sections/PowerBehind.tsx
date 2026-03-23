"use client";

import Image from "next/image";
import { SectionData, statsData } from "../data";
import { useRef } from "react";
import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";

const PowerBehind = () => {
    const { title, description } = SectionData;
 
    const titleRef = useRef<HTMLHeadingElement | null>(null);
   
  
 const statsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const statsItem = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

    

    return (
        <section className="bg-[#F9F9F9] relative overflow-hidden">
            
            <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="  relative z-10"
            >
                <Image src="/assets/images/equipments/bgsection.svg" alt="arrow" width={1705} height={511}
                         className={`absolute top-0 right-0 z-[-1]   transition-all duration-300   `}
                       />
                <div  className="container ">
                    <div className="  py-130 3xl:py-150  ">

                    {/* LEFT — full width mobile, 58% on lg+ */}
                    <div className="w-full flex flex-col justify-center ">
                        <h2
                            ref={titleRef}
                            className="section-heading flex items-center gap-3 text-secondary leading-[1.175]"
                        >
                            {title}
                           
                        </h2>

                        <motion.p
                            variants={moveUp(0.2)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="mt-[20px] lg:mt-[30px] pb-[30px] lg:pb-[60px] section-description max-w-[78ch] md:-tracking-[0.3px] lg:-tracking-normal"
                        >
                            {description}
                        </motion.p>
                    </div>
                     <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="  relative z-10"
            >
                   <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-0 xl:grid-cols-[19.27%_29.88%_31.66%_19.2%] justify-between"
                         
                        >
                        {statsData.map((item, i) => (
                            <div
                           key={i}
                            className={`py-2 lg:py-5 md:border-r border-black/20 ${
                                i === statsData.length - 1 ? "md:border-r-0" : ""
                            } ${i !== 0 ? "" : ""}`}
                            >
                            <div  className={`${ i === 0 ? " lg:w-fit xl:w-auto  mx-auto" : "" } ${i === 3 ? " xl:ms-auto xl:me-0 lg:m-auto lg:w-fit" : ""} ${ i !== 0 && i !== 3 ? "lg:w-fit mx-auto" : "" }`}>
                                <h3 className={`${  i === 2 ? "xl:min-w-[230px]" : " lg:min-w-[160px]" } mb-[10px] text-primary font-bold text-[45px] md:text-[60px] lg:text-[70px] xl:text-[80px] 3xl:text-[85px] leading-[1.18]`}  >  {item.value}
                                </h3>

                                <p className="section-description text-black md:max-w-[8ch] lg:max-w-none ">
                                    {item.label}
                                </p>
                            </div>
                            </div>
                        ))}
                        </div>
                        </motion.div>

                     

                </div>
                </div>
            </motion.div>
        </section>
    );
};

export default PowerBehind;