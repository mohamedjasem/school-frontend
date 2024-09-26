import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import UserService from "../Service/User.service";
import AuthService from "../Service/auth.service";
import '../Css/admin.css';



const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout(); // Perform logout logic
    navigate('/login'); // Redirect to login page after logout
  };

  const navigateToRegister = () => {
    navigate('/studentRegister'); // Navigate to register page
  };
 
  const navigateToUpdate = () => {
    navigate('/studentUpdate'); // Navigate to register page
  };
  const navigateToclassBtn = () => {
    navigate('/classBtn'); // Navigate to register page
  };
 
  const navigateToStudentAll = () => {
    navigate('/studentcard'); // Navigate to register page
  };
  const navigateToFindStudent = () => {
    navigate('/findStudent'); // Navigate to register page
  };

  const   navigateToDeleteStudent
  = () => {
    navigate('/deleteStudent'); // Navigate to register page
  };

  const refreshCurrentPage = () => {
    window.location.reload(); // Refresh the current page
  };

  useEffect(() => {
    // Get the current refresh count from sessionStorage
    const refreshCount = parseInt(sessionStorage.getItem('refreshCount') || '0', 10);

    if (refreshCount < 2) {
      // Increment the refresh count and save it to sessionStorage
      sessionStorage.setItem('refreshCount', refreshCount + 1);

      // If this is the second refresh, reload the page
      if (refreshCount === 1) {
        window.location.reload();
      }
    } else {
      // Clean up sessionStorage after the second refresh
      sessionStorage.removeItem('refreshCount');
    }

    // Fetch admin board data
    const fetchAdminBoard = async () => {
      try {
        const response = await UserService.getAdminBoard();
        setContent(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Unauthorized, redirect to login
          navigate('/login');
        } else {
          setContent(
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
          );
        }
      }
    };

    fetchAdminBoard();
  }, [navigate]);

  return (
    <div>
      <button onClick={handleLogout} className="btn btn-primary logout">
        Logout
      </button>
      
     
      <div className="FirstContainer">
      <h3 className="AdminWelcome">{content}</h3>
        <div className="containerbuttons">
          <h2>Student</h2>
          <button className="btn12" onClick={navigateToRegister}>Register</button>
          <button className="btn12" onClick={navigateToUpdate}>Update</button>
          <button className="btn12" onClick={navigateToStudentAll}>All-Student</button>
          <button className="btn12" onClick={navigateToFindStudent}>Find-Student</button>
          <button className="btn12" onClick={navigateToDeleteStudent}>Delete-Student</button>
          <button className="btn12" onClick={navigateToclassBtn}>Class</button>
          <button className="btn12" onClick={refreshCurrentPage}>Refresh Page</button>
          
  
        </div>
       
        
      </div>
    </div>

  );
};

export default BoardAdmin;
