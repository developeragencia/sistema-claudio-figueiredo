
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, CreditCard, FileText, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: {
    value: string;
    positive: boolean;
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.3 }}
      className="bg-card shadow-sm rounded-xl border p-5 hover:shadow-md transition-all duration-200 group hover:border-primary/20"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">{value}</h3>
          
          <div className="flex items-center mt-2">
            {change.positive ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs font-medium text-green-500">{change.value}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-xs font-medium text-red-500">{change.value}</span>
              </>
            )}
            <span className="text-xs text-muted-foreground ml-1">em relação ao mês anterior</span>
          </div>
        </div>
        
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const StatCards: React.FC = () => {
  const stats = [
    {
      title: "Clientes Ativos",
      value: "84",
      icon: <Users className="h-5 w-5 text-primary" />,
      change: {
        value: "+12%",
        positive: true
      }
    },
    {
      title: "Créditos Identificados",
      value: "R$ 1.2M",
      icon: <CreditCard className="h-5 w-5 text-primary" />,
      change: {
        value: "+23%",
        positive: true
      }
    },
    {
      title: "Declarações",
      value: "342",
      icon: <FileText className="h-5 w-5 text-primary" />,
      change: {
        value: "-5%",
        positive: false
      }
    },
    {
      title: "Tempo Médio de Recuperação",
      value: "48 dias",
      icon: <Clock className="h-5 w-5 text-primary" />,
      change: {
        value: "-12%",
        positive: true
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          delay={index}
        />
      ))}
    </div>
  );
};

export default StatCards;
