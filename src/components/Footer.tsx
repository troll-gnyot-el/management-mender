
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-display text-2xl font-medium mb-4 inline-block">
              Управление
            </Link>
            <p className="text-muted-foreground mb-4">
              Инновационная система управления для современного бизнеса
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Компания</h3>
            <ul className="space-y-2">
              {['О нас', 'Команда', 'Карьера', 'Блог', 'Контакты'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Продукт</h3>
            <ul className="space-y-2">
              {['Возможности', 'Интеграции', 'Цены', 'FAQ', 'Безопасность'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ул. Ленина 123, Москва, Россия
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-muted-foreground" />
                <a href="tel:+78001234567" className="text-muted-foreground hover:text-foreground">
                  +7 (800) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-muted-foreground" />
                <a href="mailto:info@company.com" className="text-muted-foreground hover:text-foreground">
                  info@company.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {year} Управление. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
