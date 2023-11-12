import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Head from 'next/head'
const Menu: React.FC = () => {
  return (
    <section>
        <Head>
            <title>devModelGenerator</title>
            <meta name="description" content="Esta página web nos permite generar y crear modelos de base de datos con en Sequelize, esto nos ayuda a 
            tener un herramienta automatizada para nuestro modelos a base de datos y ahorrar mucho tiempo." />
            <meta name="keywords" content="Generador de modelos, Lenguaje quinta generacion, Automatizacion,
            Base de datos, Modelo sequelize, sequelize,postgres,sql, codigo abierto." />
            <meta name="robots" content="index, follow" />
        </Head>
       <div className="glitch-wrapper">
                <div className="glitch" data-text="Index Menu">Index Menu</div>
        </div>
      <ul>
        <li><Link className="a"href="/Login">Go to Login</Link></li>
        <li><Link className="a"href="/Model">Go to Model</Link></li>
        <li><Link className="a"href="/CreateModel">Go to Create Model</Link></li>
      </ul>
      <Footer/>

    </section>

    
  );
};

export default Menu;
