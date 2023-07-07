import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/src/feature/auth/provider/AuthProvider';
import { initializeFirebaseApp } from '@/src/lib/firebase/firebase';
import Header from './components/Header/Header';
import type { AppProps } from 'next/app';

initializeFirebaseApp();
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
