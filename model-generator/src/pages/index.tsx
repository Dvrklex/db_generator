import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Página de inicio</h1>
      <Link href="/login">Ir a Login</Link>
      <br />
      <Link href="/model">Ir a Model</Link>
      <br />
      <Link href="/create_model">Ir a Create Model</Link>
    </div>
  );
};

export default Home;
