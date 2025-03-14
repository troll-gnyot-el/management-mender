
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-[30rem] bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl opacity-80"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-slide-down">
            <div className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6">
              Современное решение для вашего бизнеса
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-down [animation-delay:100ms] text-balance">
            Управляйте ресурсами компании с <span className="text-blue-600 dark:text-blue-400">непревзойденной</span> легкостью
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-down [animation-delay:200ms] text-balance">
            Оптимизируйте рабочие процессы, экономьте время и ресурсы с нашей интуитивно понятной системой управления.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-down [animation-delay:300ms]">
            <Button size="lg" className="rounded-full text-base h-12 px-8">
              <Link to="/signup">Начать бесплатно</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8">
              <Link to="/demo">Смотреть демо</Link>
            </Button>
          </div>
        </div>
        
        <div className="relative mt-20 animate-slide-up [animation-delay:400ms]">
          <div className="glass-card rounded-2xl p-2 overflow-hidden shadow-elegant mx-auto max-w-5xl">
            <div className="bg-background rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Интерфейс управления" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 -right-5 -left-5 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
