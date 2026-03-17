"use client";

import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import AnimatedHeading from "./AnimateHeading";
import HeroAnimatedHeading from "@/app/components/client/common/HeroAnimation";

type Props = {
  title: string;
  image: string;
};

const PageBanner = ({ title, image }: Props) => {
  return (
    <section className="relative w-full h-[420px] lg:h-[500px] 2xl:h-[550px] 3xl:h-[763px] overflow-hidden">
      <div className="absolute left-0 bottom-[0%] sm:-bottom-[12%] 2xl:-bottom-[14%] w-[350px] sm:w-[500px] md:w-[600px] lg:w-[700px] 2xl:w-[920px] 3xl:w-[1210px] h-auto z-50">
        <Image
          src="/assets/icons/banner_bg_svg2.svg"
          alt=""
          width={1210}
          height={500}
          className="w-full h-full opacity-50"
        />
      </div>
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover object-center"
      />
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 17.65%, rgba(0, 0, 0, 0.5) 100%)",
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute bottom-5 sm:bottom-10 lg:bottom-[50px] 3xl:bottom-[71px] left-0 right-0">
        <div className="container flex flex-col lg:flex-row items-start lg:items-end justify-between gap-y-2 md:gap-y-5">
          <HeroAnimatedHeading
            text={title}
            className="text-75 3xl:text-85 text-paragraph-2"
          />
          <Breadcrumb />
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
