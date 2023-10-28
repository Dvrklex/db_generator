import React from 'react';

interface LogoutButtonProps {
  handleLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
  return (
    <button onClick={handleLogout}>Log out</button>
  );
};

export default LogoutButton;
