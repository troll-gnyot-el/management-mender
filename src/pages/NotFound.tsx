
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-down">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-down [animation-delay:100ms]">
            Упс! Страница не найдена
          </p>
          <Button 
            size="lg" 
            className="rounded-full px-8 animate-slide-down [animation-delay:200ms]" 
            asChild
          >
            <Link to="/">Вернуться на главную</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
