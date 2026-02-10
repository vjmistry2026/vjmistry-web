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
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const startAnimation = () => {
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

        // ✅ Ensure animation starts AFTER page load
        if (document.readyState === "complete") {
            startAnimation();
        } else {
            window.addEventListener("load", startAnimation, { once: true });
        }
    }, [animate, duration, filter]);

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
