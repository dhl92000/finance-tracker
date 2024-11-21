import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import CategoryItem from "../components/CategoryItem";
import { CurrencyFormatter } from "../util/CurrencyFormatter";

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
      <h4 className="text-left my-4 tracking-wide font-semibold">Financial Summary</h4>
      <Tabs aria-label="Expenses Summary">
        <Tab title="Monthly">


          <Card className="p-6 md:p-10 ">
          <div className="text-left font-medium">
              <p><div className="text-4xl text-green-600">{CurrencyFormatter.format(summary.totalMonthlySum)}</div> Total Monthly</p>
          </div>
            <h4 className="text-left font-medium mt-6">Categories</h4>
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

          </Card>
        </Tab>

        <Tab title="Yearly">
        <Card className="p-6 md:p-10 ">
          <div className="text-left font-medium">
              <p><div className="text-4xl text-green-600">{CurrencyFormatter.format(summary.totalAnnualSum)}</div> Total Annual</p>
          </div>
            <h4 className="text-left font-medium mt-6">Categories</h4>
            <CardBody>
              {summary.byCategory.map((item, index) => (
                <CategoryItem
                  key={index}
                  itemCategory={item.category}
                  itemSum={item.sum * 12}
                  itemPercentage={item.percentage}
                />
                
              ))}
            </CardBody>
          </Card>
          
          </Tab>
      </Tabs>
    </div>
  );
};

export default Summary;
