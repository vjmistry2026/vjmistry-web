"use client";

import { SecteqptypeData, equipmentData } from "../data";
import { useRef, useEffect, useState } from "react";
import { moveUp,moveLeft } from "@/app/components/motionVariants";
import { motion } from "framer-motion";

import SliderNavButton from "../../common/NavigationButton";   

 
const EquipmentType = () => {
    const { title, description } = SecteqptypeData;
 
    const titleRef = useRef<HTMLHeadingElement | null>(null);
   
  const handlePrev = () => {  };
  const handleNext = () => {  };

     const div1Ref = useRef<HTMLDivElement | null>(null);
const div2Ref = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(0);

    useEffect(() => {
  const updateHeight = () => {
    const h1 = div1Ref.current?.offsetHeight || 0;
    const h2 = div2Ref.current?.offsetHeight || 0;

    setHeight(h1 + h2);
  };

  updateHeight();

  window.addEventListener("resize", updateHeight);

  return () => window.removeEventListener("resize", updateHeight);
}, []);
    return (
        <section className=" relative overflow-hidden"> 
            <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="  relative z-10"
            >
              
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

                        <div className="flex justify-between items-center mt-[20px] lg:mt-[30px] pb-[30px] lg:pb-[60px]">
                            <motion.p
                            variants={moveUp(0.2)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className=" section-description max-w-[78ch] md:-tracking-[0.3px] lg:-tracking-normal"
                        >
                            {description}
                        </motion.p>
                         <motion.div
                                      initial="hidden"
                                      whileInView="show"
                                      variants={moveLeft(0.3)}
                                      viewport={{ once: true }}
                                      className="flex items-center gap-[10px] lg:gap-5 shrink-0"
                                    >
                                      <SliderNavButton direction="left" onClick={handlePrev} />
                                      <SliderNavButton direction="right" onClick={handleNext} />
                                    </motion.div>
                        </div>
                    </div>
                 <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-10"
>
                    {equipmentData.map((item) => (
                       <motion.div
  key={item.id}
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: item.id * 0.1 }}
  className="group relative bg-white overflow-hidden " 
        ref={targetRef}
        style={{ height }}
>
                        {/* IMAGE */}
                    <div
                    className="  top-0 left-0 w-full
                                transition-all duration-500
                                
                                bg-white flex items-center justify-center overflow-hidden" ref={div1Ref} 
                    >
                    <img
                        src={item.image}
                        alt=""
                        className="object-fit
                                transition-transform duration-700 ease-out
                                group-hover:scale-[1.2]"
                    />
                    </div>

                        {/* CONTENT */}
                        <div className="absolute bottom-0 left-0 w-full 
             bg-[#f9f9f9] group-hover:bg-primary
             p-5 xl:p-[30px]
             transition-colors duration-500 ease-out" ref={div2Ref} >

                            <h3 className="text-black font-[500] text-32 leading-[1.188] max-w-[18ch]
             group-hover:text-white
             transition-colors duration-300">
                            {item.title}
                            </h3>

                            <div  className=" 
                                        max-h-0 overflow-hidden
                                        transition-all duration-500
                                        group-hover:max-h-[120px]">
                                <p
                            className="text-20 font-[700]  text-[#FDFDFD70] leading-[1.48] pt-[10px] mt-[10px] border-t border-[#D9D9D9] transition-all duration-300"
                            >
                            {item.desc}
                            </p>
                            </div>

                        </div>
                        </motion.div>
                    ))}
                    </motion.div>

                     

                </div>
                </div>
            </motion.div>
        </section>
    );
};

export default EquipmentType;