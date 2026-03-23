"use client";

import Image from "next/image";
import { useState } from "react";

type ArrowDirection = "left" | "right" | "up" | "down";

const arrowRotation: Record<ArrowDirection, string> = {
  right: "rotate-45",
  left:  "-rotate-135",
  up:    "-rotate-45",
  down:  "rotate-[135deg]",
};

const bgSlide: Record<ArrowDirection, { initial: string; hovered: string }> = {
  right: { initial: "-translate-x-full", hovered: "group-hover:translate-x-0" },
  left:  { initial: "translate-x-full",  hovered: "group-hover:translate-x-0" },
  up:    { initial: "translate-y-full",  hovered: "group-hover:translate-y-0" },
  down:  { initial: "-translate-y-full", hovered: "group-hover:translate-y-0" },
};

interface SliderNavButtonProps {
  direction: ArrowDirection;
  onClick: () => void;
  size?: "default" | "small";
}

const sizeClassMap = {
  default: "h-[44px] w-[44px] sm:h-[52px] sm:w-[52px] lg:h-[64px] lg:w-[64px]",
  small: "h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] lg:h-[44px] lg:w-[44px]",
} as const;

const arrowSizeClassMap = {
  default: "w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]",
  small: "w-[9px] h-[9px] lg:w-[12px] lg:h-[12px]",
} as const;

export default function SliderNavButton({ direction, onClick, size = "default" }: SliderNavButtonProps) {
  const slide = bgSlide[direction];
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer border border-[#D9D9D9] group flex items-center justify-center hover:border-primary transition-all duration-300 ${sizeClassMap[size]} ${pressed ? "scale-95" : "scale-100"}`}
    >
      {/* Sliding bg */}
      <span
        className={`absolute inset-0 bg-primary ${slide.initial} ${slide.hovered} transition-transform duration-300 ease-in-out`}
      />

      {/* Arrow */}
      <Image
        src="/assets/icons/right-top-arrow-primary.svg"
        alt={`${direction} arrow`}
        width={14}
        height={14}
        className={`pointer-events-none relative z-10 ${arrowRotation[direction]} group-hover:invert group-hover:brightness-0 transition-all duration-300 ${arrowSizeClassMap[size]} object-contain`}
      />
    </button>
  );
}
