"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { servicesSectionData } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import { ServiceType } from "@/app/types/service";

const FILLOUT_MS = 300;
const FILLIN_MS = 350;

const ServicesSection = ({ data }: { data: ServiceType['firstSection'] }) => {
  // const { heading, services } = servicesSectionData;
  const heading = data.title;
  const services = data.items;
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolledDown, setScrolledDown] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerTransition = useCallback((nextIndex: number) => {
    if (nextIndex === activeRef.current) return;
    const direction = nextIndex > activeRef.current;
    if (timerRef.current) clearTimeout(timerRef.current);
    const prev = activeRef.current;
    activeRef.current = nextIndex;
    setVisibleIndex(prev);
    setScrolledDown(direction);
    setActiveIndex(-1);
    timerRef.current = setTimeout(() => {
      setVisibleIndex(nextIndex);
      setActiveIndex(nextIndex);
      timerRef.current = null;
    }, FILLOUT_MS);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let isDown = true;

    const makeObserver = (rootMargin: string) =>
      new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .map((e) => ({
              index: cardRefs.current.indexOf(e.target as HTMLDivElement),
              rect: e.boundingClientRect,
            }))
            .filter((e) => e.index !== -1);
          if (!visible.length) return;
          const vh = window.innerHeight;
          const best = visible.reduce((a, b) =>
            Math.abs(a.rect.top + a.rect.height / 2 - vh / 2) <
              Math.abs(b.rect.top + b.rect.height / 2 - vh / 2)
              ? a
              : b,
          );
          triggerTransition(best.index);
        },
        { rootMargin, threshold: 0 },
      );

    let down = makeObserver("-75% 0px -75% 0px");
    let up = makeObserver("-50% 0px -50% 0px");

    const attach = (obs: IntersectionObserver) =>
      cardRefs.current.forEach((el) => el && obs.observe(el));

    attach(down);

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y >= lastY;
      lastY = y;
      if (goingDown === isDown) return;
      isDown = goingDown;
      down.disconnect();
      up.disconnect();
      down = makeObserver("-60% 0px -60% 0px");
      up = makeObserver("-60% 0px -60% 0px");
      attach(goingDown ? down : up);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      down.disconnect();
      up.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerTransition]);

  return (
    <section className="py-100 lg:py-130 3xl:py-150">
      <div className="border-b border-border pb-4">
        <div className="container mb-5 md:mb-[30px] 2xl:mb-[60px]">
          <AnimatedHeading className="section-heading leading-[120%] max-w-[711px]" text={heading} />
        </div>
        <div>
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={index} ref={(el) => { cardRefs.current[index] = el; }}
                className={`relative overflow-hidden border-t border-border ${index === services.length - 1 ? "border-b" : ""}`}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #ED1C24 0%, #A71E22 100%)",
                    transformOrigin: isActive
                      ? scrolledDown
                        ? "top"
                        : "bottom"
                      : scrolledDown
                        ? "bottom"
                        : "top",
                    transform: `scaleY(${isActive ? 1 : 0})`,
                    transition: isActive
                      ? `transform ${FILLIN_MS}ms ease-in-out`
                      : index === visibleIndex
                        ? `transform ${FILLOUT_MS}ms ease-in-out`
                        : "none",
                  }}
                />
                <div className="container">
                  <div className="relative border-l border-r border-border z-10">
                    <div className="flex flex-col lg:flex-row items-center">
                      <div className="w-full lg:w-[54%] xl:w-[59%] p-6 md:p-10 lg:py-12 2xl:p-15">
                        <div className="mb-7 lg:mb-[38px]">
                          <Image src={service.logo} alt={service.logoAlt} width={62} height={62}
                            className={`w-auto h-[40px] lg:h-[62px] pointer-events-none transition-all duration-250 ${isActive ? "invert brightness-0" : ""}`}
                          />
                        </div>
                        <h3
                          className={`text-32 font-condensed leading-[100%] mb-5 lg:mb-[30px] transition-colors duration-300 ${isActive ? "text-paragraph-2" : "text-secondary"}`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`section-description transition-colors duration-300 ${isActive ? "text-paragraph-2/70" : "text-paragraph"}`}
                        >
                          {service.description}
                        </p>
                      </div>
                      <div className="w-full lg:w-[46%] xl:w-[41%] px-6 pb-6 md:px-10 md:pb-10 lg:py-12 2xl:p-15 border-l border-border">
                        <div
                          className="relative w-full overflow-hidden h-[280px] md:h-[400px] lg:max-w-[552px] [clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
                                        sm:[clip-path:polygon(0_0,calc(100%-70px)_0,100%_60px,100%_100%,0_100%)]
                                        md:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_55px,100%_100%,0_100%)]
                                        lg:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_45px,100%_100%,0_100%)]
                                        xl:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_55px,100%_100%,0_100%)]"
                        >
                          <Image
                            src={service.image}
                            alt={service.imageAlt ?? service.title}
                            fill
                            className="object-cover pointer-events-none"
                          />
                        </div>
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
  );
};

export default ServicesSection;
