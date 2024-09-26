import React, { Component } from 'react';
import '../Css/home.css';
import '../Css/homeBackgroundSlider.css';
import HomeBackgroundSlider from './homeBackgroundSlider'; // Ensure correct import path
import AboutPage from './about';
import Footer from './footer';

export default class Home extends Component {

  

  

  render() {
   

    return (
      <div className="home"> {/* Apply the 'home' class here */}
      
      <div>
      
      <h1 className='homeH1'>Al-Shara International School</h1>
         
        <HomeBackgroundSlider /> {/* Background slider component */}
        
          

     
        <AboutPage/>
        <Footer/>
        </div>
      </div>
    );
  }
}
