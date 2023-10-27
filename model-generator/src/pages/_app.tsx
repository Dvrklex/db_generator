// MyApp.tsx
import React, { useState } from 'react';
import { ModelProvider } from '../components/ModelContext';
import { AppProps } from 'next/app';
import '../app/globals.css';
import Header from '../components/Header'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <ModelProvider>
      <Header setIsLogged={setIsLogged}></Header>
      <Component {...pageProps} isLogged={isLogged} setIsLogged={setIsLogged} />
    </ModelProvider>
  );
}

export default MyApp;
