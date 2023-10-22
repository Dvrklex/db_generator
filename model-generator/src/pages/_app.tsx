import React from 'react';
import { ModelProvider } from '../components/ModelContext';

function MyApp({ Component, pageProps }) {
  return (
    <ModelProvider>
      <Component {...pageProps} />
    </ModelProvider>
  );
}

export default MyApp;
