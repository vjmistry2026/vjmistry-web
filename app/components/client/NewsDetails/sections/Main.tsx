"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { moveLeft, moveUp } from "@/app/components/motionVariants";
import { newsDetails } from "../data";
import AnimatedHeading from "../../common/AnimateHeading";
import Image from "next/image";

const Main = () => {
  const article = newsDetails[0];
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  }, []);

  const handleCopy = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }

      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      setShared(false);
    }
  };

  return ( 
    <section>
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-4 xl:mb-30">
          <div className="min-w-0 flex-1">
            <AnimatedHeading text={article.title} className="leading-[1.2]" />
          </div>
          <motion.div
            className="flex shrink-0 flex-row gap-3 sm:gap-4 lg:flex-col lg:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={moveLeft(0.12)}
          >
            <button
              type="button"
              onClick={handleShare}
              aria-label={shared ? "Link shared" : "Share post"}
              title={shared ? "Link shared" : "Share post"}
              className="flex h-12 w-12 xl:w-15 xl:h-15 items-center justify-center border border-border group transition-all duration-200 hover:border-primary sm:h-14 sm:w-14 lg:h-15 lg:w-15"
            >
              <Image src="/assets/icons/share-icon-primary.svg" alt="share post" width={23} height={23} className="h-5 w-5 xl:w-[30px] xl:h-[30px] object-contain brightness-0 transition-all duration-200 group-hover:brightness-100 " />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Link copied" : "Copy post link"}
              title={copied ? "Link copied" : "Copy post link"}
              className="flex h-12 w-12 xl:w-15 xl:h-15 items-center justify-center border border-border group transition-all duration-200 hover:border-primary sm:h-14 sm:w-14 lg:h-15 lg:w-15"
            >
              <Image src="/assets/icons/copy-icon-primary.svg" alt="copy post" width={23} height={23} className="h-5 w-5 brightness-0 transition-all duration-200 group-hover:brightness-100 sm:h-[23px] sm:w-[23px]" />
            </button>
          </motion.div>
        </div>
        <motion.div
          className="overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={moveUp(0.2)}
        >
          <Image src={article.img} alt="" width={1620} height={609} className="h-auto w-full object-cover" />
        </motion.div>
      </div>
      
    </section>
   );
}
 
export default Main;
