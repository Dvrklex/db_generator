'use client'
// Login.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

interface LoginProps {
  setIsLogged: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogged }) => {
  const router = useRouter();

  const handleLogin = () => {
    setIsLogged(true);
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="TitleContainer">
          <h1 className="Title" data-text="Iniciar Sesión para continuar">Inicia Sesión para continuar</h1>
      </div>
      <p className="subTitle">Powered with NextJS</p>
      <button onClick={handleLogin} className="glitch-wrapper btnLogin">
        <span className="glitch" data-text="INGRESAR →">INGRESAR →</span>
      </button>
      <Footer/>

    </div>

  );
};

export default Login;

