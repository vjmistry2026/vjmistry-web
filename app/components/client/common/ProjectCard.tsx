import { ProjectType } from "@/app/types/project";
import { Project } from "../projects/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProjectCard = ({ project }: { project: ProjectType['projects'][number] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-[1/1] 3xl:max-h-[513px] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? "opacity-100 scale-110" : "opacity-0"}`}
        >
          <div className="w-[61.48px] h-[64.38px] bg-primary flex items-center justify-center shrink-0">
            <Image
              src="/assets/icons/right-top-arrow-primary.svg"
              alt="View project"
              width={12.5}
              height={12.5}
              className={`invert brightness-0 shrink-0 w-[12.5px] h-[12.5px] transition-all duration-300 ${hovered ? "translate-x-[0px] translate-y-[0px]" : "-translate-x-[10px] translate-y-[10px]"}`}
            />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <p className="section-description mb-[10px] flex flex-wrap">
          {[project.firstSection.projectType.name, project.firstSection.sector.name, project.firstSection.location.name, project.firstSection.status]
            .filter(Boolean)
            .map((item, index, arr) => (
              <span key={index}>
                {item}
                {index < arr.length - 1 && (
                  <span className="mx-[10px] text-paragraph">|</span>
                )}
              </span>
            ))}
        </p>
        <h3 className="text-32 leading-[100%] font-condensed text-secondary mb-5">
          {project.title}
        </h3>
        <div className="w-full h-[1px] bg-[#E5E5E5] relative overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 bg-primary transition-all duration-[400ms] ${hovered ? "w-full" : "w-0"}`}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;