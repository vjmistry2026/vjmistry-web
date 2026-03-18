"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CustomButton from "../../common/CustomButton";
import type { NewsItem } from "../data";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

type NewsGridProps = {
  remainingNewsList: NewsItem[];
};

const NewsGrid = ({ remainingNewsList }: NewsGridProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10) || 1, 1);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) current.set(key, value);
        else current.delete(key);
      });
      router.push(`${pathname}?${current.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  if (remainingNewsList.length === 0) {
    return null;
  }

  const visibleCount = page * 9;
  const visibleNews = remainingNewsList.slice(0, visibleCount);
  const hasMore = visibleCount < remainingNewsList.length;

  return (
    <div className="pt-10 xl:pt-13 2xl:pt-15">
      <div className="grid grid-cols-1 gap-x-30 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {visibleNews.map((article) => (
          <article key={article.id} className="group">
            <Link
              href={`/news/news-details?slug=${article.slug}`}
              className="block"
            >
              <div className="relative aspect-[0.94/1] w-full overflow-hidden">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                  <div className="flex h-[64.38px] w-[61.48px] shrink-0 items-center justify-center bg-primary">
                    <Image
                      src="/assets/icons/right-top-arrow-primary.svg"
                      alt="Read article"
                      width={12.5}
                      height={12.5}
                      className="h-[12.5px] w-[12.5px] shrink-0 -translate-x-[10px] translate-y-[10px] invert brightness-0 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </div>
                </div>
              </div>
            </Link>

            <div className="pt-5">
              <div className="mb-[10px] flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="section-description flex flex-wrap items-center text-20">
                  <span className="font-nexa text-paragraph">{article.category}</span>
                  <span className="mx-[10px] text-paragraph">|</span>
                  <span className="text-paragraph/70">{article.readTime}</span>
                </p>
                <p className="section-description text-paragraph">
                  {formatDate(article.date)}
                </p>
              </div>

              <Link href={`/news/news-details?slug=${article.slug}`}>
                <h3 className="font-condensed text-32 leading-[110%] text-secondary transition-colors duration-300 hover:text-primary">
                  {article.title}
                </h3>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 2xl:mt-[60px] flex items-center justify-center">
          <CustomButton
            label="View More"
            href=""
            textColor="black"
            arrowDirection="down"
            onClick={() => updateURL({ page: String(page + 1) })}
          />
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
