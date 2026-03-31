"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { whatSetsUsApartData } from "../data";
import CounterAnimate2 from "../../../common/CounterAnimate2";

const AUTOPLAY_INTERVAL = 3000;

const WhatSetsUsApart = () => {
  const { heading, bgImage, features, stats } = whatSetsUsApartData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Measure tallest card with descriptions fully expanded
  const measureHeight = useCallback(() => {
    const descDivs = document.querySelectorAll<HTMLElement>(".feature-desc");
    descDivs.forEach((el) => {
      el.style.gridTemplateRows = "1fr";
    });
    const max = Math.max(
      ...cardRefs.current.map((el) => el?.scrollHeight ?? 0),
    );
    descDivs.forEach((el) => {
      el.style.gridTemplateRows = "";
    });
    if (max > 0) setCardHeight(max);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isHoveringRef.current)
        setActiveIndex((prev) => (prev + 1) % features.length);
    }, AUTOPLAY_INTERVAL);
  }, [features.length]);

  // Start timer + measure only when section enters viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          measureHeight();
          startTimer();
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    window.addEventListener("resize", measureHeight);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("resize", measureHeight);
    };
  }, [measureHeight, startTimer]);

  const handleMouseEnter = (index: number) => {
    isHoveringRef.current = true;
    setActiveIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    startTimer();
  };

  return (
    <>
      <section ref={sectionRef} className="relative bg-secondary py-100 md:py-130 overflow-hidden" >
        <div className="absolute inset-0 z-0">
          <Image src={bgImage} alt="" fill className="object-cover object-center pointer-events-none" priority />
          <div className="absolute inset-0 bg-secondary/60" />
        </div>

        <div className="container relative z-10">
          <h2 className="section-heading text-paragraph-2 mb-5 md:mb-12 lg:mb-15"> {heading} </h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`relative border-border border-l border-r border-b ${index === 0 ? "border-t" : ""} md:border-t md:border-l-0 ${index === 0 ? "md:border-l-1" : ""}`}
                  style={{ height: cardHeight ? `${cardHeight}px` : "auto" }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isActive && (
                    <div
                      className="absolute z-10 pointer-events-none"
                      style={{
                        top: "-1px",
                        left: "-1px",
                        width: "calc(100% + 2px)",
                        height: "calc(100% + 2px)",
                        background:
                          "linear-gradient(180deg, #ED1C24 0%, #A71E22 100%)",
                      }}
                    />
                  )}

                  <div className="p-[24px] lg:p-[30px] h-full cursor-pointer relative flex flex-col justify-between z-20">
                    <div className={`w-[60px] h-[60px] flex items-center justify-center transition-colors duration-300 shrink-0 mb-[33px] ${isActive ? "bg-secondary" : "bg-paragraph-2"}`} >
                      <Image src={feature.icon} alt={feature.title} width={22} height={22}
                        className={`pointer-events-none w-auto h-[32px] transition-all duration-300 ${isActive ? "invert brightness-0" : ""}`}
                      />
                    </div>

                    <div className="shrink-0">
                      <h3 className="text-32 font-condensed text-paragraph-2 leading-[100%]">
                        {feature.title}
                      </h3>
                      {/* grid-rows 0fr→1fr animates to exact content height — no lag */}
                      <div className="feature-desc grid transition-all duration-300" style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }} >
                        <div className="overflow-hidden">
                          <p className={`section-description text-paragraph-2/70 transition-opacity duration-300 ${isActive ? "opacity-100 mt-5" : "opacity-0 mt-0"}`}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paragraph-2 border-b border-border mb-100 md:mb-130 lg:mb-150">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`p-10 xl:p-[63px] border-r border-border ${
                  index === 0 ? "border-l" : ""
                } ${index === 2 ? "border-l md:border-l-0" : ""} ${
                  index < 2 ? "border-b md:border-b-0 border-border" : ""
                }`}
              >
                <p className="font-condensed text-primary text-60 3xl:text-85 leading-[100%] mb-3 md:mb-[10px]">
                  <CounterAnimate2
                    value={stat.value}
                    totalTime={2}
                    start={0}
                  />
                </p>
                <p className="font-nexa leading-[1.2] md:leading-1p5 font-bold text-paragraph text-base md:text-20">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatSetsUsApart;
