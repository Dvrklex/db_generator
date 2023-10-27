// LogoutButton.tsx
'use client'
import React from 'react';

interface LogoutButtonProps {
  setIsLogged: (value: boolean) => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ setIsLogged }) => {
  const handleLogout = () => {
    // Desloguea al usuario estableciendo isLogged en false
    setIsLogged(false);
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default LogoutButton;
