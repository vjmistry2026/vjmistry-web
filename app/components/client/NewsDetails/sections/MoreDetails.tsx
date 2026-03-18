"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

import { newsDetails } from "../data";

const STICKY_TOP = 150;

type SidebarMode = "static" | "fixed" | "bottom";

type SidebarLayout = {
  mode: SidebarMode;
  width: number;
  height: number;
  containerHeight: number;
};

const getSectionId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const handleTocClick = (
  event: MouseEvent<HTMLAnchorElement>,
  sectionTitle: string,
) => {
  event.preventDefault();

  const sectionId = getSectionId(sectionTitle);
  const sectionElement = document.getElementById(sectionId);

  if (!sectionElement) {
    return;
  }

  sectionElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  window.history.replaceState(null, "", `#${sectionId}`);
};

const MoreDetails = () => {
  const article = newsDetails[0];
  const layoutRef = useRef<HTMLDivElement>(null);
  const sidebarColumnRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarLayout, setSidebarLayout] = useState<SidebarLayout>({
    mode: "static",
    width: 0,
    height: 0,
    containerHeight: 0,
  });

  useEffect(() => {
    const updateSidebarLayout = () => {
      const layoutElement = layoutRef.current;
      const sidebarColumnElement = sidebarColumnRef.current;
      const sidebarElement = sidebarRef.current;

      if (!layoutElement || !sidebarColumnElement || !sidebarElement) {
        return;
      }

      const width = sidebarColumnElement.offsetWidth;
      const height = sidebarElement.offsetHeight;
      const containerHeight = layoutElement.offsetHeight;

      if (window.innerWidth < 1024) {
        setSidebarLayout((currentValue) => {
          if (
            currentValue.mode === "static" &&
            currentValue.width === width &&
            currentValue.height === height &&
            currentValue.containerHeight === 0
          ) {
            return currentValue;
          }

          return {
            mode: "static",
            width,
            height,
            containerHeight: 0,
          };
        });

        return;
      }

      const layoutTop = window.scrollY + layoutElement.getBoundingClientRect().top;
      const layoutBottom = layoutTop + containerHeight;
      const stickyStart = layoutTop - STICKY_TOP;
      const stickyEnd = layoutBottom - height - STICKY_TOP;

      let mode: SidebarMode = "static";

      if (window.scrollY > stickyStart) {
        mode = window.scrollY >= stickyEnd ? "bottom" : "fixed";
      }

      setSidebarLayout((currentValue) => {
        if (
          currentValue.mode === mode &&
          currentValue.width === width &&
          currentValue.height === height &&
          currentValue.containerHeight === containerHeight
        ) {
          return currentValue;
        }

        return {
          mode,
          width,
          height,
          containerHeight,
        };
      });
    };

    const frameId = window.requestAnimationFrame(updateSidebarLayout);

    const handleScroll = () => {
      updateSidebarLayout();
    };

    const handleResize = () => {
      updateSidebarLayout();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    const layoutElement = layoutRef.current;
    const sidebarColumnElement = sidebarColumnRef.current;
    const sidebarElement = sidebarRef.current;

    if (
      typeof ResizeObserver !== "undefined" &&
      layoutElement &&
      sidebarColumnElement &&
      sidebarElement
    ) {
      resizeObserver = new ResizeObserver(() => {
        updateSidebarLayout();
      });

      resizeObserver.observe(layoutElement);
      resizeObserver.observe(sidebarColumnElement);
      resizeObserver.observe(sidebarElement);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, []);

  if (!article) {
    return null;
  }

  const sidebarColumnStyle: CSSProperties =
    sidebarLayout.containerHeight > 0
      ? { height: `${sidebarLayout.containerHeight}px` }
      : {};

  const sidebarStyle: CSSProperties = (() => {
    if (sidebarLayout.mode === "fixed") {
      return {
        position: "fixed",
        top: `${STICKY_TOP}px`,
        width: `${sidebarLayout.width}px`,
      };
    }

    if (sidebarLayout.mode === "bottom") {
      return {
        position: "absolute",
        top: `${Math.max(
          sidebarLayout.containerHeight - sidebarLayout.height,
          0,
        )}px`,
        width: `${sidebarLayout.width}px`,
      };
    }

    return {};
  })();

  return (
    <section className="relative pt-15 2xl:pt-20 3xl:pt-25 pb-20 xl:pb-25 2xl:pb-[147px]">
      <div className="container">
        <div
          ref={layoutRef}
          className="flex flex-col gap-12 lg:flex-row lg:items-start 2xl:gap-20 3xl:gap-[120px]"
        >
          <aside
            ref={sidebarColumnRef}
            className="relative w-full shrink-0 lg:w-[220px]"
            style={sidebarColumnStyle}
          >
            <div ref={sidebarRef} className="h-fit lg:w-[220px]" style={sidebarStyle}>
              <p className="font-nexa text-14 font-bold uppercase tracking-[0.14em] text-secondary">
                Table Of Contents
              </p>

              <nav className="mt-8">
                <ul className="space-y-4">
                  {article.content.map((section) => (
                    <li key={section.title}>
                      <a
                        href={`#${getSectionId(section.title)}`}
                        onClick={(event) => handleTocClick(event, section.title)}
                        className="group flex items-start gap-3 text-paragraph transition-colors duration-300 hover:text-primary"
                      >
                        <span className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-primary transition-transform duration-300 group-hover:scale-125" />
                        <span className="section-description text-14 leading-[1.5]">
                          {section.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-12 2xl:space-y-15 3xl:space-y-[76px]">
            {article.content.map((section) => (
              <section
                key={section.title}
                id={getSectionId(section.title)}
                className="scroll-mt-[160px]"
              >
                <h2 className="mb-5 font-condensed text-32 leading-[110%] text-secondary 2xl:text-40">
                  {section.title}
                </h2>

                <div className="space-y-5">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <Fragment key={`${section.title}-${paragraphIndex}`}>
                      <p className="section-description leading-[1.7] text-paragraph">
                        {paragraph}
                      </p>

                      {section.image === undefined ||
                      section.imageAfterParagraph !== paragraphIndex ? null : (
                        <div className="relative mt-6 aspect-[1.95/1] overflow-hidden">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 70vw"
                          />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>

                {section.list && (
                  <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 section-description text-paragraph"
                      >
                        <span className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreDetails;
