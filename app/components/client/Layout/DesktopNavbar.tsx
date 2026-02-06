"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "./navItems";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants, itemVariants } from "@/app/components/motionVariants";

export default function DesktopNavbar() {
    const [hovered, setHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    const isActive = hovered || scrolled;


    useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
}, []);


    return (
        <nav
            className={`fixed top-0 left-0 site-navbar w-full z-50 transition-colors duration-400 ${isActive ? "bg-[#FDFDFD]" : "bg-transparent"}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setHoveredItem(null);
            }}
        >
            <div className="container flex items-center justify-between max-h-[124px] py-[30px]">
                {/* Logo */}
                <Link href="/" className="relative flex items-center w-[170px] 2xl:w-[234px] h-[62px]">
                    <Image
                        src="/assets/logo/logo-white.png"
                        alt="V.J. Mistry & Company Ltd."
                        width={234}
                        height={62}
                        priority
                        className={`absolute inset-0 transition-all duration-300 ease-out ${isActive ? "opacity-0 scale-100" : "opacity-100 scale-100"} 2xl:w-[234px] 2xl:h-[62px] w-[140px] xl:w-[180px] h-auto`}
                    />
                    <Image
                        src="/assets/logo/logo-black.png"
                        alt="V.J. Mistry & Company Ltd."
                        width={234}
                        height={62}
                        priority
                        className={`absolute inset-0 transition-all duration-300 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-100"} 2xl:w-[234px] 2xl:h-[62px] w-[140px] xl:w-[180px] h-auto`}
                    />
                </Link>

                {/* Navigation */}
                <div className="flex items-center">
                    {/* Nav items (gap applies ONLY here) */}
                    <div className="flex items-center lg:gap-[25px] xl:gap-[40px] 3xl:gap-[69px]">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative" onMouseEnter={() => setHoveredItem(item.label)}>
                                <div
                                    className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 ${isActive ? "text-black" : "text-white"}`}
                                >
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="text-16 2xl:text-20 font-nexa font-bold leading-[100%]"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-16 2xl:text-20 font-nexa font-bold leading-[100%]">
                                            {item.label}
                                        </span>
                                    )}

                                    {item.children && (
                                        <Image
                                            src="/assets/icons/down-arrow-tip.svg"
                                            alt="Down Arrow"
                                            width={16}
                                            height={7}
                                            className={`transition-transform duration-300 ${hoveredItem === item.label ? "rotate-180" : ""} ${isActive ? "invert" : ""}`}
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
                                                            className="block px-6 py-2 font-nexa text-16 text-black hover:text-primary transition-colors duration-200"
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

                    {/* CTA Square (exact 20px gap) */}
                    <Link
                        href="/contact"
                        className="ml-5 2xl:ml-[20px] p-[25px] bg-[var(--primary)] flex items-center justify-center"
                    >
                        <Image
                            src="/assets/icons/right-top-arrow-white.svg"
                            alt="Go"
                            width={16}
                            height={16}
                            className={`transition-all duration-400 ${hovered ? "rotate-45" : ""}`}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
