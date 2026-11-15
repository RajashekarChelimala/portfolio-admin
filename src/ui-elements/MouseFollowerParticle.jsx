import React, { useState, useEffect } from 'react';
import kittyImage from '../assets/kitty-img.png'; // Adjust the path according to your folder structure

const MouseFollowerParticle = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });

  // Update mouse position on move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const pageX = e.pageX; // Position relative to the full page
      const pageY = e.pageY;

      setMousePosition({ x: pageX, y: pageY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Introduce delay for the particle to follow
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedPosition(mousePosition);
    }, 500); // Delay for the movement

    return () => clearTimeout(timer);
  }, [mousePosition]);

  const offsetY = 30; // Adjust this value to set how far below the mouse the kitty should appear

  return (
    <div>
      {/* The kitty image that follows the mouse */}
      <img
        src={kittyImage}
        alt="Kitty"
        style={{
          position: 'absolute',
          left: delayedPosition.x,
          top: delayedPosition.y + offsetY, // Position below the mouse pointer
          width: '42px', // Size of the kitty image
          height: '42px', // Adjust based on your image dimensions
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.6s ease, top 0.6s ease', // Slow and smooth movement
          pointerEvents: 'none', // Ensures it doesn't interfere with clicking
        }}
      />
    </div>
  );
};

export default MouseFollowerParticle;
