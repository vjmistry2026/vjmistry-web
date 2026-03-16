"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { companyTimelineData } from "../data";
import SliderNavButton from "../../../common/NavigationButton";
import AnimatedHeading from "../../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveLeft, moveUp, moveUpV2 } from "@/app/components/motionVariants";
import Reveal from "../../../common/RevealOneByOneAnimation";

const SLOT_HEIGHT = "80px";

const CompanyTimeline = () => {
  const { heading, description, slides } = companyTimelineData;
  const N = slides.length;
  const tripled = [...slides, ...slides, ...slides];

  const [offsetIndex, setOffsetIndex] = useState(N);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [lineStyle, setLineStyle] = useState<{ left: number; top: number } | null>(null);

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIndexRef = useRef(0);
  const offsetIndexRef = useRef(N);
  const isTransitioningRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeIndex];
  const prevSlide = slides[prevIndex];

  const measureLine = useCallback(() => {
    if (!leftColRef.current || !rightColRef.current || !rowRef.current) return;
    if (window.innerWidth < 1024) { setLineStyle(null); return; }
    const rowRect = rowRef.current.getBoundingClientRect();
    const leftRect = leftColRef.current.getBoundingClientRect();
    const rightRect = rightColRef.current.getBoundingClientRect();
    setLineStyle({
      left: leftRect.right - rowRect.left,
      top: (rightRect.top - rowRect.top) + 90 + 6,
    });
  }, []);

  useEffect(() => {
    measureLine();
    window.addEventListener("resize", measureLine);
    return () => window.removeEventListener("resize", measureLine);
  }, [measureLine]);

  const transition = useCallback((nextRealIndex: number, direction: 1 | -1) => {
    if (isTransitioningRef.current || nextRealIndex === activeIndexRef.current) return;
    isTransitioningRef.current = true;

    const current = activeIndexRef.current;
    const steps =
      direction === 1
        ? (nextRealIndex - current + N) % N || N
        : (current - nextRealIndex + N) % N || N;

    const nextOffset = offsetIndexRef.current + direction * steps;

    setPrevIndex(current);
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(nextRealIndex);
      activeIndexRef.current = nextRealIndex;
      setTimeout(() => setIsFading(false), 50);
    }, 300);

    setAnimated(true);
    setOffsetIndex(nextOffset);
    offsetIndexRef.current = nextOffset;

    setTimeout(() => {
      const snapped = N + nextRealIndex;
      setAnimated(false);
      setOffsetIndex(snapped);
      offsetIndexRef.current = snapped;
      setTimeout(() => {
        setAnimated(true);
        isTransitioningRef.current = false;
      }, 20);
    }, 520);
  }, [N]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!isTransitioningRef.current) transition((activeIndexRef.current + 1) % N, 1);
    }, 4000);
  }, [transition, N]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAutoplay();
        else if (autoplayRef.current) clearInterval(autoplayRef.current);
      },
      { rootMargin: "-20% 0px 0px 0px", threshold: 0 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  const handlePrev = () => { transition((activeIndexRef.current - 1 + N) % N, -1); startAutoplay(); };
  const handleNext = () => { transition((activeIndexRef.current + 1) % N, 1); startAutoplay(); };
  const handleSlideClick = (i: number) => { transition(i, 1); startAutoplay(); };

  const trackStyle = {
    transform: `translateX(calc(-1 * var(--slot-w) * ${offsetIndex}))`,
    transition: animated ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
  };

  return (
    <section ref={sectionRef} className="bg-white pb-100 md:pb-130 3xl:pb-150 overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-5 lg:gap-[30px] mb-[30px] lg:mb-15">
          <AnimatedHeading text={heading} className="max-w-[907px] leading-[120%]" />
          <div className="flex justify-between items-end gap-6">
            <motion.p
              initial="hidden"
              whileInView="show"
              variants={moveUp(0.2)}
              viewport={{ once: true }}
              className="section-description"
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
          ref={rowRef}
          initial="hidden"
          whileInView="show"
          variants={moveUp(0.3)}
          viewport={{ once: true }}
          className="relative flex flex-col lg:flex-row lg:items-end lg:gap-12"
        >
          {lineStyle && (
            <div
              className="hidden lg:block absolute right-0 h-[1.5px] bg-border z-10 pointer-events-none"
              style={{ left: lineStyle.left, top: lineStyle.top }}
            />
          )}

          <div ref={leftColRef} className="w-full lg:w-[48%] 3xl:w-[742px] shrink-0 lg:self-stretch">
            <div className="relative w-full aspect-[603/357] lg:aspect-auto lg:h-full 3xl:h-[437px] overflow-hidden">
              <Image src={prevSlide.image} alt={prevSlide.title} fill className="object-cover pointer-events-none" priority />
              <Image
                key={activeIndex}
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                className={`object-cover pointer-events-none transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
                priority
              />
              <div
                style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(180deg, rgba(0,0,0,0) 41.82%, rgba(0,0,0,0.6) 100%)" }}
                className="absolute inset-0"
              />
            </div>
          </div>

          <div ref={rightColRef} className="w-full lg:w-[52%] flex flex-col pt-10 lg:pt-[90px] overflow-hidden">

            <div className="block lg:hidden relative">
              <div className="absolute left-0 right-0 h-[1.5px] bg-border z-0" style={{ top: "6px" }} />
              <div className="relative z-10 timeline-outer">
                <div className="timeline-track flex" style={trackStyle as React.CSSProperties}>
                  {tripled.map((slide, i) => {
                    const realIndex = i % N;
                    const isActive = realIndex === activeIndex;
                    return (
                      <div key={i} className="timeline-slot flex-shrink-0">
                        <Reveal variants={moveUpV2}>
                          <button
                            onClick={() => handleSlideClick(realIndex)}
                            aria-label={`Go to ${slide.year}`}
                            className="flex flex-col items-start w-full"
                            style={{ height: SLOT_HEIGHT }}
                          >
                            <div className="flex flex-col items-center">
                              <div className={`transition-all duration-300 mb-[18px] ${isActive ? "w-[13px] h-[13px] bg-primary lg:mt-[0.3px]" : "w-[8px] h-[8px] bg-paragraph mt-[2.9px]"}`} />
                              <span className={`section-description transition-all duration-300 ${isActive ? "text-primary text-35 leading-[1.285]" : ""}`}>
                                {slide.year}
                              </span>
                            </div>
                          </button>
                        </Reveal>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative z-10 timeline-outer">
              <div className="timeline-track flex" style={trackStyle as React.CSSProperties}>
                {tripled.map((slide, i) => {
                  const realIndex = i % N;
                  const isActive = realIndex === activeIndex;
                  return (
                    <div key={i} className="timeline-slot flex-shrink-0">
                      <Reveal variants={moveUpV2}>
                        <button
                          onClick={() => handleSlideClick(realIndex)}
                          aria-label={`Go to ${slide.year}`}
                          className="flex flex-col items-start w-full"
                          style={{ height: SLOT_HEIGHT }}
                        >
                          <div className="flex flex-col items-center">
                            <div className={`transition-all duration-300 mb-[18px] ${isActive ? "w-[13px] h-[13px] bg-primary -mt-[7px] lg:mt-[0.3px]" : "w-[8px] h-[8px] bg-paragraph -mt-1 lg:mt-[2.9px]"}`} />
                            <span className={`section-description transition-all duration-300 ${isActive ? "text-primary text-35 leading-[1.285]" : ""}`}>
                              {slide.year}
                            </span>
                          </div>
                        </button>
                      </Reveal>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fixed height on both breakpoints — content never causes section to jump */}
            <div key={activeIndex} className="mt-10 lg:mt-auto shrink-0 h-[160px] lg:h-[200px] 2xl:h-[220px] relative">
              <div className="absolute inset-0 flex flex-col justify-end">
                <motion.h3
                  key={`${activeIndex}-title`}
                  initial="hidden"
                  animate="show"
                  variants={moveUp(0)}
                  className="text-32 font-condensed leading-[100%] text-secondary mb-5 lg:mb-[30px]"
                >
                  {activeSlide.title}
                </motion.h3>
                <motion.p
                  key={`${activeIndex}-desc`}
                  initial="hidden"
                  animate="show"
                  variants={moveUp(0.15)}
                  className="section-description max-w-[762px]"
                >
                  {activeSlide.description}
                </motion.p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .timeline-outer { --slot-w: calc(100% / 2.5); }
        @media (min-width: 1024px) { .timeline-outer { --slot-w: calc(100% / 3.7); } }
        @media (min-width: 1550px) { .timeline-outer { --slot-w: calc(100% / 4.5); } }
        .timeline-slot { width: var(--slot-w); }
      `}</style>
    </section>
  );
};

export default CompanyTimeline;