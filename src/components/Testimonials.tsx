
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Эта система полностью изменила то, как мы управляем нашими проектами. Всё стало гораздо эффективнее и понятнее.",
    author: "Екатерина Смирнова",
    role: "CEO, TechVision",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=220&q=80"
  },
  {
    quote: "Мы увеличили продуктивность на 40% в первый месяц использования. Это невероятный результат.",
    author: "Михаил Петров",
    role: "CTO, Инновейт",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=220&q=80"
  },
  {
    quote: "Интуитивный интерфейс и мощная аналитика — именно то, что было нужно нашей компании для роста.",
    author: "Анна Иванова",
    role: "COO, ФинТех Групп",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=220&q=80"
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Что говорят наши клиенты
            </h2>
            <p className="text-muted-foreground text-lg">
              Отзывы от компаний, которые трансформировали свой бизнес с нашей системой
            </p>
          </div>
          
          <div className="relative glass-card rounded-2xl p-8 md:p-12">
            <div className="absolute top-8 left-8 text-primary opacity-30">
              <Quote size={48} />
            </div>
            
            <div className="relative z-10">
              <div className="mb-6 text-xl md:text-2xl font-medium text-balance">
                {testimonials[current].quote}
              </div>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonials[current].author}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {testimonials.map((_, i) => (
              <Button 
                key={i}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(i);
                }}
                className={`w-2 h-2 p-2 rounded-full ${i === current ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'}`}
              />
            ))}
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
