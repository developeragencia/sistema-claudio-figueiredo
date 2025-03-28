
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import DashboardSlide from './DashboardSlide';

const DashboardCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const slideTypes = [
    'financial',
    'analytics',
    'timeline'
  ] as const;

  return (
    <div className="relative min-h-[300px]">
      <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({length: totalSlides}).map((_, i) => (
          <button 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'bg-primary w-6' : 'bg-primary/30'
            }`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideTypes.map((type, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <DashboardSlide type={type} />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white/30 transition-colors"
        onClick={prevSlide}
      >
        <ArrowLeft size={18} />
      </button>
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white/30 transition-colors"
        onClick={nextSlide}
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default React.memo(DashboardCarousel);
