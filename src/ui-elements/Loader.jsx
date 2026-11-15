import React, { useContext } from 'react';
import { Bars, InfinitySpin, DNA, BallTriangle, Grid, Hourglass,Oval,RotatingLines,Triangle } from 'react-loader-spinner'; // Import all loaders
import './Loader.css'; // Optional: Create a CSS file for styles
import { ThemeContext } from '../context/ThemeProvider';

const Loader = ({ type = 'bars' }) => {
  const { theme } = useContext(ThemeContext);
  const colorStyle = theme==='dark'?"#ffffff":"#000000";
  const renderLoader = () => {
    switch (type) {
      case 'infinityspin':
        return <InfinitySpin width="100" color={colorStyle} />;
      case 'dna':
        return <DNA width="100" color={colorStyle} />;
      case 'balltriangle':
        return <BallTriangle width="100" color={colorStyle} />;
      case 'grid':
        return <Grid width="100" color={colorStyle} />;
      case 'hourglass':
        return <Hourglass width="100" color={colorStyle} />;
      case 'oval':
        return <Oval width="100" color={colorStyle} />;
      case 'rotatingLines':
        return <RotatingLines width="100" color={colorStyle} />;
      case 'triangle':
        return <Triangle width="100" color={colorStyle} />;
      case 'bars':
      default:
        return <Bars width="100" color={colorStyle} />;
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
