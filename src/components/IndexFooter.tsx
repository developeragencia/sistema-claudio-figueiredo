
import React from 'react';

const IndexFooter: React.FC = () => {
  return (
    <>
      <div className="py-3 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground">
        Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">Alex Developer</a>
      </div>
      <div className="pb-3 sm:pb-4 text-center text-[10px] sm:text-xs text-muted-foreground">
        © 2025 Sistemas Claudio Figueiredo. Todos os direitos reservados.
      </div>
    </>
  );
};

export default React.memo(IndexFooter);
