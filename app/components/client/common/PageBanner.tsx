"use client";

import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import HeroAnimatedHeading from "@/app/components/client/common/HeroAnimation";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import gsap from "gsap";

type Props = {
  title: string;
  image: string;
};

const PageBanner = ({ title, image }: Props) => {
  preload(image, {
    as: "image",
    fetchPriority: "high",
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    const breadcrumbEl = breadcrumbRef.current;
    if (!el) return;

    gsap.set(el, { scale: 1.5 });

    const runAnimation = () => {
      // Zoom-out reveal
      const reveal = gsap.fromTo(
        el,
        { scale: 1.5 },
        {
          scale: 1.0,
          duration: 2,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(el, {
              scale: 1.06,
              duration: 7,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          },
        }
      );

      // Breadcrumb slide-in from right
      if (breadcrumbEl) {
        gsap.fromTo(
          breadcrumbEl,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      return reveal;
    };

    const imgEl = el.querySelector<HTMLImageElement>("img");
    let reveal: gsap.core.Tween | null = null;

    const cleanup = () => {
      reveal?.kill();
      gsap.killTweensOf(el);
      if (breadcrumbEl) gsap.killTweensOf(breadcrumbEl);
    };

    if (!imgEl) {
      // Fallback: no img found, run immediately
      reveal = runAnimation();
      return cleanup;
    }

    if (imgEl.complete && imgEl.naturalWidth > 0) {
      // Already in browser cache — fire immediately
      reveal = runAnimation();
    } else {
      // Wait for image to fully load before starting animation
      const onLoad = () => {
        reveal = runAnimation();
      };
      const onError = () => {
        // Even on error, run animation so breadcrumb still animates
        reveal = runAnimation();
      };

      imgEl.addEventListener("load", onLoad, { once: true });
      imgEl.addEventListener("error", onError, { once: true });

      return () => {
        imgEl.removeEventListener("load", onLoad);
        imgEl.removeEventListener("error", onError);
        cleanup();
      };
    }

    return cleanup;
  }, []);

  return (
    <section className="relative w-full h-[420px] lg:h-[500px] 2xl:h-[550px] 3xl:h-[763px] overflow-hidden">
      <div className="absolute left-0 bottom-[0%] sm:-bottom-[12%] 2xl:-bottom-[14%] w-[350px] sm:w-[500px] md:w-[600px] lg:w-[700px] 2xl:w-[920px] 3xl:w-[1210px] h-auto z-[1]">
        <Image src="/assets/icons/banner_bg_svg2.svg" alt="" width={1210} height={500} className="w-full h-full opacity-50" />
      </div>

      {/* GSAP animation target */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "center center" }} >
        <Image src={image} alt={title} fill priority fetchPriority="high" className="object-cover object-center" />
      </div>

      <div style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 17.65%, rgba(0, 0, 0, 0.5) 100%)", }} className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute bottom-5 sm:bottom-10 lg:bottom-[50px] 3xl:bottom-[71px] left-0 right-0">
        <div className="container flex flex-col lg:flex-row items-start lg:items-end justify-between gap-y-2 md:gap-y-5">
          <HeroAnimatedHeading text={title} className="text-75 3xl:text-85 text-paragraph-2 leading-[1]" />
          <div ref={breadcrumbRef} style={{ opacity: 0 }} className="relative z-50">
            <Breadcrumb />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;