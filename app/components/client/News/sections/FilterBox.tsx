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
    <div className="flex justify-end gap-30 pt-80">
      {newsCategories.map((category) => (
        <FilterButton
          key={category}
          btnText={category}
          isActive={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        />
      ))}
    </div>
   );
}
 
export default FilterBox;
