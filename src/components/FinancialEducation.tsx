
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, TrendingUp, Target, Brain, DollarSign, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FinancialEducation = () => {
  // Sample education modules data
  const modules = [
    {
      id: 1,
      title: "Budgeting Basics",
      description: "Learn the fundamentals of creating and managing a personal budget",
      icon: <DollarSign className="h-6 w-6" />,
      progress: 85,
      color: "finance-yellow",
      bgcolor: "bg-finance-yellow/20",
      borderColor: "border-finance-yellow"
    },
    {
      id: 2,
      title: "Smart Saving",
      description: "Discover strategies to save more and achieve your financial goals",
      icon: <Target className="h-6 w-6" />,
      progress: 65,
      color: "finance-orange",
      bgcolor: "bg-finance-orange/20",
      borderColor: "border-finance-orange"
    },
    {
      id: 3,
      title: "Investing Fundamentals",
      description: "Get started with investing basics for long-term financial growth",
      icon: <TrendingUp className="h-6 w-6" />,
      progress: 40,
      color: "finance-green",
      bgcolor: "bg-finance-orange/20",
      borderColor: "border-finance-green"
    },
    {
      id: 4,
      title: "Debt Management",
      description: "Learn strategies to manage and reduce your debt effectively",
      icon: <Brain className="h-6 w-6" />,
      progress: 25,
      color: "finance-brown",
      bgcolor: "bg-finance-brown/20",
      borderColor: "border-finance-brown"
    },
    {
      id: 5,
      title: "Financial Planning",
      description: "Create a comprehensive financial plan for your future",
      icon: <Book className="h-6 w-6" />,
      progress: 10,
      color: "finance-coral",
      bgcolor: "bg-finance-coral/20",
      borderColor: "border-finance-coral"
    },
    {
      id: 6,
      title: "Money Psychology",
      description: "Understand your relationship with money and improve financial habits",
      icon: <Lightbulb className="h-6 w-6" />,
      progress: 5,
      color: "finance-sage",
      bgcolor: "bg-finance-sage/20",
      borderColor: "border-finance-sage"
    }
  ];

  // Daily tip
  const dailyTip = {
    title: "Daily Finance Tip",
    content: "The 50/30/20 rule suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.",
    icon: <Lightbulb className="h-6 w-6 text-finance-orange" />
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-finance-yellow/10 dark:from-background dark:to-finance-brown/10">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-finance-brown dark:text-finance-yellow">
            Financial Education Center
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Improve your financial literacy with our interactive lessons and practical exercises
          </p>
        </div>

        {/* Daily Tip Card */}
        <div className="glass-card p-6 rounded-xl mb-10 max-w-3xl mx-auto border border-finance-orange/30">
          <div className="flex items-start gap-4">
            <div className="bg-finance-orange/20 p-2 rounded-full">
              {dailyTip.icon}
            </div>
            <div>
              <h3 className="text-xl font-medium text-finance-orange mb-2">{dailyTip.title}</h3>
              <p className="text-muted-foreground">{dailyTip.content}</p>
            </div>
          </div>
        </div>

        {/* Learning Progress Overview */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Your Learning Progress</h3>
            <span className="text-sm font-medium">38% Complete</span>
          </div>
          <Progress value={38} className="h-3 bg-finance-yellow/20">
            <div className="h-full bg-gradient-to-r from-finance-yellow to-finance-orange rounded-full" />
          </Progress>
        </div>

        {/* Education Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className={`p-6 rounded-xl transition-all hover:-translate-y-1 duration-300 ${module.bgcolor} border ${module.borderColor}`}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-background shadow-md mb-4 text-${module.color}`}>
                {module.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{module.title}</h3>
              <p className="text-muted-foreground mb-4">{module.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{module.progress}% complete</span>
                <Link to={`/education/${module.id}`} className="text-sm font-medium hover:underline">
                  Continue
                </Link>
              </div>
              <Progress value={module.progress} className="h-1.5" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="rounded-full bg-finance-orange hover:bg-finance-orange/90 text-white"
          >
            <Link to="/education/all">
              Explore All Courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinancialEducation;
