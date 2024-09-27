export class Expense {
  // Properties
  label: string;
  amount: number;
  owner: string;
  frequency: Frequency;
  category: string;

  constructor(
    label: string,
    amount: number,
    owner: string,
    frequency: Frequency,
    category: string
  ) {
    this.label = label;
    this.amount = amount;
    this.owner = owner;
    this.frequency = frequency;
    this.category = category;
  }
}

export enum Frequency {
  Yearly = 12,
  Monthly = 1,
}

class Summary {
  category: string;
  sum: string;
  constructor(category: string, sum: string) {
    this.category = category;
    this.sum = sum;
  }
}

export class ExpenseSummary {
  summaries: Summary[];
  subtotal: number;
  constructor(summaries: Summary[], subtotal: number) {
    this.summaries = summaries;
    this.subtotal = subtotal;
  }
}

// typically a CRUD service
export class MockExpenseService {
  expenses: Expense[];

  constructor(expenses: Expense[]) {
    this.expenses = expenses;
  }

  // get expenses in an array
  getExpenses(): Expense[] {
    // return [foo]
    return this.expenses;
  }
  //   getExpense(id: number): Expense {

  //   }
  createExpense(expense: Expense) {
    this.expenses.push(expense)
  }
  // update
  
  // delete
}

export class ExpenseSummarizer {
  // summarizeExpenses(expenses: Expense[]): any {
  summarizeExpenses(expenses: Expense[]) {
    // Total monthly sum of all expense items
    let monthlySumsTotal: number = 0;
    const monthlySums: { [key: string]: number } = {};

    // Total monthly sum of 1 category for monthlySums obj
    for (const expense of expenses) {
      let amount = expense.amount;

      if (expense.frequency === Frequency.Yearly) {
        amount = expense.amount / 12;
      }

      monthlySumsTotal += amount;
      monthlySums[expense.category] =
        (monthlySums[expense.category] ?? 0) + amount;
    }

    // Percentage of 1 category per month / total sum
    const byCategory: { category: string; sum: number; percentage: number }[] =
      [];

    // 0 / 0 = NaN. Add code to handle 0s?
    for (const x in monthlySums) {
      const percentage =
        monthlySums[x] === 0
          ? 0
          : Math.round((monthlySums[x] / monthlySumsTotal) * 100);

      byCategory.push({
        category: x,
        sum: parseFloat(monthlySums[x].toFixed(2)),
        percentage: percentage,
      });
    }

    return {
      byCategory: byCategory,
      totalMonthlySum: parseFloat(monthlySumsTotal.toFixed(2)),
      totalAnnualSum: parseFloat((monthlySumsTotal * 12).toFixed(2)),
    };
  }
}
