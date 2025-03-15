import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  User, 
  X,
  BarChart2,
  GraduationCap,
  CreditCard,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const logOut = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, you would handle the logout logic here
  };

  // Mock data for progress
  const learningProgress = 65;
  const lastLesson = {
    title: "Creating a Monthly Budget",
    course: "Budgeting Basics",
    completed: "2 days ago"
  };
  
  const financeData = {
    income: "$2,480",
    change: "+15%",
    period: "Last Month"
  };
  
  const lastTest = {
    title: "Investment Basics Quiz",
    score: "85%",
    date: "Last week"
  };
  
  // Mock test data for each lesson
  const lessonTests = [
    {
      id: 1,
      lessonTitle: "Budgeting Fundamentals",
      tests: [
        { id: 101, title: "Budgeting Basics Quiz", completed: true, score: "90%" },
        { id: 102, title: "Income vs Expenses Test", completed: false, score: null }
      ]
    },
    {
      id: 2,
      lessonTitle: "Saving Strategies",
      tests: [
        { id: 201, title: "Saving Methods Quiz", completed: true, score: "85%" },
        { id: 202, title: "Emergency Fund Test", completed: true, score: "100%" }
      ]
    },
    {
      id: 3,
      lessonTitle: "Investment Basics",
      tests: [
        { id: 301, title: "Investment Types Quiz", completed: true, score: "75%" },
        { id: 302, title: "Risk Assessment", completed: false, score: null }
      ]
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <Sidebar className="glass-panel fixed">
          <SidebarHeader>
            <div className="flex items-center p-2">
              <img 
                src="/lovable-uploads/e73cbd58-454a-4c2f-a064-6ffbe00f777e.png" 
                alt="SquirrelHub"
                className="h-8 w-8 mr-2" 
              />
              <span className="font-bold text-lg text-primary">SmartCity Finance</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/education/courses">
                        <GraduationCap />
                        <span>Education</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/progress">
                        <BarChart2 />
                        <span>Progress Tracker</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/finance">
                        <CreditCard />
                        <span>Finance Tracker</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/profile">
                        <User />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={logOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile menu button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            className="bg-background"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex flex-col glass-panel p-4 pt-16">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/dashboard" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/education/courses" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                <span>Education</span>
              </Link>
              <Link 
                to="/progress" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                <span>Progress Tracker</span>
              </Link>
              <Link 
                to="/finance" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                <span>Finance Tracker</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="mr-2 h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Link 
                to="/" 
                className="flex items-center p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="mr-2 h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  logOut();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        )}

        {/* Main content - shift it to the right to avoid overlay with the sidebar */}
        <div className="flex-1 p-4">
          <div className="mb-8 glass-panel p-6">
            <h1 className="text-3xl font-bold mb-2 text-black">Welcome to SquirrelHub</h1>
            <p className="text-muted-foreground">Track your financial education journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Squirrel Image */}
            <Card className="glass-panel flex flex-col items-center justify-center p-6">
              <img 
                src="/lovable-uploads/e73cbd58-454a-4c2f-a064-6ffbe00f777e.png" 
                alt="Squirrel mascot" 
                className="w-32 h-32 mb-4" 
              />
              <h2 className="text-2xl font-bold text-center text-black">Your Financial Education Partner</h2>
              <p className="text-center text-muted-foreground mt-2">
                Learn to save and invest with SquirrelBank!
              </p>
            </Card>
            
            {/* Learning Progress */}
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-black">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{learningProgress}% Complete</span>
                  <span className="text-sm font-medium">16/25 Lessons</span>
                </div>
                <Progress value={learningProgress} className="h-2 bg-muted" />
                <Button variant="link" size="sm" className="mt-2 px-0 text-primary" asChild>
                  <Link to="/progress">View Detailed Progress</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Last Lesson Learned */}
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-black">Last Learned Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full mr-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black">{lastLesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lastLesson.course}</p>
                    <p className="text-xs text-muted-foreground mt-1">Completed {lastLesson.completed}</p>
                  </div>
                </div>
                <Button size="sm" className="mt-4 w-full" asChild>
                  <Link to="/education/courses">Continue Learning</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Finance Income */}
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-black">Finance Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl font-bold text-black">{financeData.income}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-secondary">{financeData.change}</span>
                      <span className="text-xs text-muted-foreground ml-2">{financeData.period}</span>
                    </div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <Button size="sm" className="mt-4 w-full" variant="outline" asChild>
                  <Link to="/finance">View Finance Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Last Test Completed */}
          <Card className="glass-panel mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-black">Last Completed Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-black">{lastTest.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-semibold text-secondary">Score: {lastTest.score}</span>
                    <span className="text-xs text-muted-foreground ml-3">{lastTest.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lesson Tests Section */}
          <h2 className="text-2xl font-bold mb-4 text-black">Your Lesson Tests</h2>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Tests</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {lessonTests.map((lessonTest) => (
                <Card key={lessonTest.id} className="glass-panel">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-black">{lessonTest.lessonTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessonTest.tests.map((test) => (
                        <div key={test.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-3 ${test.completed ? 'bg-secondary' : 'bg-muted-foreground'}`}></div>
                            <span>{test.title}</span>
                          </div>
                          <div className="flex items-center">
                            {test.completed ? (
                              <span className="text-sm font-medium text-secondary mr-4">{test.score}</span>
                            ) : (
                              <Button size="sm" variant="outline" className="mr-4">Take Test</Button>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {lessonTests.map((lessonTest) => (
                <Card key={lessonTest.id} className="glass-panel">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-black">{lessonTest.lessonTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessonTest.tests.filter(test => test.completed).map((test) => (
                        <div key={test.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                            <span>{test.title}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-secondary mr-4">{test.score}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {lessonTests.map((lessonTest) => (
                <Card key={lessonTest.id} className="glass-panel">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-black">{lessonTest.lessonTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessonTest.tests.filter(test => !test.completed).map((test) => (
                        <div key={test.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground mr-3"></div>
                            <span>{test.title}</span>
                          </div>
                          <div className="flex items-center">
                            <Button size="sm" variant="outline" className="mr-4">Take Test</Button>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
