
// Types for education data
export type Lesson = {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'document' | 'exercise' | 'quiz';
  completed?: boolean;
  locked?: boolean;
};

export type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: number | string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  progress: number;
  color: string;
  modules: Module[];
};

// Active courses data
const activeCourses = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and managing a personal budget",
    instructor: "Sarah Johnson",
    duration: "3 hours",
    progress: 85,
    color: "finance-yellow",
    modules: [
      {
        id: 1,
        title: "Introduction to Budgeting",
        lessons: [
          {
            id: 101,
            title: "What is a Budget?",
            duration: "10 min",
            type: "video",
            completed: true
          },
          {
            id: 102,
            title: "The Importance of Budgeting",
            duration: "8 min",
            type: "video",
            completed: true
          },
          {
            id: 103,
            title: "Common Budgeting Myths",
            duration: "12 min",
            type: "video",
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: "Creating Your First Budget",
        lessons: [
          {
            id: 201,
            title: "Step 1: Tracking Income",
            duration: "15 min",
            type: "video",
            completed: false
          },
          {
            id: 202,
            title: "Step 2: Identifying Expenses",
            duration: "20 min",
            type: "video",
            completed: false
          },
          {
            id: 203,
            title: "Budget Worksheet",
            duration: "5 min",
            type: "document",
            completed: false
          },
          {
            id: 204,
            title: "Practice Exercise",
            duration: "30 min",
            type: "exercise",
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: "Sticking to Your Budget",
        lessons: [
          {
            id: 301,
            title: "Setting Realistic Goals",
            duration: "12 min",
            type: "video",
            completed: false,
            locked: true
          },
          {
            id: 302,
            title: "Dealing with Unexpected Expenses",
            duration: "14 min",
            type: "video",
            completed: false,
            locked: true
          },
          {
            id: 303,
            title: "Monthly Review Process",
            duration: "10 min",
            type: "video",
            completed: false,
            locked: true
          },
          {
            id: 304,
            title: "Final Assessment",
            duration: "25 min",
            type: "quiz",
            completed: false,
            locked: true
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Smart Saving",
    description: "Discover strategies to save more and achieve your financial goals",
    instructor: "Michael Chen",
    duration: "2.5 hours",
    progress: 65,
    color: "finance-orange",
    modules: [
      {
        id: 1,
        title: "Saving Fundamentals",
        lessons: [
          {
            id: 101,
            title: "Why Save Money?",
            duration: "10 min",
            type: "video",
            completed: true
          },
          {
            id: 102,
            title: "Setting Saving Goals",
            duration: "15 min",
            type: "video",
            completed: true
          }
        ]
      },
      {
        id: 2,
        title: "Saving Strategies",
        lessons: [
          {
            id: 201,
            title: "50/30/20 Rule",
            duration: "18 min",
            type: "video",
            completed: true
          },
          {
            id: 202,
            title: "Automatic Saving",
            duration: "12 min",
            type: "video",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Investing Fundamentals",
    description: "Get started with investing basics for long-term financial growth",
    instructor: "Jessica Taylor",
    duration: "4 hours",
    progress: 40,
    color: "finance-green",
    modules: [
      {
        id: 1,
        title: "Investment Basics",
        lessons: [
          {
            id: 101,
            title: "What is Investing?",
            duration: "15 min",
            type: "video",
            completed: true
          },
          {
            id: 102,
            title: "Types of Investments",
            duration: "20 min",
            type: "video",
            completed: true
          }
        ]
      },
      {
        id: 2,
        title: "Risk and Return",
        lessons: [
          {
            id: 201,
            title: "Understanding Risk",
            duration: "18 min",
            type: "video",
            completed: false
          },
          {
            id: 202,
            title: "Risk Assessment Exercise",
            duration: "25 min",
            type: "exercise",
            completed: false
          }
        ]
      }
    ]
  }
];

// Completed courses data
const completedCourses = [
  {
    id: 4,
    title: "Financial Basics 101",
    completedDate: "April 15, 2023",
    score: 92,
    color: "finance-coral"
  }
];

// Learning modules data
const educationModules = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and managing a personal budget",
    icon: "DollarSign",
    progress: 85,
    color: "finance-yellow",
    bgcolor: "bg-finance-yellow/20",
    borderColor: "border-finance-yellow"
  },
  {
    id: 2,
    title: "Smart Saving",
    description: "Discover strategies to save more and achieve your financial goals",
    icon: "Target",
    progress: 65,
    color: "finance-orange",
    bgcolor: "bg-finance-orange/20",
    borderColor: "border-finance-orange"
  },
  {
    id: 3,
    title: "Investing Fundamentals",
    description: "Get started with investing basics for long-term financial growth",
    icon: "TrendingUp",
    progress: 40,
    color: "finance-green",
    bgcolor: "bg-finance-green/20",
    borderColor: "border-finance-green"
  },
  {
    id: 4,
    title: "Debt Management",
    description: "Learn strategies to manage and reduce your debt effectively",
    icon: "Brain",
    progress: 25,
    color: "finance-brown",
    bgcolor: "bg-finance-brown/20",
    borderColor: "border-finance-brown"
  },
  {
    id: 5,
    title: "Financial Planning",
    description: "Create a comprehensive financial plan for your future",
    icon: "Book",
    progress: 10,
    color: "finance-coral",
    bgcolor: "bg-finance-coral/20",
    borderColor: "border-finance-coral"
  },
  {
    id: 6,
    title: "Money Psychology",
    description: "Understand your relationship with money and improve financial habits",
    icon: "Lightbulb",
    progress: 5,
    color: "finance-sage",
    bgcolor: "bg-finance-sage/20",
    borderColor: "border-finance-sage"
  }
];

// Education service API
export const educationService = {
  getActiveCourses: () => activeCourses,
  getCompletedCourses: () => completedCourses,
  getEducationModules: () => educationModules,
  getCourseById: (id: number | string) => {
    const numId = typeof id === 'string' ? parseInt(id) : id;
    return activeCourses.find(course => course.id === numId);
  },
  markLessonComplete: (courseId: number, moduleId: number, lessonId: number) => {
    const course = activeCourses.find(c => c.id === courseId);
    if (course) {
      const module = course.modules.find(m => m.id === moduleId);
      if (module) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.completed = true;
          return true;
        }
      }
    }
    return false;
  },
  calculateOverallProgress: () => {
    const totalModules = activeCourses.reduce((acc, course) => acc + course.modules.length, 0);
    const completedLessons = activeCourses.reduce((acc, course) => {
      return acc + course.modules.reduce((moduleAcc, module) => {
        return moduleAcc + module.lessons.filter(lesson => lesson.completed).length;
      }, 0);
    }, 0);
    
    const totalLessons = activeCourses.reduce((acc, course) => {
      return acc + course.modules.reduce((moduleAcc, module) => {
        return moduleAcc + module.lessons.length;
      }, 0);
    }, 0);
    
    return {
      progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      completedLessons,
      totalLessons
    };
  }
};
