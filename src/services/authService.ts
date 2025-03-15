
import { useToast } from "@/components/ui/use-toast";

// User type
export type User = {
  id: number;
  name: string;
  email: string;
};

// Mock user data
let currentUser: User | null = null;

export const authService = {
  login: (email: string, password: string): Promise<User> => {
    // In a real app, this would make an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          currentUser = {
            id: 1,
            name: email.split('@')[0], // Just using part of email as name for demo
            email
          };
          localStorage.setItem('user', JSON.stringify(currentUser));
          resolve(currentUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  signup: (name: string, email: string, password: string): Promise<User> => {
    // In a real app, this would make an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          currentUser = {
            id: 1,
            name,
            email
          };
          localStorage.setItem('user', JSON.stringify(currentUser));
          resolve(currentUser);
        } else {
          reject(new Error('Invalid signup information'));
        }
      }, 800);
    });
  },
  
  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = null;
        localStorage.removeItem('user');
        resolve();
      }, 300);
    });
  },
  
  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
      return currentUser;
    }
    
    return null;
  },
  
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  }
};

// Custom hook for using authentication
export const useAuth = () => {
  const { toast } = useToast();
  
  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
      return user;
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const signup = async (name: string, email: string, password: string) => {
    try {
      const user = await authService.signup(name, email, password);
      toast({
        title: "Signup successful",
        description: `Welcome to SquirrelHub, ${user.name}!`,
      });
      return user;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: (error as Error).message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await authService.logout();
      toast({
        title: "Logout successful",
        description: "You have been logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: (error as Error).message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  return {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    login,
    signup,
    logout
  };
};
