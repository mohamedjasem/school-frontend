import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/class1.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { ThreeCircles} from 'react-loader-spinner';
import '../Css/loader.css';

const API_URL = 'https://school-management-app-v1-0.onrender.com/v1/api/student/by-standard/1st';

const getAccessToken = () => {
  return localStorage.getItem('accessToken'); // Retrieve the access token from local storage
};

const Class1 = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = getAccessToken();
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await axios.get(API_URL, { headers });
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  const navigate = useNavigate();
  const navigateToAdmin = () => {
      navigate('/admin'); // Navigate to register page
    };

  if (loading) return(
    <div className="loading-spinner">
      <ThreeCircles  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""  />
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;

  return (<div className=''>
    <div className="Student-container">
      {students.map(student => (
        <StudentCardItem key={student.id} student={student} />
      ))}
    </div>
    <h1 className='hclass1'>CLASS-1 </h1>  
    <div className='sidebar1'>
    
    <button className="btn12 btns" onClick={navigateToAdmin}>Main Menu</button>
     </div>
    </div>
  );
};

// Separate component to handle individual student card
const StudentCardItem = ({ student }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = getAccessToken();
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const imageUrl = `https://studentmanagementsystem-3.onrender.com${student.profileImageUrl}`;
        const response = await fetch(imageUrl, { headers });
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);

        setImageSrc(imgUrl);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching image:', err);
        setLoading(false);
      }
    };

    fetchImage();
  }, [student.profileImageUrl]);
  const formattedDob = formatDate(student.dob);

  return (
    <>
      <div className="card">
      {loading ? <p>Loading image...</p> : <img className='imgs' src={imageSrc} alt={`${student.name}'s profile`} />}
      <div className="card-content">
      <table className="student-table">
        <tbody>
          <tr>
            <th className="table-header">Name</th>
            <td className="table-data">{student.name}</td>
          </tr>
          <tr>
            <th className="table-header">Roll No</th>
            <td className="table-data">{student.rollNo}</td>
          </tr>
          <tr>
            <th className="table-header">DOB</th>
            <td className="table-data">{formattedDob}</td>
          </tr>
          <tr>
            <th className="table-header">Gender</th>
            <td className="table-data">{student.gender}</td>
          </tr>
          <tr>
            <th className="table-header">Email</th>
            <td className="table-data">{student.email}</td>
          </tr>
          <tr>
            <th className="table-header">Standard</th>
            <td className="table-data">{student.standard}</td>
          </tr>
          <tr>
            <th className="table-header">Mobile Number</th>
            <td className="table-data">{student.mobileNumber}</td>
          </tr>
          <tr>
            <th className="table-header">Address</th>
            <td className="table-data">{student.address}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    </>
  );
};const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day} ${year}`;
};

export default Class1;
