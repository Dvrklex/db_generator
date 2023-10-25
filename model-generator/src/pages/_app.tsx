import React from 'react';
import { ModelProvider } from '../components/ModelContext';
import { AppProps } from 'next/app'; // Importa AppProps para obtener los tipos de Component y pageProps

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModelProvider>
      <Component {...pageProps} />
    </ModelProvider>
  );
}

export default MyApp;
