
// Types for finance data
export type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
};

export type Budget = {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
};

export type SavingsGoal = {
  id: number;
  name: string;
  current: number;
  target: number;
  percentage: number;
};

// Sample data
let transactions: Transaction[] = [
  { id: 1, description: "Grocery Store", amount: -78.35, date: "Today", category: "Food" },
  { id: 2, description: "Salary Deposit", amount: 2450.00, date: "Yesterday", category: "Income" },
  { id: 3, description: "Electric Bill", amount: -94.20, date: "Mar 15", category: "Utilities" },
  { id: 4, description: "Coffee Shop", amount: -4.75, date: "Mar 14", category: "Food" },
  { id: 5, description: "Gas Station", amount: -45.30, date: "Mar 14", category: "Transportation" },
  { id: 6, description: "Online Course", amount: -29.99, date: "Mar 12", category: "Education" }
];

const budgets: Budget[] = [
  { category: "Food", spent: 420, budget: 500, percentage: 84 },
  { category: "Transportation", spent: 150, budget: 200, percentage: 75 },
  { category: "Utilities", spent: 180, budget: 250, percentage: 72 },
  { category: "Entertainment", spent: 120, budget: 100, percentage: 120 },
  { category: "Education", spent: 50, budget: 150, percentage: 33 }
];

const savingsGoals: SavingsGoal[] = [
  { id: 1, name: "Emergency Fund", current: 3500, target: 10000, percentage: 35 },
  { id: 2, name: "Vacation", current: 1200, target: 2000, percentage: 60 },
  { id: 3, name: "New Laptop", current: 800, target: 1500, percentage: 53 }
];

// Finance summaries
const financeSummary = {
  currentBalance: 5280.45,
  monthlyIncome: 2850.00,
  monthlyExpenses: 1345.87,
  incomeChange: 15,
  expenseChange: -8
};

// Finance service API
export const financeService = {
  getTransactions: () => transactions,
  getBudgets: () => budgets,
  getSavingsGoals: () => savingsGoals,
  getFinanceSummary: () => financeSummary,
  
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...transaction,
      date: "Today"
    };
    
    transactions = [newTransaction, ...transactions];
    return newTransaction;
  },
  
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'percentage'>) => {
    const percentage = Math.round((goal.current / goal.target) * 100);
    const newGoal = {
      id: savingsGoals.length + 1,
      ...goal,
      percentage
    };
    
    savingsGoals.push(newGoal);
    return newGoal;
  },
  
  addFundsToSavingsGoal: (goalId: number, amount: number) => {
    const goal = savingsGoals.find(g => g.id === goalId);
    if (goal) {
      goal.current += amount;
      goal.percentage = Math.round((goal.current / goal.target) * 100);
      return true;
    }
    return false;
  }
};
