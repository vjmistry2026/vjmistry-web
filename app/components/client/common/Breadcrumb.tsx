"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Add any real navigable routes here
const VALID_ROUTES = new Set([
    "/",
    "/services",
    "/projects",
    "/contact-us",
]);

const Breadcrumb = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const crumbs = [
        { label: "Home", href: "/" },
        ...segments.map((seg, i) => ({
            label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            href: "/" + segments.slice(0, i + 1).join("/"),
        })),
    ];

    return (
        <nav className="flex items-center gap-[6px]">
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                const isClickable = !isLast && VALID_ROUTES.has(crumb.href);

                return (
                    <span key={crumb.href} className="flex items-center gap-3 pr-3">
                        <span className="text-paragraph-2/50 section-description">•</span>

                        {isClickable ? (
                            <Link
                                href={crumb.href}
                                className="section-description text-16 sm:text-20 text-paragraph-2/50 hover:text-paragraph-2 transition-colors duration-300"
                            >
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className={`section-description text-16 sm:text-20 ${isLast ? "text-paragraph-2" : "text-paragraph-2/50"}`}>
                                {crumb.label}
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;