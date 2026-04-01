"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderNavButton from "./NavigationButton";

import "swiper/css";

type AlbumCardProps = {
  title: string;
  album: { image: string, imageAlt: string }[];
  isActive?: boolean;
};

const MAX_MODAL_THUMBS = 5;

const getThumbDisplay = (album: { image: string; imageAlt: string }[]) => {
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

const getVisibleModalThumbs = (total: number, activeIndex: number) => {
  if (total <= MAX_MODAL_THUMBS) {
    return Array.from({ length: total }, (_, index) => index);
  }

  const startIndex = Math.max(0, Math.min(activeIndex - 2, total - MAX_MODAL_THUMBS));

  return Array.from({ length: MAX_MODAL_THUMBS }, (_, index) => startIndex + index);
};

export default function AlbumCard({
  title,
  album,
  isActive = false,
}: AlbumCardProps) {
  const { thumbs, showOverflow } = getThumbDisplay(album);
  const modalSwiperRef = useRef<SwiperType | null>(null);
  const footerAnimationFrameRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [footerOverlayPosition, setFooterOverlayPosition] = useState<
    "start" | "center" | "end"
  >(isActive ? "center" : "start");
  const [isFooterOverlayAnimated, setIsFooterOverlayAnimated] = useState(false);
  const visibleModalThumbs = getVisibleModalThumbs(album.length, modalIndex);

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

  useEffect(() => {
    if (footerAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(footerAnimationFrameRef.current);
      footerAnimationFrameRef.current = null;
    }

    setIsFooterOverlayAnimated(false);
    setFooterOverlayPosition(isActive ? "center" : "start");
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (footerAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(footerAnimationFrameRef.current);
      }
    };
  }, []);

  const openGallery = (imageIndex = 0) => {
    setModalIndex(imageIndex);
    setIsOpen(true);
  };

  const handleFooterMouseEnter = () => {
    if (isActive) return;

    if (footerAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(footerAnimationFrameRef.current);
      footerAnimationFrameRef.current = null;
    }

    if (footerOverlayPosition === "end") {
      setIsFooterOverlayAnimated(false);
      setFooterOverlayPosition("start");

      footerAnimationFrameRef.current = window.requestAnimationFrame(() => {
        footerAnimationFrameRef.current = window.requestAnimationFrame(() => {
          setIsFooterOverlayAnimated(true);
          setFooterOverlayPosition("center");
          footerAnimationFrameRef.current = null;
        });
      });

      return;
    }

    setIsFooterOverlayAnimated(true);
    setFooterOverlayPosition("center");
  };

  const handleFooterMouseLeave = () => {
    if (isActive) return;

    if (footerAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(footerAnimationFrameRef.current);
      footerAnimationFrameRef.current = null;
    }

    setIsFooterOverlayAnimated(true);
    setFooterOverlayPosition("end");
  };

  const handleFooterOverlayTransitionEnd = () => {
    if (isActive || footerOverlayPosition !== "end") return;

    setIsFooterOverlayAnimated(false);
    setFooterOverlayPosition("start");
  };

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/92 p-3 sm:p-4 h-full"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      onClick={() => setIsOpen(false)}
    >
      <div className="relative w-full 3xl:max-w-[1620px]" onClick={(event) => event.stopPropagation()} >
        <div className="max-w-[80vw] 3xl:max-w-[1444px]  mx-auto relative">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0 z-[10060] flex h-12 w-12 -translate-y-full cursor-pointer items-center justify-center bg-transparent text-white transition-colors duration-200 hover:text-primary sm:h-14 sm:w-14 xl:w-5 xl:h-5"
            aria-label="Close gallery"
          >
            <Image src="/assets/icons/close-icon.svg" width={34} height={34} alt="" className="h-5 w-5" />
          </button>
        </div>


        <div className="pt-2">
          <div className="relative">
            <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-0">
              <SliderNavButton direction="left" onClick={() => modalSwiperRef.current?.slidePrev()} />
            </div>

            <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-0">
              <SliderNavButton direction="right" onClick={() => modalSwiperRef.current?.slideNext()} />
            </div>

            <div className="mx-auto w-full  overflow-hidden">
              <Swiper
                initialSlide={modalIndex}
                nested
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
                    <div className="relative mx-auto  min-h-[260px] md:min-h-[400px] xl:min-h-[500px] max-h-[80vh] 3xl:min-h-[676px]  overflow-hidden ">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="absolute right-0 top-0 z-[10060] flex h-12 w-12 -translate-y-full cursor-pointer items-center justify-center bg-transparent text-white transition-colors duration-200 hover:text-primary sm:h-14 sm:w-14 z-40"
                        aria-label="Close gallery"
                      >
                        <Image src="/assets/icons/close-icon.svg" width={34} height={34} alt="" className="h-[34px] w-[34px]" />
                      </button>
                      <Image src={image.image} alt={`${title} image ${imageIndex + 1}`} fill sizes="(max-width: 640px) 92vw, 
                          (max-width: 1024px) 86vw, 980px" className="object-cover max-w-[80vw] 3xl:max-w-[1444px] mx-auto" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="mt-4 px-3 py-3 sm:px-4">
            <div className="mx-auto flex w-fit max-w-full items-center justify-center gap-5 overflow-x-auto">
              {visibleModalThumbs.map((imageIndex) => (
                <button
                  key={`${title}-thumb-${imageIndex}`}
                  type="button"
                  onClick={() => modalSwiperRef.current?.slideTo(imageIndex)}
                  className={`relative shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 ${modalIndex === imageIndex
                    ? "h-[70px] w-[100px] border-transparent grayscale-0 opacity-100"
                    : "h-[50px] w-[70px] border-white/20 grayscale opacity-55"
                    }`}
                >
                  <Image src={album[imageIndex].image} alt={album[imageIndex].imageAlt} fill sizes={modalIndex === imageIndex ? "100px" : "70px"} className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

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
        onMouseEnter={handleFooterMouseEnter}
        onMouseLeave={handleFooterMouseLeave}
        className={`group cursor-pointer border border-border transition-colors duration-300 h-full grid grid-rows-[auto_1fr]
          ${isActive ? "bg-primary text-white" : "bg-white text-secondary"
          }`}
      >
        <div className="relative overflow-hidden ">
          <Image
            src={album[0].image}
            alt={title}
            width={513}
            height={426}
            sizes="(max-width: 1023px) 80vw, 28vw"
            className="h-[300px] object-cover transition-transform duration-700 group-hover:scale-105 xl:h-[400px] 3xl:h-[426px]"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/50" />
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

        <div
          className={`relative overflow-hidden px-5 pt-4 pb-8 xl:pt-7 3xl:px-30 3xl:pt-10 3xl:pb-50 3xl:pb-[51px] 3xl:pt-[41px] flex w-full ${isActive ? "bg-primary" : "bg-light"
            }`}
        >
          <span
            onTransitionEnd={handleFooterOverlayTransitionEnd}
            className={`absolute inset-0 bg-primary ${isFooterOverlayAnimated ? "transition-transform duration-500 ease-in-out" : ""
              } ${isActive
                ? "translate-x-0"
                : footerOverlayPosition === "center"
                  ? "translate-x-0"
                  : footerOverlayPosition === "end"
                    ? "translate-x-full"
                    : "-translate-x-full"
              }`}
          />
          <div className="relative z-10 grid grid-cols-[auto_1fr] w-full items-center gap-1">
            <h3 className={`font-condensed leading-[1.1] text-32 group-hover:text-white ${isActive ? "text-white" : "text-secondary"}`} >
              {title}
            </h3>
            <div className="flex shrink-0 items-center justify-end ">
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
                    <Image src={thumb.image} alt="" fill sizes="28px" className="object-cover" />
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
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-white text-[11px] font-nexa xl:text-[14.29px] leading-[1] font-bold text-primary transition-all duration-200 hover:scale-105 xl:h-[34px] xl:w-[34px]">
                    4+
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </article>
      {isOpen ? createPortal(modalContent, document.body) : null}
    </>
  );
}
