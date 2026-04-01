"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedHeading from "../../common/AnimateHeading";
import AlbumCard from "../../common/AlbumCard";
import SliderNavButton from "../../common/NavigationButton";
import { moveUp } from "@/app/components/motionVariants";
import { HSEData } from "../data";

import "swiper/css";
import { HSeType } from "@/app/types/hse";

const CSR = ({ data }: { data: HSeType['sixthSection'] }) => {
  // const { title, desc, items } = HSEData.csr;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="overflow-hidden pb-12 xl:pb-20 2xl:pb-25">
      <div className="container">
        <AnimatedHeading text={data.title} className="mb-4 md:mb-30 max-w-[780px]" />
        <div className="mb-6 flex justify-between flex-wrap gap-4 2xl:mb-15">
          <motion.p
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="cmn-p font-bold max-w-4xl"
          >
            {data.description}
          </motion.p>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center justify-between gap-[10px] xl:gap-[20px]"
          >
            <SliderNavButton
              direction="left"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <SliderNavButton
              direction="right"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </motion.div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className=""
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1.5, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {data.items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={item.title}>
                <motion.div
                  variants={moveUp(index * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.18 }}
                >
                  <AlbumCard
                    title={item.title}
                    album={item.images}
                    isActive={isActive}
                  />
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default CSR;
