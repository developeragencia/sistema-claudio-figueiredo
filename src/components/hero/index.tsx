
import React from 'react';
import HeroHeading from './HeroHeading';
import HeroDescription from './HeroDescription';
import HeroCallToAction from './HeroCallToAction';
import DashboardCarousel from './DashboardCarousel';

const Hero: React.FC = () => {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6">
            <HeroHeading />
            <HeroDescription />
            <HeroCallToAction />
          </div>
          <div className="relative">
            <DashboardCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
