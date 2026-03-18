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

const Main = () => {
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
    ? newsList.filter((article) => article.category === activeCategory)
    : newsList;
  const { latestNewsList, remainingNewsList } = splitNewsByLatest(filteredNews);

  return ( 
    <section className="pb-25 2xl:pb-30 3xl:pb-[147px]">
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
        <PopularBlock latestNewsList={latestNewsList} />
        <NewsGrid
          remainingNewsList={remainingNewsList}
        />
      </div>
    </section>
   );
}
 
export default Main;
