
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FinancialEducation from "@/components/FinancialEducation";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// Анимированный скролл при загрузке страницы
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <FinancialEducation />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
