import React, { useState } from 'react';
import authHeader from '../Service/Auth-header'; // Ensure this exports the correct headers object
import '../Css/deleteStudent.css';
import { useNavigate } from 'react-router-dom';
import '../Css/loader.css';
import {ProgressBar } from 'react-loader-spinner';
const DeleteStudent = () => {
    const [rollNo, setRollNo] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate(); // Move useNavigate inside the component

    const navigateToAdmin = () => {
        navigate('/admin'); // Navigate to the admin page
    };

    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!rollNo) {
            setMessage('Roll number is required');
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch(`https://school-management-app-v1-0.onrender.com/v1/api/student/delete?rollNo=${encodeURIComponent(rollNo)}`, {
                method: 'DELETE', // Correct HTTP method for deleting a resource
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(), // Spread headers returned by authHeader function
                },
            });

            if (response.ok) {
                const data = await response.text();
                setMessage(data); // Display success message
            } else {
                const error = await response.text();
                setMessage(`Error: ${error}`); // Display error message
            }
        } catch (error) {
            setMessage(`Network error: ${error.message}`); // Display network error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='deleteContainer'>
            <button className="btn13" onClick={navigateToAdmin}>Main Menu</button>
            <form className='formdelete' onSubmit={handleDelete}>
                <h1 className='dh1'>Delete Student</h1>
                <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="Enter roll number"
                />
                <button className='buttonDelete' type="submit" disabled={loading}>
                    {loading ? <ProgressBar
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> : 'Delete'}
                </button>
                {message && <p className='deleteerror'>{message}</p>}
            </form>
        </div>
    );
};

export default DeleteStudent;
