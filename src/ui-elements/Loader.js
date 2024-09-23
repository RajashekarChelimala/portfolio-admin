import React from 'react';
import { Bars, InfinitySpin, DNA, BallTriangle, Grid, Hourglass,Oval,RotatingLines,Triangle } from 'react-loader-spinner'; // Import all loaders
import './Loader.css'; // Optional: Create a CSS file for styles

const Loader = ({ type = 'bars' }) => {
  const renderLoader = () => {
    switch (type) {
      case 'infinityspin':
        return <InfinitySpin width="100" color="#ffffff" />;
      case 'dna':
        return <DNA width="100" color="#ffffff" />;
      case 'balltriangle':
        return <BallTriangle width="100" color="#ffffff" />;
      case 'grid':
        return <Grid width="100" color="#ffffff" />;
      case 'hourglass':
        return <Hourglass width="100" color="#ffffff" />;
      case 'oval':
        return <Oval width="100" color="#ffffff" />;
      case 'rotatingLines':
        return <RotatingLines width="100" color="#ffffff" />;
      case 'triangle':
        return <Triangle width="100" color="#ffffff" />;
      case 'bars':
      default:
        return <Bars width="100" color="#ffffff" />;
    }
  };

  return (
    <div className="overlay">
      <div className="spinner-container">
        {renderLoader()}
      </div>
    </div>
  );
};

export default Loader;
