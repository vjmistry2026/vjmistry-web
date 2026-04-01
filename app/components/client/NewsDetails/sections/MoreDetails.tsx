"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

import { moveLeft, moveUp } from "@/app/components/motionVariants";
import { NewsType } from "@/app/types/news";

const STICKY_TOP = 150;
const MOBILE_TOC_SCROLL_OFFSET = 88;
const DESKTOP_TOC_SCROLL_OFFSET = 160;

type SidebarMode = "static" | "fixed" | "bottom";

type SidebarLayout = {
  mode: SidebarMode;
  width: number;
  height: number;
  containerHeight: number;
};

const getSectionId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const getTargetSectionId = (value: string) => value.replace(/^#/, "");

const getTocScrollOffset = () =>
  window.innerWidth < 1024 ? MOBILE_TOC_SCROLL_OFFSET : DESKTOP_TOC_SCROLL_OFFSET;

const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();

const handleTocClick = (
  event: MouseEvent<HTMLAnchorElement>,
  targetSectionId: string,
  setActiveSectionId: (sectionId: string) => void,
) => {
  event.preventDefault();

  const normalizedSectionId = getTargetSectionId(targetSectionId);
  const sectionElement = document.getElementById(normalizedSectionId);

  if (!sectionElement) {
    return;
  }

  const targetY =
    window.scrollY +
    sectionElement.getBoundingClientRect().top -
    getTocScrollOffset();

  setActiveSectionId(normalizedSectionId);

  window.scrollTo({
    top: Math.max(targetY, 0),
    behavior: "smooth",
  });

  window.history.replaceState(null, "", `#${normalizedSectionId}`);
};

const MoreDetails = ({
  secondSection,
  thirdSection,
}: {
  secondSection: NewsType["news"][number]["secondSection"];
  thirdSection: NewsType["news"][number]["thirdSection"];
}) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const contentColumnRef = useRef<HTMLDivElement>(null);
  const sidebarColumnRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tocItems = useMemo(
    () =>
      secondSection.items.map((section) => ({
        ...section,
        targetId: getTargetSectionId(section.idToMap || getSectionId(section.title)),
      })),
    [secondSection.items],
  );
  const [sidebarLayout, setSidebarLayout] = useState<SidebarLayout>({
    mode: "static",
    width: 0,
    height: 0,
    containerHeight: 0,
  });
  const [activeSectionId, setActiveSectionId] = useState(() => {
    const initialHash =
      typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    const firstSectionId = secondSection.items[0]
      ? getTargetSectionId(
        secondSection.items[0].idToMap || getSectionId(secondSection.items[0].title),
      )
      : "";

    return initialHash || firstSectionId;
  });

  useEffect(() => {
    const hashSectionId =
      typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    const firstSectionId = tocItems[0]?.targetId ?? "";

    setActiveSectionId(hashSectionId || firstSectionId);
  }, [tocItems]);

  useEffect(() => {
    const contentRoot = contentColumnRef.current?.querySelector(".news-item-content");

    if (!contentRoot) {
      return;
    }

    const headingElements = Array.from(
      contentRoot.querySelectorAll<HTMLElement>("h2"),
    );

    if (headingElements.length === 0) {
      return;
    }

    const usedIds = new Set<string>();

    tocItems.forEach((item, index) => {
      const normalizedTargetId = item.targetId;
      let matchedHeading =
        contentRoot.querySelector<HTMLElement>(`#${CSS.escape(normalizedTargetId)}`) ?? null;

      if (!matchedHeading) {
        matchedHeading =
          headingElements.find(
            (heading) => normalizeText(heading.textContent ?? "") === normalizeText(item.title),
          ) ?? null;
      }

      if (!matchedHeading) {
        matchedHeading = headingElements[index] ?? null;
      }

      if (!matchedHeading) {
        return;
      }

      if (!matchedHeading.id || matchedHeading.id !== normalizedTargetId) {
        matchedHeading.id = normalizedTargetId;
      }

      usedIds.add(normalizedTargetId);
    });

    headingElements.forEach((heading) => {
      if (!heading.id) {
        const generatedId = getSectionId(heading.textContent ?? "");

        if (generatedId && !usedIds.has(generatedId)) {
          heading.id = generatedId;
          usedIds.add(generatedId);
        }
      }
    });
  }, [thirdSection.content, tocItems]);

  useEffect(() => {
    const updateSidebarLayout = () => {
      const layoutElement = layoutRef.current;
      const contentColumnElement = contentColumnRef.current;
      const sidebarColumnElement = sidebarColumnRef.current;
      const sidebarElement = sidebarRef.current;

      if (!layoutElement || !contentColumnElement || !sidebarColumnElement || !sidebarElement) {
        return;
      }

      const width = sidebarColumnElement.offsetWidth;
      const height = sidebarElement.offsetHeight;
      const containerHeight = contentColumnElement.offsetHeight;

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
    const contentColumnElement = contentColumnRef.current;
    const sidebarColumnElement = sidebarColumnRef.current;
    const sidebarElement = sidebarRef.current;

    if (
      typeof ResizeObserver !== "undefined" &&
      layoutElement &&
      contentColumnElement &&
      sidebarColumnElement &&
      sidebarElement
    ) {
      resizeObserver = new ResizeObserver(() => {
        updateSidebarLayout();
      });

      resizeObserver.observe(layoutElement);
      resizeObserver.observe(contentColumnElement);
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

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return;
    }

    if (tocItems.length === 0) {
      return;
    }

    const contentRoot = contentColumnRef.current?.querySelector(".news-item-content");

    if (!contentRoot) {
      return;
    }

    const sections = tocItems
      .map((section) => section.targetId)
      .map(
        (sectionId) =>
          document.getElementById(sectionId) ??
          contentRoot.querySelector<HTMLElement>(`#${CSS.escape(sectionId)}`),
      )
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        setActiveSectionId(visibleEntries[0].target.id);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

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
    <section className="relative pt-10 md:pt-12 xl:pt-15 2xl:pt-20 3xl:pt-150 pb-15 xl:pb-17 2xl:pb-20 3xl:pb-20">
      <div className="container">
        <div ref={layoutRef}
          className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-15 2xl:grid-cols-[320px_minmax(0,1fr)] 2xl:gap-20 3xl:grid-cols-[418px_968px] 3xl:gap-[234px]"
        >
          <aside ref={sidebarColumnRef} className="relative w-full mt-5 xl:mt-17 2xl:mt-[110px]" style={sidebarColumnStyle} >
            <div ref={sidebarRef} className="h-fit w-full" style={sidebarStyle}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={moveLeft(0.1)}
              >
                <p className="font-nexa text-20 font-extrabold mb-5">
                  Table Of Contents
                </p>
                <hr className="border-border w-[73%]" />

                <nav className="mt-5">
                  <ul className="space-y-3 sm:space-y-4 xl:space-y-30">
                    {tocItems.map((section) => (
                      <li key={section.title}>
                        <a
                          href={`#${section.targetId}`}
                          onClick={(event) =>
                            handleTocClick(event, section.targetId, setActiveSectionId)
                          }
                          className="group flex items-center gap-3 xl:gap-30 text-paragraph transition-colors duration-300 lg:hover:text-primary"
                        >
                          <span className="mt-[7px] h-[6px] w-[6px] xl:h-[13px] xl:w-[13px] shrink-0 bg-primary transition-transform duration-300 lg:group-hover:scale-125" />
                          <span
                            className={`section-description font-nexa text-20 leading-1p5 transition-colors duration-300 ${activeSectionId === section.targetId
                               ? "text-primary"
                               : "text-paragraph lg:group-hover:text-primary"
                               }`}
                          >
                            {section.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </div>
          </aside>

          <div
            ref={contentColumnRef}
            className="min-w-0 space-y-10 md:space-y-12 xl:space-y-15 2xl:space-y-15 3xl:space-y-15"
          >
            <motion.section
              className="news-item-content scroll-mt-[120px] lg:scroll-mt-[160px]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={moveUp(0.08)}
              dangerouslySetInnerHTML={{ __html: thirdSection.content }}
            />
          </div>
        </div>
      </div>
    </section >
  );
};

export default MoreDetails;
