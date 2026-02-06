"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "./navItems";

export default function MobileNavbar() {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const toggleItem = (label: string) => {
        setActiveItem((prev) => (prev === label ? null : label));
    };

    return (
        <>
            {/* TOP BAR */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-[#FDFDFD]">
                <div className="container flex items-center justify-between py-[20px]">
                    {/* LOGO */}
                    <Link href="/" className="w-[140px]">
                        <Image
                            src="/assets/logo/logo-black.png"
                            alt="V.J. Mistry"
                            width={180}
                            height={50}
                            className="w-full h-auto"
                        />
                    </Link>

                    {/* HAMBURGER / CLOSE */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="relative w-[28px] h-[22px] flex flex-col justify-between"
                    >
                        {/* TOP LINE */}
                        <motion.span
                            animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="block h-[2px] w-full bg-primary"
                        />

                        {/* MIDDLE LINE */}
                        <motion.span
                            animate={open ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="block h-[2px] w-full bg-primary"
                        />

                        {/* BOTTOM LINE */}
                        <motion.span
                            animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="block h-[2px] w-full bg-primary"
                        />
                    </button>
                </div>
            </nav>

            {/* OVERLAY */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/70 z-20"
                    />
                )}
            </AnimatePresence>

            {/* SLIDE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ x: "100%", opacity: 0.8 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0.8 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="fixed top-0 right-0 z-30 h-full w-[80%] bg-[#FDFDFD] shadow-xl overflow-y-auto"
                    >
                        <div className="pt-[100px] px-[24px] pb-[40px]">
                            <ul className="flex flex-col gap-[24px]">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.label}>
                                        {/* MAIN ITEM */}
                                        <div className="flex items-center justify-between">
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setOpen(false)}
                                                    className="text-20 font-nexa font-bold text-black"
                                                >
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => toggleItem(item.label)}
                                                    className="text-20 font-nexa font-bold text-black"
                                                >
                                                    {item.label}
                                                </button>
                                            )}

                                            {item.children && (
                                                <motion.span
                                                    animate={{ rotate: activeItem === item.label ? 180 : 0 }}
                                                    className="ml-4 text-primary cursor-pointer"
                                                    onClick={() => toggleItem(item.label)}
                                                >
                                                    <Image
                                                        src="/assets/icons/down-arrow-tip.svg"
                                                        alt="Arrow Down"
                                                        width={16}
                                                        height={16}
                                                        className="invert"
                                                    />
                                                </motion.span>
                                            )}
                                        </div>

                                        {/* SUB MENU */}
                                        <AnimatePresence>
                                            {item.children && activeItem === item.label && (
                                                <motion.ul
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="pl-[16px] mt-[12px] flex flex-col gap-[12px] overflow-hidden"
                                                >
                                                    {item.children.map((child) => (
                                                        <li key={child.label}>
                                                            <Link
                                                                href={child.href}
                                                                onClick={() => setOpen(false)}
                                                                className="text-16 font-nexa font-bold text-paragraph"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
