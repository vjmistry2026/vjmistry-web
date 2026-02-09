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

        animate(
            "[data-char]",
            {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
            },
            {
                duration,
                delay: stagger(0.04), // typing cadence
                ease: "easeOut",
            }
        );
    }, [animate, duration, filter]);

    return (
        <Tag className={className}>
            <motion.span
                ref={scope}
                style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
            >
                {text.split("").map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        data-char
                        style={{
                            opacity: 0,
                            filter: filter ? "blur(8px)" : "none",
                            display: "inline-block",
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
