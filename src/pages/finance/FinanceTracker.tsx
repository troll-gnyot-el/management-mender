
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  PieChart, 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  CreditCard,
  Calendar,
  Plus,
  Search,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { financeService, Transaction } from "@/services/financeService";

const FinanceTracker = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [financeSummary, setFinanceSummary] = useState({
    currentBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    incomeChange: 0,
    expenseChange: 0
  });
  
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isAddSavingsGoalOpen, setIsAddSavingsGoalOpen] = useState(false);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food"
  });
  
  const [newSavingsGoal, setNewSavingsGoal] = useState({
    name: "",
    target: "",
    current: ""
  });
  
  const [fundsToAdd, setFundsToAdd] = useState("");
  
  useEffect(() => {
    // Update document title
    document.title = "Finance Tracker - SmartCity Finance Hub";
    
    // Load data
    setTransactions(financeService.getTransactions());
    setBudgets(financeService.getBudgets());
    setSavingsGoals(financeService.getSavingsGoals());
    setFinanceSummary(financeService.getFinanceSummary());
  }, []);

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const amountValue = parseFloat(newTransaction.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive"
      });
      return;
    }
    
    const finalAmount = newTransaction.type === "expense" ? -amountValue : amountValue;
    
    const transaction = financeService.addTransaction({
      description: newTransaction.description,
      amount: finalAmount,
      category: newTransaction.category
    });
    
    setTransactions([transaction, ...transactions]);
    
    toast({
      title: "Transaction added",
      description: `${newTransaction.description} has been added to your transactions`
    });
    
    // Reset form and close dialog
    setNewTransaction({
      description: "",
      amount: "",
      type: "expense",
      category: "Food"
    });
    setIsAddTransactionOpen(false);
  };
  
  const handleAddSavingsGoal = () => {
    if (!newSavingsGoal.name || !newSavingsGoal.target) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const targetValue = parseFloat(newSavingsGoal.target);
    const currentValue = parseFloat(newSavingsGoal.current || "0");
    
    if (isNaN(targetValue) || targetValue <= 0) {
      toast({
        title: "Invalid target amount",
        description: "Please enter a valid positive number",
        variant: "destructive"
      });
      return;
    }
    
    if (isNaN(currentValue) || currentValue < 0) {
      toast({
        title: "Invalid current amount",
        description: "Please enter a valid non-negative number",
        variant: "destructive"
      });
      return;
    }
    
    const goal = financeService.addSavingsGoal({
      name: newSavingsGoal.name,
      target: targetValue,
      current: currentValue
    });
    
    setSavingsGoals([...savingsGoals, goal]);
    
    toast({
      title: "Savings goal added",
      description: `${newSavingsGoal.name} has been added to your goals`
    });
    
    // Reset form and close dialog
    setNewSavingsGoal({
      name: "",
      target: "",
      current: ""
    });
    setIsAddSavingsGoalOpen(false);
  };
  
  const handleAddFunds = () => {
    if (!selectedGoalId || !fundsToAdd) {
      toast({
        title: "Missing information",
        description: "Please select a goal and enter an amount",
        variant: "destructive"
      });
      return;
    }
    
    const amountValue = parseFloat(fundsToAdd);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive"
      });
      return;
    }
    
    const success = financeService.addFundsToSavingsGoal(selectedGoalId, amountValue);
    
    if (success) {
      // Update the goals in state
      setSavingsGoals(financeService.getSavingsGoals());
      
      toast({
        title: "Funds added",
        description: `$${amountValue.toFixed(2)} has been added to your goal`
      });
      
      // Reset form and close dialog
      setFundsToAdd("");
      setSelectedGoalId(null);
      setIsAddFundsOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/10 wood-pattern pb-12">
      {/* Header */}
      <div className="bg-wood-light/50 py-8 border-b border-wood-medium/30">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Personal Finance Tracker</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage your financial health</p>
            </div>
            <div className="flex gap-2">
              <Button 
                className="bg-finance-green hover:bg-finance-green/90"
                onClick={() => setIsAddTransactionOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Financial overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-finance-yellow/30 to-finance-orange/30 border-finance-orange/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${financeSummary.currentBalance.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-1">Last updated today</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-finance-green/30 to-finance-sage/30 border-finance-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Income This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${financeSummary.monthlyIncome.toFixed(2)}</div>
              <div className="flex items-center text-sm text-finance-green mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{financeSummary.incomeChange}% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-finance-coral/30 to-finance-brown/30 border-finance-coral/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2" />
                Expenses This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${financeSummary.monthlyExpenses.toFixed(2)}</div>
              <div className="flex items-center text-sm text-finance-coral mt-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>{Math.abs(financeSummary.expenseChange)}% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main tabs */}
        <Tabs defaultValue="transactions" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="savings">Savings Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button 
                variant="outline" 
                className="ml-auto md:ml-0"
                onClick={() => setIsAddTransactionOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>
            
            <Card className="bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-2">
                    {transactions.map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 
                              ? 'bg-finance-green/20 text-finance-green' 
                              : 'bg-finance-coral/20 text-finance-coral'
                          }`}>
                            {transaction.amount > 0 ? <TrendingUp className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</div>
                          </div>
                        </div>
                        <div className={`font-medium ${
                          transaction.amount > 0 ? 'text-finance-green' : 'text-finance-coral'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No transactions yet. Add your first transaction to get started.
                    </p>
                    <Button onClick={() => setIsAddTransactionOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </div>
                )}
                
                {transactions.length > 0 && (
                  <Button variant="ghost" className="w-full mt-4">View All Transactions</Button>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    <PieChart className="h-32 w-32 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle>Monthly Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    <BarChart className="h-32 w-32 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="budgets" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Monthly Budgets</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Budget
              </Button>
            </div>
            
            <Card className="bg-white/80">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {budgets.map((budget, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{budget.category}</h3>
                          <div className="text-sm text-muted-foreground">
                            ${budget.spent} of ${budget.budget}
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${
                          budget.percentage > 100 ? 'text-finance-coral' : 'text-finance-green'
                        }`}>
                          {budget.percentage}%
                        </div>
                      </div>
                      <Progress 
                        value={budget.percentage > 100 ? 100 : budget.percentage} 
                        className={`h-2 ${
                          budget.percentage > 100 ? 'bg-finance-coral/50' : ''
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center">
                  <BarChart className="h-32 w-32 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="savings" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Savings Goals</h2>
              <Button onClick={() => setIsAddSavingsGoalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Goal
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savingsGoals.map(goal => (
                <Card key={goal.id} className="overflow-hidden bg-white/80">
                  <div className="h-2 bg-finance-green" />
                  <CardHeader>
                    <CardTitle>{goal.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{goal.percentage}% complete</span>
                        <span className="text-sm font-medium">${goal.current} of ${goal.target}</span>
                      </div>
                      <Progress value={goal.percentage} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedGoalId(goal.id);
                          setIsAddFundsOpen(true);
                        }}
                      >
                        Add Funds
                      </Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed flex items-center justify-center p-6 bg-white/50">
                <Button 
                  variant="ghost" 
                  className="h-full w-full flex flex-col py-8"
                  onClick={() => setIsAddSavingsGoalOpen(true)}
                >
                  <Plus className="h-8 w-8 mb-2" />
                  <span>Add New Savings Goal</span>
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Transaction Dialog */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of your transaction below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                placeholder="E.g. Grocery shopping"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={newTransaction.type}
                onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newTransaction.category}
                onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Savings Goal Dialog */}
      <Dialog open={isAddSavingsGoalOpen} onOpenChange={setIsAddSavingsGoalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Savings Goal</DialogTitle>
            <DialogDescription>
              Set a new savings goal to track your progress.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input 
                id="goal-name" 
                placeholder="E.g. Emergency Fund"
                value={newSavingsGoal.name}
                onChange={(e) => setNewSavingsGoal({...newSavingsGoal, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-amount">Target Amount ($)</Label>
              <Input 
                id="target-amount" 
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                value={newSavingsGoal.target}
                onChange={(e) => setNewSavingsGoal({...newSavingsGoal, target: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-amount">Current Savings ($)</Label>
              <Input 
                id="current-amount" 
                placeholder="0.00 (optional)"
                type="number"
                min="0"
                step="0.01"
                value={newSavingsGoal.current}
                onChange={(e) => setNewSavingsGoal({...newSavingsGoal, current: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddSavingsGoal}>Create Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Funds to Goal Dialog */}
      <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to Goal</DialogTitle>
            <DialogDescription>
              Add funds to your savings goal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Savings Goal</Label>
              <Select 
                value={selectedGoalId?.toString() || ""}
                onValueChange={(value) => setSelectedGoalId(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a goal" />
                </SelectTrigger>
                <SelectContent>
                  {savingsGoals.map(goal => (
                    <SelectItem key={goal.id} value={goal.id.toString()}>
                      {goal.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input 
                id="amount" 
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                value={fundsToAdd}
                onChange={(e) => setFundsToAdd(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddFunds}>Add Funds</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinanceTracker;
