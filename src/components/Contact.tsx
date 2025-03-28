
import React from 'react';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const { ref: contactTitleRef, classes: contactTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const { ref: contactFormRef, classes: contactFormClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 1,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-24 px-6 md:px-10 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={contactTitleRef}
          className={cn(
            contactTitleClasses,
            "text-center mb-16"
          )}
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Entre em Contato
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Comece Seu Projeto Hoje
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/70">
            Pronto para construir seu próximo projeto com nossa stack tecnológica moderna? Entre em contato para começar.
          </p>
        </div>
        
        <div 
          ref={contactFormRef}
          className={cn(
            contactFormClasses,
            "glass-card rounded-2xl p-8 max-w-2xl mx-auto"
          )}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                  placeholder="Seu email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                placeholder="Assunto do projeto"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                placeholder="Sua mensagem"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:shadow-primary/20"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
