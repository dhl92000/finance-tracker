import { Chip } from "@nextui-org/chip";

import { CurrencyFormatter } from "../util/CurrencyFormatter";

// interface created for props
interface CategoryItemProps {
  itemCategory: string;
  itemSum: number;
  itemPercentage: number;
  key: number;
}

const CategoryItem = ({
  key,
  itemCategory,
  itemSum,
  itemPercentage,
}: CategoryItemProps) => {
  const categoryName = itemCategory[0].toUpperCase() + itemCategory.slice(1);
  let chipColour: 'default' | 'success' | 'warning' | 'primary' | 'secondary' | 'danger' = 'default'

//  grey, orange, dark orange itemPercentage > 10 : 'orange'

if (itemPercentage > 10 && itemPercentage < 20 ) {
  chipColour = 'success'
} else if (itemPercentage > 20) {
  chipColour = 'warning'
}

  return (

    <div key={key} className="flex justify-between my-2">
      <div>
        <p>{categoryName}</p>
      </div>

      <div>{CurrencyFormatter.format(itemSum)}</div>
      <div>
        <Chip radius='sm' color={chipColour}>{itemPercentage}%</Chip>
      </div>
    </div>
  );
};

export default CategoryItem;
