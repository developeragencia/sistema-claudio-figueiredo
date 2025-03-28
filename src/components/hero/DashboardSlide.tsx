
import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  FileText, 
  CheckCircle,
  PieChart,
  BarChart 
} from 'lucide-react';

interface DashboardSlideProps {
  type: 'financial' | 'analytics' | 'timeline';
}

const DashboardSlide: React.FC<DashboardSlideProps> = ({ type }) => {
  if (type === 'financial') {
    return (
      <div className="space-y-4 h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20 h-8">
              <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
              <DollarSign className="text-primary h-6 w-6 relative z-10" />
            </div>
            <span className="font-semibold">Dashboard Fiscal</span>
          </div>
          <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
            Atualizado
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="h-2.5 bg-primary/10 rounded-full w-full animate-pulse"></div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-primary/5 rounded-md flex flex-col items-center animate-float">
              <TrendingUp className="text-primary mb-2" />
              <div className="text-xs font-medium">Economia</div>
              <div className="text-lg font-bold">32%</div>
            </div>
            <div className="p-3 bg-primary/5 rounded-md flex flex-col items-center animate-float delay-200">
              <FileText className="text-primary mb-2" />
              <div className="text-xs font-medium">Processos</div>
              <div className="text-lg font-bold">145</div>
            </div>
            <div className="p-3 bg-primary/5 rounded-md flex flex-col items-center animate-float delay-300">
              <CheckCircle className="text-primary mb-2" />
              <div className="text-xs font-medium">Sucesso</div>
              <div className="text-lg font-bold">98%</div>
            </div>
          </div>
          <div className="h-28 bg-primary/5 rounded-lg p-3 animate-float">
            <div className="text-sm font-medium mb-2">Evolução de Recuperação</div>
            <div className="flex items-end justify-between h-16 px-2">
              {[35, 48, 40, 65, 70, 85, 90].map((height, i) => (
                <div key={i} className="w-1/8 bg-primary/40 rounded-t-sm" style={{height: `${height}%`}}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'analytics') {
    return (
      <div className="space-y-4 h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20 h-8">
              <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
              <PieChart className="text-primary h-6 w-6 relative z-10" />
            </div>
            <span className="font-semibold">Análise Tributária</span>
          </div>
          <div className="px-2 py-1 bg-green-500/20 rounded-full text-xs font-medium text-green-500">
            Otimizado
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-primary/5 rounded-lg p-3 animate-float">
            <div className="text-sm font-medium mb-2">Distribuição de Créditos</div>
            <div className="flex items-center justify-center h-28">
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-8 border-primary animate-[spin_10s_linear_infinite]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)'}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">72%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-40 bg-primary/5 rounded-lg p-3 animate-float delay-200">
            <div className="text-sm font-medium mb-2">Eficiência Processual</div>
            <div className="flex flex-col justify-center h-28 space-y-2">
              {[85, 65, 92].map((value, i) => (
                <div key={i} className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-primary h-2.5 rounded-full animate-pulse" style={{width: `${value}%`}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-2.5 bg-primary/10 rounded-full w-3/4 animate-pulse"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-primary/20 h-8">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
            <BarChart className="text-primary h-6 w-6 relative z-10" />
          </div>
          <span className="font-semibold">Timeline de Atividades</span>
        </div>
        <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
          Em Tempo Real
        </div>
      </div>
      
      <div className="space-y-3">
        {[
          { time: "Hoje", activity: "Análise preliminar concluída", status: "Concluído" },
          { time: "Ontem", activity: "Levantamento de documentos", status: "Concluído" },
          { time: "07/09", activity: "Cálculo de projeção de créditos", status: "Em andamento" }
        ].map((item, i) => (
          <div key={i} className="flex items-center p-2 bg-primary/5 rounded-lg animate-float" style={{animationDelay: `${i * 0.2}s`}}>
            <div className="w-16 text-xs text-primary/70">{item.time}</div>
            <div className="flex-1 text-sm font-medium">{item.activity}</div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              item.status === "Concluído" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
            }`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-2.5 bg-primary/10 rounded-full w-2/3 animate-pulse delay-300"></div>
      <div className="h-2.5 bg-primary/10 rounded-full w-3/4 animate-pulse delay-500"></div>
    </div>
  );
};

export default React.memo(DashboardSlide);
