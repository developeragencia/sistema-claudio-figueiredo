
import React from 'react';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: 1 | 2 | 3 | 4 | 5;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        classes,
        "glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
      )}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const { ref: titleRef, classes: titleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 12H7.2c-.2 0-.5 0-.7-.1-.2-.1-.4-.2-.5-.4-.1-.1-.2-.3-.2-.5s0-.4.2-.5l6-6"></path>
          <path d="M7 18h10.8c.2 0 .5 0 .7-.1.2-.1.4-.2.5-.4.1-.1.2-.3.2-.5s0-.4-.2-.5l-6-6"></path>
        </svg>
      ),
      title: "Backend FastAPI",
      description: "Framework de alto desempenho e fácil uso para construção de APIs com validação, serialização e documentação automáticas.",
      delay: 1 as const,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: "ORM SQLModel",
      description: "Bancos de dados SQL em Python, projetados para simplicidade, compatibilidade e robustez com fácil integração com FastAPI.",
      delay: 2 as const,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="3" x2="21" y1="9" y2="9"></line>
          <line x1="3" x2="21" y1="15" y2="15"></line>
          <line x1="9" x2="9" y1="3" y2="21"></line>
          <line x1="15" x2="15" y1="3" y2="21"></line>
        </svg>
      ),
      title: "Banco de Dados PostgreSQL",
      description: "Sistema de banco de dados objeto-relacional poderoso e de código aberto com forte reputação em confiabilidade e integridade de dados.",
      delay: 3 as const,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" x2="9.17" y1="4.93" y2="9.17"></line>
          <line x1="14.83" x2="19.07" y1="14.83" y2="19.07"></line>
          <line x1="14.83" x2="19.07" y1="9.17" y2="4.93"></line>
          <line x1="4.93" x2="9.17" y1="19.07" y2="14.83"></line>
        </svg>
      ),
      title: "Frontend React",
      description: "Biblioteca JavaScript para construção de interfaces de usuário com arquitetura baseada em componentes para elementos de UI reutilizáveis.",
      delay: 4 as const,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <path d="M9 14v1"></path>
          <path d="M9 19v2"></path>
          <path d="M9 3v2"></path>
          <path d="M9 9v1"></path>
          <path d="M15 14v1"></path>
          <path d="M15 19v2"></path>
          <path d="M15 3v2"></path>
          <path d="M15 9v1"></path>
        </svg>
      ),
      title: "Componentes Chakra UI",
      description: "Biblioteca de componentes simples, modular e acessível para aplicações React com sistema de design integrado.",
      delay: 5 as const,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      title: "Autenticação JWT",
      description: "Autenticação segura baseada em token com autenticação de dois fatores para perfis de usuário críticos.",
      delay: 1 as const,
    },
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={titleRef}
          className={cn(
            titleClasses,
            "text-center mb-16"
          )}
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Funcionalidades Principais
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Stack Tecnológica Completa
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/70">
            Nossa solução combina as melhores tecnologias modernas para criar uma arquitetura
            de aplicação robusta, escalável e de fácil manutenção.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
