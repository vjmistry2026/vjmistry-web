import { CategoryType, newsCategories } from "../data";
import FilterButton from "../../common/FilterButton";

type FilterBoxProps = {
  activeCategory: CategoryType | null;
  onCategoryChange: (category: CategoryType) => void;
};

const FilterBox = ({
  activeCategory,
  onCategoryChange,
}: FilterBoxProps) => {
  return ( 
    <div className="flex flex-wrap justify-start gap-3 pt-10 sm:justify-end sm:gap-4 xl:pt-80 xl:gap-30">
      {newsCategories.map((category,index) => (
        <FilterButton
          key={category}
          delayIndex={index}
          btnText={category}
          isActive={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        />
      ))}
    </div>
   );
}
 
export default FilterBox;
