import Image from "next/image";
import Link from "next/link";

interface CustomButtonProps {
    label: string;
    href: string;
    className?: string;
    textColor?: string;
}

const CustomButton = ({
    label,
    href,
    className = "",
    textColor = "white",
}: CustomButtonProps) => {
    return (
        <Link
            href={href}
            className={`group inline-flex font-nexa font-bold text-16 items-center ${className}`}
        >
            {/* Text box */}
            <span
                style={{ color: textColor }}
                className="
                    h-[64px] px-10 border border-border
                    inline-flex items-center justify-center
                    mr-[10px]
                    transition-all duration-400
                    group-hover:mr-0
                    group-hover:bg-primary group-hover:border-primary
                    group-hover:text-white
                "
            >
                {label}
            </span>

            {/* Icon box */}
            <span
                className="
                    h-[64px] w-[64px] border border-border
                    inline-flex items-center justify-center
                    transition-all duration-400
                    group-hover:bg-primary group-hover:border-primary
                "
            >
                <Image
                    src="/assets/icons/right-top-arrow-primary.svg"
                    alt="arrow-up-right"
                    width={14}
                    height={14}
                    className="
                        h-[14px] w-[14px]
                        transition-all duration-400
                        group-hover:rotate-45
                        group-hover:invert
                        group-hover:brightness-0
                    "
                />
            </span>
        </Link>
    );
};

export default CustomButton;
