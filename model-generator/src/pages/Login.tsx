'use client'
// Login.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm'; 

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
          <h1 className="Title" data-text="Log in for continue">Log in for continue</h1>
      </div>
      <p className="subTitle">Powered with NextJS</p>
      <LoginForm onLogin={handleLogin} />

      <button onClick={handleLogin} className="glitch-wrapper btnLogin">
        <span className="glitch" data-text="Log in →">Log in →</span>
      </button>
      <Footer/>

    </div>

  );
};

export default Login;

