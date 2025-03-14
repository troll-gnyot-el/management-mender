
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, ShieldCheck, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-[30rem] bg-gradient-to-br from-brand-green/10 to-brand-orange/10 blur-3xl opacity-80"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block animate-slide-down">
            <div className="px-3 py-1 text-xs font-medium bg-brand-orange/10 text-brand-orange rounded-full mb-6">
              Your Smart Financial Assistant
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-slide-down [animation-delay:100ms] text-balance">
            Manage your finances with <span className="text-brand-orange">unparalleled</span> ease
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-down [animation-delay:200ms] text-balance">
            Optimize your spending, save time and resources with our intuitive financial management system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-down [animation-delay:300ms]">
            <Button size="lg" className="rounded-full text-base h-12 px-8 bg-brand-orange hover:bg-brand-orange/90 group">
              <Link to="/signup" className="flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 border-brand-green text-brand-orange hover:bg-brand-orange/10">
              <Link to="/demo">Watch Demo</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-slide-up [animation-delay:400ms]">
            <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-brand-green/10">
              <Smartphone className="w-8 h-8 text-brand-orange mb-3 mx-auto" />
              <h3 className="font-medium mb-2">Mobile app</h3>
              <p className="text-sm text-muted-foreground">Easy to learn from your phone.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-brand-orange/10">
              <ShieldCheck className="w-8 h-8 text-brand-orange mb-3 mx-auto" />
              <h3 className="font-medium mb-2">Track Your Transactions</h3>
              <p className="text-sm text-muted-foreground">Control you income and expenses.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-brand-brown/10">
              <Target className="w-8 h-8 text-brand-brown mb-3 mx-auto" />
              <h3 className="font-medium mb-2">Smart Goals</h3>
              <p className="text-sm text-muted-foreground">Set and track your financial goals easily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
