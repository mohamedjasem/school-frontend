import React, { useState, useEffect } from 'react';
import '../Css/home.css'; // Adjust the path as necessary
import '../Css/homeBackgroundSlider.css';

const imageSlide = [
  { url: '2.jpg', title: 'Empowering Young Minds for a Brighter Future' },
  { url: '5.jpg', title: 'Inspiring The Next Generation To Shape A Brighter Tomorrow'}
];

const BackgroundSlider = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentState(prevState => (prevState + 1) % imageSlide.length);
    }, 5000); // Change image every 6 seconds to match the animation duration

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const bgimageStyle = {
    backgroundImage: `url(${imageSlide[currentState].url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '91%',
    width: '100%',
    position: 'relative'
  };

  return (<>
 
    <div style={bgimageStyle} className="background-slider">
   
      <div className="slider-content">

        <h1 className='H1Background'>{imageSlide[currentState].title}</h1>
      </div>
    </div>
    </>
  );
};

export default BackgroundSlider;
