"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useEffect, useRef, useState } from "react";
import AnimatedHeading from "../../common/AnimateHeading";
import { qualityData } from "../data";
import ContainerAnchor from "../../Layout/ContainerAnchor";

const QualityShield = ({ data }: { data: QualityType['secondSection'] }) => {
  // const { title, desc, steps } = qualityData.qualityShield;
  const [activeIndex, setActiveIndex] = useState(
    data.items.findIndex((step) => step.title) >= 0
      ? data.items.findIndex((step) => step.title)
      : 0,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const firstColumnRef = useRef<HTMLDivElement>(null);
  const [shapeBoundary, setShapeBoundary] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !firstColumnRef.current) return;

    const sectionEl = sectionRef.current;
    const firstColumnEl = firstColumnRef.current;

    const calculateBoundary = () => {
      const sectionRect = sectionEl.getBoundingClientRect();
      const firstColumnRect = firstColumnEl.getBoundingClientRect();
      setShapeBoundary(firstColumnRect.right - sectionRect.left);
    };

    calculateBoundary();

    const sectionObserver = new ResizeObserver(calculateBoundary);
    sectionObserver.observe(sectionEl);
    sectionObserver.observe(firstColumnEl);

    window.addEventListener("resize", calculateBoundary);

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("resize", calculateBoundary);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-light py-40 sm:py-130 ">
      <ContainerAnchor />
      <div className="absolute bottom-[-3%] left-0 z-[5] overflow-hidden" style={shapeBoundary ? { width: `${shapeBoundary}px` } : undefined}
      >
        <Image src="/assets/shapes/shape-quality-shield.svg" width={1066} height={731} alt="" className="w-[1066px] object-contain" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(0,1.2fr)_minmax(440px,1fr)] gap-y-10">
          <div ref={firstColumnRef} className="flex flex-col">
            <AnimatedHeading text={data.title} className="mb-30" />
            <motion.p variants={moveUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="cmn-p font-bold max-w-[51ch]" > {data.subTitle} </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-border xl:block" />
            <div className="flex flex-col gap-6 xl:gap-15">
              {data.items.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={step.title}
                    variants={moveUp(index * 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative border-b border-border pb-6 xl:border-b-0 xl:pb-0 xl:pl-10 2xl:pl-25 3xl:pl-[108px]"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="group block w-full cursor-pointer text-left"
                    >
                      {isActive ? (
                        <span className="absolute left-0 top-0 hidden -translate-x-1/2 xl:block">
                          <Image
                            src="/assets/images/quality/active-sqr.svg"
                            width={36}
                            height={36}
                            alt=""
                            className="h-[30px] w-[30px] object-contain"
                          />
                        </span>
                      ) : (
                        <span className="absolute left-0 top-[8px] hidden h-[10px] w-[10px] xl:h-[13px] xl:w-[13px] -translate-x-1/2 bg-primary transition-transform duration-300 group-hover:scale-110 xl:block" />
                      )}

                      <span className="flex items-start justify-between gap-4">
                        <h3
                          className={`font-condensed text-[30px] leading-none transition-colors duration-300 ${isActive ? "text-primary" : "text-secondary"
                            }`}
                        >
                          {step.title}
                        </h3>
                        <span
                          className={`mt-1 inline-flex shrink-0 xl:hidden transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"
                            }`}
                          aria-hidden="true"
                        >
                          <Image
                            src="/assets/icons/bottom_arrow_tip.svg"
                            width={18}
                            height={9}
                            alt=""
                            className="h-[8px] w-[16px] object-contain"
                          />
                        </span>
                      </span>
                    </button>

                    <div className="pt-3 xl:pt-4">
                      <p className="cmn-p max-w-[38ch] font-bold text-paragraph">
                        {step.description}
                      </p>

                      <AnimatePresence initial={false}>
                        {isActive && step.image ? (
                          <motion.div
                            key={`step-image-${step.title}`}
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="relative h-[220px] overflow-hidden md:h-[280px] xl:h-[195px] 2xl:h-[260px] 3xl:h-[306px]">
                              <Image
                                src={step.image}
                                alt={step.imageAlt}
                                fill
                                sizes="(max-width: 1279px) 100vw, 40vw"
                                className="object-cover"
                              />
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityShield;
