"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import AnimatedHeading from "../../common/AnimateHeading";
import { reachOutData } from "../data";

const iconMap = {
  address: "/assets/images/contactus/icons/location.svg",
  phone: "/assets/images/contactus/icons/phone.svg",
  email: "/assets/images/contactus/icons/mail.svg",
} as const;

const ReachOutUs = () => {
  const lineAnimationFrameRef = useRef<number | null>(null);
  const [linePositions, setLinePositions] = useState<Record<number, "start" | "center" | "end">>({});
  const [animatedLines, setAnimatedLines] = useState<Record<number, boolean>>({});

  useEffect(() => {
    return () => {
      if (lineAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(lineAnimationFrameRef.current);
      }
    };
  }, []);

  const setLinePosition = (index: number, position: "start" | "center" | "end", animated: boolean) => {
    setLinePositions((prev) => ({ ...prev, [index]: position }));
    setAnimatedLines((prev) => ({ ...prev, [index]: animated }));
  };

  const handleLineMouseEnter = (index: number) => {
    if (lineAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(lineAnimationFrameRef.current);
      lineAnimationFrameRef.current = null;
    }

    if (linePositions[index] === "end") {
      setLinePosition(index, "start", false);

      lineAnimationFrameRef.current = window.requestAnimationFrame(() => {
        lineAnimationFrameRef.current = window.requestAnimationFrame(() => {
          setLinePosition(index, "center", true);
          lineAnimationFrameRef.current = null;
        });
      });

      return;
    }

    setLinePosition(index, "center", true);
  };

  const handleLineMouseLeave = (index: number) => {
    if (lineAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(lineAnimationFrameRef.current);
      lineAnimationFrameRef.current = null;
    }

    setLinePosition(index, "end", true);
  };

  const handleLineTransitionEnd = (index: number) => {
    if (linePositions[index] !== "end") return;

    setLinePosition(index, "start", false);
  };

  return (
    <section className="pb-130">
      <div className="container">
        <div className="mb-7 md:mb-10 xl:mb-15">
          <AnimatedHeading text={reachOutData.title} className="mb-2 md:mb-30 leading-[1]" />
          <motion.p
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="cmn-p font-bold"
          >
            {reachOutData.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-10">
          {reachOutData.items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={moveUp(0.2 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onMouseEnter={() => handleLineMouseEnter(index)}
              onMouseLeave={() => handleLineMouseLeave(index)}
              className="bg-light px-4 py-5 xl:px-6 xl:py-7 2xl:px-[44px] 2xl:py-[53px] group"
            >
              <h3 className="font-condensed text-32 leading-[1.2] text-secondary">
                {item.title}
              </h3>

              <div className="relative mb-5 mt-5 h-px w-full overflow-hidden bg-border xl:mt-[25px] xl:mb-30">
                <span
                  onTransitionEnd={() => handleLineTransitionEnd(index)}
                  className={`absolute inset-0 bg-primary ${
                    animatedLines[index] ? "transition-transform duration-500 ease-in-out" : ""
                  } ${
                    linePositions[index] === "center"
                      ? "translate-x-0"
                      : linePositions[index] === "end"
                        ? "translate-x-full"
                        : "-translate-x-full"
                  }`}
                />
              </div>

              <div className="space-y-4 xl:space-y-30">
                <div className="flex items-start gap-3 text-paragraph/70">
                  <div className="min-w-[27px]">
                    <Image src={iconMap.address} alt="" width={22.99} height={26.66} className="mt-1 h-3 w-3 xl:w-[22.99px] xl:h-[26.66px] shrink-0" />
                  </div>
                  <p className="cmn-p font-bold">{item.address}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 xl:gap-x-10 gap-y-4">
                  {item.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-start gap-3 text-paragraph/70 transition-colors duration-300 hover:text-primary"
                    >
                      <div className="min-w-[27px]">
                      <Image src={iconMap.phone} alt="" width={32} height={32} className="mt-1 h-3 w-3 xl:w-[26px] xl:h-[26px] shrink-0" />
                      </div>
                      <span className="cmn-p font-bold">{phone}</span>
                    </a>
                  ))}
                </div>

                <a href={`mailto:${item.email}`} className="flex items-start gap-3 text-paragraph/70 transition-colors duration-300 hover:text-primary" >
                  <div className="min-w-[27px]">
                  <Image src={iconMap.email} alt="" width={32} height={32} className="mt-1 h-3 w-3 xl:w-[32px] xl:h-[32.21px] shrink-0" />
                  </div>
                  <span className="cmn-p font-bold">{item.email}</span>
                </a>
              </div>

              <div className="mt-7">
                <Link
                  href={item.directionHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center font-nexa font-bold text-16 transition-all duration-250"
                  aria-label={`Get direction to ${item.title}`}
                >
                  <span className="mr-2 inline-flex h-[44px] xl:h-[64px] items-center justify-center whitespace-nowrap border border-border px-6 text-secondary transition-all duration-300 group-hover:mr-0 group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:h-[52px] sm:px-8">
                    Get Direction
                  </span>
                  <span className="inline-flex h-[44px] xl:h-[64px] w-[44px] xl:w-[64px] items-center justify-center border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary sm:h-[52px] sm:w-[52px]">
                    <Image src="/assets/icons/right-top-arrow-primary.svg" alt="" width={12} height={12}
                      className="h-3 w-3 rotate-0 object-contain transition-all duration-300 group-hover:rotate-45 group-hover:invert group-hover:brightness-0 sm:h-[14px] sm:w-[14px]"
                    />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReachOutUs;
