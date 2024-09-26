// ClassButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Css/ClassButtons.css'; // Import the CSS file for styling

const ClassButtons = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const navigateToAdmin = () => {
    navigate('/admin'); // Navigate to the /admin route
  };
  
  const navigateToClass1 = () => {
    navigate('/class1'); // Navigate to the /admin route
  };

    
  const navigateToClass2 = () => {
    navigate('/class2'); // Navigate to the /admin route
  };
    
  const navigateToClass3 = () => {
    navigate('/class3'); // Navigate to the /admin route
  };
    
  const navigateToClass4 = () => {
    navigate('/class4'); // Navigate to the /admin route
  };
    
  const navigateToClass5 = () => {
    navigate('/class5'); // Navigate to the /admin route
  };
    
  const navigateToClass6 = () => {
    navigate('/class6'); // Navigate to the /admin route
  };
    
  const navigateToClass7 = () => {
    navigate('/class7'); // Navigate to the /admin route
  };
    
  const navigateToClass8 = () => {
    navigate('/class8'); // Navigate to the /admin route
  };
    
  const navigateToClass9 = () => {
    navigate('/class9'); // Navigate to the /admin route
  };
    
  const navigateToClass10 = () => {
    navigate('/class10'); // Navigate to the /admin route
  };

  return (
    <div className='button-container1'>
      <div className='sidebarbtnclass'>
        <button className="btn14" onClick={navigateToAdmin}>Main Menu</button>
      </div>
      
      <div className="button-container">
        <button onClick={navigateToClass1}>CLASS-1</button>
        <button onClick={navigateToClass2}>CLASS-2</button>
        <button onClick={navigateToClass3}>CLASS-3</button>
        <button onClick={navigateToClass4}>CLASS-4</button>
        <button onClick={navigateToClass5}>CLASS-5</button>
        <button onClick={navigateToClass6}>CLASS-6</button>
        <button onClick={navigateToClass7}>CLASS-7</button>
        <button onClick={navigateToClass8}>CLASS-8</button>
        <button onClick={navigateToClass9}>CLASS-9</button>
        <button onClick={navigateToClass10}>CLASS-10</button>
      </div>
    </div>
  );
};

export default ClassButtons;
