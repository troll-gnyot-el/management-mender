
import { BarChart3, Users, ShieldCheck, Zap, Globe, Book } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Real-time Analytics",
    description: "Get up-to-date data about your spending habits and make informed decisions faster.",
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: "Financial Education",
    description: "Learn essential financial skills through our interactive courses and practical exercises.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Security First",
    description: "Enterprise-level data encryption and multi-factor authentication for your peace of mind.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Optimized performance for instant access to your financial data anytime, anywhere.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Accessibility",
    description: "Access your finances from anywhere in the world on any device.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Family Sharing",
    description: "Share selected financial information with family members while maintaining privacy.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Designed to Improve Your Financial Life
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform provides all the tools you need to take control of your finances and build a secure future
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-6 shadow-subtle border border-border/50 transition-all hover:shadow-elegant hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
