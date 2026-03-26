"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { moveUp } from "@/app/components/motionVariants";
import AnimatedHeading from "../../common/AnimateHeading";
import SliderNavButton from "../../common/NavigationButton";
import { qualityData } from "../data";

const Certifications = () => {
  const { title, desc, items } = qualityData.certifications;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? prev : (prev - 1 + items.length) % items.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? prev : (prev + 1) % items.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  const showPrevious = () => {
    setActiveIndex((prev) =>
      prev === null ? prev : (prev - 1 + items.length) % items.length,
    );
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev === null ? prev : (prev + 1) % items.length));
  };

  return (
    <section className="pt-130 pb-150 xl:py-130">
      <div className="container">
        <AnimatedHeading text={title} className="mb-2 md:mb-30" />
        <motion.p variants={moveUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="cmn-p font-bold max-w-3xl" > {desc} </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:mt-10 xl:grid-cols-4">
          {items.map((item, index) => (
            <motion.button key={item} type="button" variants={moveUp(index * 0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}
              onClick={() => setActiveIndex(index)}
              className="group relative flex min-h-[260px] cursor-pointer items-center justify-center overflow-hidden bg-light p-6 transition-colors duration-300 hover:bg-white sm:min-h-[320px] xl:min-h-[360px]"
            >
              <Image src={item} alt={`Certification ${index + 1}`} width={260} height={340} className="h-auto max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
            </motion.button>
          ))}
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

          <div
            className="relative w-full max-w-[1100px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pt-10 sm:pt-12">
              <div className="relative">
                <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-4">
                  <SliderNavButton
                    direction="left"
                    size="small"
                    onClick={showPrevious}
                  />
                </div>

                <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-4">
                  <SliderNavButton
                    direction="right"
                    size="small"
                    onClick={showNext}
                  />
                </div>

                <div className="mx-auto flex max-w-[860px] items-center justify-center bg-white p-4 sm:p-8">
                  <Image
                    src={items[activeIndex]}
                    alt={`Certification ${activeIndex + 1}`}
                    width={760}
                    height={980}
                    className="h-auto max-h-[78vh] w-auto object-contain"
                  />
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
