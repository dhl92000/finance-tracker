import { Card, CardBody } from "@nextui-org/card";
import CategoryItem from "../components/CategoryItem";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

interface SummaryItem {
  category: string;
  sum: number;
  percentage: number;
}

interface SummaryProps {
  summary: {
    byCategory: SummaryItem[];
    totalMonthlySum: number;
    totalAnnualSum: number;
  };
}

const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="md:w-2/5 ">
      <h4 className="text-left my-4">Your Financial Summary</h4>
      {/* <Table>
        <TableHeader>
          <TableColumn>Category</TableColumn>
          <TableColumn>Amount</TableColumn>
        </TableHeader>
        <TableBody items={summary.byCategory}>
         {(item) => (
            <TableRow key={item.category}>
                {(columnKey) => <TableCell> {getKeyValue(item,columnKey)}</TableCell>} 
            </TableRow>
         )}
        </TableBody>
      </Table> */}

      <Card className="p-6 md:p-10 ">
        <h4 className="text-left">Expenses</h4>
        <CardBody>
          {summary.byCategory.map((item, index) => (
            <CategoryItem
              key={index}
              itemCategory={item.category}
              itemSum={item.sum}
              itemPercentage={item.percentage}
            />
          ))}
        </CardBody>
        <div className="text-left">
          <p>Total Monthly: ${summary.totalMonthlySum}</p>
          <p>Total Annual: ${summary.totalAnnualSum}</p>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
