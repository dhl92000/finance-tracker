import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import CategoryItem from "../components/CategoryItem";
import { CurrencyFormatter } from "../util/CurrencyFormatter";
import { useEffect, useState } from "react";

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
  categoryColors: { [key: string]: string };
}

const Summary = ({ summary, categoryColors }: SummaryProps) => {
  const [sortedCategories, setSortedCategories] = useState<SummaryItem[]>([]);

  useEffect(() => {
    const sorted = summary.byCategory.sort((a, b) => b.sum - a.sum);
    setSortedCategories(sorted);
  }, [summary.byCategory]);

  return (
    <div className="md:w-2/5 ">
      <Card className="md:p-4">
        <CardBody>
          <CardHeader className="text-4xl mb-4">Financial Summary</CardHeader>
          <Tabs aria-label="Expenses Summary">
            <Tab title="Monthly">
              <div className="text-left">
                <div className="text-5xl text-green-600 font-semibold mt-4">
                  {CurrencyFormatter.format(summary.totalMonthlySum)}
                </div>
                <p className="font-thin">Total Monthly Expenses</p>
              </div>
              <h4 className="mt-6">Categories</h4>
              {sortedCategories.map((item, index) => (
                <CategoryItem
                  key={index}
                  itemCategory={item.category}
                  itemSum={item.sum}
                  itemPercentage={item.percentage}
                  color={categoryColors[item.category]}
                />
              ))}
            </Tab>

            <Tab title="Yearly">
              <div className="text-left">
                <div className="text-5xl text-green-600 font-semibold mt-4">
                  {CurrencyFormatter.format(summary.totalAnnualSum)}
                </div>
                <p className="font-thin">Total Annual Expenses</p>
              </div>
              <h4 className="text-left font-medium mt-6">Categories</h4>
              {sortedCategories.map((item, index) => (
                <CategoryItem
                  key={index}
                  itemCategory={item.category}
                  itemSum={item.sum * 12}
                  itemPercentage={item.percentage}
                  color={categoryColors[item.category]}
                />
              ))}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Summary;
