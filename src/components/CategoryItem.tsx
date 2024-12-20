import { Chip } from "@nextui-org/chip";

import { CurrencyFormatter } from "../util/CurrencyFormatter";

// interface created for props
interface CategoryItemProps {
  itemCategory: string;
  itemSum: number;
  itemPercentage: number;
  key: number;
  color: string
}

const CategoryItem = ({
  key,
  itemCategory,
  itemSum,
  itemPercentage,
  color
}: CategoryItemProps) => {

  const categoryName = itemCategory[0].toUpperCase() + itemCategory.slice(1);
  let chipColour = "default";

  if (itemPercentage > 10 && itemPercentage < 20) {
    chipColour = "text-background bg-green-500";
  } else if (itemPercentage > 20) {
    chipColour = "text-background bg-green-600";
  }

  return (
    <div key={key} className="flex my-2 gap-4">

      <div className="flex-none">
        <Chip variant="flat" className={color}>{categoryName}</Chip>
      </div>

      <div className=" flex-grow text-right">{CurrencyFormatter.format(itemSum)}</div>

      <div className="flex-none w-20 text-right">
        <Chip radius='sm' className={chipColour}>{itemPercentage}%</Chip>
      </div>
    </div>
  );
};

export default CategoryItem;
