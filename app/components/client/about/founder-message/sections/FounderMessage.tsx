"use client";

import Image from "next/image";
import { foundersMessageData } from "../data";
import Breadcrumb from "@/app/components/client/common/Breadcrumb";
import AnimatedHeading from "../../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveLeft } from "@/app/components/motionVariants";
import { useEffect, useRef, useState } from "react";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FoundersMessage() {
  const { heading, description, founder } = foundersMessageData;
  const descriptionColumnRef = useRef<HTMLDivElement>(null);
  const [imageColumnHeight, setImageColumnHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!descriptionColumnRef.current) return;

    const descriptionEl = descriptionColumnRef.current;

    const updateHeight = () => {
      if (window.innerWidth < 1280) {
        setImageColumnHeight(null);
        return;
      }

      setImageColumnHeight(descriptionEl.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(descriptionEl);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <section className="relative bg-white w-full overflow-hidden mt-[77px] lg:mt-[122px]">
      <div className="absolute top-[-1.5%] right-0 w-auto h-full md:max-w-[900px] xl:max-w-[1180px] 2xl:max-w-[1220px] 3xl:max-w-[1598.48px] 3xl:h-[708px]">
        <Image src="/assets/images/about/founder-message/bg-svg.svg" alt="" width={1598.48} height={708} className="pointer-events-none object-contain" />
      </div>

      <div className="relative z-10 container pt-5 pb-10 md:py-100 lg:py-130 3xl:py-150">
        {/* Breadcrumb */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={moveLeft(0.2)}
          className="mb-5 md:mb-10 lg:mb-12 2xl:mb-15 w-full flex xl:justify-end"
        >
          <Breadcrumb variant="dark" />
        </motion.div>

        <AnimatedHeading text={heading} className="mb-5 lg:mb-8" />

        <div className="flex flex-col xl:flex-row items-stretch 3xl:items-end justify-between gap-8 lg:gap-15 2xl:gap-22">
          {/* ── LEFT COLUMN ── */}
          <div ref={descriptionColumnRef} className="flex flex-col order-2 xl:order-1">
            <div className="mb-5 lg:mb-8">
              <Image
                src="/assets/images/about/founder-message/quotes.svg"
                alt="Quote"
                width={50}
                height={42}
                className="h-8 xl:h-[42] w-auto"
              />
            </div>

            <div
              className="section-description xl:max-w-[748px]"
              dangerouslySetInnerHTML={{
                __html: description.replace(/\n\n/g, "<br><br>"),
              }}
            />
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="relative w-full xl:w-[50%] 3xl:w-[746px] h-full shrink-0 pl-10 xl:pl-6 order-1 xl:order-2">
            {/* Aspect ratio box — gives real height at all breakpoints */}
            <div
              className="relative w-full aspect-[4/3] lg:aspect-[16/11] h-full xl:aspect-auto"
              style={imageColumnHeight ? { height: `${imageColumnHeight}px` } : undefined}
            >
              <Image
                src={founder.imageSrc}
                alt={founder.imageAlt}
                fill
                className="object-cover object-top
        [clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
        sm:[clip-path:polygon(0_0,calc(100%-70px)_0,100%_70px,100%_100%,0_100%)]
        md:[clip-path:polygon(0_0,calc(100%-100px)_0,100%_100px,100%_100%,0_100%)]
        lg:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
        xl:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_65px,100%_100%,0_100%)]
        2xl:[clip-path:polygon(0_0,calc(100%-85px)_0,100%_70px,100%_100%,0_100%)]"
                sizes="(max-width: 1024px) 100vw, 722px"
                priority
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(180.14deg, rgba(0, 0, 0, 0) 50.07%, rgba(0, 0, 0, 0.245203) 74.5%, rgba(0, 0, 0, 0.5) 99.88%)",
                }}
              />
            </div>

            {/* Name plate */}
            <div
              style={{
                background: "linear-gradient(180deg, #ED1C24 0%, #A71E22 100%)",
              }}
              className="absolute -left-0 bottom-[37px] z-[2] p-3 xl:p-5 min-w-[240px] xl:-translate-x-7 flex flex-col gap-[6px] xl:gap-[10px]"
            >
              <p className="text-[22px] md:text-32 font-condensed leading-[100%] text-paragraph-2">
                {founder.name}
              </p>
              <p className="md:text-20 text-16 font-nexa font-bold leading-[1.5] text-paragraph-2/70">
                {founder.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
