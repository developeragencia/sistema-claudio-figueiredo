
import React from 'react';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

const Technology: React.FC = () => {
  const { ref: techTitleRef, classes: techTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const technologies = [
    { name: "FastAPI", percentage: 90 },
    { name: "SQLModel", percentage: 85 },
    { name: "PostgreSQL", percentage: 95 },
    { name: "React.js", percentage: 90 },
    { name: "Chakra UI", percentage: 85 },
    { name: "Docker", percentage: 80 },
    { name: "Redis", percentage: 75 },
    { name: "Celery", percentage: 70 },
  ];

  return (
    <section id="technology" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={techTitleRef}
          className={cn(
            techTitleClasses,
            "text-center mb-16"
          )}
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Stack Tecnológica
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Proficiência Tecnológica
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/70">
            Nossa expertise em várias tecnologias garante uma solução robusta e eficiente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => {
            const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
              transitionType: 'fade-in',
              delay: ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5,
              threshold: 0.1,
            });
            
            return (
              <div 
                key={index}
                ref={ref}
                className={cn(
                  classes,
                  "glass-card rounded-2xl p-6"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{tech.name}</h3>
                  <span className="text-sm text-primary font-medium">{tech.percentage}%</span>
                </div>
                <div className="h-2 bg-secondary/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000" 
                    style={{ width: `${tech.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technology;
