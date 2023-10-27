// Header.js
import React from 'react';

const Header = ({ setIsLogged }: { setIsLogged: (value: boolean) => void }) => {

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <header>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </header>
  );
};

export default Header;
