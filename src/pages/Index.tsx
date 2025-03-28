
import React from 'react';
import IndexLoadingHandler from '@/components/IndexLoadingHandler';
import IndexContent from '@/components/IndexContent';

const Index: React.FC = () => {
  return (
    <IndexLoadingHandler>
      <IndexContent />
    </IndexLoadingHandler>
  );
};

export default React.memo(Index);
