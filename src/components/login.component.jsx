import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Service/auth.service';
import '../Css/login.css'; // Ensure this file exists and is properly linked

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'), // Validate the role
});

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: '', // Include role in initialValues
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await AuthService.login(values.username, values.password );
                const token = localStorage.getItem('accessToken');
                const jwtDecodeModule = await import('jwt-decode');
                const jwtDecode = jwtDecodeModule.jwtDecode; // Import named export

                // Decode the token
                const decoded = jwtDecode(token);
                const Roles=decoded.roles;
                    console.log(Roles);
             
                const userRole= response.data; 
            
              
                if (userRole === Roles) {
                    navigate('/admin');
                } else if (userRole === 'STUDENT') {
                    navigate('/student');
                } else {
                    navigate('/profile'); // Fallback or default case
                }
            } catch (error) {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setErrors({ general: resMessage });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="mainLogin">
            <div className=" L0ginMains">
               
                    <img  className="img" src="00.png" alt="Login" />
              
                <form className='formLogin' onSubmit={formik.handleSubmit}>
                    <h2>Login</h2>

                    <div className="form-group">
                        <label className="luserName" htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="userName"
                            id="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="alert alert-danger" role="alert">
                                {formik.errors.username}
                            </div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label className="lpassWord" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="Passwordlogin"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="alert alert-danger" role="alert">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label className="lRole" htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select a role</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="STUDENT">STUDENT</option>
                        </select>
                        {formik.touched.role && formik.errors.role ? (
                            <div className="alert alert-danger" role="alert">
                                {formik.errors.role}
                            </div>
                        ) : null}
                    </div>

                    {formik.errors.general && (
                        <div className="alert alert-danger" role="alert">
                            {formik.errors.general}
                        </div>
                    )}

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block button"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
