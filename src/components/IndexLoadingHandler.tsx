
import React, { useState, useEffect } from 'react';
import IndexLoading from '@/components/IndexLoading';

interface IndexLoadingHandlerProps {
  children: React.ReactNode;
}

const IndexLoadingHandler: React.FC<IndexLoadingHandlerProps> = ({ children }) => {
  // Use state to track if components are loaded
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a minimum loading time to ensure smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <IndexLoading />;
  }

  return <>{children}</>;
};

export default React.memo(IndexLoadingHandler);
