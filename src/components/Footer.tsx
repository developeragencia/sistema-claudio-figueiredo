
import React from 'react';
import { Link  } from "@/hooks/use-router";
import AnimatedLogo from './AnimatedLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-primary/5 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <AnimatedLogo />
            <p className="text-foreground/70 text-sm max-w-xs">
              Sistema automatizado para apuração e recuperação de créditos tributários IRRF/PJ, com foco em eficiência e conformidade legal.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#features" className="text-foreground/70 hover:text-primary transition">
                  Recursos
                </Link>
              </li>
              <li>
                <Link to="#methodology" className="text-foreground/70 hover:text-primary transition">
                  Metodologia
                </Link>
              </li>
              <li>
                <Link to="#technology" className="text-foreground/70 hover:text-primary transition">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-foreground/70 hover:text-primary transition">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-foreground/70 hover:text-primary transition">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link to="#" className="text-foreground/70 hover:text-primary transition">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="#" className="text-foreground/70 hover:text-primary transition">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-foreground/70">
                contato@claudiofigueiredo.com.br
              </li>
              <li className="text-foreground/70">
                +55 (11) 9999-9999
              </li>
              <li className="text-foreground/70">
                São Paulo, SP - Brasil
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/50 text-sm">
              &copy; {new Date().getFullYear()} Sistemas Claudio Figueiredo. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-foreground/50 hover:text-primary transition">
                LinkedIn
              </Link>
              <Link to="#" className="text-foreground/50 hover:text-primary transition">
                Instagram
              </Link>
              <Link to="#" className="text-foreground/50 hover:text-primary transition">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
