"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderNavButton from "./NavigationButton";

import "swiper/css";

type AlbumCardProps = {
  title: string;
  album: string[];
  isActive?: boolean;
};

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

export default function AlbumCard({
  title,
  album,
  isActive = false,
}: AlbumCardProps) {
  const { thumbs, showOverflow } = getThumbDisplay(album);
  const modalSwiperRef = useRef<SwiperType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const openGallery = (imageIndex = 0) => {
    setModalIndex(imageIndex);
    setIsOpen(true);
  };

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={() => openGallery()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openGallery();
          }
        }}
        className={`group cursor-pointer border border-border transition-colors duration-300 ${
          isActive ? "bg-primary text-white" : "bg-white text-secondary"
        }`}
      >
        <div className="relative overflow-hidden">
          <Image
            src={album[0]}
            alt={title}
            width={513}
            height={426}
            sizes="(max-width: 1023px) 80vw, 28vw"
            className="h-[300px] object-cover transition-transform duration-700 group-hover:scale-105 xl:h-[400px] 3xl:h-[426px]"
          />
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

        <div className="flex items-end justify-between gap-1 px-5 pt-4 pb-8 xl:px-30 xl:pt-10 xl:pb-50">
          <h3
            className={`font-condensed leading-none xl:text-32 ${
              isActive ? "text-white" : "text-secondary"
            }`}
          >
            {title}
          </h3>
          <div className="flex shrink-0 items-center pl-6">
            {thumbs.map((thumb, thumbIndex) => (
              <button
                key={`${title}-${thumbIndex}`}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openGallery(thumbIndex);
                }}
                className="-ml-3 cursor-pointer first:ml-0"
                aria-label={`Open ${title} image ${thumbIndex + 1}`}
              >
                <span className="relative block h-7 w-7 overflow-hidden rounded-full border border-white transition-all duration-200 hover:scale-105 xl:h-[33.23px] xl:w-[33.23px]">
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
                  openGallery(3);
                }}
                className="relative z-10 -ml-3 cursor-pointer first:ml-0"
                aria-label={`Open ${title} gallery`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-white text-[11px] font-bold text-primary transition-all duration-200 hover:scale-105 xl:h-[33.23px] xl:w-[33.23px]">
                  4+
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </article>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/92 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-3 z-[10060] flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent text-white transition-colors duration-200 hover:text-primary sm:top-3 sm:right-5 sm:h-10 sm:w-10"
            aria-label="Close gallery"
          >
            <Image
              src="/assets/icons/close-icon.svg"
              width={20}
              height={20}
              alt=""
            />
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
                    {album.map((image, imageIndex) => (
                      <SwiperSlide key={`${title}-${imageIndex}`}>
                        <div className="relative mx-auto aspect-[4/5] min-h-[260px] max-h-[68vh] overflow-hidden bg-black sm:aspect-[16/10] sm:max-h-[72vh] lg:aspect-[16/9]">
                          <Image
                            src={image}
                            alt={`${title} image ${imageIndex + 1}`}
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
                  {album.map((image, imageIndex) => (
                    <button
                      key={`${title}-thumb-${imageIndex}`}
                      type="button"
                      onClick={() => modalSwiperRef.current?.slideTo(imageIndex)}
                      className={`relative h-10 w-14 shrink-0 cursor-pointer overflow-hidden border transition-colors duration-200 sm:h-12 sm:w-18 ${
                        modalIndex === imageIndex
                          ? "border-primary"
                          : "border-white/20"
                      }`}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
