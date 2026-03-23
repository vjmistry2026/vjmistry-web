"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedHeading from "../../common/AnimateHeading";
import SliderNavButton from "../../common/NavigationButton";
import { HSEData } from "../data";

import "swiper/css";

type CSRItem = (typeof HSEData.csr.items)[number];

const getThumbDisplay = (album: string[]) => {
  if (album.length <= 4) {
    return {
      thumbs: album,
      showOverflow: false,
    };
  }

  return {
    thumbs: album.slice(0, 3),
    showOverflow: true,
  };
};

const CSR = () => {
  const { title, desc, items } = HSEData.csr;
  const swiperRef = useRef<SwiperType | null>(null);
  const modalSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<CSRItem | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    if (!selectedItem) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem]);

  const openGallery = (item: CSRItem, imageIndex = 0) => {
    setSelectedItem(item);
    setModalIndex(imageIndex);
  };

  return (
    <section className="overflow-hidden py-12 xl:py-20 2xl:py-25">
      <div className="container">
        <AnimatedHeading text={title} className="mb-30 max-w-[780px]" />

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
          {items.map((item, index) => {
            const { thumbs, showOverflow } = getThumbDisplay(item.album);
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={item.title}>
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => openGallery(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openGallery(item);
                    }
                  }}
                  className={`group cursor-pointer border border-border  transition-colors duration-300 ${
                    isActive ? "bg-primary text-white" : "bg-white text-secondary"
                  }`}
                >
                  <div className="relative h-[400px] 3xl:h-[426px] overflow-hidden">
                    <Image src={item.album[0]} alt={item.title} fill sizes="(max-width: 1023px) 80vw, 28vw" className="object-cover transition-transform duration-700 group-hover:scale-105 " />

                    <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <div className="flex h-[64.38px] w-[61.48px] shrink-0 items-center justify-center bg-primary">
                        <Image
                          src="/assets/icons/right-top-arrow-primary.svg"
                          alt=""
                          width={12.5}
                          height={12.5}
                          className="h-[12.5px] w-[12.5px] shrink-0 -translate-x-[10px] translate-y-[10px] invert brightness-0 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4 p-4 xl:p-5">
                    <h3
                      className={`font-condensed text-[28px] leading-none xl:text-32 ${
                        isActive ? "text-white" : "text-secondary"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div className="flex shrink-0 items-center pl-6">
                      {thumbs.map((thumb, thumbIndex) => (
                        <button
                          key={`${item.title}-${thumbIndex}`}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openGallery(item, thumbIndex);
                          }}
                          className="-ml-3 cursor-pointer first:ml-0"
                          aria-label={`Open ${item.title} image ${thumbIndex + 1}`}
                        >
                          <span className="relative block h-7 w-7 overflow-hidden rounded-full border border-white">
                            <Image
                              src={thumb}
                              alt=""
                              fill
                              sizes="28px"
                              className="object-cover"
                            />
                          </span>
                        </button>
                      ))}

                      {showOverflow ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openGallery(item, 3);
                          }}
                          className="relative z-10 -ml-3 cursor-pointer first:ml-0"
                          aria-label={`Open ${item.title} gallery`}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-white text-[11px] font-bold text-primary">
                            4+
                          </span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {selectedItem ? (
        <div
          className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/92 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} gallery`}
          onClick={() => setSelectedItem(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute right-3 top-2 z-[10060] flex h-8 w-8 items-center justify-center bg-transparent text-white transition-colors duration-200 hover:text-primary sm:right-5 sm:top-3 sm:h-10 sm:w-10 cursor-pointer"
            aria-label="Close gallery"
          >
            <Image src="/assets/icons/close-icon.svg" width={20} height={20} alt="" />
          </button>

          <div
            className="relative w-full max-w-[1220px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pt-10 sm:pt-12">
              <div className="relative">
                <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-4">
                  <SliderNavButton
                    direction="left"
                    size="small"
                    onClick={() => modalSwiperRef.current?.slidePrev()}
                  />
                </div>

                <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-4">
                  <SliderNavButton
                    direction="right"
                    size="small"
                    onClick={() => modalSwiperRef.current?.slideNext()}
                  />
                </div>

                <div className="mx-auto w-full max-w-[980px] overflow-hidden bg-black">
                  <Swiper
                    initialSlide={modalIndex}
                    onSwiper={(swiper) => {
                      modalSwiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => setModalIndex(swiper.activeIndex)}
                    slidesPerView={1}
                    spaceBetween={16}
                    className="w-full"
                  >
                    {selectedItem.album.map((image, imageIndex) => (
                      <SwiperSlide key={`${selectedItem.title}-${imageIndex}`}>
                        <div className="relative mx-auto aspect-[4/5] max-h-[68vh] min-h-[260px] overflow-hidden bg-black sm:aspect-[16/10] sm:max-h-[72vh] lg:aspect-[16/9]">
                          <Image
                            src={image}
                            alt={`${selectedItem.title} image ${imageIndex + 1}`}
                            fill
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 86vw, 980px"
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div className="mt-4 bg-white/14 px-3 py-3 sm:px-4">
                <div className="mx-auto flex max-w-[980px] items-center justify-center gap-2 overflow-x-auto sm:gap-3">
                  {selectedItem.album.map((image, imageIndex) => (
                    <button
                      key={`${selectedItem.title}-thumb-${imageIndex}`}
                      type="button"
                      onClick={() => modalSwiperRef.current?.slideTo(imageIndex)}
                      className={`relative h-10 w-14 shrink-0 overflow-hidden border transition-colors duration-200 sm:h-12 sm:w-18 cursor-pointer ${
                        modalIndex === imageIndex
                          ? "border-primary"
                          : "border-white/20"
                      }`}
                    >
                      <Image src={image} alt="" fill sizes="72px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default CSR;
