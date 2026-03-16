"use client";

import { useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT_COLORS = {
    white: "#FDFDFD",
    black: "#1C1C1C",
};

type AnimatedHeadingProps = {
    text: string;
    tag?: ElementType;
    className?: string;
    color?: "white" | "black";
};

const AnimatedHeading = ({
    text,
    tag: Tag = "h2",
    className = "",
    color = "black",
}: AnimatedHeadingProps) => {
    const headingRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = headingRef.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const chars = el.querySelectorAll("[data-char]");

        gsap.set(chars, { y: 28, opacity: 0 });

        const ctx = gsap.context(() => {
            gsap.to(chars, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    once: true,
                },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <Tag ref={headingRef} className={`section-heading ${className}`} style={{ color: TEXT_COLORS[color] }}>
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.25em" }}>
                    {word.split("").map((char, charIndex) => (
                        <span key={charIndex} data-char style={{ display: "inline-block" }}>
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </Tag>
    );
};

export default AnimatedHeading;