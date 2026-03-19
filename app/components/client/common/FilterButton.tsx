import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

interface FilterButtonProps {
  delayIndex?: number;
  btnText: string;
  isActive?: boolean;
  onClick?: () => void;
}

const FilterButton = ({
  delayIndex = 0,
  btnText,
  isActive = false,
  onClick,
}: FilterButtonProps) => {
  return (
    <motion.div variants={moveUp(0.2 * delayIndex)} initial="hidden" animate="show">
      <button
        type="button"
        aria-pressed={isActive}
        onClick={onClick}
        className={`group relative flex items-center justify-center overflow-hidden whitespace-nowrap px-5 py-3 text-15 font-bold font-nexa cursor-pointer border transition-[border-color,transform] duration-300 active:scale-95 sm:px-8 sm:py-4 sm:text-16 lg:px-10 lg:py-5 ${
          isActive ? "border-primary" : "border-border hover:border-primary"
        }`}
      >
        <span
          className={`absolute inset-0 bg-primary transition-transform duration-300 ease-in-out ${
            isActive ? "translate-x-0" : "-translate-x-[102%] group-hover:translate-x-0"
          }`}
        />
        <span
          className={`relative z-10 transition-colors duration-300 ${
            isActive ? "text-paragraph-2" : "text-secondary group-hover:text-paragraph-2"
          }`}
        >
          {btnText}
        </span>
      </button>
    </motion.div>
  );
};

export default FilterButton;
