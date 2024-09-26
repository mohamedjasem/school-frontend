import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/findStudent.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { ColorRing,ProgressBar} from 'react-loader-spinner';

const SEARCH_URL = 'https://school-management-app-v1-0.onrender.com/v1/api/student/findRollNo'; // URL to search student by roll number

const getAccessToken = () => {
  return localStorage.getItem('accessToken'); // Retrieve the access token from local storage
};

const FindStudent = () => {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Move useNavigate inside the component

  const navigateToAdmin = () => {
      navigate('/admin'); // Navigate to the admin page
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!rollNo.trim()) {
      // Check if the roll number is empty
      setMessage('Roll number cannot be empty.');
      return;
    }

    setLoading(true);
    setStudent(null); // Clear previous student data
    setMessage(''); // Clear previous messages

    try {
      const token = getAccessToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.get(SEARCH_URL, {
        headers,
        params: { rollNo } // Include rollNo as a query parameter
      });

      if (response.data) {
        setStudent(response.data);
        // setMessage(`Student Found: ${response.data.name}`);
      } else {
        setMessage('No student found with this roll number.');
      }
    } catch (err) {
      setMessage('give me correct rollNumber');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='containerfind'>
     <button className="btn13" onClick={navigateToAdmin}>Main Menu</button>
      <form className='formFind' onSubmit={handleSubmit}>
      <h1>Find Student</h1>
        <input
        className='findStudentInput'
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Enter roll number"
          required
        />
        <button  className='findStudentbtn' type="submit" disabled={loading}>
          {loading ? <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />: 'Find'}
        </button>
      </form>
      {message && <p className='errorfind'>{message}</p>}
      {student && <StudentCardItem student={student} />}
    </div>
  );
};

// Component to handle individual student card
const StudentCardItem = ({ student }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student image
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = getAccessToken();
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const profileImageUrl = student.profileImageUrl;
        if (profileImageUrl) {
          const imageUrl = `https://studentmanagementsystem-3.onrender.com${profileImageUrl}`;
          const response = await fetch(imageUrl, { headers });
          const blob = await response.blob();
          const imgUrl = URL.createObjectURL(blob);

          setImageSrc(imgUrl);
        } else {
          console.warn('No profile image URL provided for student.');
        }
      } catch (err) {
        console.error('Error fetching image:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [student.profileImageUrl]);

  const formattedDob = formatDate(student.dob);

  return (
    <div className="card">
      {loading ? <p><ProgressBar
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></p> : <img className='imgs' src={imageSrc} alt={`${student.name}'s profile`} />}
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
  );
};

// Format date function
const formatDate = (dateString) => {
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

export default FindStudent;
