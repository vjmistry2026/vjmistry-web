"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedHeading from "./AnimateHeading";

type DecImgProps = {
  title: string;
  desc: string;
  image: string;
  alt?: string;
  className?: string;
  titleClass?: string;
  sectionClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  reverse?: boolean;
  priority?: boolean;
  shape?: boolean;
};

const DecImg = ({
  title,
  desc,
  image,
  alt,
  className = "",
  titleClass = "text-secondary",
  sectionClassName = "py-80 3xl:py-100",
  contentClassName = "",
  imageClassName = "",
  reverse = false,
  priority = false,
  shape = false,
}: DecImgProps) => {
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const [parallaxDistance, setParallaxDistance] = useState("11vh");

  const { scrollYProgress } = useScroll({
    target: imageWrapperRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", parallaxDistance]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(max-width: 1023px)");
    const updateParallax = () => {
      if (mobileQuery.matches) {
        setParallaxDistance("2vh");
        return;
      }

      if (tabletQuery.matches) {
        setParallaxDistance("4vh");
        return;
      }

      setParallaxDistance("11vh");
    };

    updateParallax();
    mobileQuery.addEventListener("change", updateParallax);
    tabletQuery.addEventListener("change", updateParallax);

    return () => {
      mobileQuery.removeEventListener("change", updateParallax);
      tabletQuery.removeEventListener("change", updateParallax);
    };
  }, []);

  return (
    <section className={`relative overflow-hidden ${sectionClassName}`}>
      {
        shape && (
          <div className="absolute bottom-[-7%] left-0">
            <img src="/assets/shapes/shape-main2.svg" width={"744px"} height={"669px"} alt="Shape" className=" w-[50%] xl:w-[80%] 3xl:w-[744px]" />
          </div>

        )
      }
      <div className="container">
        <div className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:items-stretch lg:items-center lg:gap-10 xl:gap-[60px] 2xl:gap-20 3xl:gap-[105px] ${className}`} >
          <div className={reverse ? "md:order-2" : ""}>
            <AnimatedHeading text={title} className={titleClass} />
            <p className={`cmn-p font-bold  ${contentClassName}`}>{desc}</p>
          </div>

          <div className={reverse ? "md:order-1 md:h-full lg:h-auto" : "md:h-full lg:h-auto"}>
            <div
              ref={imageWrapperRef}
              className={`relative overflow-hidden w-full h-[280px] sm:h-[360px] md:h-full lg:h-[420px] 3xl:h-[574px]
                [clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
                sm:[clip-path:polygon(0_0,calc(100%-70px)_0,100%_70px,100%_100%,0_100%)]
                md:[clip-path:polygon(0_0,calc(100%-100px)_0,100%_100px,100%_100%,0_100%)]
                lg:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_55px,100%_100%,0_100%)]
                xl:[clip-path:polygon(0_0,calc(100%-65px)_0,100%_65px,100%_100%,0_100%)]
                2xl:[clip-path:polygon(0_0,calc(100%-70px)_0,100%_70px,100%_100%,0_100%)]
                ${imageClassName}`}
            >
              <motion.div style={{ y }} className="h-full w-full">
                <Image src={image} alt={alt ?? title} fill className="pointer-events-none object-cover scale-[1.12] 3xl:scale-[1.2]" priority={priority} />
              </motion.div>

              <div style={{ background: "linear-gradient(179.84deg, rgba(0, 0, 0, 0) 55.5%, rgba(0, 0, 0, 0.245203) 77.26%, rgba(0, 0, 0, 0.5) 99.87%)", }}
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecImg;
