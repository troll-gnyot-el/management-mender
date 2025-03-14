
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300",
        scrolled 
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src="/lovable-uploads/e73cbd58-454a-4c2f-a064-6ffbe00f777e.png" alt="SquirrelBank" className="h-10 w-10 mr-2" />
          <span className="font-display text-xl font-bold text-brand-green">
            SquirrelBank
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "Accounts", path: "/accounts" },
            { name: "Finances", path: "/finances" },
            { name: "Education", path: "/education" },
            { name: "City Services", path: "/city-services" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm font-medium text-muted-foreground hover:text-brand-green transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-brand-green hover:text-brand-green hover:bg-brand-green/10" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-brand-green"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-black p-4 flex flex-col md:hidden">
          <nav className="flex flex-col space-y-4 mt-4">
            {[
              { name: "Home", path: "/" },
              { name: "Accounts", path: "/accounts" },
              { name: "Finances", path: "/finances" },
              { name: "Education", path: "/education" },
              { name: "City Services", path: "/city-services" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-lg font-medium py-2 px-4 hover:bg-brand-green/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col space-y-3 px-4">
            <Button variant="outline" className="w-full border-brand-green text-brand-green" asChild>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
            </Button>
            <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white" asChild>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
