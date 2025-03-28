
import React, { memo } from 'react';
import LoadingScreen from './LoadingScreen';

const IndexLoading: React.FC = () => {
  // Return a stable loading screen that doesn't change between re-renders
  return <LoadingScreen message="Carregando página inicial..." variant="default" />;
};

export default memo(IndexLoading);
