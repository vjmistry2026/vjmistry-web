import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CustomButtonProps {
  label: string;
  href: string;
  className?: string;
  textColor?: "white" | "black";
  arrowDirection?: "up-right" | "up" | "right" | "down" | "left";
  onClick?: () => void;
}

const TEXT_COLORS = {
  white: "#FDFDFD",
  black: "#1C1C1C",
};

const ARROW_ROTATION = {
  "up-right": { base: "rotate-0", hover: "group-hover:rotate-45" },
  up: { base: "rotate-[-45deg]", hover: "" },
  right: { base: "rotate-[45deg]", hover: "" },
  down: { base: "rotate-[135deg]", hover: "" },
  left: { base: "rotate-[225deg]", hover: "" },
};

const CustomButton = ({ label, href, className = "", textColor = "white", arrowDirection = "up-right", onClick }: CustomButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = (e?: React.MouseEvent) => {
    if (!href || href === "" || href === "#") e?.preventDefault();
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onClick?.();
  };

  const color = TEXT_COLORS[textColor];
  const { base, hover } = ARROW_ROTATION[arrowDirection ?? "up-right"];

  const inner = (
    <>
      <span style={{ color }} className="h-[44px] sm:h-[52px] lg:h-[64px] px-4 sm:px-6 lg:px-10 border border-border inline-flex items-center justify-center whitespace-nowrap mr-2 sm:mr-[10px] transition-all duration-300 group-hover:mr-0 group-hover:bg-primary group-hover:border-primary group-hover:!text-[#FDFDFD]">
        {label}
      </span>
      <span className="h-[44px] sm:h-[52px] lg:h-[64px] w-[44px] sm:w-[52px] lg:w-[64px] border border-border inline-flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
        <Image src="/assets/icons/right-top-arrow-primary.svg" alt="arrow" width={14} height={14}
          className={`pointer-events-none h-[12px] sm:h-[14px] w-[12px] sm:w-[14px] transition-all duration-300 group-hover:invert group-hover:brightness-0 ${base} ${hover}`}
        />
      </span>
    </>
  );

  const sharedClass = `group inline-flex items-center font-nexa font-bold text-16 transition-all duration-250 ${className} ${pressed ? "scale-95" : "scale-100"}`;

  if (!href || href === "" || href === "#") {
    return (
      <button type="button" onClick={handleClick} className={sharedClass}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={sharedClass}>
      {inner}
    </Link>
  );
};

export default CustomButton;
