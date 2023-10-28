'use client'
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

   return (
    <div>
  <div className="glitch-label">
    <label htmlFor="username">Usuario:</label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div className="glitch-label">
    <label htmlFor="password">Contraseña:</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
</div>

  );
};

export default LoginForm;
