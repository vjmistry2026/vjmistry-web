"use client";

import Image from "next/image";
import { videoSectionData } from "../data";
import { motion } from "framer-motion";
import { ProjectType } from "@/app/types/project";

export default function VideoSection({ data }: { data: ProjectType['projects'][number]['thirdSection'] }) {
  return (
    <section className="overflow-hidden">
      <div className="relative w-full h-[350px] lg:h-auto lg:max-h-[895px]">

        {/* reveal overlay */}
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-white/30 origin-right z-20"
        />

        {/* gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />

        {/* play button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-15 h-15 lg:w-18 lg:h-18 xl:w-21 xl:h-21 bg-paragraph-2 group rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 cursor-pointer">
            <Image
              src="/assets/icons/play.svg"
              alt="play"
              width={11}
              height={15}
              className="w-[11px] h-[15px] shrink-0 group-hover:scale-110 group-hover:invert group-hover:brightness-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* image */}
        <Image
          src={data.items[0].image}
          alt="project"
          className="w-full object-cover"
          width={2000}
          height={752}
        />
      </div>
    </section>
  );
}