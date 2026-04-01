"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  newsCategories,
  newsList,
  splitNewsByLatest,
  type CategoryType,
} from "../data";
import FilterBox from "./FilterBox";
import NewsGrid from "./NewsGrid";
import PopularBlock from "./PopularBlock";
import AnimatedHeading from "../../common/AnimateHeading";
import { NewsType } from "@/app/types/news";
import { Filters } from "@/app/types/projectfilters";

const Main = ({ news, category }: { news: NewsType['news'], category: Filters[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory =
    categoryParam && newsCategories.includes(categoryParam as CategoryType)
      ? (categoryParam as CategoryType)
      : null;

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

  const filteredNews = activeCategory
    ? news.filter((article) => article.firstSection.category.name === activeCategory)
    : news;
  const { latestNewsList, remainingNewsList } = splitNewsByLatest(filteredNews);

  return (
    <section className="pb-15 xl:pb-25 2xl:pb-[120px] 3xl:pb-[147px]">
      <div className="container">
        <FilterBox
          activeCategory={activeCategory}
          onCategoryChange={(category) =>
            updateURL({
              category: activeCategory === category ? "" : category,
              page: "1",
            })
          }
        />
        <AnimatedHeading text="Most Popular" className="mb-30 pt-5 md:pt-10 xl:pt-13 2xl:pt-15 3xl:pt-[76px]" />
        <PopularBlock latestNewsList={latestNewsList} />
        <NewsGrid remainingNewsList={remainingNewsList} />
      </div>
    </section>
  );
}

export default Main;
