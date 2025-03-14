
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display text-2xl font-medium hover:opacity-80 transition-opacity"
        >
          Управление
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "Главная", path: "/" },
            { name: "Функции", path: "/features" },
            { name: "Цены", path: "/pricing" },
            { name: "О нас", path: "/about" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Вход</Link>
          </Button>
          <Button size="sm" className="rounded-full" asChild>
            <Link to="/signup">Регистрация</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
