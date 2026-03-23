"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedHeading from "../../common/AnimateHeading";
import { useContainerLeftInset } from "@/app/hooks/useContainerLeftInset";
import SliderNavButton from "../../common/NavigationButton";
import { HSEData } from "../data";

import "swiper/css";

type TrainingItem = (typeof HSEData.training.items)[number];

const chunkItems = (items: TrainingItem[], size: number) => {
  const chunks: TrainingItem[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const SpotlightSlider = () => {
  const { title, desc, items } = HSEData.training;
  const containerRef = useRef<HTMLDivElement>(null);
  const leftInset = useContainerLeftInset(containerRef);
  const swiperRef = useRef<SwiperType | null>(null);
  const slides = useMemo(() => chunkItems(items, 2), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  const progressWidth =
    slides.length <= 1 ? 100 : ((activeIndex + 1) / slides.length) * 100;

  return (
    <section className="overflow-hidden py-12 xl:py-20 2xl:py-25">
      <div ref={containerRef} className="container">
        <AnimatedHeading text={title} className="mb-30" />
        <div className="mb-6 flex justify-between gap-5 2xl:mb-15">
          <p className="cmn-p max-w-4xl">{desc}</p>
          <div className="flex items-center justify-between gap-[10px] xl:gap-[20px]">
            <SliderNavButton
              direction="left"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <SliderNavButton
              direction="right"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          style={{ marginLeft: leftInset }}
          className="!overflow-visible !pr-[15px] lg:!pr-0"
        >
          {slides.map((group, groupIndex) => (
            <SwiperSlide key={`spotlight-group-${groupIndex}`}>
              <div className="grid gap-5 md:grid-cols-2 xl:gap-7">
                {group.map((item) => (
                  <article key={item.title} className="group relative min-h-[280px] overflow-hidden bg-secondary sm:min-h-[360px] xl:min-h-[420px] 3xl:min-h-[621px]"
                  >
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 xl:p-8 2xl:p-10">
                      <h3 className="mb-2 font-medium text-32 leading-none">
                        {item.title}
                      </h3>
                      {item.desc ? (
                        <p className="cmn-p leading-relaxed !text-paragraph-2/70 font-bold xl:text-15">
                          {item.desc}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
        <div className="mt-6 h-px w-full bg-[#D9D9D9]">
          <div
            className="h-px bg-primary transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default SpotlightSlider;
