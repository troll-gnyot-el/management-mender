
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, Clock, Download, FileText, Lock, Play, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Course = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);

  // Mock course data
  const course = {
    id: courseId || "1",
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and managing a personal budget",
    instructor: "Sarah Johnson",
    duration: "3 hours",
    modules: [
      {
        title: "Introduction to Budgeting",
        lessons: [
          {
            title: "What is a Budget?",
            duration: "10 min",
            type: "video"
          },
          {
            title: "The Importance of Budgeting",
            duration: "8 min",
            type: "video"
          },
          {
            title: "Common Budgeting Myths",
            duration: "12 min",
            type: "video"
          }
        ]
      },
      {
        title: "Creating Your First Budget",
        lessons: [
          {
            title: "Step 1: Tracking Income",
            duration: "15 min",
            type: "video"
          },
          {
            title: "Step 2: Identifying Expenses",
            duration: "20 min",
            type: "video"
          },
          {
            title: "Budget Worksheet",
            duration: "5 min",
            type: "document"
          },
          {
            title: "Practice Exercise",
            duration: "30 min",
            type: "exercise"
          }
        ]
      },
      {
        title: "Sticking to Your Budget",
        lessons: [
          {
            title: "Setting Realistic Goals",
            duration: "12 min",
            type: "video"
          },
          {
            title: "Dealing with Unexpected Expenses",
            duration: "14 min",
            type: "video"
          },
          {
            title: "Monthly Review Process",
            duration: "10 min",
            type: "video"
          },
          {
            title: "Final Assessment",
            duration: "25 min",
            type: "quiz"
          }
        ]
      }
    ]
  };

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  const markLessonComplete = (moduleIndex: number, lessonIndex: number) => {
    const lessonId = moduleIndex * 10 + lessonIndex;
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      
      toast({
        title: "Lesson completed!",
        description: "Your progress has been saved.",
      });
    }
  };

  const handleStartLesson = (moduleIndex: number, lessonIndex: number) => {
    setActiveModule(moduleIndex);
    
    // In a real app, this would navigate to the lesson content
    toast({
      title: "Starting lesson",
      description: `Loading: ${course.modules[moduleIndex].lessons[lessonIndex].title}`,
    });
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "exercise":
        return <FileText className="h-4 w-4" />;
      case "quiz":
        return <Trophy className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

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
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-1">{course.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex gap-2">
                <Download className="h-4 w-4" />
                Materials
              </Button>
              <Button className="bg-finance-green hover:bg-finance-green/90 text-white">
                Continue Learning
              </Button>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Instructor:</span>
              <span className="font-medium">{course.instructor}</span>
            </div>
            <div className="sm:ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Your progress:</span>
              <Progress value={progress} className="h-2 w-24" />
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-8">
            {course.modules.map((module, moduleIndex) => (
              <Card key={moduleIndex} className="overflow-hidden">
                <div className={`p-4 ${activeModule === moduleIndex ? 'bg-finance-yellow/20' : ''}`}>
                  <button 
                    className="flex justify-between items-center w-full font-medium text-left"
                    onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                  >
                    <span>{module.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {module.lessons.length} lessons
                    </span>
                  </button>
                </div>
                
                {activeModule === moduleIndex && (
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const lessonId = moduleIndex * 10 + lessonIndex;
                        const isCompleted = completedLessons.includes(lessonId);
                        const isLocked = moduleIndex > 0 && !completedLessons.includes((moduleIndex - 1) * 10 + course.modules[moduleIndex - 1].lessons.length - 1);
                        
                        return (
                          <li key={lessonIndex} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-finance-green" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={isLocked ? "text-muted-foreground" : ""}>{lesson.title}</span>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                    {getLessonIcon(lesson.type)}
                                    <span>{lesson.type}</span>
                                  </div>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant={isCompleted ? "ghost" : "outline"} 
                                disabled={isLocked}
                                onClick={() => handleStartLesson(moduleIndex, lessonIndex)}
                              >
                                {isCompleted ? "Review" : "Start"}
                              </Button>
                              {!isCompleted && !isLocked && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => markLessonComplete(moduleIndex, lessonIndex)}
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h3>About this course</h3>
                  <p>
                    This course will teach you the fundamentals of creating and managing a personal budget. 
                    You'll learn how to track your income, categorize expenses, set financial goals, and develop 
                    strategies for sticking to your budget even when unexpected expenses arise.
                  </p>
                  
                  <h3>What you'll learn</h3>
                  <ul>
                    <li>The importance of budgeting for financial health</li>
                    <li>How to track income and expenses effectively</li>
                    <li>Creating a realistic budget that works for your lifestyle</li>
                    <li>Strategies for dealing with financial challenges</li>
                    <li>Methods for reviewing and adjusting your budget</li>
                  </ul>
                  
                  <h3>Prerequisites</h3>
                  <p>
                    No prior financial knowledge is required for this course. It's designed for beginners 
                    who want to take control of their personal finances.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't created any notes for this course yet.
                  </p>
                  <Button>Create Your First Note</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Course;
