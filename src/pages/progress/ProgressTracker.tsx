
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProgressTracker = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  
  useEffect(() => {
    // Update document title
    document.title = "Progress Tracker - SmartCity Finance Hub";
    
    // In a real app, this would fetch from an API
    setActiveCourses([
      {
        id: 1,
        title: "Budgeting Basics",
        progress: 85,
        lastActivity: "3 days ago",
        totalModules: 3,
        completedModules: 2,
        color: "finance-yellow"
      },
      {
        id: 2,
        title: "Smart Saving",
        progress: 65,
        lastActivity: "1 week ago",
        totalModules: 4,
        completedModules: 3,
        color: "finance-orange"
      },
      {
        id: 3,
        title: "Investing Fundamentals",
        progress: 40,
        lastActivity: "2 days ago",
        totalModules: 5,
        completedModules: 2,
        color: "finance-green"
      }
    ]);
    
    setCompletedCourses([
      {
        id: 4,
        title: "Financial Basics 101",
        completedDate: "April 15, 2023",
        score: 92,
        color: "finance-coral"
      }
    ]);
  }, []);

  // Calculate overall progress
  const totalModules = activeCourses.reduce((total, course) => total + course.totalModules, 0);
  const completedModules = activeCourses.reduce((total, course) => total + course.completedModules, 0);
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen bg-muted/10 finance-pattern pb-12">
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
              <h1 className="text-3xl font-bold">Learning Progress Tracker</h1>
              <p className="text-muted-foreground mt-1">Track your journey to financial literacy</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress overview section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Overall Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">{overallProgress}% Complete</span>
                <span className="font-medium">{completedModules} of {totalModules} modules</span>
              </div>
              <Progress value={overallProgress} className="h-3 mb-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{activeCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Active Courses</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{completedCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Completed Courses</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{completedModules}</div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-wood-light/30 border-wood-medium/50">
            <CardHeader className="pb-2">
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-finance-orange/20 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-finance-orange" />
                </div>
                <div>
                  <h3 className="font-medium">Learning Enthusiast</h3>
                  <p className="text-sm text-muted-foreground">Completed your first course</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-finance-green/20 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-finance-green" />
                </div>
                <div>
                  <h3 className="font-medium">5-Day Streak</h3>
                  <p className="text-sm text-muted-foreground">Learned for 5 consecutive days</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">View All Achievements</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Course tabs */}
        <Tabs defaultValue="active" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">Active Courses</TabsTrigger>
            <TabsTrigger value="completed">Completed Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className={`h-2 bg-${course.color}`} />
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                      <span className="text-sm">Last activity: {course.lastActivity}</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {course.completedModules} of {course.totalModules} modules
                      </span>
                      <Button size="sm" asChild>
                        <Link to={`/education/course/${course.id}`}>
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className={`h-2 bg-${course.color}`} />
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{course.title}</CardTitle>
                        <CheckCircle className="h-5 w-5 text-finance-green" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span>Completed on: {course.completedDate}</span>
                        <span className="font-medium">Score: {course.score}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          View Certificate
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/education/course/${course.id}`}>
                            Review Course
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="bg-muted/50 inline-flex p-3 rounded-full mb-4">
                  <Trophy className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No completed courses yet</h3>
                <p className="text-muted-foreground mb-6">
                  Complete your first course to earn a certificate and achievement badges
                </p>
                <Button asChild>
                  <Link to="/education/courses">Browse All Courses</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Learning activity section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Learning Activity</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-finance-yellow/20 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-finance-yellow" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Completed "Budget Worksheet" lesson</h3>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Budgeting Basics</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </li>
                <li className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-finance-orange/20 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-finance-orange" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Started "Investment Types" module</h3>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Investing Fundamentals</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-finance-green/20 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-finance-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Earned "5-Day Streak" achievement</h3>
                      <span className="text-sm text-muted-foreground">5 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Learning consistently for 5 days</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
