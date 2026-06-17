"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { moveLeft, moveUp } from "@/app/components/motionVariants";
import AnimatedHeading from "../../common/AnimateHeading";
import SliderNavButton from "../../common/NavigationButton";

const Certifications = ({ data }: { data: QualityType['thirdSection'] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const maxSlideIndex = Math.max(0, data.items.length - visibleItems);
  const currentSlideIndex = Math.min(slideIndex, maxSlideIndex);
  const canSlide = data.items.length > visibleItems;
  const slideStep = 100 / visibleItems;

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(4);
        return;
      }

      if (window.innerWidth >= 640) {
        setVisibleItems(2);
        return;
      }

      setVisibleItems(1);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? prev : (prev - 1 + data.items.length) % data.items.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? prev : (prev + 1) % data.items.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, data.items.length]);

  const showPreviousSlide = () => {
    setSlideIndex((prev) => {
      const clampedIndex = Math.min(prev, maxSlideIndex);
      return clampedIndex === 0 ? maxSlideIndex : clampedIndex - 1;
    });
  };

  const showNextSlide = () => {
    setSlideIndex((prev) => {
      const clampedIndex = Math.min(prev, maxSlideIndex);
      return clampedIndex === maxSlideIndex ? 0 : clampedIndex + 1;
    });
  };

  const showPreviousCertification = () => {
    setActiveIndex((prev) =>
      prev === null ? prev : (prev - 1 + data.items.length) % data.items.length,
    );
  };

  const showNextCertification = () => {
    setActiveIndex((prev) => (prev === null ? prev : (prev + 1) % data.items.length));
  };

  return (
    <section className="pt-40 pb-40 sm:pt-130 sm:pb-150 xl:py-130 bg-light">
      <div className="container">
        <AnimatedHeading text={data.title} className="mb-30" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p variants={moveUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="cmn-p font-bold max-w-3xl" > {data.subTitle} </motion.p>
          {canSlide ? (
            <motion.div
              variants={moveUp(0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex shrink-0 items-center gap-[10px] lg:gap-5"
            >
              <SliderNavButton direction="left" onClick={showPreviousSlide} />
              <SliderNavButton direction="right" onClick={showNextSlide} />
            </motion.div>
          ) : null}
        </div>

        <div className="mt-8 overflow-hidden border border-[#d9d9d9] xl:mt-10">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlideIndex * slideStep}%)` }}
          >
            {data.items.map((item, index) => (
              <motion.button
                key={index}
                type="button"
                variants={moveLeft(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.18 }}
                onClick={() => setActiveIndex(index)}
                className="group relative flex min-h-[260px] shrink-0 basis-full cursor-pointer items-center justify-center overflow-hidden border-r border-[#d9d9d9] bg-light p-6 transition-colors duration-300 sm:min-h-[320px] sm:basis-1/2 xl:min-h-[360px] xl:basis-1/4"
              >
                <Image
                  src={item.image}
                  alt={`Certification ${index + 1}`}
                  width={260}
                  height={340}
                  className="h-auto max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/92 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Certification ${activeIndex + 1}`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-3 top-2 z-[10060] flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent text-white transition-colors duration-200 hover:text-primary sm:right-5 sm:top-3 sm:h-10 sm:w-10"
            aria-label="Close certification"
          >
            <Image src="/assets/icons/close-icon.svg" width={20} height={20} alt="" />
          </button>
          <div className="relative w-full max-w-[1100px]" onClick={(event) => event.stopPropagation()} >
            <div className="pt-10 sm:pt-12">
              <div className="relative">
                <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-4">
                  <SliderNavButton direction="left" size="small" onClick={showPreviousCertification} />
                </div>
                <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-4">
                  <SliderNavButton direction="right" size="small" onClick={showNextCertification} />
                </div>
                <div className="mx-auto flex max-w-[860px] items-center justify-center bg-white p-4 sm:p-8">
                  <Image src={data.items[activeIndex].image} alt={`Certification ${activeIndex + 1}`} width={760} height={980} className="h-auto max-h-[78vh] w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Certifications;
