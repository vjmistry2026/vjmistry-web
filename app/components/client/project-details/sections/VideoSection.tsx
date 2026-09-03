"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectType } from "@/app/types/project";

export default function VideoSection({ data }: { data?: ProjectType['projects'][number]['thirdSection'] | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const videoItem = data?.items?.[0];
  const videoUrl = videoItem?.video || "";
  const embedUrl = useMemo(() => getEmbedUrl(videoUrl), [videoUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!videoItem?.image || !videoItem?.video) {
    return null;
  }

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Project video"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-[1180px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0 z-10 flex h-12 w-12 -translate-y-full cursor-pointer items-center justify-center bg-transparent text-white transition-opacity duration-200 hover:opacity-70"
          aria-label="Close video"
        >
          <Image
            src="/assets/icons/close-icon.svg"
            width={34}
            height={34}
            alt=""
            className="h-5 w-5"
          />
        </button>

        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Project video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <section className="overflow-hidden pt-40 sm:pt-100 mb-40 sm:mb-100">
      <div className="relative w-full h-[350px] lg:h-auto lg:max-h-[895px]">

        {/* reveal overlay */}
        <motion.div initial={{ scaleX: 1 }} whileInView={{ scaleX: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} viewport={{ once: true }} className="absolute inset-0 bg-white/30 origin-right z-20" />

        {/* gradient overlay */}
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />

        {/* play button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-15 h-15 lg:w-18 lg:h-18 xl:w-21 xl:h-21 bg-paragraph-2 group rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 cursor-pointer"
            aria-label="Play project video"
          >
            <Image src="/assets/icons/play.svg" alt="play" width={11} height={15}
              className="w-[11px] h-[15px] shrink-0 group-hover:scale-110 group-hover:invert group-hover:brightness-0 transition-all duration-300"
            />
          </button>
        </div>

        {/* image */}
        <Image src={videoItem.image} alt={videoItem.imageAlt || "project"} className="w-full object-cover" width={2000} height={752} />
      </div>
      {isOpen ? createPortal(modalContent, document.body) : null}
    </section>
  );
}

const getEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}?autoplay=1`;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
    }

    if (host === "vimeo.com") {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : "";
    }
  } catch {
    return "";
  }

  return "";
};
