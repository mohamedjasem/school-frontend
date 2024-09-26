import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Css/register.css';
import AuthService from '../Service/auth.service';

// Define the validation schema with Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string()
    .oneOf(['ADMIN', 'Teacher', 'Student'], 'Invalid role')
    .required('Role is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await AuthService.register(values.firstName, values.lastName, values.email, values.password, values.role);
        alert("Registration successful!");
        // Redirect user or clear form here
         window.location.href = '/login';
        formik.resetForm();
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed: " + (error.response?.data?.message || error.message));
      }
    }
    ,
  });

  return (
    <div className='registerContainer'>
      
      <form className='regForm' onSubmit={formik.handleSubmit}>
        <h2>SIGN UP</h2>

        <label className='lfirstName' htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          className='firstnamer'
          type="text"
          placeholder='FIRST NAME'
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
       


        <label className='llastName' htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          className='lastnamer'
          type="text"
          placeholder='LAST NAME'
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
       
        <label className='lEmail' htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className='emailr'
          placeholder='EMAIL'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        
        <label className='lrole' htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          className='roler'
          onChange={formik.handleChange}
          value={formik.values.role}
        >
          <option value="" label="Select a role" />
          <option value="ADMIN" label="ADMIN" />
          <option value="Teacher" label="Teacher" />
          <option value="Student" label="Student" />
        </select>
     

        <label className='lpassword' htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          className='passwordr'
          type="password"
          placeholder='PASSWORD'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
       

        <button type="submit">Submit</button>
      </form>

      <div className='registerContainerform2'>
      <div className='fieldError1'>
      {formik.errors.firstName ? <div className="error">{formik.errors.firstName}</div> : null}
        
       
        
      </div>
      <div className='fieldError2'>
      {formik.errors.lastName ? <div className="error">{formik.errors.lastName}</div> : null}
      </div>

      <div className='fieldError3'>
      {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        <div className='fieldError4'>
        
        {formik.errors.role ? <div className="error">{formik.errors.role}</div> : null}
        </div>
        <div className='fieldError5'>
        {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>
        </div>
    </div>
    
  );
};

export default Register;
