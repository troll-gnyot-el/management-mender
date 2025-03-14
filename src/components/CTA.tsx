
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-[30rem] bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl opacity-80 transform rotate-180"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Готовы оптимизировать работу вашей компании?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Присоединяйтесь к тысячам компаний, которые уже используют нашу систему управления
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full text-base h-12 px-8">
              <Link to="/signup">Начать бесплатный период</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8">
              <Link to="/contact">Связаться с нами</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
