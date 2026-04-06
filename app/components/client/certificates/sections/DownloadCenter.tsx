"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedHeading from "../../common/AnimateHeading";
import { certificatesData } from "../data";
import { moveUp } from "@/app/components/motionVariants";

const DownloadCenter = ({ data }: { data: CertificateType['thirdSection'] }) => {
  // const { downloadCenter } = certificatesData;
  const [previewItem, setPreviewItem] = useState<(typeof data.items)[number] | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewItem(null);
      }
    };

    if (previewItem) {
      const scrollY = window.scrollY;
      const { body, documentElement } = document;

      documentElement.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        documentElement.style.overflow = "";
        body.style.overflow = "";
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        window.scrollTo(0, scrollY);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewItem]);

  return (
    <>
      <section className="pt-40 pb-10 xl:pt-150 xl:pb-150 border-b border-border">
        <div className="container">
          <AnimatedHeading text={data.title} className="mb-30" />
          <motion.p
            variants={moveUp(0.18)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="cmn-p font-bold"
          >
            {data.description}
          </motion.p>

          <div className="grid grid-cols-1 pt-8 md:grid-cols-2 xl:grid-cols-3 gap-x-5 xl:gap-x-10 gap-y-6 xl:gap-y-10 2xl:gap-y-15 xl:pt-10 2xl:pt-15 border-b border-border pb-130 md:pb-150 ">
            {data.items.map((item, index) => (
              <motion.article key={index} variants={moveUp(index * 0.1)} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.2 }} className="flex min-h-[202px] flex-col bg-light px-8 py-40 md:px-10 2xl:py-10 2xl:px-[44.43px] " >
                <div className="flex items-center gap-4 2xl:gap-[22.21px]">
                  <Image src="/assets/icons/pdf-icon.svg" alt="" width={46.66} height={49} className="pointer-events-none h-10 xl:h-[49px] w-auto flex-shrink-0" />
                  <h3 className="font-condensed text-32 leading-[100%] text-secondary"> {item.title} </h3>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-9">
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    aria-label={`View ${item.title}`}
                    className="group inline-flex cursor-pointer items-center gap-3 xl:gap-[23.5px] text-paragraph transition-colors duration-300 hover:text-primary"
                  >
                    <Image src="/assets/icons/view-icon-primary.svg" alt="" width={24.93} height={21.08} className="pointer-events-none h-auto w-5 flex-shrink-0 xl:h-auto xl:w-auto" />
                    <span className="font-nexa font-bold text-20  leading-1p5">View</span>
                  </button>

                  <a href={item.file} download={`${item.title}.pdf`} aria-label={`Download ${item.title}`}
                    className="group inline-flex items-center gap-3 xl:gap-[23.35px] text-paragraph transition-colors duration-300 hover:text-primary"
                  >
                    <Image src="/assets/icons/download-icon-primary.svg" alt="" width={21.08} height={21.08} className="pointer-events-none h-auto w-5
                     flex-shrink-0 xl:w-auto xl:h-auto" />
                    <span className="font-nexa font-bold text-20 leading-1p5 2xl:mr-3">Download</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {previewItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewItem(null)}
            className="fixed inset-0 z-[10050] flex items-center justify-center overscroll-none bg-secondary/70 p-4 backdrop-blur-[3px] sm:p-6 lg:p-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex h-[min(88vh,860px)] w-full max-w-[1200px] flex-col overflow-hidden overscroll-contain rounded-[24px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-8 sm:py-5">
                <div className="min-w-0">
                  <p className="font-nexa text-14 font-bold uppercase tracking-[0.14em] text-primary">
                    Document Preview
                  </p>
                  <h3 className="mt-2 truncate font-condensed text-24 leading-[100%] text-secondary sm:text-32">
                    {previewItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={previewItem.file}
                    download={`${previewItem.title}.pdf`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 font-nexa text-14 font-bold leading-none text-primary transition-colors duration-300 hover:bg-primary hover:text-paragraph-2"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px] flex-shrink-0"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.079 15.0529V19.7371C22.079 20.3582 21.8322 20.954 21.393 21.3932C20.9538 21.8324 20.3581 22.0792 19.7369 22.0792H3.34211C2.72095 22.0792 2.12522 21.8324 1.68599 21.3932C1.24676 20.954 1 20.3582 1 19.7371V15.0529"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.68164 9.19751L11.5369 15.0528L17.3922 9.19751"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.5391 15.0527V1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewItem(null)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-nexa text-14 font-bold leading-none text-secondary transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-paragraph-2"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-4 w-4 flex-shrink-0"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L13 13M13 3L3 13"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    Close
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-[#F5F5F5] p-3 sm:p-4">
                <iframe
                  // src={`${previewItem.file}#toolbar=0&navpanes=0&view=FitH`}
                  src={`/api/pdf-proxy?url=${encodeURIComponent(
                    previewItem.file
                  )}#toolbar=0`}
                  title={previewItem.title}
                  className="h-full w-full rounded-[16px] border-0 bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DownloadCenter;
