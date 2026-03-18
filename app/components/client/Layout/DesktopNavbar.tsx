"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "./navItems";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants, itemVariants } from "@/app/components/motionVariants";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
    const [hovered, setHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const navItemsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const pathname = usePathname();
    const LIGHT_BG_ROUTES = ["/about-us/founder-message", "/news/news-details"];
    const isActive = hovered || scrolled || LIGHT_BG_ROUTES.includes(pathname);

    // Entry animation on mount
    useEffect(() => {
        const nav = navRef.current;
        const logo = logoRef.current;
        const navItems = navItemsRef.current;
        const cta = ctaRef.current;

        if (!nav || !logo || !navItems || !cta) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Start everything invisible — do NOT set autoAlpha on navItems container
        gsap.set(logo, { autoAlpha: 0, y: -12 });
        gsap.set(Array.from(navItems.children), { autoAlpha: 0, y: -10 });
        gsap.set(cta, { autoAlpha: 0, y: -12 });

        tl.to(logo, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.2 })
          .to(cta, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.2")
          .to(Array.from(navItems.children), {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.08,
          }, "-=0.1");

        return () => { tl.kill(); };
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`z-[9999] fixed top-0 left-0 site-navbar w-full transition-colors duration-450 ${isActive ? "bg-paragraph-2 shadow-[0px_4.1px_43.04px_0px_#0000000F]" : "bg-transparent"}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setHoveredItem(null);
            }}
        >
            <div className="container flex items-center justify-between max-h-[124px] py-7 3xl:py-[30px]">
                {/* Logo */}
                <Link ref={logoRef} href="/" className="relative flex items-center w-[170px] 2xl:w-[234px] h-[62px] shrink-0">
                    <Image
                        src="/assets/logo/logo-white.png"
                        alt="V.J. Mistry & Company Ltd."
                        width={253}
                        height={67}
                        priority
                        className={`pointer-events-none absolute inset-0 transition-all duration-300 ease-out ${isActive ? "opacity-0" : "opacity-100"} 2xl:w-[234px] 2xl:h-[62px] w-[140px] xl:w-[180px] h-auto`}
                    />
                    <Image
                        src="/assets/logo/logo-black.svg"
                        alt="V.J. Mistry & Company Ltd."
                        width={253}
                        height={67}
                        priority
                        className={`pointer-events-none absolute inset-0 transition-all duration-300 ease-out ${isActive ? "opacity-100" : "opacity-0"} 2xl:w-[234px] 2xl:h-[62px] w-[140px] xl:w-[180px] h-auto`}
                    />
                </Link>

                {/* Navigation */}
                <div className="flex items-center">
                    <div ref={navItemsRef} className="flex items-center lg:gap-[25px] xl:gap-[40px] 3xl:gap-[69px]">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative" onMouseEnter={() => setHoveredItem(item.label)}>
                                <div className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 ${isActive ? "text-secondary" : "text-paragraph-2"}`}>
                                    {item.href ? (
                                        <Link href={item.href} className="text-16 xl:text-17 3xl:text-20 font-nexa font-bold leading-[100%]">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-16 xl:text-17 3xl:text-20 font-nexa font-bold leading-[100%]">
                                            {item.label}
                                        </span>
                                    )}

                                    {item.children && (
                                        <Image
                                            src="/assets/icons/down-arrow-tip.svg"
                                            alt="Down Arrow"
                                            width={16}
                                            height={7}
                                            className={`pointer-events-none transition-all duration-400 ${hoveredItem === item.label ? "rotate-180" : ""} ${isActive ? "invert" : ""}`}
                                        />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {item.children && hoveredItem === item.label && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="absolute left-0 top-full mt-[28px] min-w-[220px] bg-white shadow-lg rounded-md"
                                        >
                                            <ul className="py-4">
                                                {item.children.map((child, index) => (
                                                    <motion.li
                                                        key={child.label}
                                                        variants={itemVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={index}
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            className="block px-6 py-2 font-nexa text-16 text-secondary hover:text-primary transition-colors duration-200"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        ref={ctaRef}
                        href="#"
                        onMouseEnter={() => setHoveredItem("Contact Us")}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="ml-5 2xl:ml-[20px] p-[25px] bg-primary flex items-center justify-center"
                    >
                        <Image
                            src="/assets/icons/right-top-arrow-white.svg"
                            alt="Go"
                            width={16}
                            height={16}
                            className={`transition-transform duration-400 pointer-events-none ${hoveredItem === "Contact Us" ? "rotate-45" : ""}`}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}