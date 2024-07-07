import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/authentication/sign-in');
  }, [router]); // Adicione 'router' à lista de dependências

  return null; // Página inicial vazia enquanto redireciona
};

export default Index;
