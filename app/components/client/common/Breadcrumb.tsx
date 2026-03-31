"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VALID_ROUTES = new Set(["/","/news", "/services", "/projects", "/contact-us"]);

type BreadcrumbProps = {
  variant?: "light" | "dark";
};

const Breadcrumb = ({ variant = "light" }: BreadcrumbProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => ({
      label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  const inactiveColor =
    variant === "dark" ? "text-secondary/50" : "text-paragraph-2/50";
  const activeColor =
    variant === "dark" ? "text-secondary" : "text-paragraph-2";
  const hoverColor =
    variant === "dark"
      ? "group-hover:text-secondary"
      : "group-hover:text-paragraph-2";

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative z-20 flex flex-wrap items-center gap-[6px] pointer-events-auto touch-manipulation"
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        const isClickable = !isLast && VALID_ROUTES.has(crumb.href);

        return (
          <span
            key={crumb.href}
            className="flex items-center gap-1 pr-1 lg:gap-3 lg:pr-3"
          >
            {isClickable ? (
              <Link
                href={crumb.href}
                className="group relative z-10 flex items-center gap-1 pointer-events-auto touch-manipulation lg:gap-3"
              >
                <span
                  className={`section-description transition-colors duration-300 ${inactiveColor} ${hoverColor}`}
                >
                  •
                </span>
                <span
                  className={`section-description text-16 sm:text-20 transition-colors duration-300 ${inactiveColor} ${hoverColor}`}
                >
                  {crumb.label}
                </span>
              </Link>
            ) : (
              <>
                <span className={`${inactiveColor} section-description`}>•</span>
                <span
                  className={`section-description text-16 sm:text-20 ${isLast ? activeColor : inactiveColor}`}
                >
                  {crumb.label}
                </span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
