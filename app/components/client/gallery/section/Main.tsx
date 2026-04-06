"use client";

import { motion } from "framer-motion";
import AlbumCard from "../../common/AlbumCard";
import AnimatedHeading from "../../common/AnimateHeading";
import { moveUp } from "@/app/components/motionVariants";
import { GalleryData } from "../data";
import { GalleryType } from "@/app/types/gallery";

const Main = ({ firstSection, items }: { firstSection: GalleryType['firstSection'], items: GalleryType['items'] }) => {
  // const { title, desc, items } = GalleryData.gallerySection;

  return (
    <section className="py-50 sm:py-130 xl:py-150">
      <div className="container">
        <AnimatedHeading text={firstSection.title} className="mb-30" />
        <motion.p
          variants={moveUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="cmn-p font-bold max-w-[80ch]"
        >
          {firstSection.description}
        </motion.p>

        <div className="mt-8 xl:mt-10 2xl:mt-15 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:mt-10 xl:grid-cols-3 3xl:gap-10 mb-5 md:mb-0">
          {items.map((item, index) => (
            <motion.div
              key={`${item.item}-${index}`}
              variants={moveUp(index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              className="flex flex-col h-full"
            >
              <AlbumCard title={item.item} album={item.images} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
