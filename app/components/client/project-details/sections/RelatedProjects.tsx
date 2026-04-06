"use client";

import { projectsData } from "../../projects/data";
import AnimatedHeading from "../../common/AnimateHeading";
import ProjectCard from "../../common/ProjectCard";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { ProjectType } from "@/app/types/project";

const RelatedProjects = ({ data }: { data: ProjectType }) => {
  return (
    <section className="w-full pt-40 pb-50 sm:pt-100 sm:pb-150 md:pb-100 lg:pb-130 2xl:pb-150">
      <div className="container mx-auto px-4">
        <AnimatedHeading
          text="Related Projects"
          className="section-heading mb-5 lg:mb-8 leading-[100%]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 lg:gap-8 xl:gap-10">
          {data.projects.slice(0, 3).map((project, i) => (
            <motion.div
              key={project._id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={moveUp(i * 0.15)}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProjects;
