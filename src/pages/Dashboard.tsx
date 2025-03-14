
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  TrendingUp, 
  User, 
  X,
  BarChart2,
  GraduationCap,
  CreditCard
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

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

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Budgeting Basics",
      progress: 85,
      color: "finance-yellow",
    },
    {
      id: 2,
      title: "Smart Saving",
      progress: 65,
      color: "finance-orange",
    },
    {
      id: 3,
      title: "Investing Fundamentals",
      progress: 40,
      color: "finance-green",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col md:flex-row bg-wood-light/20">
        {/* Sidebar for desktop */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-2">
              <img 
                src="/lovable-uploads/e73cbd58-454a-4c2f-a064-6ffbe00f777e.png" 
                alt="SmartCity Finance Hub" 
                className="h-8 w-8 mr-2" 
              />
              <span className="font-bold text-lg text-finance-brown">SmartCity Finance</span>
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
          <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-background p-4 pt-16">
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

        {/* Main content */}
        <div className="flex-1 p-4 md:p-8 wood-pattern">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to SmartCity Finance Hub</h1>
            <p className="text-muted-foreground">Here's an overview of your financial education progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-wood-light/50 border-wood-medium/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">38% Complete</span>
                  <span className="text-sm font-medium">3/8 Courses</span>
                </div>
                <Progress value={38} className="h-2" />
                <Button variant="link" size="sm" className="mt-2 px-0" asChild>
                  <Link to="/progress">View Detailed Progress</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-wood-light/50 border-wood-medium/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Finance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">$5,280</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/finance">Manage Finances</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Total balance across accounts</p>
              </CardContent>
            </Card>
            <Card className="bg-wood-light/50 border-wood-medium/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">5 Days</span>
                  <div className="flex -space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-6 h-6 rounded-full bg-finance-green flex items-center justify-center text-xs text-white font-medium"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Keep learning to maintain your streak!</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Your Active Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden bg-white/90 hover:shadow-md transition-shadow">
                <div className={`h-2 bg-${course.color}`} />
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{course.progress}% complete</span>
                    <Link to={`/education/course/${course.id}`} className="text-sm font-medium text-finance-green hover:underline">
                      Continue
                    </Link>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed hover:shadow-md transition-shadow bg-white/90">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <p className="text-muted-foreground mb-4">Discover more courses</p>
                <Button asChild>
                  <Link to="/education/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
