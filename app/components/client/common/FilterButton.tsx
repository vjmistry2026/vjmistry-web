interface FilterButtonProps {
  btnText: string;
  isActive?: boolean;
  onClick?: () => void;
}

const FilterButton = ({
  btnText,
  isActive = false,
  onClick,
}: FilterButtonProps) => {
  return ( 
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`text-16 font-bold border border-border px-10 py-5 font-nexa transition-colors duration-300 cursor-pointer ${
        isActive
          ? "bg-primary text-white border-primary"
          : "hover:bg-primary hover:text-white"
      }`}
    >
      {btnText}
    </button>

   );
}
 
export default FilterButton;
