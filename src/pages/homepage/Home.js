import React from 'react';
import HomePage from './HomePage'; 
import NavBar from '../../components/NavBar'; 
import Footer from '../../Footer'; 

const Home = () => {
  return (
    <div>
      <NavBar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Home;
