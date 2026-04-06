import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { moveLeft, moveUp } from "@/app/components/motionVariants";
import type { NewsItem } from "../data";
import { NewsType } from "@/app/types/news";
import { calculateReadTime } from "@/lib/calculateReadTime";

const articlePlacementClasses = [
  "xl:[grid-area:1/1/4/2]",
  "xl:[grid-area:1/2/2/3]",
  "xl:[grid-area:2/2/3/3]",
  "xl:[grid-area:3/2/4/3]",
] as const;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

type PopularBlockProps = {
  latestNewsList: NewsType['news'];
};

const PopularBlock = ({ latestNewsList }: PopularBlockProps) => {
  if (latestNewsList.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-40 2xl:gap-30 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] 3xl:grid-cols-[842px_auto] border-b border-border pb-5 xl:pb-13 2xl:pb-25">
      {latestNewsList.map((article, index) => {
        const isFeatured = index === 0;
        return (
          <motion.article
            key={index}
            className={`${articlePlacementClasses[index] ?? ""} ${isFeatured
              ? "group"
              : "grid grid-cols-[140px_minmax(0,1fr)] gap-5 border-b border-border last:border-0 pb-30 sm:grid-cols-[170px_minmax(0,1fr)]"
              }`}
            variants={isFeatured ? moveUp(0) : moveLeft((index - 1) * 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {isFeatured ? (
              <>
                <Link
                  href={`/media-center/news/${article.firstSection.slug}`}
                  className="block"
                >
                  <div className="relative h-[250px] md:h-[300px] xl:h-[350px] 2xl:h-[504px] w-full overflow-hidden">
                    <Image
                      src={article.firstSection.thumbnail}
                      alt={article.firstSection.thumbnailAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 "
                      sizes="(max-width: 1280px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <div className="flex h-[52px] w-[52px] items-center justify-center bg-primary shrink-0 xl:h-[64.38px] xl:w-[61.48px]">
                        <Image
                          src="/assets/icons/right-top-arrow-primary.svg"
                          alt="Read article"
                          width={12.5}
                          height={12.5}
                          className="h-[12.5px] w-[12.5px] shrink-0 invert brightness-0 transition-all duration-300 -translate-x-[10px] translate-y-[10px] group-hover:translate-x-0 group-hover:translate-y-0"
                        />
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 section-description pt-30">
                    <p className="flex flex-wrap items-center text-20">
                      <span className="text-paragraph font-nexa">{article.firstSection.category.name}</span>
                      <span className="mx-[10px] w-[5px] h-[5px] block bg-paragraph rounded-full text-paragraph opacity-70"></span>
                      <span className="text-paragraph/70">{calculateReadTime(article.thirdSection.content)}</span>
                    </p>
                    <p className="text-paragraph">{formatDate(article.firstSection.date)}</p>
                  </div>

                  <Link href={`/media-center/news/${article.firstSection.slug}`}>
                    <h3 className="max-w-[50ch] font-condensed text-32 leading-[110%] text-secondary transition-colors duration-300 hover:text-primary">
                      {article.firstSection.title}
                    </h3>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link href={`/media-center/news/${article.firstSection.slug}`} className="block relative overflow-hidden h-full" >
                  <div className="relative overflow-hidden h-full">
                    <Image src={article.firstSection.thumbnail} alt={article.firstSection.thumbnailAlt} fill className="object-cover h-full w-full max-w-full" sizes="(max-width: 640px) 140px, 170px" />
                  </div>
                </Link>

                <div className="min-w-0 flex flex-col justify-between">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 section-description">
                    <p className="flex flex-wrap items-center text-16 xl:text-20">
                      <span className="text-paragraph font-nexa">{article.firstSection.category.name}</span>
                      <span className="mx-[10px] w-[5px] h-[5px] block bg-paragraph rounded-full text-paragraph opacity-70"></span>
                      <span className="text-paragraph/70">{calculateReadTime(article.thirdSection.content)}</span>
                    </p>
                    <p className="text-paragraph text-16 xl:text-20">{formatDate(article.firstSection.date)}</p>
                  </div>

                  <Link href={`/media-center/news/news-details/${article.firstSection.slug}`}>
                    <h3 className="font-condensed text-20 md:text-32 leading-[110%] text-secondary transition-colors duration-300 hover:text-primary">
                      {article.firstSection.title}
                    </h3>
                  </Link>
                </div>
              </>
            )}
          </motion.article>
        );
      })}
    </div>
  );
};

export default PopularBlock;
