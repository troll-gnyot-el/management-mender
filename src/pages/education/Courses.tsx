
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, BookOpen, Brain, DollarSign, Filter, Lightbulb, SearchIcon, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock courses data
  const allCourses = [
    {
      id: 1,
      title: "Budgeting Basics",
      description: "Learn the fundamentals of creating and managing a personal budget",
      icon: <DollarSign className="h-6 w-6" />,
      progress: 85,
      level: "Beginner",
      duration: "3 hours",
      instructor: "Sarah Johnson",
      color: "finance-yellow",
      enrolled: true
    },
    {
      id: 2,
      title: "Smart Saving",
      description: "Discover strategies to save more and achieve your financial goals",
      icon: <Target className="h-6 w-6" />,
      progress: 65,
      level: "Beginner",
      duration: "2.5 hours",
      instructor: "Michael Chen",
      color: "finance-orange",
      enrolled: true
    },
    {
      id: 3,
      title: "Investing Fundamentals",
      description: "Get started with investing basics for long-term financial growth",
      icon: <TrendingUp className="h-6 w-6" />,
      progress: 40,
      level: "Intermediate",
      duration: "4 hours",
      instructor: "Jessica Williams",
      color: "finance-green",
      enrolled: true
    },
    {
      id: 4,
      title: "Debt Management",
      description: "Learn strategies to manage and reduce your debt effectively",
      icon: <Brain className="h-6 w-6" />,
      progress: 0,
      level: "Beginner",
      duration: "2 hours",
      instructor: "Robert Martinez",
      color: "finance-brown",
      enrolled: false
    },
    {
      id: 5,
      title: "Financial Planning",
      description: "Create a comprehensive financial plan for your future",
      icon: <Book className="h-6 w-6" />,
      progress: 0,
      level: "Advanced",
      duration: "5 hours",
      instructor: "Amanda Lee",
      color: "finance-coral",
      enrolled: false
    },
    {
      id: 6,
      title: "Money Psychology",
      description: "Understand your relationship with money and improve financial habits",
      icon: <Lightbulb className="h-6 w-6" />,
      progress: 0,
      level: "Intermediate",
      duration: "3.5 hours",
      instructor: "David Thompson",
      color: "finance-sage",
      enrolled: false
    }
  ];

  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const enrolledCourses = filteredCourses.filter(course => course.enrolled);
  const availableCourses = filteredCourses.filter(course => !course.enrolled);

  return (
    <div className="min-h-screen bg-muted/10 pb-12">
      {/* Header */}
      <div className="bg-finance-yellow/20 py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Financial Education Courses</h1>
              <p className="text-muted-foreground mt-1">Improve your financial literacy with our interactive courses</p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Level</DropdownMenuLabel>
                  <DropdownMenuItem>Beginner</DropdownMenuItem>
                  <DropdownMenuItem>Intermediate</DropdownMenuItem>
                  <DropdownMenuItem>Advanced</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Duration</DropdownMenuLabel>
                  <DropdownMenuItem>Less than 2 hours</DropdownMenuItem>
                  <DropdownMenuItem>2-4 hours</DropdownMenuItem>
                  <DropdownMenuItem>More than 4 hours</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Course listings */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className={`h-2 bg-${course.color}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className={`w-10 h-10 rounded-full bg-${course.color}/20 flex items-center justify-center`}>
                        {course.icon}
                      </div>
                      <div className="px-2 py-1 text-xs bg-muted rounded-full">
                        {course.level}
                      </div>
                    </div>
                    <CardTitle className="mt-3">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    {course.enrolled && (
                      <>
                        <div className="flex justify-between items-center text-xs mt-3 mb-1">
                          <span>{course.progress}% complete</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${course.enrolled ? "bg-finance-green hover:bg-finance-green/90" : ""}`}
                      variant={course.enrolled ? "default" : "outline"}
                      asChild
                    >
                      <Link to={`/education/course/${course.id}`}>
                        {course.enrolled ? "Continue Learning" : "Enroll Now"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="enrolled" className="space-y-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className={`h-2 bg-${course.color}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className={`w-10 h-10 rounded-full bg-${course.color}/20 flex items-center justify-center`}>
                          {course.icon}
                        </div>
                        <div className="px-2 py-1 text-xs bg-muted rounded-full">
                          {course.level}
                        </div>
                      </div>
                      <CardTitle className="mt-3">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <span>Instructor: {course.instructor}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs mt-3 mb-1">
                        <span>{course.progress}% complete</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-finance-green hover:bg-finance-green/90"
                        asChild
                      >
                        <Link to={`/education/course/${course.id}`}>
                          Continue Learning
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No enrolled courses</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't enrolled in any courses yet.
                </p>
                <Button asChild>
                  <Link to="?tab=available">Browse Available Courses</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available" className="space-y-6">
            {availableCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className={`h-2 bg-${course.color}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className={`w-10 h-10 rounded-full bg-${course.color}/20 flex items-center justify-center`}>
                          {course.icon}
                        </div>
                        <div className="px-2 py-1 text-xs bg-muted rounded-full">
                          {course.level}
                        </div>
                      </div>
                      <CardTitle className="mt-3">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <span>Instructor: {course.instructor}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link to={`/education/course/${course.id}`}>
                          Enroll Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No available courses found for your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
