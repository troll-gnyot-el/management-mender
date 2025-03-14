
import { Check, BarChart3, Users, ShieldCheck, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Аналитика в реальном времени",
    description: "Получайте актуальные данные о производительности и принимайте информированные решения быстрее.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Управление командой",
    description: "Оптимизируйте рабочие процессы и повышайте продуктивность вашей команды.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Безопасность на первом месте",
    description: "Шифрование данных корпоративного уровня и многофакторная аутентификация.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Молниеносная скорость",
    description: "Оптимизированная производительность для мгновенного доступа к данным.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Глобальная доступность",
    description: "Доступ к системе из любой точки мира на любом устройстве.",
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: "Интуитивно понятный интерфейс",
    description: "Минимальная кривая обучения благодаря простому и понятному дизайну.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Разработано для повышения эффективности
          </h2>
          <p className="text-muted-foreground text-lg">
            Наша платформа предоставляет все необходимые инструменты для оптимизации бизнес-процессов
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
