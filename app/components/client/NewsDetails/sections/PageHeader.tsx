"use client";

import { motion } from "framer-motion";

import { moveUp } from "@/app/components/motionVariants";
import Breadcrumb from "../../common/Breadcrumb";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const PageHeader = ({ date, category }: { date: string, category: string }) => {
  return (
    <section className="mt-13 md:mt-[77px] mb-5 pt-15 sm:mt-[90px] sm:mb-10 sm:pt-20 lg:mt-[122px] lg:mb-15 xl:mb-[65px] lg:pt-25 xl:pt-100 2xl:pt-130 3xl:pt-150">
      <div className="container">
        <motion.div
          className="flex flex-col-reverse md:flex-col gap-2 sm:gap-5 lg:flex-row lg:items-center lg:justify-between"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={moveUp(0.1)}
        >
          <p className="font-nexa text-16 sm:text-20 text-paragraph font-bold">
            Published on {formatDate(date)} | {category}
          </p>
          <div className="w-full overflow-x-auto lg:w-auto">
            <Breadcrumb variant="dark" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PageHeader;
