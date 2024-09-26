// StudentRegister.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/User.service';
import '../Css/studentRegister.css';
import authHeader from '../Service/Auth-header';



// Schema for validation
const schema = yup.object().shape({
  rollNo: yup.string()
    .required('Roll number is required')
    .test('checkRollNo', 'Roll number already exists', async (value) => {
      if (!value) return false; // Skip validation if no value

      try {
        const headers = authHeader(); // Get authentication headers
        const url = `https://school-management-app-v1-0.onrender.com/v1/api/student/checkRollNo?rollNo=${value}`;
        
        console.log('Making request to:', url); // Log the URL

        const response = await fetch(url, { headers });

        console.log('Response status:', response.status); // Log the response status
        
        if (response.ok) {
          const data = await response.json();
          // If the response indicates the roll number exists, return false
          return data.message === "Roll number not found"; 
        } else if (response.status === 404) {
          // Roll number not found, which is okay for unique roll numbers
          return true;
        } else {
          // Unexpected response, log and return false
          console.error('Unexpected response format:', await response.text());
          return false;
        }
      } catch (error) {
        console.error('Error fetching roll number:', error);
        return false;
      }
    }),
  name: yup.string().required('Name is required'),
  dob: yup.date()
    .typeError('Date of birth is invalid') // Custom message for invalid date types
    .required('Date of birth is required')
    .nullable() // Allow null values
    .transform(value => value === "" ? null : value) // Transform empty strings to null
    .test('is-valid-date', 'Date of birth is invalid', value => {
      // Check if value is a valid date object or null
      return !value || (value instanceof Date && !isNaN(value.getTime()));
    }),
  gender: yup.string().required('Gender is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  standard: yup.string().required('Standard is required'),
  mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  address: yup.string().required('Address is required'),
  file: yup.mixed()
    .test('fileRequired', 'File is required', value => {
      // Check if file is provided or not
      if (!value.length) return false; 
      return true;
    })
    .test('fileSize', 'File size is too large', value => {
      if (value && value[0]) {
        return value[0].size <= 10485760; // 10MB
      }
      return true; // Allow empty files
    })
    .test('fileType', 'Unsupported File Format', value => {
      if (value && value[0]) {
        return ['image/jpeg', 'image/png'].includes(value[0].type);
      }
      return true; // Allow empty files
    }),
});

const StudentRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  
  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('rollno', data.rollNo);
      formData.append('name', data.name);
      formData.append('dob', data.dob);
      formData.append('gender', data.gender);
      formData.append('email', data.email);
      formData.append('standard', data.standard);
      formData.append('mobileNumber', data.mobileNumber);
      formData.append('address', data.address);
      if (data.file[0]) {
        formData.append('file', data.file[0]);
      }

      const response = await UserService.Register(
        data.rollNo,
        data.name,
        data.dob,
        data.gender,
        data.email,
        data.standard,
        data.mobileNumber,
        data.address,
        data.file[0]
      );

      console.log('Registration successful:', response);
      navigate('/success');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const navigateToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="maincontainers">
      <div className='errorCointainer'>
      {errors.rollNo && <p className="error-message">{errors.rollNo.message}</p>}
           {errors.name && <p className="error-message">{errors.name.message}</p>}
          {errors.dob && <p className="error-message">{errors.dob.message}</p>}
          {errors.gender && <p className="error-message">{errors.gender.message}</p>}
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          {errors.standard && <p className="error-message">{errors.standard.message}</p>}
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
          {errors.address && <p className="error-message">{errors.address.message}</p>}
          {errors.file && <p className="error-message">{errors.file.message}</p>}
      </div>
      <div className='sidebarReg1'>
        <button className="btn12" onClick={navigateToAdmin}>Main Menu</button>
      </div>
      
      
      <form className='formr' onSubmit={handleSubmit(onSubmit)}>
        <h1>Student Register</h1>
        <div>
          <label className='lRoll' htmlFor="rollNo">Roll Number</label>
          <input
            className='Roll'
            placeholder='Roll Number'
            id="rollNo"
            {...register('rollNo')}
          />
         
        </div>
        
        <div>
          <label className='lname' htmlFor="name">Name:</label>
          <input
            placeholder='Enter Name'
            className='name'
            id="name"
            {...register('name')}
          />
          
        </div>
        
        <div>
          <label className='ldob' htmlFor="dob">Date of Birth:</label>
          <input
            className='dob'
            type="date"
            id="dob"
            {...register('dob')}
          />
          
        </div>
        
        <div>
          <label className='lgender' htmlFor="gender">Gender:</label>
          <select className='gender' id="gender" {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
        </div>
        
        <div>
          <label className='lemail' htmlFor="email">Email:</label>
          <input
            placeholder='Enter Email'
            className='email'
            type="email"
            id="email"
            {...register('email')}
          />
           
        </div>
        
        <div>
          <label className='lstandard' htmlFor="standard">Standard:</label>
          <select
            className='standard'
            id="standard"
            {...register('standard')}
          >
            <option value="" disabled>Select a standard</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
          </select>
          
        </div>
        
        <div>
          <label className='lmobileNumber' htmlFor="mobileNumber">Mobile Number:</label>
          <input
            className='mobileNumber'
            type="tel"
            id="mobileNumber"
            {...register('mobileNumber')}
          />
          
        </div>
        
        <div>
          <label className='laddress' htmlFor="address">Address:</label>
          <textarea
            className='address'
            id="address"
            {...register('address')}
          />
   
        </div>
        
        <div>
       
          <label className='lfile' htmlFor="file">Photo Upload:</label>
          <input
            className='file'
            type="file"
            id="file"
            {...register('file')}
          />
        
           
        </div>
        
        <button className='btn btn-primary submitbtn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentRegister;
