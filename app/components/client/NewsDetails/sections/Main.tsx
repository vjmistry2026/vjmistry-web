"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { moveLeft, moveUp } from "@/app/components/motionVariants";
import { newsDetails } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import Image from "next/image";

const Main = () => {
  return ( 
    <section>
      <div className="container">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-20 lg:flex-row lg:items-start lg:justify-between 3xl:mb-30">
          <div className="min-w-0 flex-1">
            <AnimatedHeading text={newsDetails[0].title} className="mb-4 sm:mb-5 lg:mb-[30px]" />
          </div>
          <motion.div
            className="flex shrink-0 flex-row gap-3 sm:gap-4 lg:flex-col lg:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={moveLeft(0.12)}
          >
            <Link href="/" className="flex h-12 w-12 items-center justify-center border border-border group transition-all duration-200 hover:border-primary sm:h-14 sm:w-14 lg:h-15 lg:w-15">
              <Image src="/assets/icons/share-icon-primary.svg" alt="share post" width={23} height={23} className="h-5 w-5 brightness-0 transition-all duration-200 group-hover:brightness-100 sm:h-[23px] sm:w-[23px]" />
            </Link>
            <Link href="/" className="flex h-12 w-12 items-center justify-center border border-border group transition-all duration-200 hover:border-primary sm:h-14 sm:w-14 lg:h-15 lg:w-15">
              <Image src="/assets/icons/copy-icon-primary.svg" alt="copy post" width={23} height={23} className="h-5 w-5 brightness-0 transition-all duration-200 group-hover:brightness-100 sm:h-[23px] sm:w-[23px]" />
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={moveUp(0.2)}
        >
          <Image src={newsDetails[0].img} alt="" width={1620} height={609} className="h-auto w-full object-cover" />
        </motion.div>
      </div>
      
    </section>
   );
}
 
export default Main;
