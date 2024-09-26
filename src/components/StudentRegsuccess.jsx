// StudentRegSuccess.tsx
import React from 'react';
import '../Css/StudentRegSuccess.css';
import { useNavigate } from 'react-router-dom';

const StudentRegSuccess= () => {

    const navigate = useNavigate();
    const navigateToAdmin = () => {
        navigate('/admin'); // Navigate to register page
      };
  return (
    <div className='success-container '>
         <div className='sidebarsuc'>
            <button className="btn12" onClick={navigateToAdmin}>Main</button></div>
      <h1>Registration  Successful!</h1>
      <p>Thank you for registering.</p>
      <p> Your student has been added successfully.</p>
    </div>
  );
};

export default StudentRegSuccess;
