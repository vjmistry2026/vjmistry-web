"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { quickLinks, resources, socialMedia, contactLocations } from "./navItems";

const Footer = () => {
    const [activeLocation, setActiveLocation] = useState<keyof typeof contactLocations>("headOffice");
    const activeData = contactLocations[activeLocation];

    return (
        <footer className="bg-[#1C1C1C]">
            <div className="container">

                {/* ================= TOP SECTION ================= */}
                <div className="pb-40 pt-70 grid grid-cols-2 xl:grid-cols-[2fr_1.2fr_1.2fr_1.2fr] gap-y-[30px] xl:gap-y-[60px] gap-x-100">
                    {/* SUBSCRIBE */}
                    <div className="max-w-[480px] col-span-2 md:col-span-1 xl:col-span-1">
                        <h3 className="text-66 3xl:text-75 font-condensed leading-[110%] mb-[22px] lg:mb-[30px] text-[#FDFDFD]">
                            Subscribe
                            <br />
                            to Newsletter
                        </h3>
                        <div className="flex max-w-[386px]">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="w-full h-[48px] px-[16px] placeholder:text-[#64748B] placeholder:text-14 placeholder:font-nexa placeholder:font-normal placeholder:leading-[1.57] outline-none bg-white"
                            />
                            <button className="bg-primary text-white font-nexa font-normal px-[47px] text-16">
                                Join
                            </button>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h4 className="text-32 font-condensed leading-[100%] mb-[30px] text-[#FDFDFD]">
                            Quick Links
                        </h4>
                        <ul className="flex flex-col gap-[20px] text-20 leading-[1.5] text-paragraph">
                            {quickLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="hover:text-[#FDFDFD] font-nexa font-bold transition">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RESOURCES */}
                    <div>
                        <h4 className="text-32 font-condensed leading-[100%] mb-[30px] text-[#FDFDFD]">
                            Resources
                        </h4>
                        <ul className="flex flex-col gap-[20px] text-20 leading-[1.5] text-paragraph">
                            {resources.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="hover:text-[#FDFDFD] font-nexa font-bold transition">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SOCIAL MEDIA */}
                    <div className="col-span-1">
                        <div>
                            <h4 className="text-32 font-condensed leading-[100%] mb-[30px] text-[#FDFDFD]">
                                Social Media
                            </h4>
                            <div className="flex items-center gap-[20px]">
                                {socialMedia.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="h-[50px] w-[50px] flex items-center justify-center bg-paragraph/20 hover:bg-primary transition"
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={24}
                                            height={24}
                                            className="object-contain w-[24px] h-[24px]"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= DIVIDER ================= */}
                <div className="h-px w-full bg-gradient-to-r from-[#1C1C1C] via-[#A6A6A6] to-[#1C1C1C]" />

                {/* ================= BOTTOM SECTION ================= */}
                <div className="pt-40 pb-70 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_2.4fr_0fr_1.2fr] gap-y-[30px] lg:gap-y-[50px] gap-x-100">
                    {/* LOGO (under Subscribe) */}
                    <div className="flex justify-start">
                        <Image src="/assets/logo/logo-white.png" alt="VJ Mistry" width={253} height={67} className="w-[210px] lg:w-[253px] lg:h-[67px]" />
                        
                    </div>

                    {/* CONNECT (under Quick Links) */}
                    <div>
                        <h4 className="text-32 font-condensed leading-[100%] mb-[20px] lg:mb-[30px] text-[#FDFDFD]">
                            Connect With Us
                        </h4>

                        {/* TABS */}
                        <div className="flex items-center gap-[20px] ml-1">
                            {(Object.keys(contactLocations) as (keyof typeof contactLocations)[]).map((key) => {
                                const isActive = activeLocation === key;

                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveLocation(key)}
                                        className={`flex items-center gap-[12px] transition cursor-pointer font-nexa font-bold text-20 mb-[20px] ${
                                            isActive ? "text-white" : "text-white/70 hover:text-white"
                                        }`}
                                    >
                                        <span
                                            className={`h-[5px] w-[5px] rounded-full ${
                                                isActive ? "bg-primary" : "bg-paragraph"
                                            }`}
                                        />
                                        {contactLocations[key].label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ADDRESS */}
                        <div className="flex items-start gap-[12px] mb-[10px] lg:mb-[20px]">
                            <Image src="/assets/images/footer/map.svg" alt="Location" width={16} height={16} className="mt-[4px]" />
                            <p className="text-20 font-nexa font-bold leading-[1.5] text-paragraph">
                                {activeData.address}
                            </p>
                        </div>

                        {/* PHONE */}
                        <div className="flex items-center gap-[12px] mb-[10px] lg:mb-[20px]">
                            <Image src="/assets/images/footer/phone.svg" alt="Phone" width={16} height={16} />
                            <p className="text-20 font-nexa font-bold leading-[1.5] text-paragraph">
                                {activeData.phone}
                            </p>
                        </div>

                        {/* EMAIL */}
                        <div className="flex items-center gap-[12px]">
                            <Image src="/assets/images/footer/mail.svg" alt="Email" width={16} height={16} />
                            <p className="text-20 font-nexa font-bold leading-[1.5] text-paragraph">
                                {activeData.email}
                            </p>
                        </div>
                    </div>

                    {/* EMPTY COLUMN (under Resources) */}
                    <div className="hidden lg:block" />

                    {/* QR (under Social Media) */}
                    <div className="flex justify-start">
                        <div>
                            <h4 className="text-32 font-condensed leading-[100%] text-[#FDFDFD] mb-[20px] lg:mb-[30px]">
                                Scan Here
                            </h4>
                            <div className="relative xl:w-[190px] xl:h-[190px] w-[140px] h-[140px] flex items-center justify-center">
                                <Image
                                    src="/assets/images/footer/qr-border.svg"
                                    alt="QR Border"
                                    width={190}
                                    height={190}
                                    className="absolute inset-0 w-full h-full"
                                />
                                <div className="relative z-10 p-[13px]">
                                    <Image
                                        src="/assets/images/footer/social/qr.svg"
                                        alt="QR Code"
                                        width={164}
                                        height={164}
                                        className="w-[164px] h-[164px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= PRIVACY ================= */}
            <div className="bg-[#2A2A2A]">
                <div className="container py-[20px] 2xl:py-[34px] leading-[100%] flex items-center justify-between lg:justify-start lg:gap-[80px] text-20 font-nexa font-bold text-paragraph">
                    <Link href="/privacy-policy" className="hover:text-white transition">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-conditions" className="hover:text-white transition">
                        Terms & Conditions
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
