"use client";

import Image from "next/image";
import { projectMeta, projectDetails, projectFeatures } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { ProjectType } from "@/app/types/project";

export default function ProjectDetails({ firstSection, secondSection }: { firstSection: ProjectType['projects'][number]['firstSection'], secondSection: ProjectType['projects'][number]['secondSection'] }) {
  return (
    <section>
      {/* SECTION 1  - Project Meta*/}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={moveUp(0.1)}
        className="container border-b border-border py-50 md:py-70 3xl:py-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0 * 0.15)}
            className="flex items-center"
          >
            {/* icon box */}
            <div className="w-[65px] h-[70px] 2xl:w-[73px] 2xl:h-20 border border-border flex items-center justify-center shrink-0">
              <Image
                width={50}
                height={32}
                src="/assets/images/project-details/icons/1.svg"
                alt="Year of Completion"
                className={`w-auto object-contain h-6 xl:h-8
                  }`}
              />
            </div>

            {/* text */}
            <div className="flex flex-col flex-1 gap-[7px] xl:gap-[10px]">
              <p className="pl-3 xl:pl-[17px] section-description text-secondary">
                Year of Completion
              </p>

              <div className="w-full h-px bg-border" />

              <p className="pl-3 xl:pl-[17px] section-description text-paragraph">
                {firstSection.yearOfCompletion}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(1 * 0.15)}
            className="flex items-center"
          >
            {/* icon box */}
            <div className="w-[65px] h-[70px] 2xl:w-[73px] 2xl:h-[80px] border border-border flex items-center justify-center shrink-0">
              <Image
                width={50}
                height={32}
                src="/assets/images/project-details/icons/2.svg"
                alt="Expertise"
                className={`w-auto object-contain h-6 xl:h-8
                  }`}
              />
            </div>

            {/* text */}
            <div className="flex flex-col flex-1 gap-[7px] xl:gap-[10px]">
              <p className="pl-3 xl:pl-[17px] section-description text-secondary">
                Expertise
              </p>

              <div className="w-full h-px bg-border" />

              <p className="pl-3 xl:pl-[17px] section-description text-paragraph">
                {firstSection.expertise}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(2 * 0.15)}
            className="flex items-center"
          >
            {/* icon box */}
            <div className="w-[65px] h-[70px] 2xl:w-[73px] 2xl:h-[80px] border border-border flex items-center justify-center shrink-0">
              <Image
                width={50}
                height={32}
                src="/assets/images/project-details/icons/3.svg"
                alt="Location"
                className={`w-auto object-contain h-7 xl:h-[34px]
                  }`}
              />
            </div>

            {/* text */}
            <div className="flex flex-col flex-1 gap-[7px] xl:gap-[10px]">
              <p className="pl-3 xl:pl-[17px] section-description text-secondary">
                Location
              </p>

              <div className="w-full h-px bg-border" />

              <p className="pl-3 xl:pl-[17px] section-description text-paragraph">
                {firstSection.location.name}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(3 * 0.15)}
            className="flex items-center"
          >
            {/* icon box */}
            <div className="w-[65px] h-[70px] 2xl:w-[73px] 2xl:h-[80px] border border-border flex items-center justify-center shrink-0">
              <Image
                width={50}
                height={32}
                src="/assets/images/project-details/icons/4.svg"
                alt="Client"
                className={`w-auto object-contain h-6 xl:h-8
                  }`}
              />
            </div>

            {/* text */}
            <div className="flex flex-col flex-1 gap-[7px] xl:gap-[10px]">
              <p className="pl-3 xl:pl-[17px] section-description text-secondary">
                Client
              </p>

              <div className="w-full h-px bg-border" />

              <p className="pl-3 xl:pl-[17px] section-description text-paragraph">
                {firstSection.client}
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* SECTION 2 - Project Details*/}
      <div>
        <div className="container pt-100">
          <AnimatedHeading className="mb-30" text={secondSection.title} />

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.3)}
            className="section-description mb-30 lg:mb-10 2xl:mb-15"
          >
            {secondSection.description}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.4)}
            className="w-full h-[250px] md:h-[280px] lg:h-auto"
          >
            <Image
              src={secondSection.image}
              alt={secondSection.imageAlt}
              className="w-full h-full object-cover"
              width={2000}
              height={752}
            />
          </motion.div>
        </div>

        <div className="border-t border-b border-border mb-100 lg:mb-130 2xl:mb-150">
          <div className="container">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 border-x border-border divide-x divide-y divide-border`}
            >
              {secondSection.items.map((item, index) => (
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={moveUp(index * 0.15)}
                  key={index}
                  className={`flex items-center md:justify-center gap-[15px] pl-3 md:pl-0 py-4 md:py-8 lg:py-10 2xl:py-15 ${index == 1 ? "border-r-0 sm:border-r-0 2xl:border-r 2xl:border-b-0" : ""} ${index == 0 ? "border-r-0 sm:border-r 2xl:border-b-0" : ""} ${index == 2 ? "border-r-0 sm:border-b-0 sm:border-r" : ""}`}
                >
                  <span className="w-3 h-3 bg-primary"></span>
                  <p className="text-base md:text-32 font-condensed leading-[100%] text-secondary">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
