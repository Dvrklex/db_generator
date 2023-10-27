import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
const Home: React.FC = () => {
  return (
    <section>
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

export default Home;
