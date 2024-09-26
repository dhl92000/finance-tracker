// interface created for props
interface CategoryItemProps {
  itemCategory: string, 
  itemSum: number, 
  itemPercentage: number, 
  key:number
}

const CategoryItem = ({key, itemCategory, itemSum, itemPercentage}:CategoryItemProps) => {
    
    return (
        <div key={key} className="categoryItem">
          <div><p>{itemCategory}: ${itemSum}</p></div>
          <div><p>{itemPercentage}%</p></div>
        </div>
    )
}

export default CategoryItem