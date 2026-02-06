import Image from "next/image";
import Link from "next/link";

interface CustomButtonProps {
  label: string;
  href: string;
  className?: string;
  textColor?: string;
}

const CustomButton = ({ label, href, className = "", textColor = "#ffffff" }: CustomButtonProps) => {
  return (
    <Link href={href} className={`group inline-flex items-center font-nexa font-bold text-16 ${className}`}>
      {/* Text box */}
      <span
        style={{ "--btn-text": textColor } as React.CSSProperties}
        className="h-[44px] sm:h-[52px] lg:h-[64px] px-4 sm:px-6 lg:px-10 border border-border inline-flex items-center justify-center whitespace-nowrap mr-2 sm:mr-[10px] text-[var(--btn-text)] transition-all duration-300 group-hover:mr-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white"
      >
        {label}
      </span>

      {/* Icon box */}
      <span className="h-[44px] sm:h-[52px] lg:h-[64px] w-[44px] sm:w-[52px] lg:w-[64px] border border-border inline-flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
        <Image
          src="/assets/icons/right-top-arrow-primary.svg"
          alt="arrow-up-right"
          width={14}
          height={14}
          className="h-[12px] sm:h-[14px] w-[12px] sm:w-[14px] transition-all duration-300 group-hover:rotate-45 group-hover:invert group-hover:brightness-0"
        />
      </span>
    </Link>
  );
};

export default CustomButton;
