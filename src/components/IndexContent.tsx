
import React, { Suspense, lazy } from 'react';
import IndexLoading from './IndexLoading';
import IndexFooter from './IndexFooter';

// Lazy loaded components
const NavBar = lazy(() => import('@/components/NavBar'));
const Hero = lazy(() => import('@/components/hero'));

const IndexContent: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Suspense fallback={<IndexLoading />}>
        <NavBar />
        <Hero />
        <IndexFooter />
      </Suspense>
    </div>
  );
};

export default React.memo(IndexContent);
