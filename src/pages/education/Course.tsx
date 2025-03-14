
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Clock, 
  Download, 
  FileText, 
  Lock, 
  Play, 
  Trophy 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { educationService, Course as CourseType, Lesson } from "@/services/educationService";

const Course = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const foundCourse = educationService.getCourseById(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Get all completed lessons
        const completed: number[] = [];
        foundCourse.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            if (lesson.completed) {
              completed.push(lesson.id);
            }
          });
        });
        setCompletedLessons(completed);
        
        // Update document title
        document.title = `${foundCourse.title} - SmartCity Finance Hub`;
      } else {
        toast({
          title: "Course not found",
          description: "The requested course could not be found.",
          variant: "destructive"
        });
        navigate("/education/courses");
      }
    }
    setLoading(false);
  }, [courseId, toast, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Course not found</h2>
          <Button asChild>
            <Link to="/education/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      
      toast({
        title: "Lesson completed!",
        description: "Your progress has been saved.",
      });
    }
  };

  const handleStartLesson = (moduleIndex: number, lessonIndex: number, lessonId: number) => {
    setActiveModule(moduleIndex);
    
    // In a real app, this would navigate to the lesson content
    toast({
      title: "Starting lesson",
      description: `Loading: ${course.modules[moduleIndex].lessons[lessonIndex].title}`,
    });
    
    // Auto-mark as started/viewed after a delay
    setTimeout(() => {
      if (!completedLessons.includes(lessonId)) {
        markLessonComplete(lessonId);
      }
    }, 2000);
  };

  const getLessonIcon = (type: 'video' | 'document' | 'exercise' | 'quiz') => {
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

  // Check if a lesson is locked (previous module not completed)
  const isLessonLocked = (moduleIndex: number, lessonIndex: number) => {
    if (moduleIndex === 0) return false;
    
    // Check if all lessons in previous module are completed
    const previousModule = course.modules[moduleIndex - 1];
    if (!previousModule) return false;
    
    const allPreviousCompleted = previousModule.lessons.every(lesson => 
      completedLessons.includes(lesson.id)
    );
    
    return !allPreviousCompleted;
  };

  return (
    <div className="min-h-screen bg-muted/10 wood-pattern pb-12">
      {/* Header */}
      <div className="bg-finance-yellow/20 py-8 border-b border-finance-yellow/30">
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
              <Button 
                className="bg-finance-green hover:bg-finance-green/90 text-white"
                onClick={() => {
                  // Find first incomplete lesson
                  for (let i = 0; i < course.modules.length; i++) {
                    const moduleIndex = i;
                    const module = course.modules[i];
                    
                    for (let j = 0; j < module.lessons.length; j++) {
                      const lessonIndex = j;
                      const lesson = module.lessons[j];
                      
                      if (!completedLessons.includes(lesson.id) && !isLessonLocked(moduleIndex, lessonIndex)) {
                        setActiveModule(moduleIndex);
                        handleStartLesson(moduleIndex, lessonIndex, lesson.id);
                        break;
                      }
                    }
                  }
                }}
              >
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
              <Card key={moduleIndex} className="overflow-hidden bg-white/80">
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
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isLocked = isLessonLocked(moduleIndex, lessonIndex);
                        
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
                                onClick={() => handleStartLesson(moduleIndex, lessonIndex, lesson.id)}
                              >
                                {isCompleted ? "Review" : "Start"}
                              </Button>
                              {!isCompleted && !isLocked && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => markLessonComplete(lesson.id)}
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
            <Card className="bg-white/80">
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
            <Card className="bg-white/80">
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
