
import React from 'react';
import MethodologyCard from '@/components/MethodologyCard';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

const Methodology: React.FC = () => {
  const { ref: methodologyTitleRef, classes: methodologyTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const methodologies = [
    {
      title: "Desenvolvimento Backend",
      description: "FastAPI com SQLModel para uma camada de API de alto desempenho e segura com documentação automática.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
          <line x1="8" x2="8" y1="16" y2="16"></line>
          <line x1="8" x2="8" y1="20" y2="20"></line>
          <line x1="12" x2="12" y1="18" y2="18"></line>
          <line x1="12" x2="12" y1="22" y2="22"></line>
          <line x1="16" x2="16" y1="16" y2="16"></line>
          <line x1="16" x2="16" y1="20" y2="20"></line>
        </svg>
      ),
    },
    {
      title: "Desenvolvimento Frontend",
      description: "React.js com Chakra UI para uma interface de usuário responsiva, acessível e personalizável com sistema de design.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M7 7h10"></path>
          <path d="M7 12h10"></path>
          <path d="M7 17h10"></path>
        </svg>
      ),
    },
    {
      title: "Sistema de Autenticação",
      description: "JWT com Autenticação de Dois Fatores para segurança aprimorada, especialmente para perfis de usuário críticos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <path d="M12 15v3"></path>
        </svg>
      ),
    },
    {
      title: "Infraestrutura",
      description: "Docker com Redis e Celery para containerização e processamento assíncrono, garantindo escalabilidade.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="8" x="3" y="14" rx="2"></rect>
          <path d="M17 2v4"></path>
          <path d="M7 2v4"></path>
          <path d="M12 14v3"></path>
          <path d="M8 22 12 17 16 22"></path>
        </svg>
      ),
    },
    {
      title: "Estrutura de Banco de Dados",
      description: "PostgreSQL com estruturas separadas para clientes, fornecedores e pagamentos para melhor gestão de dados.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 12a9 3 0 0 0 18 0"></path>
          <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="methodology" className="py-24 px-6 md:px-10 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={methodologyTitleRef}
          className={cn(
            methodologyTitleClasses,
            "text-center mb-16"
          )}
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Nossa Abordagem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Metodologia & Tecnologias
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/70">
            Seguimos uma abordagem abrangente combinando tecnologias modernas e melhores práticas
            para criar aplicações seguras, escaláveis e de fácil manutenção.
          </p>
        </div>
        
        <div className="space-y-6">
          {methodologies.map((methodology, index) => (
            <MethodologyCard 
              key={index}
              title={methodology.title}
              description={methodology.description}
              icon={methodology.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
