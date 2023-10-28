import React from 'react';
import LogoutButton from './LogoutButton';
import Link from 'next/link'; // Importa Link

interface HeaderProps {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLogged, setIsLogged }) => {
  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <header className="header">
        {isLogged && (
            <div className="header-content">
            <Link href="/">← Volver al Inicio</Link>
            <LogoutButton handleLogout={handleLogout} />
            </div>
        )}
    </header>

  );
};

export default Header;
