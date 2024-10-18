// interface created for props
interface CategoryItemProps {
  itemCategory: string, 
  itemSum: number, 
  itemPercentage: number, 
  key:number
}

const CategoryItem = ({key, itemCategory, itemSum, itemPercentage}:CategoryItemProps) => {
  
  const categoryName = itemCategory[0].toUpperCase() + itemCategory.slice(1)

    return (
        <div key={key} className="flex justify-between my-1">
          <div><p>{categoryName}</p></div>
          <div>${itemSum}</div>
          {/* <div><p>{itemPercentage}%</p></div> */}
        </div>
    )
}

export default CategoryItem