"use client";

import { useEffect, useRef, type ElementType } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

type TextGenerateEffectProps = {
    text: string;
    tag?: ElementType;
    className?: string;
    filter?: boolean;
    duration?: number;
};

const TextGenerateEffect = ({
    text,
    tag: Tag = "div",
    className = "",
    filter = true,
    duration = 0.3,
}: TextGenerateEffectProps) => {
    const [scope, animate] = useAnimate();
    const hasAnimated = useRef(false);

    useEffect(() => {
        // Reset on every mount so client-side navigation works
        hasAnimated.current = false;

        const el = scope.current as HTMLElement | null;
        if (!el) return;

        const runAnimation = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            animate(
                "[data-char]",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                },
                {
                    duration,
                    delay: stagger(0.03),
                    ease: "easeOut",
                }
            );
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    runAnimation();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            hasAnimated.current = false;
        };
    }, [animate, duration, filter, text]); // text in deps so it re-animates if text changes

    return (
        <Tag className={className}>
            <motion.span ref={scope}>
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        data-char
                        style={{
                            opacity: 0,
                            filter: filter ? "blur(8px)" : "none",
                            display: "inline",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </Tag>
    );
};

export default TextGenerateEffect;