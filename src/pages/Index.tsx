
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FinancialEducation from "@/components/FinancialEducation";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Update document title
    document.title = "SmartCity Finance Hub - Financial Education";
  }, []);

  return (
    <div className="min-h-screen flex flex-col wood-pattern">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <FinancialEducation />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
