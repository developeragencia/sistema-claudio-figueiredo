
import React from 'react';
import LoadingScreen from '../LoadingScreen';

const LoginLoadingState: React.FC = () => {
  return <LoadingScreen message="Verificando credenciais..." variant="auth" />;
};

export default React.memo(LoginLoadingState);
