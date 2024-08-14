import React from 'react';
import TopPicksCarousel from './TopPick'; 
import NewArrivalCarousel from './newarrival'; 
import BookCarousel from './recomendation';
import './home.css';

const HomePage = ({ userMembership }) => {
  return (
    <div>
      <div className="home-container">
      </div>
      <div className="carousel-container">
        <h2 className="carousel-title">New Arrivals</h2> 
        <NewArrivalCarousel userMembership={userMembership} />
      </div>
      <div className="carousel-container">
        <h2 className="carousel-title">Top Picks for You</h2>
        <TopPicksCarousel userMembership={userMembership} />
      </div>
      <div className="carousel-container">
        <h2 className="carousel-title">Choice Selections</h2>
        <BookCarousel userMembership={userMembership} />
      </div> 
    </div>
  );
};

export default HomePage;
