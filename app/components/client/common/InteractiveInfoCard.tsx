"use client";

import Image from "next/image";

type InteractiveInfoCardProps = {
  icon: string;
  title: string;
  description?: string;
  isActive?: boolean;
  className?: string;
  iconAlt?: string;
};

const InteractiveInfoCard = ({
  icon,
  title,
  description,
  isActive = false,
  className = "",
  iconAlt,
}: InteractiveInfoCardProps) => {
  return (
    <article
      className={`relative isolate min-h-[250px] overflow-hidden bg-[#FCFCFC] p-30 md:min-h-[284px]
        transition-colors duration-500 [clip-path:polygon(0_0,calc(100%-45px)_0,100%_50px,100%_100%,0_100%)]
        after:pointer-events-none after:absolute after:inset-0 after:content-[''] after:shadow-[inset_0_0_0_1px_#E4E4E4]
        after:transition-opacity after:duration-500 ${
          isActive ? "after:opacity-0" : "after:opacity-100"
        } ${className}`}
    >
      <span
        className={`pointer-events-none absolute left-[calc(100%-45px)] top-0 z-[1] block h-px w-[68px] origin-top-left rotate-[48deg] transition-colors duration-500 ${
          isActive ? "bg-white/20" : "bg-[#E4E4E4]"
        }`}
      />

      <div
        className={`absolute inset-0 bg-[linear-gradient(180deg,#ED1C24_0%,#A71E22_100%)]
          transition-transform duration-500 ease-out ${
            isActive ? "translate-y-0" : "translate-y-full"
          }`}
      />

      <Image
        src="/assets/icons/vj-crd-shape.svg"
        alt=""
        width={300}
        height={300}
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={`pointer-events-none absolute right-0 top-0 h-[204px] w-auto object-contain object-top-right transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-15 w-15 items-center justify-center bg-secondary md:h-[64px] md:w-[64px]">
          <Image
            src={icon}
            alt={iconAlt ?? title}
            width={34}
            height={34}
            className="h-auto w-auto max-h-[34px]"
          />
        </div>

        <div className="mt-auto">
          <div className="relative min-h-[138px] md:min-h-[150px]">
            <h3
              className={`absolute inset-x-0 bottom-0 max-w-[90%] transform-gpu font-condensed text-32 leading-[100%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-40 ${
                isActive
                  ? "-translate-y-[78px] text-paragraph-2"
                  : "translate-y-0 text-secondary"
              }`}
            >
              {title}
            </h3>

            {description ? (
              <p
                className={`absolute bottom-0 max-w-[90%] transform-gpu text-20 font-nexa leading-1p5 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "delay-75 translate-y-0 opacity-100 text-[#FDFDFDB2]"
                    : "delay-0 pointer-events-none translate-y-5 opacity-0 text-[#D9D9D9]"
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default InteractiveInfoCard;
